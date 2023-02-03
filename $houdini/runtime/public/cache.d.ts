import { Cache as _Cache } from '../cache/cache';
import { SchemaManager, TypeInfo } from '../cache/schema';
import { ListCollection } from './list';
import { Record } from './record';
import type { CacheTypeDef, IDFields, TypeNames, ValidLists } from './types';
export declare class Cache<Def extends CacheTypeDef> {
    _internal_unstable: _Cache;
    constructor(cache: _Cache);
    validateInstabilityWarning(): void;
    setFieldType(...args: Parameters<SchemaManager['setFieldType']>): void;
    get root(): Record<Def, '__ROOT__'>;
    get<T extends TypeNames<Def>>(type: T, data: IDFields<Def, T>): Record<Def, T>;
    get config(): import("..").ConfigFile;
    list<Name extends ValidLists<Def>>(name: Name, { parentID, allLists }?: {
        parentID?: string;
        allLists?: boolean;
    }): ListCollection<Def, Name>;
}
export declare function _typeInfo<Def extends CacheTypeDef>(cache: Cache<Def>, type: string, field: string): TypeInfo;
