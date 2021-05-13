/// <reference types="node" />
import LocalBucket from "./ratelimitBuckets/LocalBucket";
/**
 * Ratelimiter used for handling the ratelimits imposed by the rest api
 * @protected
 */
declare class Ratelimiter {
    buckets: {
        [routeKey: string]: LocalBucket;
    };
    global: boolean;
    globalResetAt: number;
    /**
     * This is an interval to constantly check Buckets which should be reset or unreferenced from the RateLimiter to be swept by the garbage collector.
     * This 1 timeout is more performant as compared to potentially many more ticking timers to reset individual bucket remaining values.
     *
     * YOU SHOULD NEVER OVERRIDE THIS UNLESS YOU KNOW WHAT YOU'RE DOING. REQUESTS MAY POSSIBLY NEVER EXECUTE WITHOUT THIS AND/OR MEMORY MAY SLOWLY CLIMB OVER TIME.
     */
    protected _timeout: NodeJS.Timeout;
    protected _timeoutFN: () => void;
    protected _timeoutDuration: number;
    constructor();
    /**
     * Returns a key for saving ratelimits for routes
     * (Taken from https://github.com/abalabahaha/eris/blob/master/lib/rest/RequestHandler.js) -> I luv u abal <3
     * @param url url to reduce to a key something like /channels/266277541646434305/messages/266277541646434305/
     * @param method method of the request, usual http methods like get, etc.
     * @returns reduced url: /channels/266277541646434305/messages/:id/
     */
    routify(url: string, method: string): string;
    /**
     * Queue a rest call to be executed
     * @param fn function to call once the ratelimit is ready
     * @param url Endpoint of the request
     * @param method Http method used by the request
     */
    queue(fn: (bucket: import("./ratelimitBuckets/LocalBucket")) => any, url: string, method: string): void;
}
export = Ratelimiter;
