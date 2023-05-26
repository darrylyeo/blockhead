import type { Cache } from './cache';
import type { CacheTypeDef, ListType, ValidLists, ListFilters } from './types';
export declare class ListCollection<Def extends CacheTypeDef, ListName extends ValidLists<Def>> {
    #private;
    constructor({ parentID, allLists, when, cache, name, }: {
        name: ValidLists<Def>;
        parentID?: string;
        allLists?: boolean;
        when?: ListFilters<Def, ListName>;
        cache: Cache<Def>;
    });
    append(...records: ListType<Def, ListName>[]): void;
    prepend(...records: ListType<Def, ListName>[]): void;
    toggle(where: 'first' | 'last', ...records: ListType<Def, ListName>[]): void;
    when(filter: ListFilters<Def, ListName>): ListCollection<Def, ListName>;
    remove(...records: ListType<Def, ListName>[]): void;
    [Symbol.iterator](): Generator<string, void, unknown>;
}
