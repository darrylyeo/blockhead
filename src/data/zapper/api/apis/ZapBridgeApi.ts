/* tslint:disable */
/* eslint-disable */
/**
 * Zapper API
 * The Zapper API provides some of the most robust Defi related data, everything from liquidity and prices on different AMMs to complex Defi protocol balances all in one convenient place. In addition, the API also supports bridging between different networks as well as formatted Zap transaction endpoints. <br/><br/><br/> *Enter in our public API key in the Authorize section below to test the endpoints directly in swagger: **96e0cc51-a62e-42ca-acee-910ea7d2a241**
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    Transaction,
    TransactionFromJSON,
    TransactionToJSON,
} from '../models';

export interface ZapBridgeControllerGetZapInApprovalStateRequest {
    destinationNetwork: ZapBridgeControllerGetZapInApprovalStateDestinationNetworkEnum;
    ownerAddress: string;
    sellAmount: string;
    sellTokenAddress: string;
    buyTokenAddress: string;
    gasPrice: string;
    slippagePercentage: number;
    network?: ZapBridgeControllerGetZapInApprovalStateNetworkEnum;
    affiliateAddress?: string;
}

export interface ZapBridgeControllerGetZapInApprovalTransactionRequest {
    destinationNetwork: ZapBridgeControllerGetZapInApprovalTransactionDestinationNetworkEnum;
    ownerAddress: string;
    sellAmount: string;
    sellTokenAddress: string;
    buyTokenAddress: string;
    gasPrice: string;
    slippagePercentage: number;
    network?: ZapBridgeControllerGetZapInApprovalTransactionNetworkEnum;
    affiliateAddress?: string;
}

export interface ZapBridgeControllerGetZapInSupportedTokensRequest {
    destinationNetwork: ZapBridgeControllerGetZapInSupportedTokensDestinationNetworkEnum;
    network?: ZapBridgeControllerGetZapInSupportedTokensNetworkEnum;
}

export interface ZapBridgeControllerGetZapInTransactionRequest {
    destinationNetwork: ZapBridgeControllerGetZapInTransactionDestinationNetworkEnum;
    ownerAddress: string;
    sellAmount: string;
    sellTokenAddress: string;
    buyTokenAddress: string;
    gasPrice: string;
    slippagePercentage: number;
    network?: ZapBridgeControllerGetZapInTransactionNetworkEnum;
    affiliateAddress?: string;
}

/**
 * 
 */
export class ZapBridgeApi extends runtime.BaseAPI {

    /**
     * Retrieves an ERC20 approval state for a zap bridge into a network
     * Bridge Approval State
     */
    async zapBridgeControllerGetZapInApprovalStateRaw(requestParameters: ZapBridgeControllerGetZapInApprovalStateRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.destinationNetwork === null || requestParameters.destinationNetwork === undefined) {
            throw new runtime.RequiredError('destinationNetwork','Required parameter requestParameters.destinationNetwork was null or undefined when calling zapBridgeControllerGetZapInApprovalState.');
        }

        if (requestParameters.ownerAddress === null || requestParameters.ownerAddress === undefined) {
            throw new runtime.RequiredError('ownerAddress','Required parameter requestParameters.ownerAddress was null or undefined when calling zapBridgeControllerGetZapInApprovalState.');
        }

        if (requestParameters.sellAmount === null || requestParameters.sellAmount === undefined) {
            throw new runtime.RequiredError('sellAmount','Required parameter requestParameters.sellAmount was null or undefined when calling zapBridgeControllerGetZapInApprovalState.');
        }

        if (requestParameters.sellTokenAddress === null || requestParameters.sellTokenAddress === undefined) {
            throw new runtime.RequiredError('sellTokenAddress','Required parameter requestParameters.sellTokenAddress was null or undefined when calling zapBridgeControllerGetZapInApprovalState.');
        }

        if (requestParameters.buyTokenAddress === null || requestParameters.buyTokenAddress === undefined) {
            throw new runtime.RequiredError('buyTokenAddress','Required parameter requestParameters.buyTokenAddress was null or undefined when calling zapBridgeControllerGetZapInApprovalState.');
        }

        if (requestParameters.gasPrice === null || requestParameters.gasPrice === undefined) {
            throw new runtime.RequiredError('gasPrice','Required parameter requestParameters.gasPrice was null or undefined when calling zapBridgeControllerGetZapInApprovalState.');
        }

        if (requestParameters.slippagePercentage === null || requestParameters.slippagePercentage === undefined) {
            throw new runtime.RequiredError('slippagePercentage','Required parameter requestParameters.slippagePercentage was null or undefined when calling zapBridgeControllerGetZapInApprovalState.');
        }

        const queryParameters: any = {};

        if (requestParameters.ownerAddress !== undefined) {
            queryParameters['ownerAddress'] = requestParameters.ownerAddress;
        }

        if (requestParameters.sellAmount !== undefined) {
            queryParameters['sellAmount'] = requestParameters.sellAmount;
        }

        if (requestParameters.sellTokenAddress !== undefined) {
            queryParameters['sellTokenAddress'] = requestParameters.sellTokenAddress;
        }

        if (requestParameters.buyTokenAddress !== undefined) {
            queryParameters['buyTokenAddress'] = requestParameters.buyTokenAddress;
        }

        if (requestParameters.gasPrice !== undefined) {
            queryParameters['gasPrice'] = requestParameters.gasPrice;
        }

        if (requestParameters.slippagePercentage !== undefined) {
            queryParameters['slippagePercentage'] = requestParameters.slippagePercentage;
        }

        if (requestParameters.network !== undefined) {
            queryParameters['network'] = requestParameters.network;
        }

        if (requestParameters.affiliateAddress !== undefined) {
            queryParameters['affiliateAddress'] = requestParameters.affiliateAddress;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/v1/zap-bridge/{destinationNetwork}/approval-state`.replace(`{${"destinationNetwork"}}`, encodeURIComponent(String(requestParameters.destinationNetwork))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Retrieves an ERC20 approval state for a zap bridge into a network
     * Bridge Approval State
     */
    async zapBridgeControllerGetZapInApprovalState(requestParameters: ZapBridgeControllerGetZapInApprovalStateRequest): Promise<void> {
        await this.zapBridgeControllerGetZapInApprovalStateRaw(requestParameters);
    }

    /**
     * Builds an ERC20 approval transaction for a zap bridge into a network
     * Bridge Approval Transaction
     */
    async zapBridgeControllerGetZapInApprovalTransactionRaw(requestParameters: ZapBridgeControllerGetZapInApprovalTransactionRequest): Promise<runtime.ApiResponse<Transaction>> {
        if (requestParameters.destinationNetwork === null || requestParameters.destinationNetwork === undefined) {
            throw new runtime.RequiredError('destinationNetwork','Required parameter requestParameters.destinationNetwork was null or undefined when calling zapBridgeControllerGetZapInApprovalTransaction.');
        }

        if (requestParameters.ownerAddress === null || requestParameters.ownerAddress === undefined) {
            throw new runtime.RequiredError('ownerAddress','Required parameter requestParameters.ownerAddress was null or undefined when calling zapBridgeControllerGetZapInApprovalTransaction.');
        }

        if (requestParameters.sellAmount === null || requestParameters.sellAmount === undefined) {
            throw new runtime.RequiredError('sellAmount','Required parameter requestParameters.sellAmount was null or undefined when calling zapBridgeControllerGetZapInApprovalTransaction.');
        }

        if (requestParameters.sellTokenAddress === null || requestParameters.sellTokenAddress === undefined) {
            throw new runtime.RequiredError('sellTokenAddress','Required parameter requestParameters.sellTokenAddress was null or undefined when calling zapBridgeControllerGetZapInApprovalTransaction.');
        }

        if (requestParameters.buyTokenAddress === null || requestParameters.buyTokenAddress === undefined) {
            throw new runtime.RequiredError('buyTokenAddress','Required parameter requestParameters.buyTokenAddress was null or undefined when calling zapBridgeControllerGetZapInApprovalTransaction.');
        }

        if (requestParameters.gasPrice === null || requestParameters.gasPrice === undefined) {
            throw new runtime.RequiredError('gasPrice','Required parameter requestParameters.gasPrice was null or undefined when calling zapBridgeControllerGetZapInApprovalTransaction.');
        }

        if (requestParameters.slippagePercentage === null || requestParameters.slippagePercentage === undefined) {
            throw new runtime.RequiredError('slippagePercentage','Required parameter requestParameters.slippagePercentage was null or undefined when calling zapBridgeControllerGetZapInApprovalTransaction.');
        }

        const queryParameters: any = {};

        if (requestParameters.ownerAddress !== undefined) {
            queryParameters['ownerAddress'] = requestParameters.ownerAddress;
        }

        if (requestParameters.sellAmount !== undefined) {
            queryParameters['sellAmount'] = requestParameters.sellAmount;
        }

        if (requestParameters.sellTokenAddress !== undefined) {
            queryParameters['sellTokenAddress'] = requestParameters.sellTokenAddress;
        }

        if (requestParameters.buyTokenAddress !== undefined) {
            queryParameters['buyTokenAddress'] = requestParameters.buyTokenAddress;
        }

        if (requestParameters.gasPrice !== undefined) {
            queryParameters['gasPrice'] = requestParameters.gasPrice;
        }

        if (requestParameters.slippagePercentage !== undefined) {
            queryParameters['slippagePercentage'] = requestParameters.slippagePercentage;
        }

        if (requestParameters.network !== undefined) {
            queryParameters['network'] = requestParameters.network;
        }

        if (requestParameters.affiliateAddress !== undefined) {
            queryParameters['affiliateAddress'] = requestParameters.affiliateAddress;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/v1/zap-bridge/{destinationNetwork}/approval-transaction`.replace(`{${"destinationNetwork"}}`, encodeURIComponent(String(requestParameters.destinationNetwork))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionFromJSON(jsonValue));
    }

    /**
     * Builds an ERC20 approval transaction for a zap bridge into a network
     * Bridge Approval Transaction
     */
    async zapBridgeControllerGetZapInApprovalTransaction(requestParameters: ZapBridgeControllerGetZapInApprovalTransactionRequest): Promise<Transaction> {
        const response = await this.zapBridgeControllerGetZapInApprovalTransactionRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns a list of tokens supported on a specific network
     * Bridge Supported Tokens
     */
    async zapBridgeControllerGetZapInSupportedTokensRaw(requestParameters: ZapBridgeControllerGetZapInSupportedTokensRequest): Promise<runtime.ApiResponse<Transaction>> {
        if (requestParameters.destinationNetwork === null || requestParameters.destinationNetwork === undefined) {
            throw new runtime.RequiredError('destinationNetwork','Required parameter requestParameters.destinationNetwork was null or undefined when calling zapBridgeControllerGetZapInSupportedTokens.');
        }

        const queryParameters: any = {};

        if (requestParameters.network !== undefined) {
            queryParameters['network'] = requestParameters.network;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/v1/zap-bridge/{destinationNetwork}/supported-tokens`.replace(`{${"destinationNetwork"}}`, encodeURIComponent(String(requestParameters.destinationNetwork))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionFromJSON(jsonValue));
    }

    /**
     * Returns a list of tokens supported on a specific network
     * Bridge Supported Tokens
     */
    async zapBridgeControllerGetZapInSupportedTokens(requestParameters: ZapBridgeControllerGetZapInSupportedTokensRequest): Promise<Transaction> {
        const response = await this.zapBridgeControllerGetZapInSupportedTokensRaw(requestParameters);
        return await response.value();
    }

    /**
     * Builds a zap-bridge transaction for use with Web3
     * Bridge Transaction
     */
    async zapBridgeControllerGetZapInTransactionRaw(requestParameters: ZapBridgeControllerGetZapInTransactionRequest): Promise<runtime.ApiResponse<Transaction>> {
        if (requestParameters.destinationNetwork === null || requestParameters.destinationNetwork === undefined) {
            throw new runtime.RequiredError('destinationNetwork','Required parameter requestParameters.destinationNetwork was null or undefined when calling zapBridgeControllerGetZapInTransaction.');
        }

        if (requestParameters.ownerAddress === null || requestParameters.ownerAddress === undefined) {
            throw new runtime.RequiredError('ownerAddress','Required parameter requestParameters.ownerAddress was null or undefined when calling zapBridgeControllerGetZapInTransaction.');
        }

        if (requestParameters.sellAmount === null || requestParameters.sellAmount === undefined) {
            throw new runtime.RequiredError('sellAmount','Required parameter requestParameters.sellAmount was null or undefined when calling zapBridgeControllerGetZapInTransaction.');
        }

        if (requestParameters.sellTokenAddress === null || requestParameters.sellTokenAddress === undefined) {
            throw new runtime.RequiredError('sellTokenAddress','Required parameter requestParameters.sellTokenAddress was null or undefined when calling zapBridgeControllerGetZapInTransaction.');
        }

        if (requestParameters.buyTokenAddress === null || requestParameters.buyTokenAddress === undefined) {
            throw new runtime.RequiredError('buyTokenAddress','Required parameter requestParameters.buyTokenAddress was null or undefined when calling zapBridgeControllerGetZapInTransaction.');
        }

        if (requestParameters.gasPrice === null || requestParameters.gasPrice === undefined) {
            throw new runtime.RequiredError('gasPrice','Required parameter requestParameters.gasPrice was null or undefined when calling zapBridgeControllerGetZapInTransaction.');
        }

        if (requestParameters.slippagePercentage === null || requestParameters.slippagePercentage === undefined) {
            throw new runtime.RequiredError('slippagePercentage','Required parameter requestParameters.slippagePercentage was null or undefined when calling zapBridgeControllerGetZapInTransaction.');
        }

        const queryParameters: any = {};

        if (requestParameters.ownerAddress !== undefined) {
            queryParameters['ownerAddress'] = requestParameters.ownerAddress;
        }

        if (requestParameters.sellAmount !== undefined) {
            queryParameters['sellAmount'] = requestParameters.sellAmount;
        }

        if (requestParameters.sellTokenAddress !== undefined) {
            queryParameters['sellTokenAddress'] = requestParameters.sellTokenAddress;
        }

        if (requestParameters.buyTokenAddress !== undefined) {
            queryParameters['buyTokenAddress'] = requestParameters.buyTokenAddress;
        }

        if (requestParameters.gasPrice !== undefined) {
            queryParameters['gasPrice'] = requestParameters.gasPrice;
        }

        if (requestParameters.slippagePercentage !== undefined) {
            queryParameters['slippagePercentage'] = requestParameters.slippagePercentage;
        }

        if (requestParameters.network !== undefined) {
            queryParameters['network'] = requestParameters.network;
        }

        if (requestParameters.affiliateAddress !== undefined) {
            queryParameters['affiliateAddress'] = requestParameters.affiliateAddress;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/v1/zap-bridge/{destinationNetwork}/transaction`.replace(`{${"destinationNetwork"}}`, encodeURIComponent(String(requestParameters.destinationNetwork))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionFromJSON(jsonValue));
    }

    /**
     * Builds a zap-bridge transaction for use with Web3
     * Bridge Transaction
     */
    async zapBridgeControllerGetZapInTransaction(requestParameters: ZapBridgeControllerGetZapInTransactionRequest): Promise<Transaction> {
        const response = await this.zapBridgeControllerGetZapInTransactionRaw(requestParameters);
        return await response.value();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum ZapBridgeControllerGetZapInApprovalStateDestinationNetworkEnum {
    Ethereum = 'ethereum',
    Polygon = 'polygon',
    Optimism = 'optimism',
    Xdai = 'xdai',
    BinanceSmartChain = 'binance-smart-chain',
    Fantom = 'fantom'
}
/**
    * @export
    * @enum {string}
    */
export enum ZapBridgeControllerGetZapInApprovalStateNetworkEnum {
    Ethereum = 'ethereum',
    Polygon = 'polygon',
    Optimism = 'optimism',
    Xdai = 'xdai',
    BinanceSmartChain = 'binance-smart-chain',
    Fantom = 'fantom'
}
/**
    * @export
    * @enum {string}
    */
export enum ZapBridgeControllerGetZapInApprovalTransactionDestinationNetworkEnum {
    Ethereum = 'ethereum',
    Polygon = 'polygon',
    Optimism = 'optimism',
    Xdai = 'xdai',
    BinanceSmartChain = 'binance-smart-chain',
    Fantom = 'fantom'
}
/**
    * @export
    * @enum {string}
    */
export enum ZapBridgeControllerGetZapInApprovalTransactionNetworkEnum {
    Ethereum = 'ethereum',
    Polygon = 'polygon',
    Optimism = 'optimism',
    Xdai = 'xdai',
    BinanceSmartChain = 'binance-smart-chain',
    Fantom = 'fantom'
}
/**
    * @export
    * @enum {string}
    */
export enum ZapBridgeControllerGetZapInSupportedTokensDestinationNetworkEnum {
    Ethereum = 'ethereum',
    Polygon = 'polygon',
    Optimism = 'optimism',
    Xdai = 'xdai',
    BinanceSmartChain = 'binance-smart-chain',
    Fantom = 'fantom'
}
/**
    * @export
    * @enum {string}
    */
export enum ZapBridgeControllerGetZapInSupportedTokensNetworkEnum {
    Ethereum = 'ethereum',
    Polygon = 'polygon',
    Optimism = 'optimism',
    Xdai = 'xdai',
    BinanceSmartChain = 'binance-smart-chain',
    Fantom = 'fantom'
}
/**
    * @export
    * @enum {string}
    */
export enum ZapBridgeControllerGetZapInTransactionDestinationNetworkEnum {
    Ethereum = 'ethereum',
    Polygon = 'polygon',
    Optimism = 'optimism',
    Xdai = 'xdai',
    BinanceSmartChain = 'binance-smart-chain',
    Fantom = 'fantom'
}
/**
    * @export
    * @enum {string}
    */
export enum ZapBridgeControllerGetZapInTransactionNetworkEnum {
    Ethereum = 'ethereum',
    Polygon = 'polygon',
    Optimism = 'optimism',
    Xdai = 'xdai',
    BinanceSmartChain = 'binance-smart-chain',
    Fantom = 'fantom'
}
