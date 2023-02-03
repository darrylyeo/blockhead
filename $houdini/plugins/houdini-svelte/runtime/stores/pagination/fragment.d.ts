import { GraphQLObject, FragmentArtifact, QueryArtifact, HoudiniFetchContext } from '$houdini/runtime/lib/types';
import { Readable, Subscriber, Writable } from 'svelte/store';
import { StoreConfig } from '../query';
import { BaseStore } from '../store';
import { CursorHandlers } from './cursor';
import { PageInfo } from './pageInfo';
type FragmentStoreConfig<_Data extends GraphQLObject, _Input> = StoreConfig<_Data, _Input, FragmentArtifact> & {
    paginationArtifact: QueryArtifact;
};
declare class BasePaginatedFragmentStore<_Data extends GraphQLObject, _Input> extends BaseStore {
    paginated: boolean;
    protected paginationArtifact: QueryArtifact;
    name: string;
    kind: import("$houdini/runtime/lib/types").ArtifactKind;
    constructor(config: FragmentStoreConfig<_Data, _Input>);
    protected queryVariables(store: Readable<FragmentPaginatedResult<_Data, unknown>>): Promise<_Input>;
}
declare class FragmentStoreCursor<_Data extends GraphQLObject, _Input> extends BasePaginatedFragmentStore<_Data, _Input> {
    get(initialValue: _Data | null): {
        kind: import("$houdini/runtime/lib/types").ArtifactKind;
        data: Writable<FragmentPaginatedResult<_Data, {
            pageInfo: PageInfo;
        }>>;
        subscribe: (run: Subscriber<FragmentPaginatedResult<_Data, {
            pageInfo: PageInfo;
        }>>, invalidate?: ((value?: FragmentPaginatedResult<_Data, {
            pageInfo: PageInfo;
        }> | undefined) => void) | undefined) => (() => void);
        loading: Readable<boolean>;
        fetch: (args?: import("../query").QueryStoreFetchParams<_Data, _Input> | undefined) => Promise<{
            data: _Data | null;
            errors: {
                message: string;
            }[] | null;
            fetching: boolean;
            partial: boolean;
            source: import("$houdini/runtime/lib/types").DataSource | null;
            variables: _Input;
        }>;
        pageInfo: Writable<PageInfo>;
    };
    protected storeHandlers(store: Readable<FragmentPaginatedResult<_Data, unknown>>, setFetching: (val: boolean) => void): CursorHandlers<_Data, _Input>;
}
export declare class FragmentStoreForwardCursor<_Data extends GraphQLObject, _Input> extends FragmentStoreCursor<_Data, _Input> {
    get(initialValue: _Data | null): {
        loadNextPage: (args?: {
            first?: number | undefined;
            after?: string | undefined;
            fetch?: typeof fetch | undefined;
            metadata: {};
        } | undefined) => Promise<void>;
        kind: import("$houdini/runtime/lib/types").ArtifactKind;
        data: Writable<FragmentPaginatedResult<_Data, {
            pageInfo: PageInfo;
        }>>;
        subscribe: (run: Subscriber<FragmentPaginatedResult<_Data, {
            pageInfo: PageInfo;
        }>>, invalidate?: ((value?: FragmentPaginatedResult<_Data, {
            pageInfo: PageInfo;
        }> | undefined) => void) | undefined) => () => void;
        loading: Readable<boolean>;
        fetch: (args?: import("../query").QueryStoreFetchParams<_Data, _Input> | undefined) => Promise<{
            data: _Data | null;
            errors: {
                message: string;
            }[] | null;
            fetching: boolean;
            partial: boolean;
            source: import("$houdini/runtime/lib/types").DataSource | null;
            variables: _Input;
        }>;
        pageInfo: Writable<PageInfo>;
    };
}
export declare class FragmentStoreBackwardCursor<_Data extends GraphQLObject, _Input> extends FragmentStoreCursor<_Data, _Input> {
    get(initialValue: _Data | null): {
        loadPreviousPage: (args?: {
            last?: number | undefined;
            before?: string | undefined;
            fetch?: typeof fetch | undefined;
            metadata?: {} | undefined;
        } | undefined) => Promise<void>;
        kind: import("$houdini/runtime/lib/types").ArtifactKind;
        data: Writable<FragmentPaginatedResult<_Data, {
            pageInfo: PageInfo;
        }>>;
        subscribe: (run: Subscriber<FragmentPaginatedResult<_Data, {
            pageInfo: PageInfo;
        }>>, invalidate?: ((value?: FragmentPaginatedResult<_Data, {
            pageInfo: PageInfo;
        }> | undefined) => void) | undefined) => () => void;
        loading: Readable<boolean>;
        fetch: (args?: import("../query").QueryStoreFetchParams<_Data, _Input> | undefined) => Promise<{
            data: _Data | null;
            errors: {
                message: string;
            }[] | null;
            fetching: boolean;
            partial: boolean;
            source: import("$houdini/runtime/lib/types").DataSource | null;
            variables: _Input;
        }>;
        pageInfo: Writable<PageInfo>;
    };
}
export declare class FragmentStoreOffset<_Data extends GraphQLObject, _Input> extends BasePaginatedFragmentStore<_Data, _Input> {
    get(initialValue: _Data | null): {
        kind: import("$houdini/runtime/lib/types").ArtifactKind;
        fetch: (args?: import("../query").QueryStoreFetchParams<_Data, _Input> | undefined) => Promise<{
            data: _Data | null;
            errors: {
                message: string;
            }[] | null;
            fetching: boolean;
            partial: boolean;
            source: import("$houdini/runtime/lib/types").DataSource | null;
            variables: _Input;
        }>;
        loadNextPage: ({ limit, offset, fetch, metadata, }?: {
            limit?: number | undefined;
            offset?: number | undefined;
            fetch?: typeof fetch | undefined;
            metadata?: {} | undefined;
        }) => Promise<void>;
        set(this: void, value: {
            data: _Data | null;
            fetching: boolean;
        }): void;
        update(this: void, updater: import("svelte/store").Updater<{
            data: _Data | null;
            fetching: boolean;
        }>): void;
        subscribe(this: void, run: Subscriber<{
            data: _Data | null;
            fetching: boolean;
        }>, invalidate?: ((value?: {
            data: _Data | null;
            fetching: boolean;
        } | undefined) => void) | undefined): import("svelte/store").Unsubscriber;
    };
}
export type FragmentStorePaginated<_Data extends GraphQLObject, _Input> = Readable<{
    data: _Data;
    fetching: boolean;
    pageInfo: PageInfo;
}> & {
    loadNextPage(pageCount?: number, after?: string | number, houdiniContext?: HoudiniFetchContext): Promise<void>;
    loadPreviousPage(pageCount?: number, before?: string, houdiniContext?: HoudiniFetchContext): Promise<void>;
};
export type FragmentPaginatedResult<_Data, _ExtraFields = {}> = {
    data: _Data | null;
    fetching: boolean;
} & _ExtraFields;
export {};
