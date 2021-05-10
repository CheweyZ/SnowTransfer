"use strict";
/**
 * Bucket used for saving ratelimits
 */
class LocalBucket {
    /**
     * Create a new bucket
     * @param ratelimiter ratelimiter used for ratelimiting requests
     */
    constructor(ratelimiter) {
        this.fnQueue = [];
        this.limit = 5;
        this._remaining = 1;
        this.reset = 5000;
        this.resetAt = null;
        this.ratelimiter = ratelimiter;
    }
    get remaining() {
        if (this.resetAt && this.resetAt <= Date.now()) {
            this._remaining = this.limit;
            this.resetAt = null;
        }
        return this._remaining;
    }
    set remaining(value) {
        this._remaining = value;
    }
    /**
     * Queue a function to be executed
     * @param fn - function to be executed
     * @returns Result of the function if any
     */
    queue(fn) {
        return new Promise((res, rej) => {
            const wrapFn = () => {
                if (fn instanceof Promise) {
                    return fn(this).then(res).catch(rej);
                }
                return res(fn(this));
            };
            this.fnQueue.push({
                fn, callback: wrapFn
            });
            this.checkQueue();
        });
    }
    /**
     * Check if there are any functions in the queue that haven't been executed yet
     */
    checkQueue() {
        if (this.reset < 0) {
            this.reset = 100;
        }
        if (this.ratelimiter.global && this.ratelimiter.globalResetAt > Date.now())
            return;
        if (this.fnQueue.length > 0 && this.remaining !== 0) {
            const queuedFunc = this.fnQueue.splice(0, 1)[0];
            queuedFunc.callback();
            this.checkQueue();
        }
    }
    /**
     * Reset the remaining tokens to the base limit
     */
    resetRemaining() {
        this._remaining = this.limit;
        this.resetAt = null;
        this.checkQueue();
    }
    /**
     * Clear the current queue of events to be sent
     */
    dropQueue() {
        this.fnQueue.length = 0;
    }
}
module.exports = LocalBucket;
