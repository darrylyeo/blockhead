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
  AppDefinition,
  ApprovalControllerGetApprovalStateParams,
  ApprovalControllerGetApprovalTransactionParams,
  BalanceControllerGetBalancesParams,
  BalanceControllerGetProtocolBalancesV2Params,
  BalanceControllerGetSupportedV2BalancesParams,
  ExchangeControllerGetExchangePriceParams,
  ExchangeControllerGetExchangeQuoteParams,
  FarmFetcherControllerGetEthereumFarmsParams,
  FarmsControllerGetFarmsMarketDataParams,
  FarmStakingControllerGetApprovalStateParams,
  FarmStakingControllerGetApprovalTransactionParams,
  FarmStakingControllerGetClaimTransactionParams,
  FarmStakingControllerGetExitTransactionParams,
  FarmStakingControllerGetStakeTransactionParams,
  GasPriceControllerGetGasPriceParams,
  GasPricesResponse,
  MarketControllerGetMarketDataParams,
  PoolControllerGetLendingPoolStatsParams,
  PoolControllerGetPoolStatsByAddressParams,
  PoolControllerGetPoolStatsParams,
  PoolControllerGetVaultStatsParams,
  PricesControllerGetTokenPricesParams,
  PricesControllerListPricesParams,
  ProtocolBalanceResponse,
  StakingControllerGetStakedBalancesParams,
  TokenTransferControllerGetTokenTransferTransactionParams,
  Transaction,
  TransactionControllerGetTransactionsParams,
  ZapBridgeControllerGetZapInApprovalStateParams,
  ZapBridgeControllerGetZapInApprovalTransactionParams,
  ZapBridgeControllerGetZapInSupportedTokensParams,
  ZapBridgeControllerGetZapInTransactionParams,
  ZapInControllerGetZapInApprovalStateParams,
  ZapInControllerGetZapInApprovalTransactionParams,
  ZapInControllerGetZapInTransactionParams,
  ZapInLegacyControllerGetZapInApprovalStateParams,
  ZapInLegacyControllerGetZapInApprovalTransactionParams,
  ZapInLegacyControllerGetZapInTransactionParams,
  ZapOutControllerGetZapOutApprovalStateParams,
  ZapOutControllerGetZapOutApprovalTransactionParams,
  ZapOutControllerGetZapOutTransactionParams,
  ZapOutLegacyControllerGetZapOutApprovalStateParams,
  ZapOutLegacyControllerGetZapOutApprovalTransactionParams,
  ZapOutLegacyControllerGetZapOutTransactionParams,
} from "./data-contracts";
import type { HttpClient, RequestParams } from "./http-client";

export class V1<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Retrieve supported tokens and their prices
   *
   * @tags Miscellaneous Data Endpoints
   * @name PricesControllerListPrices
   * @summary Token Prices
   * @request GET:/v1/prices
   * @secure
   */
  pricesControllerListPrices = (query: PricesControllerListPricesParams, params: RequestParams = {}) =>
    this.http.request<{}, any>({
      path: `/v1/prices`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve supported tokens and their prices
   *
   * @tags Data API
   * @name PricesControllerGetTokenPrices
   * @summary Token Prices
   * @request GET:/v1/prices/{tokenAddress}
   * @secure
   */
  pricesControllerGetTokenPrices = (
    { tokenAddress, ...query }: PricesControllerGetTokenPricesParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/prices/${tokenAddress}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve a list of fiat currency exchange rates based on USD
   *
   * @tags Miscellaneous Data Endpoints
   * @name PricesControllerListFiatRates
   * @summary Fiat Currency Rates
   * @request GET:/v1/fiat-rates
   * @secure
   */
  pricesControllerListFiatRates = (params: RequestParams = {}) =>
    this.http.request<{}, any>({
      path: `/v1/fiat-rates`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Returns data about if a token has been approved. **spenderAddress** for exchanging is the **allowanceTarget** value is returnded from the Exchange Price endpoint.
   *
   * @tags Exchange
   * @name ApprovalControllerGetApprovalState
   * @summary Token Approval State
   * @request GET:/v1/approval-state
   * @secure
   */
  approvalControllerGetApprovalState = (query: ApprovalControllerGetApprovalStateParams, params: RequestParams = {}) =>
    this.http.request<{}, any>({
      path: `/v1/approval-state`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Returns data that can be used to build an ERC20 approval transaction for for a specific address. **spenderAddress** for exchanging is the **allowanceTarget** value is returnded from the Exchange Price endpoint.
   *
   * @tags Exchange
   * @name ApprovalControllerGetApprovalTransaction
   * @summary Token Approval Transaction
   * @request GET:/v1/approval-transaction
   * @secure
   */
  approvalControllerGetApprovalTransaction = (
    query: ApprovalControllerGetApprovalTransactionParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/approval-transaction`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description The old API is deprecated. Use the `?newBalances=true` query param to switch to the new API. Support for the old API will stop November 1st 2021.</br> Gets balances of different supported applications
   *
   * @tags Protocol Balances
   * @name BalanceControllerGetProtocolBalancesV2
   * @summary [DEPRECATION WARNING] (See below). Application Balances
   * @request GET:/v1/protocols/{appId}/balances
   * @secure
   */
  balanceControllerGetProtocolBalancesV2 = (
    { appId, ...query }: BalanceControllerGetProtocolBalancesV2Params,
    params: RequestParams = {},
  ) =>
    this.http.request<ProtocolBalanceResponse, any>({
      path: `/v1/protocols/${appId}/balances`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Gets the applications supported for each supported network
   *
   * @tags Protocol Balances
   * @name BalanceControllerGetSupportedV2Balances
   * @summary Supported Protocols
   * @request GET:/v1/protocols/balances/supported
   * @secure
   */
  balanceControllerGetSupportedV2Balances = (
    query: BalanceControllerGetSupportedV2BalancesParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/protocols/balances/supported`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @name BalanceControllerGetBalances
   * @request GET:/v1/balances
   * @secure
   */
  balanceControllerGetBalances = (query: BalanceControllerGetBalancesParams, params: RequestParams = {}) =>
    this.http.request<{}, any>({
      path: `/v1/balances`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Gets the pool types supported for retrieving stats on each supported network
   *
   * @tags Supported Protocols
   * @name PoolControllerGetSupportedPoolStatsTypes
   * @summary Supported Pool Stats
   * @request GET:/v1/pool-stats/supported
   * @secure
   */
  poolControllerGetSupportedPoolStatsTypes = (params: RequestParams = {}) =>
    this.http.request<{}, any>({
      path: `/v1/pool-stats/supported`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve pool stats for a given application
   *
   * @tags Protocol Stats
   * @name PoolControllerGetPoolStats
   * @summary Pool Stats
   * @request GET:/v1/pool-stats/{poolStatsType}
   * @secure
   */
  poolControllerGetPoolStats = (
    { poolStatsType, ...query }: PoolControllerGetPoolStatsParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/pool-stats/${poolStatsType}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve pool stats for a given application
   *
   * @tags Protocol Stats
   * @name PoolControllerGetPoolStatsByAddress
   * @summary Pool Stats
   * @request GET:/v1/pool-stats/{poolStatsType}/{poolAddress}
   * @secure
   */
  poolControllerGetPoolStatsByAddress = (
    { poolStatsType, poolAddress, ...query }: PoolControllerGetPoolStatsByAddressParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/pool-stats/${poolStatsType}/${poolAddress}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Gets the vault types supported for retrieving stats on each supported network
   *
   * @tags Supported Protocols
   * @name PoolControllerGetSupportedVaultStatsTypes
   * @summary Supported Vault Stats
   * @request GET:/v1/vault-stats/supported
   * @secure
   */
  poolControllerGetSupportedVaultStatsTypes = (params: RequestParams = {}) =>
    this.http.request<{}, any>({
      path: `/v1/vault-stats/supported`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve vault stats for a given application
   *
   * @tags Protocol Stats
   * @name PoolControllerGetVaultStats
   * @summary Vault Stats
   * @request GET:/v1/vault-stats/{vaultStatsType}
   * @secure
   */
  poolControllerGetVaultStats = (
    { vaultStatsType, ...query }: PoolControllerGetVaultStatsParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/vault-stats/${vaultStatsType}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Gets the lending types supported for retrieving stats on each supported network
   *
   * @tags Supported Protocols
   * @name PoolControllerGetSupportedLendingStats
   * @summary Supported Lending Stats
   * @request GET:/v1/lending-stats/supported
   * @secure
   */
  poolControllerGetSupportedLendingStats = (params: RequestParams = {}) =>
    this.http.request<{}, any>({
      path: `/v1/lending-stats/supported`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve lending stats for a given application
   *
   * @tags Protocol Stats
   * @name PoolControllerGetLendingPoolStats
   * @summary Lending Stats
   * @request GET:/v1/lending-stats/{lendingPoolStatsType}
   * @secure
   */
  poolControllerGetLendingPoolStats = (
    { lendingPoolStatsType, ...query }: PoolControllerGetLendingPoolStatsParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/lending-stats/${lendingPoolStatsType}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieves all app definitions.
   *
   * @tags Apps
   * @name AppsControllerGetApps
   * @summary List all apps
   * @request GET:/v1/apps
   * @secure
   */
  appsControllerGetApps = (params: RequestParams = {}) =>
    this.http.request<AppDefinition, any>({
      path: `/v1/apps`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieves an app definition by identifier.
   *
   * @tags Apps
   * @name AppsControllerGetApp
   * @summary Get app by ID
   * @request GET:/v1/apps/{appId}
   * @secure
   */
  appsControllerGetApp = (appId: string, params: RequestParams = {}) =>
    this.http.request<AppDefinition[], any>({
      path: `/v1/apps/${appId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieve token market data for a given application
   *
   * @tags Market Data
   * @name MarketControllerGetMarketData
   * @summary Application Market Data
   * @request GET:/v1/protocols/{appId}/token-market-data
   * @secure
   */
  marketControllerGetMarketData = (
    { appId, ...query }: MarketControllerGetMarketDataParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/protocols/${appId}/token-market-data`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve farms for a given application
   *
   * @tags Farms Market Data
   * @name FarmsControllerGetFarmsMarketData
   * @summary Application Farms
   * @request GET:/v1/protocols/{appId}/farms
   * @secure
   */
  farmsControllerGetFarmsMarketData = (
    { appId, ...query }: FarmsControllerGetFarmsMarketDataParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/protocols/${appId}/farms`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Returns data about the amount received if a trade would be made. **Should be called whenever a price needs to be calculated.**
   *
   * @tags Exchange
   * @name ExchangeControllerGetExchangePrice
   * @summary Exchange Price
   * @request GET:/v1/exchange/price
   * @secure
   */
  exchangeControllerGetExchangePrice = (query: ExchangeControllerGetExchangePriceParams, params: RequestParams = {}) =>
    this.http.request<{}, any>({
      path: `/v1/exchange/price`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Returns both the relative price for a trade as well as the call data used to sumbit a transaction for a trade. **Should only be called when a trade is ready to be submitted.**
   *
   * @tags Exchange
   * @name ExchangeControllerGetExchangeQuote
   * @summary Exchange Quote
   * @request GET:/v1/exchange/quote
   * @secure
   */
  exchangeControllerGetExchangeQuote = (query: ExchangeControllerGetExchangeQuoteParams, params: RequestParams = {}) =>
    this.http.request<{}, any>({
      path: `/v1/exchange/quote`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Returns the exchanges supported by Zapper API.
   *
   * @tags Exchange
   * @name ExchangeControllerGetSupportedExchanges
   * @summary Supported exchanges
   * @request GET:/v1/exchange/supported
   * @secure
   */
  exchangeControllerGetSupportedExchanges = (params: RequestParams = {}) =>
    this.http.request<{}, any>({
      path: `/v1/exchange/supported`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieves farms for a given farm type on the Ethereum mainnet network
   *
   * @tags Protocol Stats
   * @name FarmFetcherControllerGetEthereumFarms
   * @summary Farm Stats
   * @request GET:/v1/farms/{farmStatsType}
   * @secure
   */
  farmFetcherControllerGetEthereumFarms = (
    { farmStatsType, ...query }: FarmFetcherControllerGetEthereumFarmsParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/farms/${farmStatsType}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieves an ERC20 approval status for an application zap-in
   *
   * @tags Farm Transactions
   * @name FarmStakingControllerGetApprovalState
   * @summary Farm Approval State
   * @request GET:/v1/farms/{farmStatsType}/approval-state
   * @secure
   */
  farmStakingControllerGetApprovalState = (
    { farmStatsType, ...query }: FarmStakingControllerGetApprovalStateParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/farms/${farmStatsType}/approval-state`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Builds an ERC20 approval transaction for staking a token in a farm
   *
   * @tags Farm Transactions
   * @name FarmStakingControllerGetApprovalTransaction
   * @summary Farm Approval Transaction
   * @request GET:/v1/farms/{farmStatsType}/approval-transaction
   * @secure
   */
  farmStakingControllerGetApprovalTransaction = (
    { farmStatsType, ...query }: FarmStakingControllerGetApprovalTransactionParams,
    params: RequestParams = {},
  ) =>
    this.http.request<Transaction, any>({
      path: `/v1/farms/${farmStatsType}/approval-transaction`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Builds a staking transaction for usage with Web3
   *
   * @tags Farm Transactions
   * @name FarmStakingControllerGetStakeTransaction
   * @summary Farm Stake Transaction
   * @request GET:/v1/farms/{farmStatsType}/stake
   * @secure
   */
  farmStakingControllerGetStakeTransaction = (
    { farmStatsType, ...query }: FarmStakingControllerGetStakeTransactionParams,
    params: RequestParams = {},
  ) =>
    this.http.request<Transaction, any>({
      path: `/v1/farms/${farmStatsType}/stake`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Builds a claim transaction for usage with Web3
   *
   * @tags Farm Transactions
   * @name FarmStakingControllerGetClaimTransaction
   * @summary Farm Claim Transaction
   * @request GET:/v1/farms/{farmStatsType}/claim
   * @secure
   */
  farmStakingControllerGetClaimTransaction = (
    { farmStatsType, ...query }: FarmStakingControllerGetClaimTransactionParams,
    params: RequestParams = {},
  ) =>
    this.http.request<Transaction, any>({
      path: `/v1/farms/${farmStatsType}/claim`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Builds an exit transaction for usage with Web3
   *
   * @tags Farm Transactions
   * @name FarmStakingControllerGetExitTransaction
   * @summary Farm Exit Transaction
   * @request GET:/v1/farms/{farmStatsType}/exit
   * @secure
   */
  farmStakingControllerGetExitTransaction = (
    { farmStatsType, ...query }: FarmStakingControllerGetExitTransactionParams,
    params: RequestParams = {},
  ) =>
    this.http.request<Transaction, any>({
      path: `/v1/farms/${farmStatsType}/exit`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieve a gas price aggregated from multiple different sources
   *
   * @tags Miscellaneous Data Endpoints
   * @name GasPriceControllerGetGasPrice
   * @summary Gas Price
   * @request GET:/v1/gas-price
   * @secure
   */
  gasPriceControllerGetGasPrice = (query: GasPriceControllerGetGasPriceParams, params: RequestParams = {}) =>
    this.http.request<GasPricesResponse, any>({
      path: `/v1/gas-price`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Provides a list of networks to app IDs that are supported by the Zap In routes.
   *
   * @tags Zap In
   * @name ZapInControllerGetSupportedZapIns
   * @summary Supported Zap Ins
   * @request GET:/v1/zap-in/{type}/supported
   * @secure
   */
  zapInControllerGetSupportedZapIns = (
    type:
      | "base"
      | "claimable"
      | "collateral"
      | "insurance"
      | "interest-bearing"
      | "leveraged-position"
      | "nft"
      | "option"
      | "pool"
      | "vault",
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/zap-in/${type}/supported`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieves an ERC20 approval status for an application zap-in
   *
   * @tags Zap In
   * @name ZapInControllerGetZapInApprovalState
   * @summary Zap In Approval State
   * @request GET:/v1/zap-in/{type}/{appId}/approval-state
   * @secure
   */
  zapInControllerGetZapInApprovalState = (
    { type, appId, ...query }: ZapInControllerGetZapInApprovalStateParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/zap-in/${type}/${appId}/approval-state`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Builds an ERC20 approval transaction for an application zap-in
   *
   * @tags Zap In
   * @name ZapInControllerGetZapInApprovalTransaction
   * @summary Zap In Approval Transaction
   * @request GET:/v1/zap-in/{type}/{appId}/approval-transaction
   * @secure
   */
  zapInControllerGetZapInApprovalTransaction = (
    { type, appId, ...query }: ZapInControllerGetZapInApprovalTransactionParams,
    params: RequestParams = {},
  ) =>
    this.http.request<Transaction, any>({
      path: `/v1/zap-in/${type}/${appId}/approval-transaction`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Builds a zap-in transaction for usage with Web3, complete with best swap from 0x.
   *
   * @tags Zap In
   * @name ZapInControllerGetZapInTransaction
   * @summary Zap In Transaction
   * @request GET:/v1/zap-in/{type}/{appId}/transaction
   * @secure
   */
  zapInControllerGetZapInTransaction = (
    { type, appId, ...query }: ZapInControllerGetZapInTransactionParams,
    params: RequestParams = {},
  ) =>
    this.http.request<Transaction, any>({
      path: `/v1/zap-in/${type}/${appId}/transaction`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Provides a list of networks to app IDs that are supported by the Zap In routes. Use `/v1/zap-in/:type/supported` instead.
   *
   * @tags Zap In
   * @name ZapInLegacyControllerGetSupportedZapIns
   * @summary Supported Zap Ins (DEPRECATED)
   * @request GET:/v1/zap-in/supported
   * @deprecated
   * @secure
   */
  zapInLegacyControllerGetSupportedZapIns = (params: RequestParams = {}) =>
    this.http.request<{}, any>({
      path: `/v1/zap-in/supported`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieves an ERC20 approval status for a protocol zap-in. Use `/v1/zap-in/:type/:appId/approval-state` instead.
   *
   * @tags Zap In
   * @name ZapInLegacyControllerGetZapInApprovalState
   * @summary Zap In Approval State (DEPRECATED)
   * @request GET:/v1/zap-in/{appId}/approval-state
   * @deprecated
   * @secure
   */
  zapInLegacyControllerGetZapInApprovalState = (
    { appId, ...query }: ZapInLegacyControllerGetZapInApprovalStateParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/zap-in/${appId}/approval-state`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Builds an ERC20 approval transaction for a protocol zap-in. Use `/v1/zap-in/:type/:appId/approval-transaction` instead.
   *
   * @tags Zap In
   * @name ZapInLegacyControllerGetZapInApprovalTransaction
   * @summary Zap In Approval Transaction (DEPRECATED)
   * @request GET:/v1/zap-in/{appId}/approval-transaction
   * @deprecated
   * @secure
   */
  zapInLegacyControllerGetZapInApprovalTransaction = (
    { appId, ...query }: ZapInLegacyControllerGetZapInApprovalTransactionParams,
    params: RequestParams = {},
  ) =>
    this.http.request<Transaction, any>({
      path: `/v1/zap-in/${appId}/approval-transaction`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Builds a zap-in transaction for usage with Web3, complete with best swap from 0x. Use `/v1/zap-in/:type/:appId/transaction` instead.
   *
   * @tags Zap In
   * @name ZapInLegacyControllerGetZapInTransaction
   * @summary Zap In Transaction (DEPRECATED)
   * @request GET:/v1/zap-in/{appId}/transaction
   * @deprecated
   * @secure
   */
  zapInLegacyControllerGetZapInTransaction = (
    { appId, ...query }: ZapInLegacyControllerGetZapInTransactionParams,
    params: RequestParams = {},
  ) =>
    this.http.request<Transaction, any>({
      path: `/v1/zap-in/${appId}/transaction`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Provides a list of networks to app IDs that are supported by the Zap Out routes.
   *
   * @tags Zap Out
   * @name ZapOutControllerGetSupportedZapOuts
   * @summary Supported Zap Outs
   * @request GET:/v1/zap-out/{type}/supported
   * @secure
   */
  zapOutControllerGetSupportedZapOuts = (
    type:
      | "base"
      | "claimable"
      | "collateral"
      | "insurance"
      | "interest-bearing"
      | "leveraged-position"
      | "nft"
      | "option"
      | "pool"
      | "vault",
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/zap-out/${type}/supported`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieves an ERC20 approval status for an application zap-out
   *
   * @tags Zap Out
   * @name ZapOutControllerGetZapOutApprovalState
   * @summary Zap Out Approval State
   * @request GET:/v1/zap-out/{type}/{appId}/approval-state
   * @secure
   */
  zapOutControllerGetZapOutApprovalState = (
    { type, appId, ...query }: ZapOutControllerGetZapOutApprovalStateParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/zap-out/${type}/${appId}/approval-state`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Builds an ERC20 approval transaction for an application zap-out
   *
   * @tags Zap Out
   * @name ZapOutControllerGetZapOutApprovalTransaction
   * @summary Zap Out Approval Transaction
   * @request GET:/v1/zap-out/{type}/{appId}/approval-transaction
   * @secure
   */
  zapOutControllerGetZapOutApprovalTransaction = (
    { type, appId, ...query }: ZapOutControllerGetZapOutApprovalTransactionParams,
    params: RequestParams = {},
  ) =>
    this.http.request<Transaction, any>({
      path: `/v1/zap-out/${type}/${appId}/approval-transaction`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Builds a zap-out transaction for usage with Web3, complete with best swap from 0x.
   *
   * @tags Zap Out
   * @name ZapOutControllerGetZapOutTransaction
   * @summary Zap Out Transaction
   * @request GET:/v1/zap-out/{type}/{appId}/transaction
   * @secure
   */
  zapOutControllerGetZapOutTransaction = (
    { type, appId, ...query }: ZapOutControllerGetZapOutTransactionParams,
    params: RequestParams = {},
  ) =>
    this.http.request<Transaction, any>({
      path: `/v1/zap-out/${type}/${appId}/transaction`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Provides a list of networks to app IDs that are supported by the Zap Out routes. Use `/v1/zap-out/:type/supported` instead.
   *
   * @tags Zap Out
   * @name ZapOutLegacyControllerGetSupportedZapOuts
   * @summary Supported Zap Outs (DEPRECATED)
   * @request GET:/v1/zap-out/supported
   * @deprecated
   * @secure
   */
  zapOutLegacyControllerGetSupportedZapOuts = (params: RequestParams = {}) =>
    this.http.request<{}, any>({
      path: `/v1/zap-out/supported`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieves an ERC20 approval status for a protocol zap-out Use `/v1/zap-out/:type/:appId/approval-state` instead.
   *
   * @tags Zap Out
   * @name ZapOutLegacyControllerGetZapOutApprovalState
   * @summary Zap Out Approval State (DEPRECATED)
   * @request GET:/v1/zap-out/{appId}/approval-state
   * @deprecated
   * @secure
   */
  zapOutLegacyControllerGetZapOutApprovalState = (
    { appId, ...query }: ZapOutLegacyControllerGetZapOutApprovalStateParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/zap-out/${appId}/approval-state`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Builds an ERC20 approval transaction for a protocol zap-out Use `/v1/zap-out/:type/:appId/approval-transaction` instead.
   *
   * @tags Zap Out
   * @name ZapOutLegacyControllerGetZapOutApprovalTransaction
   * @summary Zap Out Approval Transaction (DEPRECATED)
   * @request GET:/v1/zap-out/{appId}/approval-transaction
   * @deprecated
   * @secure
   */
  zapOutLegacyControllerGetZapOutApprovalTransaction = (
    { appId, ...query }: ZapOutLegacyControllerGetZapOutApprovalTransactionParams,
    params: RequestParams = {},
  ) =>
    this.http.request<Transaction, any>({
      path: `/v1/zap-out/${appId}/approval-transaction`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Builds a zap-out transaction for usage with Web3, complete with best swap from 0x. Use `/v1/zap-out/:type/:appId/transaction` instead.
   *
   * @tags Zap Out
   * @name ZapOutLegacyControllerGetZapOutTransaction
   * @summary Zap Out Transaction (DEPRECATED)
   * @request GET:/v1/zap-out/{appId}/transaction
   * @deprecated
   * @secure
   */
  zapOutLegacyControllerGetZapOutTransaction = (
    { appId, ...query }: ZapOutLegacyControllerGetZapOutTransactionParams,
    params: RequestParams = {},
  ) =>
    this.http.request<Transaction, any>({
      path: `/v1/zap-out/${appId}/transaction`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Returns a list of tokens supported on a specific network
   *
   * @tags Zap Bridge
   * @name ZapBridgeControllerGetZapInSupportedTokens
   * @summary Bridge Supported Tokens
   * @request GET:/v1/zap-bridge/{destinationNetwork}/supported-tokens
   * @secure
   */
  zapBridgeControllerGetZapInSupportedTokens = (
    { destinationNetwork, ...query }: ZapBridgeControllerGetZapInSupportedTokensParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/zap-bridge/${destinationNetwork}/supported-tokens`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieves an ERC20 approval state for a zap bridge into a network
   *
   * @tags Zap Bridge
   * @name ZapBridgeControllerGetZapInApprovalState
   * @summary Bridge Approval State
   * @request GET:/v1/zap-bridge/{destinationNetwork}/approval-state
   * @secure
   */
  zapBridgeControllerGetZapInApprovalState = (
    { destinationNetwork, ...query }: ZapBridgeControllerGetZapInApprovalStateParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/zap-bridge/${destinationNetwork}/approval-state`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Builds an ERC20 approval transaction for a zap bridge into a network
   *
   * @tags Zap Bridge
   * @name ZapBridgeControllerGetZapInApprovalTransaction
   * @summary Bridge Approval Transaction
   * @request GET:/v1/zap-bridge/{destinationNetwork}/approval-transaction
   * @secure
   */
  zapBridgeControllerGetZapInApprovalTransaction = (
    { destinationNetwork, ...query }: ZapBridgeControllerGetZapInApprovalTransactionParams,
    params: RequestParams = {},
  ) =>
    this.http.request<Transaction, any>({
      path: `/v1/zap-bridge/${destinationNetwork}/approval-transaction`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Builds a zap-bridge transaction for use with Web3
   *
   * @tags Zap Bridge
   * @name ZapBridgeControllerGetZapInTransaction
   * @summary Bridge Transaction
   * @request GET:/v1/zap-bridge/{destinationNetwork}/transaction
   * @secure
   */
  zapBridgeControllerGetZapInTransaction = (
    { destinationNetwork, ...query }: ZapBridgeControllerGetZapInTransactionParams,
    params: RequestParams = {},
  ) =>
    this.http.request<Transaction, any>({
      path: `/v1/zap-bridge/${destinationNetwork}/transaction`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieves staked balances for a given type
   *
   * @tags Protocol Balances
   * @name StakingControllerGetStakedBalances
   * @summary Staked Balances
   * @request GET:/v1/staked-balance/{stakedBalanceType}
   * @secure
   */
  stakingControllerGetStakedBalances = (
    { stakedBalanceType, ...query }: StakingControllerGetStakedBalancesParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/staked-balance/${stakedBalanceType}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description A list of support Ethereum ERC20 tokens
   *
   * @tags Miscellaneous Data Endpoints
   * @name TokenListControllerGetGasPrice
   * @summary Zapper Token List
   * @request GET:/v1/token-list
   * @secure
   */
  tokenListControllerGetGasPrice = (params: RequestParams = {}) =>
    this.http.request<{}, any>({
      path: `/v1/token-list`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Returns the information required to execute a transaction that will send over tokens to another wallet
   *
   * @tags Token Transfer
   * @name TokenTransferControllerGetTokenTransferTransaction
   * @summary Transfer Token to Another Wallet
   * @request GET:/v1/token-transfer/transaction
   * @secure
   */
  tokenTransferControllerGetTokenTransferTransaction = (
    query: TokenTransferControllerGetTokenTransferTransactionParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/token-transfer/transaction`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Data on past transactions for a specific address. Deprecated, use /transactions
   *
   * @tags Historical Transactions
   * @name TransactionControllerGetTransactionsDeprecated
   * @summary Historical Transactions
   * @request GET:/v1/transactions/{address}
   * @deprecated
   * @secure
   */
  transactionControllerGetTransactionsDeprecated = (address: string, params: RequestParams = {}) =>
    this.http.request<{}, any>({
      path: `/v1/transactions/${address}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Data on past transactions for addresses
   *
   * @tags Historical Transactions
   * @name TransactionControllerGetTransactions
   * @summary Historical Transactions
   * @request GET:/v1/transactions
   * @secure
   */
  transactionControllerGetTransactions = (
    query: TransactionControllerGetTransactionsParams,
    params: RequestParams = {},
  ) =>
    this.http.request<{}, any>({
      path: `/v1/transactions`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
