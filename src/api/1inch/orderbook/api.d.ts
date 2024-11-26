/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/v3.0/1": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Include a limit order to the 1inch limit orders database
         * @description You can send your limit orders to the 1inch database and then your order will participate in the 1inch aggregation protocol.
         */
        post: operations["LimitOrderV3SubscribedApiController_createLimitOrder"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v3.0/1/address/{address}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get limit orders belonging to the specified address */
        get: operations["LimitOrderV3SubscribedApiController_getLimitOrder"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v3.0/1/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get all limit orders */
        get: operations["LimitOrderV3SubscribedApiController_getAllLimitOrders"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v3.0/1/count": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["LimitOrderV3SubscribedApiController_getAllOrdersCount"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v3.0/1/events/{orderHash}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["LimitOrderV3SubscribedApiController_getEventsOrderHash"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v3.0/1/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["LimitOrderV3SubscribedApiController_getEvents"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v3.0/1/has-active-orders-with-permit/{walletAddress}/{token}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["LimitOrderV3SubscribedApiController_hasActiveOrders"];
        put?: never;
        post?: never;
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
        LimitOrderV3Data: {
            /** @description Address of the maker asset */
            makerAsset: string;
            /** @description Address of the taker asset */
            takerAsset: string;
            /** @description An address of the maker (wallet or contract address) */
            maker: string;
            /**
             * @description An address of the wallet or contract who will be able to fill this order (equals to Zero address on public orders)
             * @default 0x0000000000000000000000000000000000000000
             */
            allowedSender: string;
            /**
             * @description An address of the wallet or contract who will receive filled amount (equals to Zero address for receiver == makerAddress)
             * @default 0x0000000000000000000000000000000000000000
             */
            receiver: string;
            /** @description Order maker's token amount */
            makingAmount: string;
            /** @description Order taker's token amount */
            takingAmount: string;
            /** @description Some unique value. It is necessary to be able to create limit orders with the same parameters (so that they have a different hash) */
            salt: string;
            /**
             * @description An interaction call data. ABI encoded set of makerAssetData, takerAssetData, getMakingAmount, getTakingAmount, predicate, permit, preInteraction, postInteraction
             * @default 0x
             */
            offsets: string;
            /**
             * @description Merged offsets of each field in interactions
             * @default 0
             */
            interactions: string;
        };
        LimitOrderV3Request: {
            /** @description Hash of the limit order typed data */
            orderHash: string;
            /** @description Signature of the limit order typed data (using signTypedData_v4) */
            signature: string;
            data: components["schemas"]["LimitOrderV3Data"];
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
    LimitOrderV3SubscribedApiController_createLimitOrder: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LimitOrderV3Request"];
            };
        };
        responses: {
            /** @description The limit order has been successfully saved */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Input data is invalid */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Max valid orders per user: 100. Cancel previous orders to create new ones */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    LimitOrderV3SubscribedApiController_getLimitOrder: {
        parameters: {
            query?: {
                /**
                 * @description Pagination step, default: 1 (page = offset / limit)
                 * @example 1
                 */
                page?: number;
                /**
                 * @description Number of limit orders to receive (default: 100, max: 500)
                 * @example 100
                 */
                limit?: number;
                /**
                 * @description JSON an array of statuses by which limit orders will be filtered: 1 - valid limit orders, 2 - temporary invalid limit orders, 3 - invalid limit orders
                 * @example [1,2,3]
                 */
                statuses?: number[];
                sortBy?: "createDateTime" | "takerRate" | "makerRate" | "makerAmount" | "takerAmount";
                /** @description Address of the taker asset */
                takerAsset?: string;
                /** @description Address of the maker asset */
                makerAsset?: string;
            };
            header?: never;
            path: {
                /**
                 * @description Address of limit orders creator
                 * @example 0x0000000000000000000000000000000000000000
                 */
                address: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of queried limit orders */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Input data is invalid or address is not provided */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    LimitOrderV3SubscribedApiController_getAllLimitOrders: {
        parameters: {
            query?: {
                /**
                 * @description Pagination step, default: 1 (page = offset / limit)
                 * @example 1
                 */
                page?: number;
                /**
                 * @description Number of limit orders to receive (default: 100, max: 500)
                 * @example 100
                 */
                limit?: number;
                /**
                 * @description JSON an array of statuses by which limit orders will be filtered: 1 - valid limit orders, 2 - temporary invalid limit orders, 3 - invalid limit orders
                 * @example [1,2,3]
                 */
                statuses?: number[];
                sortBy?: "createDateTime" | "takerRate" | "makerRate" | "makerAmount" | "takerAmount";
                /** @description Address of the maker asset */
                takerAsset?: string;
                /** @description Address of the maker asset */
                makerAsset?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of queried limit orders */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Input data is invalid */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    LimitOrderV3SubscribedApiController_getAllOrdersCount: {
        parameters: {
            query: {
                statuses: string[];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    LimitOrderV3SubscribedApiController_getEventsOrderHash: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                orderHash: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    LimitOrderV3SubscribedApiController_getEvents: {
        parameters: {
            query: {
                limit: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    LimitOrderV3SubscribedApiController_hasActiveOrders: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                walletAddress: string;
                token: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}