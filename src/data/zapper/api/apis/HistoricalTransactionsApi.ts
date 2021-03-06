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

export interface TransactionControllerGetTransactionsRequest {
    address: string;
}

/**
 * 
 */
export class HistoricalTransactionsApi extends runtime.BaseAPI {

    /**
     * Data on past transactions for a specific address
     * Historical Transactions
     */
    async transactionControllerGetTransactionsRaw(requestParameters: TransactionControllerGetTransactionsRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.address === null || requestParameters.address === undefined) {
            throw new runtime.RequiredError('address','Required parameter requestParameters.address was null or undefined when calling transactionControllerGetTransactions.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/v1/transactions/{address}`.replace(`{${"address"}}`, encodeURIComponent(String(requestParameters.address))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Data on past transactions for a specific address
     * Historical Transactions
     */
    async transactionControllerGetTransactions(requestParameters: TransactionControllerGetTransactionsRequest): Promise<void> {
        await this.transactionControllerGetTransactionsRaw(requestParameters);
    }

}
