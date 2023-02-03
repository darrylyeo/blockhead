import { Cache } from './cache';
export declare class GarbageCollector {
    cache: Cache;
    private lifetimes;
    get cacheBufferSize(): number;
    constructor(cache: Cache);
    resetLifetime(id: string, field: string): void;
    tick(): void;
}
