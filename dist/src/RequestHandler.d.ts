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
    remaining: {};
    reset: {};
    limit: {};
    apiURL: string;
    static DiscordAPIErrror: typeof DiscordAPIError;
    constructor(ratelimiter: import("./Ratelimiter"), options: {
        token: string;
        baseHost: string;
    });
    request(endpoint: string, method: HTTPMethod, dataType?: "json" | "multipart", data?: any | undefined): Promise<any>;
    private _getOffsetDateFromHeader;
    private _applyRatelimitHeaders;
    private _request;
    private _multiPartRequest;
}
export = RequestHandler;
