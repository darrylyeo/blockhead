import type { ClientPluginContext } from '../documentStore';
export declare function subscription(factory: SubscriptionHandler): import("../documentStore").ClientPlugin;
export type SubscriptionHandler = (ctx: ClientPluginContext) => SubscriptionClient;
export type SubscriptionClient = {
    subscribe: (payload: {
        operationName?: string;
        query: string;
        variables?: Record<string, unknown> | null;
        extensions?: Record<'persistedQuery', string> | Record<string, unknown> | null;
    }, handlers: {
        next: (payload: {
            data?: {} | null;
            errors?: readonly {
                message: string;
            }[];
        }) => void;
        error: (data: {}) => void;
        complete: () => void;
    }) => () => void;
};
