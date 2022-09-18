/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import type {
	BalanceControllerGetAppBalancesParams,
	BalanceControllerGetBalancesParams,
	BalanceControllerGetSupportedBalancesParams,
	ExchangeControllerGetExchangePriceParams,
	ExchangeControllerGetExchangeQuoteParams,
	GasPriceControllerGetGasPriceParams,
	GasPricesResponse,
	NftControllerGetBalanceCollectionsParams,
	NftControllerGetBalanceCollectionsTotalsParams,
	NftControllerGetBalanceTokensParams,
	NftControllerGetBalanceTokensTotalsParams,
	NftControllerGetNetWorthParams,
	PositionControllerGetContractPositionsParams,
	PositionControllerGetTokensParams,
	PricesControllerGetTokenPricesParams,
	PricesControllerListPricesV3Params,
	TransactionControllerGetTransactionsParams
} from './data-contracts';
import type { HttpClient, RequestParams } from './http-client';

export class V2<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
	}

	/**
	 * @description Retrieve supported tokens and their prices
	 *
	 * @tags Miscellaneous Data Endpoints
	 * @name PricesControllerListPricesV3
	 * @summary Token Prices
	 * @request GET:/v2/prices
	 * @secure
	 */
	pricesControllerListPricesV3 = (
		query: PricesControllerListPricesV3Params,
		params: RequestParams = {}
	) =>
		this.http.request<{}, any>({
			path: `/v2/prices`,
			method: 'GET',
			query: query,
			secure: true,
			...params
		});
	/**
	 * @description Retrieve supported tokens and their prices
	 *
	 * @tags Miscellaneous Data Endpoints
	 * @name PricesControllerGetTokenPrices
	 * @summary Token Prices
	 * @request GET:/v2/prices/{tokenAddress}
	 * @secure
	 */
	pricesControllerGetTokenPrices = (
		{ tokenAddress, ...query }: PricesControllerGetTokenPricesParams,
		params: RequestParams = {}
	) =>
		this.http.request<{}, any>({
			path: `/v2/prices/${tokenAddress}`,
			method: 'GET',
			query: query,
			secure: true,
			...params
		});
	/**
	 * @description Retrieve a gas price aggregated from multiple different sources
	 *
	 * @tags Miscellaneous Data Endpoints
	 * @name GasPriceControllerGetGasPrice
	 * @summary Gas Price
	 * @request GET:/v2/gas-prices
	 * @secure
	 */
	gasPriceControllerGetGasPrice = (
		query: GasPriceControllerGetGasPriceParams,
		params: RequestParams = {}
	) =>
		this.http.request<GasPricesResponse, any>({
			path: `/v2/gas-prices`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params
		});
	/**
	 * @description Retrieve positions (non-tokenized) for a given application
	 *
	 * @tags Apps
	 * @name PositionControllerGetContractPositions
	 * @summary Application Positions
	 * @request GET:/v2/apps/{appId}/positions
	 * @secure
	 */
	positionControllerGetContractPositions = (
		{ appId, ...query }: PositionControllerGetContractPositionsParams,
		params: RequestParams = {}
	) =>
		this.http.request<{}, any>({
			path: `/v2/apps/${appId}/positions`,
			method: 'GET',
			query: query,
			secure: true,
			...params
		});
	/**
	 * @description Retrieve tokens for a given application
	 *
	 * @tags Apps
	 * @name PositionControllerGetTokens
	 * @summary Application Tokens
	 * @request GET:/v2/apps/{appId}/tokens
	 * @secure
	 */
	positionControllerGetTokens = (
		{ appId, ...query }: PositionControllerGetTokensParams,
		params: RequestParams = {}
	) =>
		this.http.request<{}, any>({
			path: `/v2/apps/${appId}/tokens`,
			method: 'GET',
			query: query,
			secure: true,
			...params
		});
	/**
	 * No description
	 *
	 * @tags Apps
	 * @name AppsControllerGetApps
	 * @request GET:/v2/apps
	 * @secure
	 */
	appsControllerGetApps = (params: RequestParams = {}) =>
		this.http.request<{}, any>({
			path: `/v2/apps`,
			method: 'GET',
			secure: true,
			...params
		});
	/**
	 * No description
	 *
	 * @tags Apps
	 * @name AppsControllerGetApp
	 * @request GET:/v2/apps/{appId}
	 * @secure
	 */
	appsControllerGetApp = (appId: string, params: RequestParams = {}) =>
		this.http.request<{}, any>({
			path: `/v2/apps/${appId}`,
			method: 'GET',
			secure: true,
			...params
		});
	/**
	 * No description
	 *
	 * @tags NFT Balances
	 * @name NftControllerGetNetWorth
	 * @request GET:/v2/nft/balances/net-worth
	 * @secure
	 */
	nftControllerGetNetWorth = (query: NftControllerGetNetWorthParams, params: RequestParams = {}) =>
		this.http.request<{}, any>({
			path: `/v2/nft/balances/net-worth`,
			method: 'GET',
			query: query,
			secure: true,
			...params
		});
	/**
	 * No description
	 *
	 * @tags NFT Balances
	 * @name NftControllerGetBalanceCollections
	 * @request GET:/v2/nft/balances/collections
	 * @secure
	 */
	nftControllerGetBalanceCollections = (
		query: NftControllerGetBalanceCollectionsParams,
		params: RequestParams = {}
	) =>
		this.http.request<{}, any>({
			path: `/v2/nft/balances/collections`,
			method: 'GET',
			query: query,
			secure: true,
			...params
		});
	/**
	 * No description
	 *
	 * @tags NFT Balances
	 * @name NftControllerGetBalanceCollectionsTotals
	 * @request GET:/v2/nft/balances/collections-totals
	 * @secure
	 */
	nftControllerGetBalanceCollectionsTotals = (
		query: NftControllerGetBalanceCollectionsTotalsParams,
		params: RequestParams = {}
	) =>
		this.http.request<{}, any>({
			path: `/v2/nft/balances/collections-totals`,
			method: 'GET',
			query: query,
			secure: true,
			...params
		});
	/**
	 * No description
	 *
	 * @tags NFT Balances
	 * @name NftControllerGetBalanceTokens
	 * @request GET:/v2/nft/balances/tokens
	 * @secure
	 */
	nftControllerGetBalanceTokens = (
		query: NftControllerGetBalanceTokensParams,
		params: RequestParams = {}
	) =>
		this.http.request<{}, any>({
			path: `/v2/nft/balances/tokens`,
			method: 'GET',
			query: query,
			secure: true,
			...params
		});
	/**
	 * No description
	 *
	 * @tags NFT Balances
	 * @name NftControllerGetBalanceTokensTotals
	 * @request GET:/v2/nft/balances/tokens-totals
	 * @secure
	 */
	nftControllerGetBalanceTokensTotals = (
		query: NftControllerGetBalanceTokensTotalsParams,
		params: RequestParams = {}
	) =>
		this.http.request<{}, any>({
			path: `/v2/nft/balances/tokens-totals`,
			method: 'GET',
			query: query,
			secure: true,
			...params
		});
	/**
	 * @description Data on past transactions for addresses
	 *
	 * @tags Historical Transactions
	 * @name TransactionControllerGetTransactions
	 * @summary Historical Transactions
	 * @request GET:/v2/transactions
	 * @secure
	 */
	transactionControllerGetTransactions = (
		query: TransactionControllerGetTransactionsParams,
		params: RequestParams = {}
	) =>
		this.http.request<{}, any>({
			path: `/v2/transactions`,
			method: 'GET',
			query: query,
			secure: true,
			...params
		});
	/**
	 * No description
	 *
	 * @tags Balances
	 * @name BalanceControllerGetAppBalances
	 * @request GET:/v2/apps/{appId}/balances
	 * @secure
	 */
	balanceControllerGetAppBalances = (
		{ appId, ...query }: BalanceControllerGetAppBalancesParams,
		params: RequestParams = {}
	) =>
		this.http.request<{}, any>({
			path: `/v2/apps/${appId}/balances`,
			method: 'GET',
			query: query,
			secure: true,
			...params
		});
	/**
	 * No description
	 *
	 * @tags Balances
	 * @name BalanceControllerGetSupportedBalances
	 * @request GET:/v2/apps/balances/supported
	 * @secure
	 */
	balanceControllerGetSupportedBalances = (
		query: BalanceControllerGetSupportedBalancesParams,
		params: RequestParams = {}
	) =>
		this.http.request<{}, any>({
			path: `/v2/apps/balances/supported`,
			method: 'GET',
			query: query,
			secure: true,
			...params
		});
	/**
	 * @description Gets the balances for a set of addresses.
	 *
	 * @tags Balances
	 * @name BalanceControllerGetBalances
	 * @summary Balances
	 * @request GET:/v2/balances
	 * @secure
	 */
	balanceControllerGetBalances = (
		query: BalanceControllerGetBalancesParams,
		params: RequestParams = {}
	) =>
		this.http.request<{}, any>({
			path: `/v2/balances`,
			method: 'GET',
			query: query,
			secure: true,
			...params
		});
	/**
	 * @description Returns data about the amount received if a trade would be made. **Should be called whenever a price needs to be calculated.**
	 *
	 * @tags Exchange
	 * @name ExchangeControllerGetExchangePrice
	 * @summary Exchange Price
	 * @request GET:/v2/exchange/price
	 * @secure
	 */
	exchangeControllerGetExchangePrice = (
		query: ExchangeControllerGetExchangePriceParams,
		params: RequestParams = {}
	) =>
		this.http.request<{}, any>({
			path: `/v2/exchange/price`,
			method: 'GET',
			query: query,
			secure: true,
			...params
		});
	/**
	 * @description Returns both the relative price for a trade as well as the call data used to sumbit a transaction for a trade. **Should only be called when a trade is ready to be submitted.**
	 *
	 * @tags Exchange
	 * @name ExchangeControllerGetExchangeQuote
	 * @summary Exchange Quote
	 * @request GET:/v2/exchange/quote
	 * @secure
	 */
	exchangeControllerGetExchangeQuote = (
		query: ExchangeControllerGetExchangeQuoteParams,
		params: RequestParams = {}
	) =>
		this.http.request<{}, any>({
			path: `/v2/exchange/quote`,
			method: 'GET',
			query: query,
			secure: true,
			...params
		});
	/**
	 * @description Returns the exchanges supported by Zapper API.
	 *
	 * @tags Exchange
	 * @name ExchangeControllerGetSupportedExchanges
	 * @summary Supported exchanges
	 * @request GET:/v2/exchange/supported
	 * @secure
	 */
	exchangeControllerGetSupportedExchanges = (params: RequestParams = {}) =>
		this.http.request<{}, any>({
			path: `/v2/exchange/supported`,
			method: 'GET',
			secure: true,
			...params
		});
}
