/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/v1.1/1/broadcast": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Broadcast public transaction
         * @description Takes the raw transaction data as input and returns the transaction hash
         */
        post: operations["TxProcessorApiController_broadcastTransaction"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1.1/1/flashbots": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Broadcast private transaction
         * @description Takes the raw transaction data as input and broadcasts it privately, only available for Ethereum network
         */
        post: operations["TxProcessorApiController_broadcastFlashbotsTransaction"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        BroadcastRequest: {
            /**
             * @description The raw transaction data
             * @example 0xf86...
             */
            rawTransaction: string;
        };
        BroadcastResponse: {
            /**
             * @description The transaction hash
             * @example 0x123...
             */
            transactionHash: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    TxProcessorApiController_broadcastTransaction: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BroadcastRequest"];
            };
        };
        responses: {
            /** @description The transaction was successfully broadcasted */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BroadcastResponse"];
                };
            };
            /** @description The provided input data is invalid */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    TxProcessorApiController_broadcastFlashbotsTransaction: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description The raw transaction data */
        requestBody: {
            content: {
                "application/json": components["schemas"]["BroadcastRequest"];
            };
        };
        responses: {
            /** @description The transaction was successfully broadcasted */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BroadcastResponse"];
                };
            };
            /** @description The provided input data is invalid */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
