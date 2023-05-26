import type { SendParams } from '../client/documentStore';
import type { CursorHandlers, FetchFn, GraphQLObject, GraphQLVariables, QueryArtifact, QueryResult, FetchParams } from './types';
export declare function cursorHandlers<_Data extends GraphQLObject, _Input extends GraphQLVariables>({ artifact, fetchUpdate: parentFetchUpdate, fetch: parentFetch, getState, getVariables, getSession, }: {
    artifact: QueryArtifact;
    getState: () => _Data | null;
    getVariables: () => NonNullable<_Input>;
    getSession: () => Promise<App.Session>;
    fetch: FetchFn<_Data, _Input>;
    fetchUpdate: (arg: SendParams, updates: string[]) => ReturnType<FetchFn<_Data, _Input>>;
}): CursorHandlers<_Data, _Input>;
export declare function offsetHandlers<_Data extends GraphQLObject, _Input extends GraphQLVariables>({ artifact, storeName, getState, getVariables, fetch: parentFetch, fetchUpdate: parentFetchUpdate, getSession, }: {
    artifact: QueryArtifact;
    fetch: FetchFn<_Data, _Input>;
    fetchUpdate: (arg: SendParams) => ReturnType<FetchFn<_Data, _Input>>;
    storeName: string;
    getState: () => _Data | null;
    getVariables: () => _Input;
    getSession: () => Promise<App.Session>;
}): {
    loadNextPage: ({ limit, offset, fetch, metadata, }?: {
        limit?: number | undefined;
        offset?: number | undefined;
        fetch?: typeof fetch | undefined;
        metadata?: {} | undefined;
    }) => Promise<void>;
    fetch(params?: FetchParams<_Input>): Promise<QueryResult<_Data, _Input>>;
};
