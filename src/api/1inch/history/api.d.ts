/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/v2.0/history/{address}/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns history events for address */
        get: operations["V2RestApiController_getHistoryEventsByAddress"];
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
        TokenActionDto: {
            /** @example 0xc944e90c64b2c07662a292be6244bdf05cda44a7 */
            address: string;
            /** @example ERC20 */
            standard: string;
            /** @example 0x266e77ce9034a023056ea2845cb6a20517f6fdb7 */
            fromAddress: string;
            /** @example 0x03f7724180aa6b939894b5ca4314783b0b36b329 */
            toAddress: string;
            /** @example 0x03f7724180aa6b939894b5ca4314783b0b36b329 */
            tokenId?: Record<string, never>;
            /** @example 291000000000 */
            amount?: Record<string, never>;
            /**
             * @example Out
             * @enum {string}
             */
            direction: "In" | "Out" | "Self" | "On";
        };
        TransactionDetailsMetaDto: {
            /** @example true */
            is1inchFusionSwap?: Record<string, never>;
            /** @example 2 */
            orderFillPercentage?: Record<string, never>;
            /** @example usd.eth */
            ensDomainName?: Record<string, never>;
            /** @example 56 */
            fromChainId?: Record<string, never>;
            /** @example 1 */
            toChainId?: Record<string, never>;
            /** @example 0x34391448368ae60aa7dc12dc309c4ef674a06d7f */
            safeAddress?: Record<string, never>;
            /** @example Gnosis */
            protocol?: Record<string, never>;
        };
        TransactionDetailsDto: {
            /** @example 2 */
            orderInBlock: number;
            /** @example 0xdd87fbd093714d493ba53c000e4222b500e622500eeceaae9d4c4c5111ffbbfc */
            txHash: string;
            /**
             * @example 1
             * @enum {integer}
             */
            chainId: 1 | 45 | 137 | 10 | 56 | 42161 | 43114 | 100 | 250 | 1313161554 | 8217 | 324 | 8453;
            /** @example 18182982 */
            blockNumber: number;
            /** @example 1695283931 */
            blockTimeSec: number;
            /** @example Completed */
            status: string;
            /**
             * @example Transfer
             * @enum {string}
             */
            type: "Approve" | "Wrap" | "Unwrap" | "Transfer" | "SwapExactInput" | "SwapExactOutput" | "LimitOrderFill" | "LimitOrderCancel" | "LimitOrderCancelAll" | "Multicall" | "AddLiquidity" | "RemoveLiquidity" | "Borrow" | "Repay" | "Stake" | "Unstake" | "Vote" | "DelegateVotePower" | "UnDelegateVotePower" | "DiscardVote" | "DeployPool" | "Claim" | "AbiDecoded" | "TraceDecoded" | "Action" | "Bridge" | "BuyNft" | "BidNft" | "OfferSellNft" | "Burn" | "WrappedTx" | "RegisterENSDomain" | "Revoke" | "CreateSafe" | "AddOwner";
            tokenActions: components["schemas"]["TokenActionDto"][];
            /** @example 0x266e77ce9034a023056ea2845cb6a20517f6fdb7 */
            fromAddress: string;
            /** @example 0xc944e90c64b2c07662a292be6244bdf05cda44a7 */
            toAddress: string;
            /** @example 5 */
            nonce: number;
            /** @example 378906276289230 */
            feeInWei: string;
            meta?: components["schemas"]["TransactionDetailsMetaDto"];
        };
        HistoryEventDto: {
            /** @example 7279741913753607 */
            id: string;
            /** @example 0x266E77cE9034a023056ea2845CB6A20517F6FDB7 */
            address: string;
            /**
             * @example Transaction
             * @enum {string}
             */
            type: "Transaction" | "LimitOrder" | "FusionSwap";
            /**
             * @example Reliable
             * @enum {string}
             */
            rating: "Reliable" | "Scam";
            /** @example 1694754179096 */
            timeMs: number;
            details: components["schemas"]["TransactionDetailsDto"];
        };
        HistoryResponseDto: {
            items: components["schemas"]["HistoryEventDto"][];
            cache_counter: number;
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
    V2RestApiController_getHistoryEventsByAddress: {
        parameters: {
            query?: {
                /**
                 * @description Amount of events to return, default is 100, max is 10000
                 * @example 100
                 */
                limit?: number;
                /** @description Token address used at event */
                tokenAddress?: string;
                /**
                 * @description chainId
                 * @example 1
                 */
                chainId?: number;
                /**
                 * @description To time at milliseconds
                 * @example 1695283931212
                 */
                toTimestampMs?: number;
                /**
                 * @description From time at milliseconds
                 * @example 1694754179096
                 */
                fromTimestampMs?: number;
            };
            header?: never;
            path: {
                /**
                 * @description Account address
                 * @example 0x266E77cE9034a023056ea2845CB6A20517F6FDB7
                 */
                address: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HistoryResponseDto"][];
                };
            };
            /** @description Bad Request. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error. */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}