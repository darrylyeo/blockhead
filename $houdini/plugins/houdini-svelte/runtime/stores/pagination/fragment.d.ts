import type { DocumentStore } from '$houdini/runtime/client';
import type { FragmentArtifact, GraphQLObject, HoudiniFetchContext, QueryArtifact, PageInfo, CursorHandlers, GraphQLVariables } from '$houdini/runtime/lib/types';
import type { Readable, Subscriber } from 'svelte/store';
import type { OffsetFragmentStoreInstance } from '../../types';
import type { StoreConfig } from '../query';
type FragmentStoreConfig<_Data extends GraphQLObject, _Input> = StoreConfig<_Data, _Input, FragmentArtifact> & {
    paginationArtifact: QueryArtifact;
};
declare class BasePaginatedFragmentStore<_Data extends GraphQLObject, _Input> {
    paginated: boolean;
    protected paginationArtifact: QueryArtifact;
    name: string;
    kind: "HoudiniFragment";
    artifact: FragmentArtifact;
    constructor(config: FragmentStoreConfig<_Data, _Input>);
    protected queryVariables(getState: () => _Data | null): _Input;
}
export declare class FragmentStoreCursor<_Data extends GraphQLObject, _Input extends GraphQLVariables> extends BasePaginatedFragmentStore<_Data, _Input> {
    get(initialValue: _Data | null): {
        kind: "HoudiniFragment";
        subscribe: (run: Subscriber<FragmentPaginatedResult<_Data, {
            pageInfo: PageInfo;
        }>>, invalidate?: ((value?: FragmentPaginatedResult<_Data, {
            pageInfo: PageInfo;
        }> | undefined) => void) | undefined) => (() => void);
        fetch: (args?: import("$houdini/runtime/lib/types").FetchParams<_Input> | undefined) => Promise<import("$houdini/runtime/lib/types").QueryResult<_Data, _Input>>;
        loadNextPage: (args?: {
            first?: number | undefined;
            after?: string | undefined;
            fetch?: typeof fetch | undefined;
            metadata?: {} | undefined;
        } | undefined) => Promise<void>;
        loadPreviousPage: (args?: {
            last?: number | undefined;
            before?: string | undefined;
            fetch?: typeof fetch | undefined;
            metadata?: {} | undefined;
        } | undefined) => Promise<void>;
    };
    protected storeHandlers(observer: DocumentStore<_Data, _Input>, initialValue: _Data | null, getState: () => _Data | null, getVariables: () => NonNullable<_Input>): CursorHandlers<_Data, _Input>;
}
export declare class FragmentStoreOffset<_Data extends GraphQLObject, _Input extends GraphQLVariables> extends BasePaginatedFragmentStore<_Data, _Input> {
    get(initialValue: _Data | null): OffsetFragmentStoreInstance<_Data, _Input>;
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
