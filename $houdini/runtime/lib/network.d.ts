import { LoadEvent, RequestEvent } from '@sveltejs/kit';
import type { ConfigFile } from './config';
import { CachePolicy, DataSource, GraphQLObject, MutationArtifact, QueryArtifact, SubscriptionArtifact } from './types';
declare const sessionKeyName = "__houdini__session__";
export declare class HoudiniClient {
    private fetchFn;
    socket: SubscriptionHandler | null | undefined;
    constructor(networkFn: RequestHandler<any>, subscriptionHandler?: SubscriptionHandler | null);
    sendRequest<_Data>(ctx: FetchContext, params: FetchParams): Promise<RequestPayloadMagic<_Data>>;
    setSession(event: RequestEvent, session: App.Session): void;
}
export declare class Environment extends HoudiniClient {
    constructor(...args: ConstructorParameters<typeof HoudiniClient>);
}
export declare type SubscriptionHandler = {
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
export declare type FetchParams = {
    text: string;
    hash: string;
    variables: {
        [key: string]: any;
    };
};
export declare type FetchContext = {
    fetch: (info: RequestInfo, init?: RequestInit) => Promise<Response>;
    metadata?: App.Metadata | null;
    session: App.Session | null;
};
export declare type BeforeLoadArgs = LoadEvent;
export declare type AfterLoadArgs = {
    event: LoadEvent;
    input: Record<string, any>;
    data: Record<string, any>;
};
export declare type OnErrorArgs = {
    event: LoadEvent;
    input: Record<string, any>;
};
export declare type KitLoadResponse = {
    status?: number;
    error?: Error;
    redirect?: string;
    props?: Record<string, any>;
    context?: Record<string, any>;
    maxage?: number;
};
declare type GraphQLError = {
    message: string;
};
export declare type RequestPayloadMagic<_Data = any> = {
    ssr: boolean;
    body: RequestPayload<_Data>;
};
export declare type RequestPayload<_Data = any> = {
    data: _Data;
    errors: {
        message: string;
    }[];
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
export declare type RequestHandlerArgs = FetchContext & FetchParams & {
    session?: App.Session;
};
export declare type RequestHandler<_Data> = (args: RequestHandlerArgs) => Promise<RequestPayload<_Data>>;
export declare function executeQuery<_Data extends GraphQLObject, _Input extends {}>({ artifact, variables, session, cached, fetch, metadata, }: {
    artifact: QueryArtifact | MutationArtifact;
    variables: _Input;
    session: any;
    cached: boolean;
    config: ConfigFile;
    fetch?: typeof globalThis.fetch;
    metadata?: {};
}): Promise<{
    result: RequestPayload;
    partial: boolean;
}>;
export declare type FetchQueryResult<_Data> = {
    result: RequestPayload<_Data | null>;
    source: DataSource | null;
    partial: boolean;
};
export declare type QueryInputs<_Data> = FetchQueryResult<_Data> & {
    variables: {
        [key: string]: any;
    };
};
export declare function getCurrentClient(): Promise<HoudiniClient>;
export declare function fetchQuery<_Data extends GraphQLObject, _Input extends {}>({ artifact, variables, cached, policy, context, }: {
    context: FetchContext;
    artifact: QueryArtifact | MutationArtifact;
    variables: _Input;
    cached?: boolean;
    policy?: CachePolicy;
}): Promise<FetchQueryResult<_Data>>;
export declare class RequestContext {
    private loadEvent;
    continue: boolean;
    returnValue: {};
    constructor(ctx: LoadEvent);
    error(status: number, message: string | Error): any;
    redirect(status: number, location: string): any;
    fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
    graphqlErrors(payload: {
        errors?: GraphQLError[];
    }): any;
    invokeLoadHook({ variant, hookFn, input, data, error, }: {
        variant: 'before' | 'after' | 'error';
        hookFn: KitBeforeLoad | KitAfterLoad | KitOnError;
        input: Record<string, any>;
        data: Record<string, any>;
        error: unknown;
    }): Promise<void>;
    computeInput({ variableFunction, artifact, }: {
        variableFunction: KitBeforeLoad;
        artifact: QueryArtifact | MutationArtifact | SubscriptionArtifact;
    }): Promise<{} | null | undefined>;
}
declare type KitBeforeLoad = (ctx: BeforeLoadArgs) => Record<string, any> | Promise<Record<string, any>>;
declare type KitAfterLoad = (ctx: AfterLoadArgs) => Record<string, any>;
declare type KitOnError = (ctx: OnErrorArgs) => Record<string, any>;
export declare function extractSession(val: {
    [sessionKeyName]: App.Session;
}): App.Session;
export declare function buildSessionObject(event: RequestEvent): {
    __houdini__session__: App.Session;
};
export declare function setSession(val: App.Session): void;
export declare function getSession(event?: RequestEvent | LoadEvent): Promise<{} | App.Session>;
export {};
