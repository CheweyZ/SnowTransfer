/// <reference types="node" />
declare class LocalBucket {
    fnQueue: Array<{
        fn: (...args: Array<any>) => any;
        callback: () => any;
    }>;
    limit: number;
    remaining: number;
    reset: number;
    resetTimeout: NodeJS.Timeout | null;
    ratelimiter: import("../Ratelimiter");
    constructor(ratelimiter: import("../Ratelimiter"));
    queue(fn: (bucket: LocalBucket) => any): Promise<any>;
    protected checkQueue(): void;
    protected resetRemaining(): void;
    protected dropQueue(): void;
}
export = LocalBucket;
