import type { Cache } from './cache';
export declare class StaleManager {
    #private;
    cache: Cache;
    private fieldsTime;
    constructor(cache: Cache);
    /**
     * get the FieldTime info
     * @param id User:1
     * @param field firstName
     */
    getFieldTime(id: string, field: string): number | undefined | null;
    /**
     * set the date to a field
     * @param id User:1
     * @param field firstName
     */
    setFieldTimeToNow(id: string, field: string): void;
    /**
     * set null to a field (stale)
     * @param id User:1
     * @param field firstName
     */
    markFieldStale(id: string, field: string): void;
    markAllStale(): void;
    markRecordStale(id: string): void;
    markTypeStale(type: string): void;
    markTypeFieldStale(type: string, field: string, when?: {}): void;
    delete(id: string, field: string): void;
    reset(): void;
}
