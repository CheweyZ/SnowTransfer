import LocalBucket from "./ratelimitBuckets/LocalBucket";
declare class Ratelimiter {
    buckets: {
        [routeKey: string]: LocalBucket;
    };
    global: boolean;
    globalReset: number;
    constructor();
    routify(url: string, method: string): string;
    queue(fn: (bucket: import("./ratelimitBuckets/LocalBucket")) => any, url: string, method: string): void;
}
export = Ratelimiter;
