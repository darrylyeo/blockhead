import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { Readable, Writable } from 'svelte/store';
import type { QueryArtifact } from '../lib';
import { FetchContext } from '../lib/network';
import { CachePolicy, DataSource, GraphQLObject } from '../lib/types';
import { SubscriptionSpec, HoudiniFetchContext } from '../lib/types';
import { BaseStore } from './store';
export declare class QueryStore<_Data extends GraphQLObject, _Input extends {}, _ExtraFields = {}> extends BaseStore {
    artifact: QueryArtifact;
    variables: boolean;
    kind: import("../lib").ArtifactKind;
    protected store: Writable<StoreState<_Data, _Input, _ExtraFields>>;
    protected lastVariables: _Input | null;
    protected subscriptionSpec: SubscriptionSpec | null;
    protected loadPending: boolean;
    protected subscriberCount: number;
    protected storeName: string;
    constructor({ artifact, storeName, variables }: StoreConfig<_Data, _Input, QueryArtifact>);
    /**
     * Fetch the data from the server
     */
    fetch(params?: RequestEventFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    fetch(params?: LoadEventFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    fetch(params?: ClientFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    fetch(params?: QueryStoreFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    get name(): string;
    protected currentVariables(): Promise<_Input>;
    subscribe(...args: Parameters<Readable<QueryResult<_Data, _Input, _ExtraFields>>['subscribe']>): () => void;
    private fetchAndCache;
    private refreshSubscription;
    protected setFetching(isFetching: boolean): void;
    private get initialState();
    extraFields(): _ExtraFields;
}
export declare type StoreConfig<_Data extends GraphQLObject, _Input, _Artifact> = {
    artifact: _Artifact;
    storeName: string;
    variables: boolean;
};
declare type StoreState<_Data, _Input, _Extra = {}> = QueryResult<_Data, _Input> & _Extra;
export declare function fetchParams<_Data extends GraphQLObject, _Input>(artifact: QueryArtifact, storeName: string, params?: QueryStoreFetchParams<_Data, _Input>): Promise<{
    context: FetchContext;
    policy: CachePolicy;
    params: QueryStoreFetchParams<_Data, _Input>;
}>;
declare type FetchGlobalParams<_Data extends GraphQLObject, _Input> = {
    variables?: _Input;
    /**
     * The policy to use when performing the fetch. If set to CachePolicy.NetworkOnly,
     * a request will always be sent, even if the variables are the same as the last call
     * to fetch.
     */
    policy?: CachePolicy;
    /**
     * An object that will be passed to the fetch function.
     * You can do what you want with it!
     */
    metadata?: App.Metadata;
    /**
     * Set to true if you want the promise to pause while it's resolving.
     * Only enable this if you know what you are doing. This will cause route
     * transitions to pause while loading data.
     */
    blocking?: boolean;
    /**
     * A function to call after the fetch happens (wether fake or not)
     */
    then?: (val: _Data | null) => void | Promise<void>;
};
export declare type LoadEventFetchParams<_Data extends GraphQLObject, _Input> = FetchGlobalParams<_Data, _Input> & {
    /**
     * Directly the `even` param coming from the `load` function
     */
    event?: LoadEvent;
};
export declare type RequestEventFetchParams<_Data extends GraphQLObject, _Input> = FetchGlobalParams<_Data, _Input> & {
    /**
     * A RequestEvent should be provided when the store is being used in an endpoint.
     * When this happens, fetch also needs to be provided
     */
    event?: RequestEvent;
    /**
     * The fetch function to use when using this store in an endpoint.
     */
    fetch?: LoadEvent['fetch'];
};
export declare type ClientFetchParams<_Data extends GraphQLObject, _Input> = FetchGlobalParams<_Data, _Input> & {
    /**
     * An object containing all of the current info necessary for a
     * client-side fetch. Must be called in component initialization with
     * something like this: `const context = getHoudiniFetchContext()`
     */
    context?: HoudiniFetchContext;
};
export declare type QueryStoreFetchParams<_Data extends GraphQLObject, _Input> = QueryStoreLoadParams<_Data, _Input> | ClientFetchParams<_Data, _Input>;
export declare type QueryStoreLoadParams<_Data extends GraphQLObject, _Input> = LoadEventFetchParams<_Data, _Input> | RequestEventFetchParams<_Data, _Input>;
export declare type QueryResult<_Data, _Input, _Extra = {}> = {
    data: _Data | null;
    errors: {
        message: string;
    }[] | null;
    isFetching: boolean;
    partial: boolean;
    source: DataSource | null;
    variables: _Input;
} & _Extra;
export {};
