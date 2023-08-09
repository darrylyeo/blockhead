import type { Cache as _Cache } from '../cache/cache';
import { type QueryArtifact } from '../lib';
import { ListCollection } from './list';
import { Record } from './record';
import type { ArgType, CacheTypeDef, IDFields, QueryInput, QueryList, QueryValue, TypeFieldNames, TypeNames, ValidLists } from './types';
export declare class Cache<Def extends CacheTypeDef> {
    _internal_unstable: _Cache;
    constructor(cache: _Cache);
    validateInstabilityWarning(): void;
    get<T extends TypeNames<Def>>(type: T, data: IDFields<Def, T>): Record<Def, T>;
    get config(): import("../lib").ConfigFile;
    list<Name extends ValidLists<Def>>(name: Name, { parentID, allLists }?: {
        parentID?: string;
        allLists?: boolean;
    }): ListCollection<Def, Name>;
    read<_Query extends {
        artifact: QueryArtifact;
    }>({ query, variables, }: {
        query: _Query;
        variables?: QueryInput<QueryList<Def>, _Query>;
    }): {
        data: QueryValue<QueryList<Def>, _Query> | null;
        partial: boolean;
    };
    write<_Query extends {
        artifact: QueryArtifact;
    }>({ query, variables, data, }: {
        query: _Query;
        data: QueryValue<QueryList<Def>, _Query>;
        variables?: QueryInput<QueryList<Def>, _Query>;
    }): void;
    /**
     * Mark some elements of the cache stale.
     */
    markStale<_Type extends TypeNames<Def>, _Field extends TypeFieldNames<Def, _Type>>(type?: _Type, options?: {
        field?: _Field;
        when?: ArgType<Def, _Type, _Field>;
    }): void;
    /**
     * Reset the entire cache by clearing all records and lists
     */
    reset(): void;
}
