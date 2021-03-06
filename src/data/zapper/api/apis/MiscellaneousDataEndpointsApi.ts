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
    GasPricesResponse,
    GasPricesResponseFromJSON,
    GasPricesResponseToJSON,
} from '../models';

export interface GasPriceControllerGetGasPriceRequest {
    network?: GasPriceControllerGetGasPriceNetworkEnum;
}

export interface PricesControllerListPricesRequest {
    network?: PricesControllerListPricesNetworkEnum;
}

/**
 * 
 */
export class MiscellaneousDataEndpointsApi extends runtime.BaseAPI {

    /**
     * Retrieve a gas price aggregated from multiple different sources
     * Gas Price
     */
    async gasPriceControllerGetGasPriceRaw(requestParameters: GasPriceControllerGetGasPriceRequest): Promise<runtime.ApiResponse<GasPricesResponse>> {
        const queryParameters: any = {};

        if (requestParameters.network !== undefined) {
            queryParameters['network'] = requestParameters.network;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/v1/gas-price`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => GasPricesResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve a gas price aggregated from multiple different sources
     * Gas Price
     */
    async gasPriceControllerGetGasPrice(requestParameters: GasPriceControllerGetGasPriceRequest): Promise<GasPricesResponse> {
        const response = await this.gasPriceControllerGetGasPriceRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve a list of fiat currency exchange rates based on USD
     * Fiat Currency Rates
     */
    async pricesControllerListFiatRatesRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/v1/fiat-rates`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Retrieve a list of fiat currency exchange rates based on USD
     * Fiat Currency Rates
     */
    async pricesControllerListFiatRates(): Promise<void> {
        await this.pricesControllerListFiatRatesRaw();
    }

    /**
     * Retrieve supported tokens and their prices
     * Token Prices
     */
    async pricesControllerListPricesRaw(requestParameters: PricesControllerListPricesRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        if (requestParameters.network !== undefined) {
            queryParameters['network'] = requestParameters.network;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/v1/prices`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Retrieve supported tokens and their prices
     * Token Prices
     */
    async pricesControllerListPrices(requestParameters: PricesControllerListPricesRequest): Promise<void> {
        await this.pricesControllerListPricesRaw(requestParameters);
    }

    /**
     * A list of support Ethereum ERC20 tokens
     * Zapper Token List
     */
    async tokenListControllerGetGasPriceRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/v1/token-list`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * A list of support Ethereum ERC20 tokens
     * Zapper Token List
     */
    async tokenListControllerGetGasPrice(): Promise<void> {
        await this.tokenListControllerGetGasPriceRaw();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum GasPriceControllerGetGasPriceNetworkEnum {
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
export enum PricesControllerListPricesNetworkEnum {
    Ethereum = 'ethereum',
    Polygon = 'polygon',
    Optimism = 'optimism',
    Xdai = 'xdai',
    BinanceSmartChain = 'binance-smart-chain',
    Fantom = 'fantom'
}
