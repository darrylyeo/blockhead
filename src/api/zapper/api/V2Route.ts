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

import { GasPricesResponse } from './data-contracts';

export namespace V2 {
	/**
	 * @description Retrieve supported tokens and their prices
	 * @tags Miscellaneous Data Endpoints
	 * @name PricesControllerListPricesV3
	 * @summary Token Prices
	 * @request GET:/v2/prices
	 * @secure
	 * @response `200` `unknown`
	 */
	export namespace PricesControllerListPricesV3 {
		export type RequestParams = {};
		export type RequestQuery = {
			network?:
				| 'ethereum'
				| 'polygon'
				| 'optimism'
				| 'gnosis'
				| 'binance-smart-chain'
				| 'fantom'
				| 'avalanche'
				| 'arbitrum'
				| 'celo'
				| 'harmony'
				| 'moonriver'
				| 'bitcoin'
				| 'cronos'
				| 'aurora'
				| 'evmos';
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = unknown;
	}

	/**
	 * @description Retrieve supported tokens and their prices
	 * @tags Miscellaneous Data Endpoints
	 * @name PricesControllerGetTokenPrices
	 * @summary Token Prices
	 * @request GET:/v2/prices/{tokenAddress}
	 * @secure
	 * @response `200` `unknown`
	 */
	export namespace PricesControllerGetTokenPrices {
		export type RequestParams = { tokenAddress: string };
		export type RequestQuery = {
			network?:
				| 'ethereum'
				| 'polygon'
				| 'optimism'
				| 'gnosis'
				| 'binance-smart-chain'
				| 'fantom'
				| 'avalanche'
				| 'arbitrum'
				| 'celo'
				| 'harmony'
				| 'moonriver'
				| 'bitcoin'
				| 'cronos'
				| 'aurora'
				| 'evmos';
			timeFrame?: 'hour' | 'day' | 'week' | 'month' | 'year';
			currency?:
				| 'USD'
				| 'EUR'
				| 'GBP'
				| 'CAD'
				| 'CNY'
				| 'KRW'
				| 'JPY'
				| 'RUB'
				| 'AUD'
				| 'NZD'
				| 'CHF'
				| 'SGD'
				| 'INR'
				| 'BRL'
				| 'ETH'
				| 'BTC'
				| 'HKD'
				| 'SEK'
				| 'NOK'
				| 'MXN'
				| 'TRY';
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = unknown;
	}

	/**
	 * @description Retrieve a gas price aggregated from multiple different sources
	 * @tags Miscellaneous Data Endpoints
	 * @name GasPriceControllerGetGasPrice
	 * @summary Gas Price
	 * @request GET:/v2/gas-prices
	 * @secure
	 * @response `200` `GasPricesResponse`
	 */
	export namespace GasPriceControllerGetGasPrice {
		export type RequestParams = {};
		export type RequestQuery = {
			network?:
				| 'ethereum'
				| 'polygon'
				| 'optimism'
				| 'gnosis'
				| 'binance-smart-chain'
				| 'fantom'
				| 'avalanche'
				| 'arbitrum'
				| 'celo'
				| 'harmony'
				| 'moonriver'
				| 'bitcoin'
				| 'cronos'
				| 'aurora'
				| 'evmos';
			eip1559: boolean;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = GasPricesResponse;
	}

	/**
	 * @description Retrieve positions (non-tokenized) for a given application
	 * @tags Apps
	 * @name PositionControllerGetContractPositions
	 * @summary Application Positions
	 * @request GET:/v2/apps/{appId}/positions
	 * @secure
	 * @response `200` `unknown`
	 */
	export namespace PositionControllerGetContractPositions {
		export type RequestParams = { appId: string };
		export type RequestQuery = {
			network:
				| 'ethereum'
				| 'polygon'
				| 'optimism'
				| 'gnosis'
				| 'binance-smart-chain'
				| 'fantom'
				| 'avalanche'
				| 'arbitrum'
				| 'celo'
				| 'harmony'
				| 'moonriver'
				| 'bitcoin'
				| 'cronos'
				| 'aurora'
				| 'evmos';
			groupId: string;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = unknown;
	}

	/**
	 * @description Retrieve tokens for a given application
	 * @tags Apps
	 * @name PositionControllerGetTokens
	 * @summary Application Tokens
	 * @request GET:/v2/apps/{appId}/tokens
	 * @secure
	 * @response `200` `unknown`
	 */
	export namespace PositionControllerGetTokens {
		export type RequestParams = { appId: string };
		export type RequestQuery = {
			network:
				| 'ethereum'
				| 'polygon'
				| 'optimism'
				| 'gnosis'
				| 'binance-smart-chain'
				| 'fantom'
				| 'avalanche'
				| 'arbitrum'
				| 'celo'
				| 'harmony'
				| 'moonriver'
				| 'bitcoin'
				| 'cronos'
				| 'aurora'
				| 'evmos';
			groupId: string;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = unknown;
	}

	/**
	 * No description
	 * @tags Apps
	 * @name AppsControllerGetApps
	 * @request GET:/v2/apps
	 * @secure
	 * @response `200` `unknown`
	 */
	export namespace AppsControllerGetApps {
		export type RequestParams = {};
		export type RequestQuery = {};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = unknown;
	}

	/**
	 * No description
	 * @tags Apps
	 * @name AppsControllerGetApp
	 * @request GET:/v2/apps/{appId}
	 * @secure
	 * @response `200` `unknown`
	 */
	export namespace AppsControllerGetApp {
		export type RequestParams = { appId: string };
		export type RequestQuery = {};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = unknown;
	}

	/**
	 * No description
	 * @tags NFT Balances
	 * @name NftControllerGetNetWorth
	 * @request GET:/v2/nft/balances/net-worth
	 * @secure
	 * @response `200` `unknown`
	 */
	export namespace NftControllerGetNetWorth {
		export type RequestParams = {};
		export type RequestQuery = { 'addresses[]': string[] };
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = unknown;
	}

	/**
	 * No description
	 * @tags NFT Balances
	 * @name NftControllerGetBalanceCollections
	 * @request GET:/v2/nft/balances/collections
	 * @secure
	 * @response `200` `unknown`
	 */
	export namespace NftControllerGetBalanceCollections {
		export type RequestParams = {};
		export type RequestQuery = {
			'addresses[]': string[];
			minCollectionValueUsd?: string;
			search?: string;
			'collectionAddresses[]'?: string[];
			limit?: string;
			cursor?: string;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = unknown;
	}

	/**
	 * No description
	 * @tags NFT Balances
	 * @name NftControllerGetBalanceCollectionsTotals
	 * @request GET:/v2/nft/balances/collections-totals
	 * @secure
	 * @response `200` `unknown`
	 */
	export namespace NftControllerGetBalanceCollectionsTotals {
		export type RequestParams = {};
		export type RequestQuery = {
			'addresses[]': string[];
			minCollectionValueUsd?: string;
			search?: string;
			'collectionAddresses[]'?: string[];
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = unknown;
	}

	/**
	 * No description
	 * @tags NFT Balances
	 * @name NftControllerGetBalanceTokens
	 * @request GET:/v2/nft/balances/tokens
	 * @secure
	 * @response `200` `unknown`
	 */
	export namespace NftControllerGetBalanceTokens {
		export type RequestParams = {};
		export type RequestQuery = {
			'addresses[]': string[];
			minEstimatedValueUsd?: string;
			search?: string;
			'collectionAddresses[]'?: string[];
			limit?: string;
			cursor?: string;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = unknown;
	}

	/**
	 * No description
	 * @tags NFT Balances
	 * @name NftControllerGetBalanceTokensTotals
	 * @request GET:/v2/nft/balances/tokens-totals
	 * @secure
	 * @response `200` `unknown`
	 */
	export namespace NftControllerGetBalanceTokensTotals {
		export type RequestParams = {};
		export type RequestQuery = {
			'addresses[]': string[];
			minEstimatedValueUsd?: string;
			search?: string;
			'collectionAddresses[]'?: string[];
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = unknown;
	}

	/**
	 * @description Data on past transactions for addresses
	 * @tags Historical Transactions
	 * @name TransactionControllerGetTransactions
	 * @summary Historical Transactions
	 * @request GET:/v2/transactions
	 * @secure
	 * @response `200` `unknown`
	 */
	export namespace TransactionControllerGetTransactions {
		export type RequestParams = {};
		export type RequestQuery = {
			address: string;
			'addresses[]': string[];
			network?:
				| 'ethereum'
				| 'polygon'
				| 'optimism'
				| 'gnosis'
				| 'binance-smart-chain'
				| 'fantom'
				| 'avalanche'
				| 'arbitrum'
				| 'celo'
				| 'harmony'
				| 'moonriver'
				| 'bitcoin'
				| 'cronos'
				| 'aurora'
				| 'evmos';
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = unknown;
	}

	/**
	 * No description
	 * @tags Balances
	 * @name BalanceControllerGetAppBalances
	 * @request GET:/v2/apps/{appId}/balances
	 * @secure
	 * @response `200` `unknown`
	 */
	export namespace BalanceControllerGetAppBalances {
		export type RequestParams = { appId: string };
		export type RequestQuery = {
			'addresses[]': string[];
			network?:
				| 'ethereum'
				| 'polygon'
				| 'optimism'
				| 'gnosis'
				| 'binance-smart-chain'
				| 'fantom'
				| 'avalanche'
				| 'arbitrum'
				| 'celo'
				| 'harmony'
				| 'moonriver'
				| 'bitcoin'
				| 'cronos'
				| 'aurora'
				| 'evmos';
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = unknown;
	}

	/**
	 * No description
	 * @tags Balances
	 * @name BalanceControllerGetSupportedBalances
	 * @request GET:/v2/apps/balances/supported
	 * @secure
	 * @response `200` `unknown`
	 */
	export namespace BalanceControllerGetSupportedBalances {
		export type RequestParams = {};
		export type RequestQuery = { 'addresses[]': string[] };
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = unknown;
	}

	/**
	 * @description Gets the balances for a set of addresses.
	 * @tags Balances
	 * @name BalanceControllerGetBalances
	 * @summary Balances
	 * @request GET:/v2/balances
	 * @secure
	 * @response `200` `unknown`
	 */
	export namespace BalanceControllerGetBalances {
		export type RequestParams = {};
		export type RequestQuery = {
			'addresses[]': string[];
			'networks[]'?: (
				| 'ethereum'
				| 'polygon'
				| 'optimism'
				| 'gnosis'
				| 'binance-smart-chain'
				| 'fantom'
				| 'avalanche'
				| 'arbitrum'
				| 'celo'
				| 'harmony'
				| 'moonriver'
				| 'bitcoin'
				| 'cronos'
				| 'aurora'
				| 'evmos'
			)[];
			bundled?: boolean;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = unknown;
	}

	/**
	 * @description Returns data about the amount received if a trade would be made. **Should be called whenever a price needs to be calculated.**
	 * @tags Exchange
	 * @name ExchangeControllerGetExchangePrice
	 * @summary Exchange Price
	 * @request GET:/v2/exchange/price
	 * @secure
	 * @response `200` `unknown`
	 */
	export namespace ExchangeControllerGetExchangePrice {
		export type RequestParams = {};
		export type RequestQuery = {
			gasPrice?: string;
			maxFeePerGas?: string;
			maxPriorityFeePerGas?: string;
			sellTokenAddress: string;
			buyTokenAddress: string;
			sellAmount: string;
			ownerAddress?: string;
			slippagePercentage?: number;
			network?:
				| 'ethereum'
				| 'polygon'
				| 'optimism'
				| 'gnosis'
				| 'binance-smart-chain'
				| 'fantom'
				| 'avalanche'
				| 'arbitrum'
				| 'celo'
				| 'harmony'
				| 'moonriver'
				| 'bitcoin'
				| 'cronos'
				| 'aurora'
				| 'evmos';
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = unknown;
	}

	/**
	 * @description Returns both the relative price for a trade as well as the call data used to sumbit a transaction for a trade. **Should only be called when a trade is ready to be submitted.**
	 * @tags Exchange
	 * @name ExchangeControllerGetExchangeQuote
	 * @summary Exchange Quote
	 * @request GET:/v2/exchange/quote
	 * @secure
	 * @response `200` `unknown`
	 */
	export namespace ExchangeControllerGetExchangeQuote {
		export type RequestParams = {};
		export type RequestQuery = {
			gasPrice?: string;
			maxFeePerGas?: string;
			maxPriorityFeePerGas?: string;
			sellTokenAddress: string;
			buyTokenAddress: string;
			sellAmount: string;
			ownerAddress?: string;
			slippagePercentage?: number;
			network?:
				| 'ethereum'
				| 'polygon'
				| 'optimism'
				| 'gnosis'
				| 'binance-smart-chain'
				| 'fantom'
				| 'avalanche'
				| 'arbitrum'
				| 'celo'
				| 'harmony'
				| 'moonriver'
				| 'bitcoin'
				| 'cronos'
				| 'aurora'
				| 'evmos';
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = unknown;
	}

	/**
	 * @description Returns the exchanges supported by Zapper API.
	 * @tags Exchange
	 * @name ExchangeControllerGetSupportedExchanges
	 * @summary Supported exchanges
	 * @request GET:/v2/exchange/supported
	 * @secure
	 * @response `200` `unknown`
	 */
	export namespace ExchangeControllerGetSupportedExchanges {
		export type RequestParams = {};
		export type RequestQuery = {};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = unknown;
	}
}
