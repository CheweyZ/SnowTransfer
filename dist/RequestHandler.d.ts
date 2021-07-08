/// <reference types="node" />
import { EventEmitter } from "events";
import c from "centra";
declare type HTTPMethod = "get" | "post" | "patch" | "head" | "put" | "delete" | "connect" | "options" | "trace";
declare class DiscordAPIError extends Error {
    method: HTTPMethod;
    path: string;
    code: number;
    httpStatus: number;
    constructor(path: string, error: any, method: HTTPMethod, status: number);
    static flattenErrors(obj: Record<string, any>, key?: string): string[];
}
interface HandlerEvents {
    request: [string, {
        endpoint: string;
        method: HTTPMethod;
        dataType: "json" | "multipart";
        data: any;
    }];
    done: [string, c.Response];
    requestError: [string, Error];
    rateLimit: [{
        timeout: number;
        limit: number;
        method: HTTPMethod;
        path: string;
        route: string;
    }];
}
interface RequestHandler {
    addListener<E extends keyof HandlerEvents>(event: E, listener: (...args: HandlerEvents[E]) => any): this;
    emit<E extends keyof HandlerEvents>(event: E, ...args: HandlerEvents[E]): boolean;
    eventNames(): Array<keyof HandlerEvents>;
    listenerCount(event: keyof HandlerEvents): number;
    listeners(event: keyof HandlerEvents): Array<(...args: Array<any>) => any>;
    off<E extends keyof HandlerEvents>(event: E, listener: (...args: HandlerEvents[E]) => any): this;
    on<E extends keyof HandlerEvents>(event: E, listener: (...args: HandlerEvents[E]) => any): this;
    once<E extends keyof HandlerEvents>(event: E, listener: (...args: HandlerEvents[E]) => any): this;
    prependListener<E extends keyof HandlerEvents>(event: E, listener: (...args: HandlerEvents[E]) => any): this;
    prependOnceListener<E extends keyof HandlerEvents>(event: E, listener: (...args: HandlerEvents[E]) => any): this;
    rawListeners(event: keyof HandlerEvents): Array<(...args: Array<any>) => any>;
    removeAllListeners(event?: keyof HandlerEvents): this;
    removeListener<E extends keyof HandlerEvents>(event: E, listener: (...args: HandlerEvents[E]) => any): this;
}
/**
 * Request Handler class
 */
declare class RequestHandler extends EventEmitter {
    ratelimiter: import("./Ratelimiter");
    options: {
        baseHost: string;
        baseURL: string;
        headers: {
            Authorization: string;
            "User-Agent": string;
        };
    };
    latency: number;
    apiURL: string;
    static DiscordAPIErrror: typeof DiscordAPIError;
    /**
     * Create a new request handler
     * @param ratelimiter ratelimiter to use for ratelimiting requests
     * @param options options
     */
    constructor(ratelimiter: import("./Ratelimiter"), options: {
        token: string;
        baseHost: string;
    });
    /**
     * Request a route from the discord api
     * @param endpoint endpoint to request
     * @param method http method to use
     * @param dataType type of the data being sent
     * @param data data to send, if any
     * @param amount amount of requests previously executed
     * @returns Result of the request
     */
    request(endpoint: string, method: HTTPMethod, dataType?: "json" | "multipart", data?: any | undefined, amount?: number): Promise<any>;
    /**
     * Calculate the time difference between the local server and discord
     * @param dateHeader Date header value returned by discord
     * @returns Offset in milliseconds
     */
    private _getOffsetDateFromHeader;
    /**
     * Apply the received ratelimit headers to the ratelimit bucket
     * @param bkt Ratelimit bucket to apply the headers to
     * @param headers Http headers received from discord
     * @param offsetDate Unix timestamp of the current date + offset to discord time
     * @param reactions Whether to use reaction ratelimits (1/250ms)
     */
    private _applyRatelimitHeaders;
    /**
     * Execute a normal json request
     * @param endpoint Endpoint to use
     * @param data Data to send
     * @param useParams Whether to send the data in the body or use query params
     * @param amount amount of requests previously executed
     * @returns Result of the request
     */
    private _request;
    /**
     * Execute a multipart/form-data request
     * @param endpoint Endpoint to use
     * @param method Http Method to use
     * @param data data to send
     * @returns Result of the request
     */
    private _multiPartRequest;
}
export = RequestHandler;
