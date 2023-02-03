import { ConfigFile } from '$houdini/runtime/lib/config';
import { GraphQLObject, QueryArtifact, QueryResult } from '$houdini/runtime/lib/types';
import { Writable } from 'svelte/store';
import { QueryStoreFetchParams } from '../query';
import { FetchFn } from './fetch';
import { PageInfo } from './pageInfo';
export declare function cursorHandlers<_Data extends GraphQLObject, _Input>({ artifact, queryVariables: extraVariables, setFetching, fetch, storeName, getValue, getConfig, }: {
    artifact: QueryArtifact;
    getValue: () => _Data | null;
    queryVariables: () => Promise<_Input | null>;
    setFetching: (val: boolean) => void;
    fetch: FetchFn<_Data, _Input>;
    storeName: string;
    getConfig: () => Promise<ConfigFile>;
}): CursorHandlers<_Data, _Input>;
export type CursorHandlers<_Data extends GraphQLObject, _Input> = {
    loadNextPage: (args?: {
        first?: number;
        after?: string;
        fetch?: typeof globalThis.fetch;
        metadata: {};
    }) => Promise<void>;
    loadPreviousPage: (args?: {
        last?: number;
        before?: string;
        fetch?: typeof globalThis.fetch;
        metadata?: {};
    }) => Promise<void>;
    pageInfo: Writable<PageInfo>;
    fetch(args?: QueryStoreFetchParams<_Data, _Input> | undefined): Promise<QueryResult<_Data, _Input>>;
};
