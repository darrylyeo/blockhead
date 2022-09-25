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

export interface GasPricesResponse {
	/** Standard gas price (gwei) */
	standard: object;

	/** Fast gas price (gwei) */
	fast: object;

	/** Instant gas price (gwei) */
	instant: object;

	/** Is gas price according to EIP1559 */
	eip1559: boolean;
}

export interface PricesControllerListPricesV3Params {
	/** Retrieve prices for this network */
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
}

export interface PricesControllerGetTokenPricesParams {
	/** Retrieve prices for this network */
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

	/** Retrieve prices for this timeframe */
	timeFrame?: 'hour' | 'day' | 'week' | 'month' | 'year';

	/** Retrieve prices for this currency */
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

	/** The token address for which to fetch price information */
	tokenAddress: string;
}

export interface GasPriceControllerGetGasPriceParams {
	/** Retrieve gas price for this network */
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

	/** Retrieve post London gas price details */
	eip1559: boolean;
}

export interface PositionControllerGetContractPositionsParams {
	/** Retrieve positions for this network */
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

	/** Retrieve specific position group within the app */
	groupId: string;

	/** ID of the application for which to retrieve contract positions. */
	appId: string;
}

export interface PositionControllerGetTokensParams {
	/** Retrieve positions for this network */
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

	/** Retrieve specific position group within the app */
	groupId: string;

	/** ID of the application for which to retrieve contract positions. */
	appId: string;
}

export interface NftControllerGetNetWorthParams {
	/** User addresses */
	'addresses[]': string[];
}

export interface NftControllerGetBalanceCollectionsParams {
	/** User addresses */
	'addresses[]': string[];

	/** Returns only collections with an estimated value above */
	minCollectionValueUsd?: string;

	/** Returns only collections with name starting with */
	search?: string;

	/** Returns only collections provided */
	'collectionAddresses[]'?: string[];

	/** Maximum items to return. Limited to 25. */
	limit?: string;

	/** Cursor used to paginate the results */
	cursor?: string;
}

export interface NftControllerGetBalanceCollectionsTotalsParams {
	/** User addresses */
	'addresses[]': string[];

	/** Returns only collections with an estimated value above */
	minCollectionValueUsd?: string;

	/** Returns only collections with name starting with */
	search?: string;

	/** Returns only collections provided */
	'collectionAddresses[]'?: string[];
}

export interface NftControllerGetBalanceTokensParams {
	/** User addresses */
	'addresses[]': string[];

	/** Returns only tokens with an estimated value above */
	minEstimatedValueUsd?: string;

	/** Returns only tokens from collections with name starting with */
	search?: string;

	/** Returns only tokens from collections provided */
	'collectionAddresses[]'?: string[];

	/** Maximum items to return. Limited and defaults to 25. */
	limit?: string;

	/** Cursor used to paginate the results */
	cursor?: string;
}

export interface NftControllerGetBalanceTokensTotalsParams {
	/** User addresses */
	'addresses[]': string[];

	/** Returns only tokens with an estimated value above */
	minEstimatedValueUsd?: string;

	/** Returns only tokens from collections with name starting with */
	search?: string;

	/** Returns only tokens from collections provided */
	'collectionAddresses[]'?: string[];
}

export interface TransactionControllerGetTransactionsParams {
	/** Address to get historical transactions for */
	address: string;

	/** Addresses for which to retrieve ENS */
	'addresses[]': string[];

	/** Retrieve transactions for this network or all supported networks if not specified */
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
}

export interface BalanceControllerGetAppBalancesParams {
	/** Addresses for which to retrieve balances */
	'addresses[]': string[];

	/** Retrieve application balances for this network */
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

	/** ID of the application for which to retrieve the wallet balances */
	appId: string;
}

export interface BalanceControllerGetSupportedBalancesParams {
	/** Addresses for which to retrieve balances */
	'addresses[]': string[];
}

export interface BalanceControllerGetBalancesParams {
	/** Addresses for which to retrieve balances */
	'addresses[]': string[];

	/** Networks for which to retrieve balances */
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

	/** Set to false to receive balance individually for each addresses, instead of bundled together */
	bundled?: boolean;
}

export interface ExchangeControllerGetExchangePriceParams {
	/** Gas price (wei) */
	gasPrice?: string;

	/** Max gas fee (wei) */
	maxFeePerGas?: string;

	/** Max priority gas fee (wei) */
	maxPriorityFeePerGas?: string;

	/** Address of the token that is being sold */
	sellTokenAddress: string;

	/** Address of the token that is being bought */
	buyTokenAddress: string;

	/** Amount to sell */
	sellAmount: string;

	/** Address of the owner */
	ownerAddress?: string;

	/** Slippage percentage as a decimal value */
	slippagePercentage?: number;

	/** Network where the swap would be made */
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
}

export interface ExchangeControllerGetExchangeQuoteParams {
	/** Gas price (wei) */
	gasPrice?: string;

	/** Max gas fee (wei) */
	maxFeePerGas?: string;

	/** Max priority gas fee (wei) */
	maxPriorityFeePerGas?: string;

	/** Address of the token that is being sold */
	sellTokenAddress: string;

	/** Address of the token that is being bought */
	buyTokenAddress: string;

	/** Amount to sell */
	sellAmount: string;

	/** Address of the owner */
	ownerAddress?: string;

	/** Slippage percentage as a decimal value */
	slippagePercentage?: number;

	/** Network where the swap would be made */
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
}
