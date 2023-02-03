/// <reference path="../../../../../houdini.d.ts" />
import type { ConfigFile } from './config';
import { CachePolicy, GraphQLObject, MutationArtifact, QueryArtifact, FetchQueryResult, RequestPayload, RequestPayloadMagic } from './types';
export declare class HoudiniClient {
    private fetchFn;
    socket: SubscriptionHandler | null | undefined;
    constructor(requestHandler: RequestHandler<any>, subscriptionHandler?: SubscriptionHandler | null);
    handleMultipart(params: FetchParams, args: Parameters<FetchContext['fetch']>): Parameters<FetchContext['fetch']> | undefined;
    sendRequest<_Data>(ctx: FetchContext, params: FetchParams): Promise<RequestPayloadMagic<_Data>>;
}
export declare class Environment extends HoudiniClient {
    constructor(...args: ConstructorParameters<typeof HoudiniClient>);
}
export type SubscriptionHandler = {
    subscribe: (payload: {
        query: string;
        variables?: {};
    }, handlers: {
        next: (payload: {
            data?: {};
            errors?: readonly {
                message: string;
            }[];
        }) => void;
        error: (data: {}) => void;
        complete: () => void;
    }) => () => void;
};
export type FetchParams = {
    text: string;
    hash: string;
    variables: {
        [key: string]: any;
    };
};
export type FetchContext = {
    fetch: typeof window.fetch;
    metadata?: App.Metadata | null;
    session: App.Session | null;
};
/**
 * ## Tip 👇
 *
 * To define types for your metadata, create a file `src/app.d.ts` containing the followingI:
 *
 * ```ts
 * declare namespace App { *
 * 	interface Metadata {}
 * }
 * ```
 *
 */
export type RequestHandlerArgs = FetchContext & FetchParams & {
    session?: App.Session;
};
export type RequestHandler<_Data = any> = (args: RequestHandlerArgs) => Promise<RequestPayload<_Data>>;
export declare function executeQuery<_Data extends GraphQLObject, _Input extends {}>({ client, artifact, variables, session, setFetching, cached, fetch, metadata, }: {
    client: HoudiniClient;
    artifact: QueryArtifact | MutationArtifact;
    variables: _Input;
    session: any;
    setFetching: (fetching: boolean) => void;
    cached: boolean;
    config: ConfigFile;
    fetch?: typeof globalThis.fetch;
    metadata?: {};
}): Promise<{
    result: RequestPayload;
    partial: boolean;
}>;
export declare function fetchQuery<_Data extends GraphQLObject, _Input extends {}>({ client, context, artifact, variables, setFetching, cached, policy, }: {
    client: HoudiniClient;
    context: FetchContext;
    artifact: QueryArtifact | MutationArtifact;
    variables: _Input;
    setFetching: (fetching: boolean) => void;
    cached?: boolean;
    policy?: CachePolicy;
}): Promise<FetchQueryResult<_Data>>;
