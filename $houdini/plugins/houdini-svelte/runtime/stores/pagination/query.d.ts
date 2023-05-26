import type { GraphQLObject, QueryArtifact, QueryResult, CursorHandlers, OffsetHandlers, PageInfo, GraphQLVariables } from '$houdini/runtime/lib/types';
import type { Subscriber } from 'svelte/store';
import type { ClientFetchParams, LoadEventFetchParams, QueryStoreFetchParams, RequestEventFetchParams } from '../../types';
import type { StoreConfig } from '../query';
import { QueryStore } from '../query';
export type CursorStoreResult<_Data extends GraphQLObject, _Input extends GraphQLVariables> = QueryResult<_Data, _Input> & {
    pageInfo: PageInfo;
};
export declare class QueryStoreCursor<_Data extends GraphQLObject, _Input extends GraphQLVariables> extends QueryStore<_Data, _Input> {
    #private;
    paginated: boolean;
    constructor(config: StoreConfig<_Data, _Input, QueryArtifact>);
    fetch(params?: RequestEventFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    fetch(params?: LoadEventFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    fetch(params?: ClientFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    fetch(params?: QueryStoreFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    loadPreviousPage(args?: Parameters<Required<CursorHandlers<_Data, _Input>>['loadPreviousPage']>[0]): Promise<void>;
    loadNextPage(args?: Parameters<CursorHandlers<_Data, _Input>['loadNextPage']>[0]): Promise<void>;
    subscribe(run: Subscriber<CursorStoreResult<_Data, _Input>>, invalidate?: ((value?: CursorStoreResult<_Data, _Input> | undefined) => void) | undefined): () => void;
}
export declare class QueryStoreOffset<_Data extends GraphQLObject, _Input extends GraphQLVariables> extends QueryStore<_Data, _Input> {
    #private;
    paginated: boolean;
    loadNextPage(args?: Parameters<OffsetHandlers<_Data, _Input>['loadNextPage']>[0]): Promise<void>;
    fetch(params?: RequestEventFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    fetch(params?: LoadEventFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    fetch(params?: ClientFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    fetch(params?: QueryStoreFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
}
