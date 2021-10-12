import { Readable } from 'svelte/store';
import type { Config } from 'houdini-common';
import { DataSource, GraphQLObject, MutationArtifact, QueryArtifact, SubscriptionArtifact } from './types';
export declare class Environment {
    private fetch;
    socket: SubscriptionHandler | null | undefined;
    constructor(networkFn: RequestHandler<any>, subscriptionHandler?: SubscriptionHandler | null);
    sendRequest<_Data>(ctx: FetchContext, params: FetchParams, session?: FetchSession): any;
}
export declare function setEnvironment(env: Environment): void;
export declare function getEnvironment(): Environment | null;
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
    page: {
        host: string;
        path: string;
        params: Record<string, string | string[]>;
        query: URLSearchParams;
    };
    fetch: (info: RequestInfo, init?: RequestInit) => Promise<Response>;
    session: any;
    context: Record<string, any>;
};
export declare type KitLoadResponse = {
    status?: number;
    error?: Error;
    redirect?: string;
    props?: Record<string, any>;
    context?: Record<string, any>;
    maxage?: number;
};
export declare type FetchSession = any;
declare type GraphQLError = {
    message: string;
};
export declare type RequestPayload<_Data = any> = {
    data: _Data;
    errors: {
        message: string;
    }[];
};
export declare type RequestHandler<_Data> = (this: FetchContext, params: FetchParams, session?: FetchSession) => Promise<RequestPayload<_Data>>;
export declare function executeQuery<_Data extends GraphQLObject, _Input>(artifact: QueryArtifact | MutationArtifact, variables: _Input, sessionStore: Readable<any>, cached: boolean): Promise<RequestPayload>;
export declare function convertKitPayload(context: RequestContext, loader: (ctx: FetchContext) => Promise<KitLoadResponse>, page: FetchContext['page'], session: FetchContext['session']): Promise<Record<string, any>>;
export declare function fetchQuery<_Data extends GraphQLObject>({ context, artifact, variables, session, cached, }: {
    context: FetchContext;
    artifact: QueryArtifact | MutationArtifact;
    variables: {};
    session?: FetchSession;
    cached?: boolean;
}): Promise<[RequestPayload<_Data | {} | null>, DataSource | null]>;
export declare class RequestContext {
    context: FetchContext;
    continue: boolean;
    returnValue: {};
    constructor(ctx: FetchContext);
    error(status: number, message: string | Error): void;
    redirect(status: number, location: string): void;
    fetch(input: RequestInfo, init?: RequestInit): any;
    graphqlErrors(payload: {
        errors?: GraphQLError[];
    }): void;
    onLoadHook({ mode, onLoadFunction, }: {
        mode: 'kit' | 'sapper';
        onLoadFunction: SapperLoad | KitLoad;
    }): Promise<void>;
    computeInput({ config, mode, variableFunction, artifact, }: {
        mode: 'kit' | 'sapper';
        variableFunction: SapperLoad | KitLoad;
        artifact: QueryArtifact | MutationArtifact | SubscriptionArtifact;
        config: Config;
    }): {};
}
declare type SapperLoad = (page: FetchContext['page'], session: FetchContext['session']) => Record<string, any>;
declare type KitLoad = (ctx: FetchContext) => Record<string, any>;
export {};
