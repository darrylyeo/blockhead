import { ConfigFile } from '../../lib/config';
import { GraphQLObject, QueryArtifact } from '../../lib/types';
import { QueryResult, QueryStoreFetchParams } from '../query';
import { FetchFn } from './fetch';
export declare function offsetHandlers<_Data extends GraphQLObject, _Input>({ artifact, queryVariables: extraVariables, fetch, getValue, setFetching, storeName, getConfig, }: {
    artifact: QueryArtifact;
    queryVariables: () => Promise<_Input | null>;
    fetch: FetchFn<_Data, _Input>;
    getValue: () => _Data | null;
    storeName: string;
    setFetching: (val: boolean) => void;
    getConfig: () => Promise<ConfigFile>;
}): {
    loadNextPage: ({ limit, offset, fetch, metadata, }?: {
        limit?: number | undefined;
        offset?: number | undefined;
        fetch?: typeof globalThis.fetch | undefined;
        metadata?: {} | undefined;
    }) => Promise<void>;
    fetch(args?: QueryStoreFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
};
export declare type OffsetHandlers<_Data extends GraphQLObject, _Input, _ReturnType> = {
    loadNextPage: (args?: {
        limit?: number;
        offset?: number;
        metadata?: {};
        fetch?: typeof globalThis.fetch;
    }) => Promise<void>;
    fetch(args?: QueryStoreFetchParams<_Data, _Input> | undefined): Promise<_ReturnType>;
};
