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

export interface BaseTokenBalance {
  /** Display name of the application. */
  appName: string;

  /** Id of the application. */
  appId: string;

  /** URL of the application logo. */
  appImgUrl: string;

  /** Token contract address */
  address: string;

  /** Token symbol */
  symbol: string;

  /** Token decimals */
  decimals: number;

  /** Token price in USD */
  price: number;

  /** Token address */
  tokenAddress: string;

  /** Token label */
  label?: string;

  /** Image name */
  img?: string;

  /** Reserve amount for certain token types */
  reserve?: number;

  /**
   * The meta type of the token balance object. Meta types are used to classify token balances
   * inside a balance object. E.g. a farm balance will have "staked" and "claimable" underlying token balances.
   */
  metaType?: string;

  /** Human readable balance */
  balance: number;

  /** Total value in USD */
  balanceUSD: number;

  /** Raw balance read from the contract */
  balanceRaw?: string;

  /** The balance type of the response */
  type: string;

  /** Can be exchanged on Zapper */
  canExchange?: boolean;

  /** Is hidden on Zapper */
  hide?: boolean;
}

export interface AbstractTokenBalance {
  /** Display name of the application. */
  appName: string;

  /** Id of the application. */
  appId: string;

  /** URL of the application logo. */
  appImgUrl: string;

  /** Token contract address */
  address: string;

  /** Token symbol */
  symbol: string;

  /** Token decimals */
  decimals: number;

  /** Token price in USD */
  price: number;

  /** Token address */
  tokenAddress: string;

  /** Token label */
  label?: string;

  /** Image name */
  img?: string;

  /** Reserve amount for certain token types */
  reserve?: number;

  /**
   * The meta type of the token balance object. Meta types are used to classify token balances
   * inside a balance object. E.g. a farm balance will have "staked" and "claimable" underlying token balances.
   */
  metaType?: string;

  /** Human readable balance */
  balance: number;

  /** Total value in USD */
  balanceUSD: number;

  /** Raw balance read from the contract */
  balanceRaw?: string;
}

export interface PoolTokenBalance {
  /** Display name of the application. */
  appName: string;

  /** Id of the application. */
  appId: string;

  /** URL of the application logo. */
  appImgUrl: string;

  /** Token contract address */
  address: string;

  /** Token symbol */
  symbol: string;

  /** Token decimals */
  decimals: number;

  /** Token price in USD */
  price: number;

  /** Token address */
  tokenAddress: string;

  /** Token label */
  label?: string;

  /** Image name */
  img?: string;

  /** Reserve amount for certain token types */
  reserve?: number;

  /**
   * The meta type of the token balance object. Meta types are used to classify token balances
   * inside a balance object. E.g. a farm balance will have "staked" and "claimable" underlying token balances.
   */
  metaType?: string;

  /** Human readable balance */
  balance: number;

  /** Total value in USD */
  balanceUSD: number;

  /** Raw balance read from the contract */
  balanceRaw?: string;

  /** The balance type of the response */
  type: string;

  /** The share of lp tokens owned by the account proportional to the total supply */
  share: number;

  /** Total supply of pool lp tokens */
  supply: number;

  /** The underlying assets that are held by the pool */
  tokens: AbstractTokenBalance;
}

export interface VaultTokenBalance {
  /** Display name of the application. */
  appName: string;

  /** Id of the application. */
  appId: string;

  /** URL of the application logo. */
  appImgUrl: string;

  /** Token contract address */
  address: string;

  /** Token symbol */
  symbol: string;

  /** Token decimals */
  decimals: number;

  /** Token price in USD */
  price: number;

  /** Token address */
  tokenAddress: string;

  /** Token label */
  label?: string;

  /** Image name */
  img?: string;

  /** Reserve amount for certain token types */
  reserve?: number;

  /**
   * The meta type of the token balance object. Meta types are used to classify token balances
   * inside a balance object. E.g. a farm balance will have "staked" and "claimable" underlying token balances.
   */
  metaType?: string;

  /** Human readable balance */
  balance: number;

  /** Total value in USD */
  balanceUSD: number;

  /** Raw balance read from the contract */
  balanceRaw?: string;

  /** The balance type of the response */
  type: string;

  /** Price per share of the vault token */
  pricePerShare?: number;

  /** Can deposit on Zapper */
  canDeposit?: boolean;

  /** Percent yield earned annually */
  apy?: number;

  /** Different types of underlying tokens that can be held in the vault */
  tokens: (AbstractTokenBalance | PoolTokenBalance)[];
}

export interface InterestBearingTokenBalance {
  /** Display name of the application. */
  appName: string;

  /** Id of the application. */
  appId: string;

  /** URL of the application logo. */
  appImgUrl: string;

  /** Token contract address */
  address: string;

  /** Token symbol */
  symbol: string;

  /** Token decimals */
  decimals: number;

  /** Token price in USD */
  price: number;

  /** Token address */
  tokenAddress: string;

  /** Token label */
  label?: string;

  /** Image name */
  img?: string;

  /** Reserve amount for certain token types */
  reserve?: number;

  /**
   * The meta type of the token balance object. Meta types are used to classify token balances
   * inside a balance object. E.g. a farm balance will have "staked" and "claimable" underlying token balances.
   */
  metaType?: string;

  /** Human readable balance */
  balance: number;

  /** Total value in USD */
  balanceUSD: number;

  /** Raw balance read from the contract */
  balanceRaw?: string;

  /** The balance type of the response */
  type: string;

  /** Percent yield earned annually */
  apy?: number;
}

export interface OptionTokenBalance {
  /** Display name of the application. */
  appName: string;

  /** Id of the application. */
  appId: string;

  /** URL of the application logo. */
  appImgUrl: string;

  /** Token contract address */
  address: string;

  /** Token symbol */
  symbol: string;

  /** Token decimals */
  decimals: number;

  /** Token price in USD */
  price: number;

  /** Token address */
  tokenAddress: string;

  /** Token label */
  label?: string;

  /** Image name */
  img?: string;

  /** Reserve amount for certain token types */
  reserve?: number;

  /**
   * The meta type of the token balance object. Meta types are used to classify token balances
   * inside a balance object. E.g. a farm balance will have "staked" and "claimable" underlying token balances.
   */
  metaType?: string;

  /** Human readable balance */
  balance: number;

  /** Total value in USD */
  balanceUSD: number;

  /** Raw balance read from the contract */
  balanceRaw?: string;

  /** The balance type of the response */
  type: string;
}

export interface NonFungibleTokenBalance {
  /** Display name of the application. */
  appName: string;

  /** Id of the application. */
  appId: string;

  /** URL of the application logo. */
  appImgUrl: string;

  /** Token contract address */
  address: string;

  /** Token symbol */
  symbol: string;

  /** Token decimals */
  decimals: number;

  /** Token price in USD */
  price: number;

  /** Token address */
  tokenAddress: string;

  /** Token label */
  label?: string;

  /** Image name */
  img?: string;

  /** Reserve amount for certain token types */
  reserve?: number;

  /**
   * The meta type of the token balance object. Meta types are used to classify token balances
   * inside a balance object. E.g. a farm balance will have "staked" and "claimable" underlying token balances.
   */
  metaType?: string;

  /** Human readable balance */
  balance: number;

  /** Total value in USD */
  balanceUSD: number;

  /** Raw balance read from the contract */
  balanceRaw?: string;

  /** The balance type of the response */
  type: string;
}

export interface WalletBalance {
  /** Display name of the application. */
  appName: string;

  /** Id of the application. */
  appId: string;

  /** URL of the application logo. */
  appImgUrl: string;

  /** Total value in USD of the balance object. Calculated as the sum of its underlying assets. */
  balanceUSD: number;

  /** The underlying token balances of the balance object. */
  tokens: (
    | BaseTokenBalance
    | PoolTokenBalance
    | VaultTokenBalance
    | InterestBearingTokenBalance
    | OptionTokenBalance
    | NonFungibleTokenBalance
  )[];

  /** The balance type of the response */
  type: string;
}

export interface FarmBalance {
  /** Display name of the application. */
  appName: string;

  /** Id of the application. */
  appId: string;

  /** URL of the application logo. */
  appImgUrl: string;

  /** Total value in USD of the balance object. Calculated as the sum of its underlying assets. */
  balanceUSD: number;

  /** The underlying token balances of the balance object. */
  tokens: (
    | BaseTokenBalance
    | PoolTokenBalance
    | VaultTokenBalance
    | InterestBearingTokenBalance
    | OptionTokenBalance
    | NonFungibleTokenBalance
  )[];

  /** The balance type of the response */
  type: string;
}

export interface ClaimableBalance {
  /** Display name of the application. */
  appName: string;

  /** Id of the application. */
  appId: string;

  /** URL of the application logo. */
  appImgUrl: string;

  /** Total value in USD of the balance object. Calculated as the sum of its underlying assets. */
  balanceUSD: number;

  /** The underlying token balances of the balance object. */
  tokens: (
    | BaseTokenBalance
    | PoolTokenBalance
    | VaultTokenBalance
    | InterestBearingTokenBalance
    | OptionTokenBalance
    | NonFungibleTokenBalance
  )[];

  /** The balance type of the response */
  type: string;
}

export interface LeveragedPositionBalance {
  /** Display name of the application. */
  appName: string;

  /** Id of the application. */
  appId: string;

  /** URL of the application logo. */
  appImgUrl: string;

  /** Total value in USD of the balance object. Calculated as the sum of its underlying assets. */
  balanceUSD: number;

  /** The underlying token balances of the balance object. */
  tokens: (
    | BaseTokenBalance
    | PoolTokenBalance
    | VaultTokenBalance
    | InterestBearingTokenBalance
    | OptionTokenBalance
    | NonFungibleTokenBalance
  )[];

  /** The balance type of the response */
  type: string;
}

export interface LiquidityPoolBalance {
  /** Display name of the application. */
  appName: string;

  /** Id of the application. */
  appId: string;

  /** URL of the application logo. */
  appImgUrl: string;

  /** Total value in USD of the balance object. Calculated as the sum of its underlying assets. */
  balanceUSD: number;

  /** The underlying token balances of the balance object. */
  tokens: (
    | BaseTokenBalance
    | PoolTokenBalance
    | VaultTokenBalance
    | InterestBearingTokenBalance
    | OptionTokenBalance
    | NonFungibleTokenBalance
  )[];

  /** The balance type of the response */
  type: string;
}

export interface OptionBalance {
  /** Display name of the application. */
  appName: string;

  /** Id of the application. */
  appId: string;

  /** URL of the application logo. */
  appImgUrl: string;

  /** Total value in USD of the balance object. Calculated as the sum of its underlying assets. */
  balanceUSD: number;

  /** The underlying token balances of the balance object. */
  tokens: (
    | BaseTokenBalance
    | PoolTokenBalance
    | VaultTokenBalance
    | InterestBearingTokenBalance
    | OptionTokenBalance
    | NonFungibleTokenBalance
  )[];

  /** The balance type of the response */
  type: string;
}

export interface LendBalance {
  /** Display name of the application. */
  appName: string;

  /** Id of the application. */
  appId: string;

  /** URL of the application logo. */
  appImgUrl: string;

  /** Total value in USD of the balance object. Calculated as the sum of its underlying assets. */
  balanceUSD: number;

  /** The underlying token balances of the balance object. */
  tokens: (
    | BaseTokenBalance
    | PoolTokenBalance
    | VaultTokenBalance
    | InterestBearingTokenBalance
    | OptionTokenBalance
    | NonFungibleTokenBalance
  )[];

  /** The balance type of the response */
  type: string;
}

export interface BorrowBalance {
  /** Display name of the application. */
  appName: string;

  /** Id of the application. */
  appId: string;

  /** URL of the application logo. */
  appImgUrl: string;

  /** Total value in USD of the balance object. Calculated as the sum of its underlying assets. */
  balanceUSD: number;

  /** The underlying token balances of the balance object. */
  tokens: (
    | BaseTokenBalance
    | PoolTokenBalance
    | VaultTokenBalance
    | InterestBearingTokenBalance
    | OptionTokenBalance
    | NonFungibleTokenBalance
  )[];

  /** The balance type of the response */
  type: string;
}

export interface NftBalance {
  /** Display name of the application. */
  appName: string;

  /** Id of the application. */
  appId: string;

  /** URL of the application logo. */
  appImgUrl: string;

  /** Total value in USD of the balance object. Calculated as the sum of its underlying assets. */
  balanceUSD: number;

  /** The underlying token balances of the balance object. */
  tokens: (
    | BaseTokenBalance
    | PoolTokenBalance
    | VaultTokenBalance
    | InterestBearingTokenBalance
    | OptionTokenBalance
    | NonFungibleTokenBalance
  )[];

  /** The balance type of the response */
  type: string;
}

export interface VaultBalance {
  /** Display name of the application. */
  appName: string;

  /** Id of the application. */
  appId: string;

  /** URL of the application logo. */
  appImgUrl: string;

  /** Total value in USD of the balance object. Calculated as the sum of its underlying assets. */
  balanceUSD: number;

  /** The underlying token balances of the balance object. */
  tokens: (
    | BaseTokenBalance
    | PoolTokenBalance
    | VaultTokenBalance
    | InterestBearingTokenBalance
    | OptionTokenBalance
    | NonFungibleTokenBalance
  )[];

  /** The balance type of the response */
  type: string;
}

export interface CollateralBalance {
  /** Display name of the application. */
  appName: string;

  /** Id of the application. */
  appId: string;

  /** URL of the application logo. */
  appImgUrl: string;

  /** Total value in USD of the balance object. Calculated as the sum of its underlying assets. */
  balanceUSD: number;

  /** The underlying token balances of the balance object. */
  tokens: (
    | BaseTokenBalance
    | PoolTokenBalance
    | VaultTokenBalance
    | InterestBearingTokenBalance
    | OptionTokenBalance
    | NonFungibleTokenBalance
  )[];

  /** The balance type of the response */
  type: string;
}

export interface MetadataItem {
  label: string;

  /** value can be expressed as a number or string */
  value: string | number;
  type: string;
}

export interface ProductItem {
  label: string;

  /** Different types of balance responses. A balance describes a single logical grouping of users' assets, liability or equity within a DeFi application. */
  assets: (
    | WalletBalance
    | FarmBalance
    | ClaimableBalance
    | LeveragedPositionBalance
    | LiquidityPoolBalance
    | OptionBalance
    | LendBalance
    | BorrowBalance
    | NftBalance
    | VaultBalance
    | CollateralBalance
  )[];

  /** Metadata about the specific balance */
  meta: MetadataItem[];
}

export interface AddressBalanceResponse {
  /** Data on the specific balances */
  products: ProductItem[];

  /** Metadata about the overall response */
  meta: MetadataItem[];
}

export interface ProtocolBalanceResponse {
  /** An address grouped with its specific data */
  yourAddress: AddressBalanceResponse;
}

export interface AppDefinitionToken {
  /** Address of the token */
  address: string;

  /** Network of the token */
  network:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";
}

export interface AppDefinition {
  /** App ID */
  id: string;

  /** Name */
  name: string;

  /** App website */
  url: string;

  /** Is app integration deprecated */
  deprecated: boolean;

  /** Tags to describe this app */
  tags: (
    | "asset-bundles"
    | "asset-indexes"
    | "asset-management"
    | "derivatives"
    | "elastic-finance"
    | "exchange"
    | "fund-manager"
    | "gaming"
    | "infrastructure"
    | "insurance"
    | "lending"
    | "liquidity-pool"
    | "margin-trading"
    | "no-loss-lottery"
    | "options"
    | "payroll"
    | "perpetuals-exchange"
    | "real-estate"
    | "seigniorage"
    | "stablecoin"
    | "tokenized-risk-protocol"
    | "yield-aggregator"
  )[];

  /** Networks supported by this app integration */
  supportedNetworks: (
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony"
  )[];

  /** Primary brand color of this app */
  primaryColor?: string;

  /** Governance token of the app */
  token?: AppDefinitionToken;
}

export interface Transaction {
  /** Gas price in wei */
  gasPrice: string;

  /** Max gas fee */
  maxFeePerGas?: string;

  /** Max priority gas fee */
  maxPriorityFeePerGas?: string;

  /** The address for the sending account */
  from: string;

  /** The destination address of the message */
  to: string;

  /** The value transferred for the transaction in wei */
  value: string;

  /** The amount of gas to use for the transaction */
  gas: string;

  /** ABI byte string containing the data of the function call on a contract */
  data: string;
}

export interface GasPricesResponse {
  /** Standard gas price in Gwei */
  standard: object;

  /** Fast gas price in Gwei */
  fast: object;

  /** Instant gas price in Gwei */
  instant: object;
}

export interface PricesControllerListPricesParams {
  /** Retrieve prices for this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";
}

export interface PricesControllerGetTokenPricesParams {
  /** Retrieve prices for this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Retrieve prices for this timeframe */
  timeFrame?: "hour" | "day" | "week" | "month" | "year";

  /** Retrieve prices for this currency */
  currency?:
    | "USD"
    | "EUR"
    | "GBP"
    | "CAD"
    | "CNY"
    | "KRW"
    | "JPY"
    | "RUB"
    | "AUD"
    | "NZD"
    | "CHF"
    | "SGD"
    | "INR"
    | "BRL"
    | "ETH"
    | "BTC"
    | "HKD"
    | "SEK"
    | "NOK"
    | "MXN"
    | "TRY";
  tokenAddress: string;
}

export interface ApprovalControllerGetApprovalStateParams {
  /** Token contract address for approval */
  tokenAddress: string;

  /** Address of the spender */
  spenderAddress: string;

  /** Address of the owner */
  ownerAddress: string;

  /** Amount to validate against approved amount; defaults to user balance */
  amount?: string;

  /** Network that the token contract is on */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";
}

export interface ApprovalControllerGetApprovalTransactionParams {
  /** Gas price in wei */
  gasPrice: string;

  /** Max gas fee */
  maxFeePerGas?: string;

  /** Max priority gas fee */
  maxPriorityFeePerGas?: string;

  /** Token contract address for approval */
  tokenAddress: string;

  /** Address of the spender */
  spenderAddress: string;

  /** Address of the owner */
  ownerAddress: string;

  /** Amount to approve; defaults to user balance */
  amount?: string;

  /** Ignore the amount parameter and approve infinite allowance */
  allowInfinite?: boolean;

  /** Retrieve approval transaction for this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";
}

export interface BalanceControllerGetProtocolBalancesV2Params {
  /** Addresses for which to retrieve balances */
  "addresses[]": string[];

  /** Retrieve application balances for this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** ID of the application for which to retrieve the wallet balances */
  appId: string;
}

export interface BalanceControllerGetSupportedV2BalancesParams {
  /** Addresses for which to retrieve balances */
  "addresses[]": string[];
}

export interface BalanceControllerGetBalancesParams {
  /** Addresses for which to retrieve balances */
  "addresses[]": string[];
}

export interface PoolControllerGetPoolStatsParams {
  /** Retrieve supported pool types for this network */
  network:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Protocol for which to retrieve pool stats */
  poolStatsType: "curve" | "1inch" | "pancakeswap" | "quickswap" | "sushiswap" | "uniswap-v2";
}

export interface PoolControllerGetPoolStatsByAddressParams {
  /** Retrieve pool stats for this network */
  network:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Protocol for which to retrieve pool stats */
  poolStatsType: "curve" | "1inch" | "pancakeswap" | "quickswap" | "sushiswap" | "uniswap-v2";

  /** Address of the pool */
  poolAddress: string;
}

export interface PoolControllerGetVaultStatsParams {
  /** Retrieve vault stats for this network */
  network:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Protocol for which to retrieve vault stats */
  vaultStatsType: "mushroom" | "pickle" | "yearn";
}

export interface PoolControllerGetLendingPoolStatsParams {
  /** Retrieve lending stats for this network */
  network:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Protocol for which to retrieve lending pool stats */
  lendingPoolStatsType: "alpha-v1" | "alpha-v2" | "compound" | "cream-iron-bank" | "inverse";
}

export interface MarketControllerGetMarketDataParams {
  /** Retrieve market data for this network */
  network:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Token data type to retrieve */
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
    | "vault";

  /** Id of the application for which to retrieve market data. */
  appId: string;
}

export interface ZapInControllerGetZapInApprovalStateParams {
  /** Address of the seller */
  ownerAddress: string;

  /** Address of the token to sell */
  sellTokenAddress: string;

  /** Amount to validate against approved amount; defaults to user balance */
  amount?: string;

  /** Retrieve approval state for this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Type of zap in */
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
    | "vault";

  /** ID of the application to which to zap in */
  appId: string;
}

export interface ZapInControllerGetZapInApprovalTransactionParams {
  /** Gas price in wei */
  gasPrice: string;

  /** Max gas fee */
  maxFeePerGas?: string;

  /** Max priority gas fee */
  maxPriorityFeePerGas?: string;

  /** Address of the seller */
  ownerAddress: string;

  /** Address of the token to sell */
  sellTokenAddress: string;

  /** Amount to approve; defaults to user balance */
  amount?: string;

  /** Ignore the amount parameter and approve infinite allowance */
  allowInfinite?: boolean;

  /** Retrieve approval transaction for this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Type of zap in */
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
    | "vault";

  /** ID of the application to which to zap in */
  appId: string;
}

export interface ZapInControllerGetZapInTransactionParams {
  /** Gas price in wei */
  gasPrice: string;

  /** Max gas fee */
  maxFeePerGas?: string;

  /** Max priority gas fee */
  maxPriorityFeePerGas?: string;

  /** Address of the seller */
  ownerAddress: string;

  /** Amount to sell in base units of the sell token */
  sellAmount: string;

  /** Address of the token to sell */
  sellTokenAddress: string;

  /** Address of the pool */
  poolAddress: string;

  /** Slippage percentage as a decimal value */
  slippagePercentage: number;

  /** Build zap in transaction on this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Affiliate address to receive goodwill and fees when enabled */
  affiliateAddress?: string;

  /** Type of zap in */
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
    | "vault";

  /** ID of the application to which to zap in */
  appId: string;
}

export interface ZapInLegacyControllerGetZapInApprovalStateParams {
  /** Address of the seller */
  ownerAddress: string;

  /** Address of the token to sell */
  sellTokenAddress: string;

  /** Amount to validate against approved amount; defaults to user balance */
  amount?: string;

  /** Retrieve approval state for this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** ID of the application to which to zap in */
  appId: string;
}

export interface ZapInLegacyControllerGetZapInApprovalTransactionParams {
  /** Gas price in wei */
  gasPrice: string;

  /** Max gas fee */
  maxFeePerGas?: string;

  /** Max priority gas fee */
  maxPriorityFeePerGas?: string;

  /** Address of the seller */
  ownerAddress: string;

  /** Address of the token to sell */
  sellTokenAddress: string;

  /** Amount to approve; defaults to user balance */
  amount?: string;

  /** Ignore the amount parameter and approve infinite allowance */
  allowInfinite?: boolean;

  /** Retrieve approval transaction for this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** ID of the application to which to zap in */
  appId: string;
}

export interface ZapInLegacyControllerGetZapInTransactionParams {
  /** Gas price in wei */
  gasPrice: string;

  /** Max gas fee */
  maxFeePerGas?: string;

  /** Max priority gas fee */
  maxPriorityFeePerGas?: string;

  /** Address of the seller */
  ownerAddress: string;

  /** Amount to sell in base units of the sell token */
  sellAmount: string;

  /** Address of the token to sell */
  sellTokenAddress: string;

  /** Address of the pool */
  poolAddress: string;

  /** Slippage percentage as a decimal value */
  slippagePercentage: number;

  /** Build zap in transaction on this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Affiliate address to receive goodwill and fees when enabled */
  affiliateAddress?: string;

  /** ID of the application to which to zap in */
  appId: string;
}

export interface ZapOutControllerGetZapOutApprovalStateParams {
  /** Address of the seller */
  ownerAddress: string;

  /** Address of the token to sell */
  sellTokenAddress: string;

  /** Amount to validate against approved amount; defaults to user balance */
  amount?: string;

  /** Retrieve approval state for this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Type of zap out */
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
    | "vault";

  /** ID of the application from which to zap out */
  appId: string;
}

export interface ZapOutControllerGetZapOutApprovalTransactionParams {
  /** Gas price in wei */
  gasPrice: string;

  /** Max gas fee */
  maxFeePerGas?: string;

  /** Max priority gas fee */
  maxPriorityFeePerGas?: string;

  /** Address of the seller */
  ownerAddress: string;

  /** Address of the token to sell */
  sellTokenAddress: string;

  /** Amount to approve; defaults to user balance */
  amount?: string;

  /** Ignore the amount parameter and approve infinite allowance */
  allowInfinite?: boolean;

  /** Retrieve approval transaction for this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Type of zap out */
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
    | "vault";

  /** ID of the application from which to zap out */
  appId: string;
}

export interface ZapOutControllerGetZapOutTransactionParams {
  /** Gas price in wei */
  gasPrice: string;

  /** Max gas fee */
  maxFeePerGas?: string;

  /** Max priority gas fee */
  maxPriorityFeePerGas?: string;

  /** Address of the seller */
  ownerAddress: string;

  /** Amount to sell in base units of the pool token */
  sellAmount: string;

  /** Address of the token to receive */
  toTokenAddress: string;

  /** Address of the pool */
  poolAddress: string;

  /** Slippage percentage as a decimal value */
  slippagePercentage: number;

  /** Signature for zap outs that support gasless transactions */
  signature?: string;

  /** Build zap out transaction on this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Affiliate address to receive goodwill and fees when enabled */
  affiliateAddress?: string;

  /** Type of zap out */
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
    | "vault";

  /** ID of the application from which to zap out */
  appId: string;
}

export interface ZapOutLegacyControllerGetZapOutApprovalStateParams {
  /** Address of the seller */
  ownerAddress: string;

  /** Address of the token to sell */
  sellTokenAddress: string;

  /** Amount to validate against approved amount; defaults to user balance */
  amount?: string;

  /** Retrieve approval state for this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Id of the application from which to zap out */
  appId: string;
}

export interface ZapOutLegacyControllerGetZapOutApprovalTransactionParams {
  /** Gas price in wei */
  gasPrice: string;

  /** Max gas fee */
  maxFeePerGas?: string;

  /** Max priority gas fee */
  maxPriorityFeePerGas?: string;

  /** Address of the seller */
  ownerAddress: string;

  /** Address of the token to sell */
  sellTokenAddress: string;

  /** Amount to approve; defaults to user balance */
  amount?: string;

  /** Ignore the amount parameter and approve infinite allowance */
  allowInfinite?: boolean;

  /** Retrieve approval transaction for this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Id of the application from which to zap out */
  appId: string;
}

export interface ZapOutLegacyControllerGetZapOutTransactionParams {
  /** Gas price in wei */
  gasPrice: string;

  /** Max gas fee */
  maxFeePerGas?: string;

  /** Max priority gas fee */
  maxPriorityFeePerGas?: string;

  /** Address of the seller */
  ownerAddress: string;

  /** Amount to sell in base units of the pool token */
  sellAmount: string;

  /** Address of the token to receive */
  toTokenAddress: string;

  /** Address of the pool */
  poolAddress: string;

  /** Slippage percentage as a decimal value */
  slippagePercentage: number;

  /** Signature for zap outs that support gasless transactions */
  signature?: string;

  /** Build zap out transaction on this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Affiliate address to receive goodwill and fees when enabled */
  affiliateAddress?: string;

  /** Id of the application from which to zap out */
  appId: string;
}

export interface ZapBridgeControllerGetZapInSupportedTokensParams {
  /** Retrieve gas price for this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Network to which to zap in */
  destinationNetwork:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";
}

export interface ZapBridgeControllerGetZapInApprovalStateParams {
  /** Address of the seller */
  ownerAddress: string;

  /** Amount to sell in base units of the sell token */
  sellAmount: string;

  /** Address of the token to sell */
  sellTokenAddress: string;

  /** Address of the token to buy */
  buyTokenAddress: string;

  /** Approve infinite allowance to the bridge */
  allowInfinite?: boolean;

  /** Slippage percentage as a decimal value */
  slippagePercentage: number;

  /** Build bridge transaction on this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Affiliate address to receive goodwill and fees when enabled */
  affiliateAddress?: string;

  /** Network to which to zap in */
  destinationNetwork:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";
}

export interface ZapBridgeControllerGetZapInApprovalTransactionParams {
  /** Gas price in wei */
  gasPrice: string;

  /** Max gas fee */
  maxFeePerGas?: string;

  /** Max priority gas fee */
  maxPriorityFeePerGas?: string;

  /** Address of the seller */
  ownerAddress: string;

  /** Amount to sell in base units of the sell token */
  sellAmount: string;

  /** Address of the token to sell */
  sellTokenAddress: string;

  /** Address of the token to buy */
  buyTokenAddress: string;

  /** Approve infinite allowance to the bridge */
  allowInfinite?: boolean;

  /** Slippage percentage as a decimal value */
  slippagePercentage: number;

  /** Build bridge transaction on this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Affiliate address to receive goodwill and fees when enabled */
  affiliateAddress?: string;

  /** Network to which to zap in */
  destinationNetwork:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";
}

export interface ZapBridgeControllerGetZapInTransactionParams {
  /** Gas price in wei */
  gasPrice: string;

  /** Max gas fee */
  maxFeePerGas?: string;

  /** Max priority gas fee */
  maxPriorityFeePerGas?: string;

  /** Address of the seller */
  ownerAddress: string;

  /** Amount to sell in base units of the sell token */
  sellAmount: string;

  /** Address of the token to sell */
  sellTokenAddress: string;

  /** Address of the token to buy */
  buyTokenAddress: string;

  /** Approve infinite allowance to the bridge */
  allowInfinite?: boolean;

  /** Slippage percentage as a decimal value */
  slippagePercentage: number;

  /** Build bridge transaction on this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Affiliate address to receive goodwill and fees when enabled */
  affiliateAddress?: string;

  /** Network to which to zap in */
  destinationNetwork:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";
}

export interface ExchangeControllerGetExchangePriceParams {
  /** Gas price in wei */
  gasPrice: string;

  /** Max gas fee */
  maxFeePerGas?: string;

  /** Max priority gas fee */
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
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";
}

export interface ExchangeControllerGetExchangeQuoteParams {
  /** Gas price in wei */
  gasPrice: string;

  /** Max gas fee */
  maxFeePerGas?: string;

  /** Max priority gas fee */
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
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";
}

export interface FarmsControllerGetFarmsMarketDataParams {
  /** Retrieve farms for this network */
  network:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** ID of the application for which to retrieve farms */
  appId: string;
}

export interface FarmFetcherControllerGetEthereumFarmsParams {
  /** Retrieve farms for this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Type of farms to fetch */
  farmStatsType: "masterchef" | "single-staking" | "geyser" | "geyser-v2" | "gauge";
}

export interface FarmStakingControllerGetApprovalStateParams {
  /** Address of the staker */
  ownerAddress: string;

  /** Address of the reward contract */
  rewardAddress: string;

  /** Pool index if exists */
  poolIndex: number;

  /** Amount to validate against approved amount; defaults to user balance */
  amount?: string;

  /** Network that the token contract is on */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Type of farms to fetch */
  farmStatsType: "masterchef" | "single-staking" | "geyser" | "geyser-v2" | "gauge";
}

export interface FarmStakingControllerGetApprovalTransactionParams {
  /** Gas price in wei */
  gasPrice: string;

  /** Max gas fee */
  maxFeePerGas?: string;

  /** Max priority gas fee */
  maxPriorityFeePerGas?: string;

  /** Address of the staker */
  ownerAddress: string;

  /** Address of the reward contract */
  rewardAddress: string;

  /** Pool index if exists */
  poolIndex: number;

  /** Amount to approve; defaults to user balance */
  amount?: string;

  /** Ignore the amount parameter and approve infinite allowance */
  allowInfinite?: boolean;

  /** Network that the token contract is on */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Type of farms to fetch */
  farmStatsType: "masterchef" | "single-staking" | "geyser" | "geyser-v2" | "gauge";
}

export interface FarmStakingControllerGetStakeTransactionParams {
  /** Gas price in wei */
  gasPrice: string;

  /** Max gas fee */
  maxFeePerGas?: string;

  /** Max priority gas fee */
  maxPriorityFeePerGas?: string;

  /** Address of the staker */
  ownerAddress: string;

  /** Address of the reward contract */
  rewardAddress: string;

  /** Pool index if exists */
  poolIndex: number;

  /** Amount to stake in the base amount of the token */
  amount: string;

  /** Build stake transaction on this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Type of farms to fetch */
  farmStatsType: "masterchef" | "single-staking" | "geyser" | "geyser-v2" | "gauge";
}

export interface FarmStakingControllerGetClaimTransactionParams {
  /** Gas price in wei */
  gasPrice: string;

  /** Max gas fee */
  maxFeePerGas?: string;

  /** Max priority gas fee */
  maxPriorityFeePerGas?: string;

  /** Address of the staker */
  ownerAddress: string;

  /** Address of the reward contract */
  rewardAddress: string;

  /** Pool index if exists */
  poolIndex: number;

  /** Build claim transaction on this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Type of farms to fetch */
  farmStatsType: "masterchef" | "single-staking" | "geyser" | "geyser-v2" | "gauge";
}

export interface FarmStakingControllerGetExitTransactionParams {
  /** Gas price in wei */
  gasPrice: string;

  /** Max gas fee */
  maxFeePerGas?: string;

  /** Max priority gas fee */
  maxPriorityFeePerGas?: string;

  /** Address of the staker */
  ownerAddress: string;

  /** Address of the reward contract */
  rewardAddress: string;

  /** Pool index if exists */
  poolIndex: number;

  /** Amount to withdraw in the base amount of the token */
  amount: string;

  /** Build exit transaction on this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Type of farms to fetch */
  farmStatsType: "masterchef" | "single-staking" | "geyser" | "geyser-v2" | "gauge";
}

export interface GasPriceControllerGetGasPriceParams {
  /** Retrieve gas price for this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Retrieve post London gas price details */
  eip1559: boolean;
}

export interface StakingControllerGetStakedBalancesParams {
  /** Addresses for which to retrieve balances */
  "addresses[]": string[];

  /** Retrieve staked balances for this network */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";

  /** Staked balance type for which to retrieve the wallet balances */
  stakedBalanceType: "masterchef" | "geyser" | "geyser-v2" | "gauge" | "single-staking";
}

export interface TokenTransferControllerGetTokenTransferTransactionParams {
  /** Gas price in wei */
  gasPrice: string;

  /** Max gas fee */
  maxFeePerGas?: string;

  /** Max priority gas fee */
  maxPriorityFeePerGas?: string;

  /** Address of the token that is being transfered */
  tokenAddress: string;

  /** Address of wallet that will send the transfer */
  senderAddress: string;

  /** Address of wallet that will receive the transfer */
  receiverAddress: string;

  /** Amount to transfer */
  amount: string;

  /** Network where the transfer would be made */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";
}

export interface TransactionControllerGetTransactionsParams {
  /** Address to get historical transactions for */
  address: string;

  /** Addresses for which to retrieve ENS */
  "addresses[]": string[];

  /** Retrieve transactions for this network or all supported networks if not specified */
  network?:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum"
    | "celo"
    | "harmony";
}
