import type { ConfigFile } from '../lib/config';
import type { Cache } from './cache';
export type TypeInfo = {
    type: string;
    nullable: boolean;
    link: boolean;
};
export declare class SchemaManager {
    cache: Cache;
    fieldTypes: Record<string, Record<string, TypeInfo>>;
    constructor(cache: Cache);
    setFieldType({ parent, key, type, nullable, link, }: {
        parent: string;
        key: string;
        type: string;
        nullable?: boolean;
        link?: boolean;
    }): void;
    fieldType(type: string, field: string): TypeInfo;
    get config(): ConfigFile;
}
