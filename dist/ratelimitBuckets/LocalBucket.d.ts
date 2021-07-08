/**
 * Bucket used for saving ratelimits
 */
declare class LocalBucket {
    /**
     * array of functions waiting to be executed
     */
    fnQueue: Array<{
        fn: (...args: Array<any>) => any;
        callback: () => any;
    }>;
    /**
     * Number of functions that may be executed during the timeframe set in limitReset
     */
    limit: number;
    /**
     * Remaining amount of executions during the current timeframe
     */
    protected _remaining: number;
    /**
     * Timeframe in milliseconds until the ratelimit resets
     */
    reset: number;
    /**
     * Timeout that calls the reset function once the timeframe passed
     */
    resetAt: number | null;
    /**
     * ratelimiter used for ratelimiting requests
     */
    ratelimiter: import("../Ratelimiter");
    /**
     * Create a new bucket
     * @param ratelimiter ratelimiter used for ratelimiting requests
     */
    constructor(ratelimiter: import("../Ratelimiter"));
    get remaining(): number;
    set remaining(value: number);
    /**
     * Queue a function to be executed
     * @param fn - function to be executed
     * @returns Result of the function if any
     */
    queue(fn: (bucket: LocalBucket) => any | Promise<any>): Promise<any>;
    /**
     * Check if there are any functions in the queue that haven't been executed yet
     */
    checkQueue(): void;
    /**
     * Reset the remaining tokens to the base limit
     */
    resetRemaining(): void;
    /**
     * Clear the current queue of events to be sent
     */
    dropQueue(): void;
}
export = LocalBucket;
