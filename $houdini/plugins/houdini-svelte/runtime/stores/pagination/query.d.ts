import { GraphQLObject, QueryArtifact, QueryResult } from '$houdini/runtime/lib/types';
import { Subscriber } from 'svelte/store';
import { ClientFetchParams, LoadEventFetchParams, QueryStore, QueryStoreFetchParams, RequestEventFetchParams, StoreConfig } from '../query';
import { CursorHandlers } from './cursor';
import { OffsetHandlers } from './offset';
import { PageInfo } from './pageInfo';
declare class CursorPaginatedStore<_Data extends GraphQLObject, _Input extends {}> extends QueryStore<_Data, _Input, {
    pageInfo: PageInfo;
}> {
    paginated: boolean;
    protected handlers: CursorHandlers<_Data, _Input>;
    constructor(config: StoreConfig<_Data, _Input, QueryArtifact>);
    fetch(params?: RequestEventFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    fetch(params?: LoadEventFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    fetch(params?: ClientFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    fetch(params?: QueryStoreFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    extraFields(): {
        pageInfo: PageInfo;
    };
    subscribe(run: Subscriber<QueryResult<_Data, _Input, {
        pageInfo: PageInfo;
    }>>, invalidate?: ((value?: QueryResult<_Data, _Input, {
        pageInfo: PageInfo;
    }> | undefined) => void) | undefined): () => void;
}
export declare class QueryStoreForwardCursor<_Data extends GraphQLObject, _Input extends {}> extends CursorPaginatedStore<_Data, _Input> {
    loadNextPage(args?: Parameters<CursorHandlers<_Data, _Input>['loadNextPage']>[0]): Promise<void>;
}
export declare class QueryStoreBackwardCursor<_Data extends GraphQLObject, _Input extends {}> extends CursorPaginatedStore<_Data, _Input> {
    loadPreviousPage(args?: Parameters<Required<CursorHandlers<_Data, _Input>>['loadPreviousPage']>[0]): Promise<void>;
}
export declare class QueryStoreOffset<_Data extends GraphQLObject, _Input extends {}> extends QueryStore<_Data, _Input> {
    paginated: boolean;
    protected handlers: OffsetHandlers<_Data, _Input, QueryResult<_Data, _Input>>;
    constructor(config: StoreConfig<_Data, _Input, QueryArtifact>);
    loadNextPage(args?: Parameters<OffsetHandlers<_Data, _Input, QueryResult<_Data, _Input>>['loadNextPage']>[0]): Promise<void>;
    fetch(params?: RequestEventFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    fetch(params?: LoadEventFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    fetch(params?: ClientFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    fetch(params?: QueryStoreFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
}
export {};
