import type { HoudiniClient } from '.';
import type { Cache } from '../cache/cache';
import type { Layer } from '../cache/storage';
import type { ConfigFile } from '../lib/config';
import { Writable } from '../lib/store';
import type { DocumentArtifact, QueryResult, GraphQLObject, SubscriptionSpec, CachePolicies, GraphQLVariables } from '../lib/types';
export declare class DocumentStore<_Data extends GraphQLObject, _Input extends GraphQLVariables> extends Writable<QueryResult<_Data, _Input>> {
    #private;
    readonly artifact: DocumentArtifact;
    pendingPromise: {
        then: (val: any) => void;
    } | null;
    serverSideFallback?: boolean;
    constructor({ artifact, plugins, pipeline, client, cache, enableCache, initialValue, initialVariables, fetching, }: {
        artifact: DocumentArtifact;
        plugins?: ClientHooks[];
        pipeline?: ClientHooks[];
        client: HoudiniClient | null;
        cache?: Cache;
        enableCache?: boolean;
        initialValue?: _Data | null;
        fetching?: boolean;
        serverSideFallback?: boolean;
        initialVariables?: _Input;
    });
    send({ metadata, session, fetch, variables, policy, stuff, cacheParams, setup, silenceEcho, }?: SendParams): Promise<QueryResult<_Data, _Input>>;
    cleanup(): Promise<void>;
}
declare function marshalVariables<_Data extends GraphQLObject, _Input extends GraphQLVariables>(ctx: ClientPluginContext): Record<string, any>;
export type ClientPlugin = () => ClientHooks | null | (ClientHooks | ClientPlugin | null)[];
export type ClientHooks = {
    start?: ClientPluginEnterPhase;
    beforeNetwork?: ClientPluginEnterPhase;
    network?: ClientPluginEnterPhase;
    afterNetwork?: ClientPluginExitPhase;
    end?: ClientPluginExitPhase;
    cleanup?(ctx: ClientPluginContext): void | Promise<void>;
    catch?(ctx: ClientPluginContext, args: ClientPluginErrorHandlers): void | Promise<void>;
};
export type Fetch = typeof globalThis.fetch;
export type ClientPluginContext = {
    config: ConfigFile;
    name: string;
    text: string;
    hash: string;
    artifact: DocumentArtifact;
    policy?: CachePolicies;
    fetch?: Fetch;
    variables?: Record<string, any> | null;
    metadata?: App.Metadata | null;
    session?: App.Session | null;
    fetchParams?: RequestInit;
    cacheParams?: {
        layer?: Layer;
        notifySubscribers?: SubscriptionSpec[];
        forceNotify?: boolean;
        disableWrite?: boolean;
        disableRead?: boolean;
        disableSubscriptions?: boolean;
        applyUpdates?: string[];
        serverSideFallback?: boolean;
    };
    stuff: App.Stuff;
};
type ClientPluginPhase<Handlers> = (ctx: ClientPluginContext, handlers: Handlers) => void | Promise<void>;
export type ClientPluginEnterPhase = ClientPluginPhase<ClientPluginEnterHandlers>;
export type ClientPluginExitPhase = ClientPluginPhase<ClientPluginExitHandlers>;
export type ClientPluginEnterHandlers = {
    initialValue: QueryResult;
    /** A reference to the houdini client to access any configuration values */
    client: HoudiniClient;
    /** Move onto the next step using the provided context.  */
    next(ctx: ClientPluginContext): void;
    /** Terminate the current chain  */
    resolve(ctx: ClientPluginContext, data: QueryResult): void;
    /** Update the stores state without resolving the promise */
    updateState(updater: (old: QueryResult) => QueryResult): void;
    /** Return true if the variables have changed */
    variablesChanged: (ctx: ClientPluginContext) => boolean;
    /** Returns the marshaled variables for the operation */
    marshalVariables: typeof marshalVariables;
};
/** Exit handlers are the same as enter handles but don't need to resolve with a specific value */
export type ClientPluginExitHandlers = Omit<ClientPluginEnterHandlers, 'resolve'> & {
    resolve: (ctx: ClientPluginContext, data?: QueryResult) => void;
    value: QueryResult;
};
/** Exit handlers are the same as enter handles but don't need to resolve with a specific value */
export type ClientPluginErrorHandlers = ClientPluginEnterHandlers & {
    error: unknown;
};
export type SendParams = {
    fetch?: Fetch;
    variables?: Record<string, any> | null;
    metadata?: App.Metadata | null;
    session?: App.Session | null;
    policy?: CachePolicies;
    stuff?: Partial<App.Stuff>;
    cacheParams?: ClientPluginContext['cacheParams'];
    setup?: boolean;
    silenceEcho?: boolean;
};
export {};
