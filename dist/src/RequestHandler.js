"use strict";
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-async-promise-executor */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const events_1 = require("events");
const crypto_1 = __importDefault(require("crypto"));
const centra_1 = __importDefault(require("centra"));
const Endpoints_1 = __importDefault(require("./Endpoints"));
const form_data_1 = __importDefault(require("form-data"));
const package_json_1 = require("../package.json");
const Constants_1 = __importDefault(require("./Constants"));
class DiscordAPIError extends Error {
    constructor(path, error, method, status) {
        super();
        const flattened = DiscordAPIError.flattenErrors(error.errors || error).join("\n");
        this.name = "DiscordAPIError";
        this.message = error.message && flattened ? `${error.message}\n${flattened}` : error.message || flattened;
        this.method = method;
        this.path = path;
        this.code = error.code;
        this.httpStatus = status;
    }
    static flattenErrors(obj, key = "") {
        let messages = [];
        for (const [k, v] of Object.entries(obj)) {
            if (k === "message")
                continue;
            const newKey = key ? (isNaN(Number(k)) ? `${key}.${k}` : `${key}[${k}]`) : k;
            if (v._errors) {
                messages.push(`${newKey}: ${v._errors.map(e => e.message).join(" ")}`);
            }
            else if (v.code || v.message) {
                messages.push(`${v.code ? `${v.code}: ` : ""}${v.message}`.trim());
            }
            else if (typeof v === "string") {
                messages.push(v);
            }
            else {
                messages = messages.concat(this.flattenErrors(v, newKey));
            }
        }
        return messages;
    }
}
/**
 * Request Handler class
 */
class RequestHandler extends events_1.EventEmitter {
    /**
     * Create a new request handler
     * @param ratelimiter ratelimiter to use for ratelimiting requests
     * @param options options
     */
    constructor(ratelimiter, options) {
        super();
        this.ratelimiter = ratelimiter;
        this.options = {
            baseHost: Endpoints_1.default.BASE_HOST,
            baseURL: Endpoints_1.default.BASE_URL,
            headers: {
                Authorization: options.token,
                "User-Agent": `DiscordBot (https://github.com/DasWolke/SnowTransfer, ${package_json_1.version})`
            }
        };
        Object.assign(this.options, options);
        this.apiURL = this.options.baseHost + Endpoints_1.default.BASE_URL;
        this.latency = 500;
    }
    /**
     * Request a route from the discord api
     * @param endpoint endpoint to request
     * @param method http method to use
     * @param dataType type of the data being sent
     * @param data data to send, if any
     * @param amount amount of requests previously executed
     * @returns Result of the request
     */
    request(endpoint, method, dataType = "json", data = {}, amount = 0) {
        if (typeof data === "number")
            data = String(data);
        return new Promise(async (res, rej) => {
            this.ratelimiter.queue(async (bkt) => {
                const reqID = crypto_1.default.randomBytes(20).toString("hex");
                const latency = Date.now();
                try {
                    this.emit("request", reqID, { endpoint, method, dataType, data });
                    let request;
                    if (dataType == "json") {
                        request = await this._request(endpoint, method, data, (method === "get" || endpoint.includes("/bans") || endpoint.includes("/prune")), amount);
                    }
                    else if (dataType == "multipart") {
                        request = await this._multiPartRequest(endpoint, method, data, amount);
                    }
                    else {
                        throw new Error("Forbidden dataType. Use json or multipart");
                    }
                    // 429 and 502 are recoverable and will be re-tried automatically with 3 attempts max.
                    if (request.statusCode && !Constants_1.default.OK_STATUS_CODES.includes(request.statusCode) && ![429, 502].includes(request.statusCode))
                        throw new DiscordAPIError(endpoint, request.headers["content-type"] === "application/json" ? await request.json() : request.body, method, request.statusCode);
                    if (request.headers["date"]) {
                        this.latency = Date.now() - latency;
                        const offsetDate = this._getOffsetDateFromHeader(request.headers["date"]);
                        const match = endpoint.match(/\/reactions\//);
                        this._applyRatelimitHeaders(bkt, request.headers, offsetDate, !!match);
                    }
                    if (request.statusCode && [429, 502].includes(request.statusCode)) {
                        if (request.statusCode === 429)
                            this.emit("rateLimit", { timeout: bkt.reset, limit: bkt.limit, method: method, path: endpoint, route: this.ratelimiter.routify(endpoint, method) });
                        return this.request(endpoint, method, dataType, data, amount++);
                    }
                    this.emit("done", reqID, request);
                    if (request.body) {
                        let b;
                        try {
                            b = JSON.parse(request.body.toString());
                        }
                        catch {
                            res(undefined);
                        }
                        return res(b);
                    }
                    else {
                        return res(undefined);
                    }
                }
                catch (error) {
                    this.emit("requestError", reqID, error);
                    return rej(error);
                }
            }, endpoint, method);
        });
    }
    /**
     * Calculate the time difference between the local server and discord
     * @param dateHeader Date header value returned by discord
     * @returns Offset in milliseconds
     */
    _getOffsetDateFromHeader(dateHeader) {
        const discordDate = Date.parse(dateHeader);
        const offset = Date.now() - discordDate;
        return Date.now() + offset;
    }
    /**
     * Apply the received ratelimit headers to the ratelimit bucket
     * @param bkt Ratelimit bucket to apply the headers to
     * @param headers Http headers received from discord
     * @param offsetDate Unix timestamp of the current date + offset to discord time
     * @param reactions Whether to use reaction ratelimits (1/250ms)
     */
    _applyRatelimitHeaders(bkt, headers, offsetDate, reactions = false) {
        if (headers["x-ratelimit-global"]) {
            bkt.ratelimiter.global = true;
            bkt.ratelimiter.globalResetAt = Date.now() + (parseFloat(headers["retry_after"]) * 1000);
        }
        if (headers["x-ratelimit-reset"]) {
            const reset = (headers["x-ratelimit-reset"] * 1000) - offsetDate;
            if (reactions) {
                bkt.reset = Math.max(reset, 250);
            }
            else {
                bkt.reset = reset;
            }
        }
        if (headers["x-ratelimit-remaining"]) {
            bkt.remaining = parseInt(headers["x-ratelimit-remaining"]);
            if (bkt.remaining === 0)
                bkt.resetAt = Date.now() + bkt.reset;
        }
        else {
            bkt.remaining = 1;
        }
        if (headers["x-ratelimit-limit"]) {
            bkt.limit = parseInt(headers["x-ratelimit-limit"]);
        }
    }
    /**
     * Execute a normal json request
     * @param endpoint Endpoint to use
     * @param data Data to send
     * @param useParams Whether to send the data in the body or use query params
     * @param amount amount of requests previously executed
     * @returns Result of the request
     */
    async _request(endpoint, method, data, useParams = false, amount = 0) {
        if (amount >= 3)
            throw new Error("Max amount of rety attempts reached");
        const headers = {};
        if (typeof data != "string" && data.reason) {
            headers["X-Audit-Log-Reason"] = encodeURIComponent(data.reason);
            delete data.reason;
        }
        if (data.queryReason) {
            data.reason = data.queryReason;
            delete data.queryReason;
        }
        const req = centra_1.default(this.apiURL, method).path(endpoint).header(this.options.headers);
        if (useParams) {
            return req.query(data).send();
        }
        else {
            if (data && typeof data === "object")
                req.body(data, "json");
            else if (data)
                req.body(data);
            return req.send();
        }
    }
    /**
     * Execute a multipart/form-data request
     * @param endpoint Endpoint to use
     * @param method Http Method to use
     * @param data data to send
     * @returns Result of the request
     */
    async _multiPartRequest(endpoint, method, data, amount = 0) {
        if (amount >= 3)
            throw new Error("Max amount of rety attempts reached");
        const form = new form_data_1.default();
        if (data.file && data.file.file) {
            form.append("file", data.file.file, { filename: data.file.name });
            delete data.file.file;
        }
        form.append("payload_json", JSON.stringify(data));
        // duplicate headers in options as to not risk mutating the state.
        const newHeaders = Object.assign({}, this.options.headers, form.getHeaders());
        return centra_1.default(this.apiURL, method).path(endpoint).header(newHeaders).body(form.getBuffer()).send();
    }
}
RequestHandler.DiscordAPIErrror = DiscordAPIError;
module.exports = RequestHandler;
