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

import type { GasPricesResponse, ProtocolBalanceResponse, Transaction } from "./data-contracts";

export namespace V1 {
  /**
   * @description Retrieve supported tokens and their prices
   * @tags Miscellaneous Data Endpoints
   * @name PricesControllerListPrices
   * @summary Token Prices
   * @request GET:/v1/prices
   * @secure
   */
  export namespace PricesControllerListPrices {
    export type RequestParams = {};
    export type RequestQuery = {
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Retrieve supported tokens and their prices
   * @tags Data API
   * @name PricesControllerGetTokenPrices
   * @summary Token Prices
   * @request GET:/v1/prices/{tokenAddress}
   * @secure
   */
  export namespace PricesControllerGetTokenPrices {
    export type RequestParams = { tokenAddress: string };
    export type RequestQuery = {
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
      timeFrame?: "hour" | "day" | "week" | "month" | "year";
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Retrieve a list of fiat currency exchange rates based on USD
   * @tags Miscellaneous Data Endpoints
   * @name PricesControllerListFiatRates
   * @summary Fiat Currency Rates
   * @request GET:/v1/fiat-rates
   * @secure
   */
  export namespace PricesControllerListFiatRates {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Returns data about if a token has been approved. **spenderAddress** for exchanging is the **allowanceTarget** value is returnded from the Exchange Price endpoint.
   * @tags Exchange
   * @name ApprovalControllerGetApprovalState
   * @summary Token Approval State
   * @request GET:/v1/approval-state
   * @secure
   */
  export namespace ApprovalControllerGetApprovalState {
    export type RequestParams = {};
    export type RequestQuery = {
      tokenAddress: string;
      spenderAddress: string;
      ownerAddress: string;
      amount?: string;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Returns data that can be used to build an ERC20 approval transaction for for a specific address. **spenderAddress** for exchanging is the **allowanceTarget** value is returnded from the Exchange Price endpoint.
   * @tags Exchange
   * @name ApprovalControllerGetApprovalTransaction
   * @summary Token Approval Transaction
   * @request GET:/v1/approval-transaction
   * @secure
   */
  export namespace ApprovalControllerGetApprovalTransaction {
    export type RequestParams = {};
    export type RequestQuery = {
      gasPrice: string;
      maxFeePerGas?: string;
      maxPriorityFeePerGas?: string;
      tokenAddress: string;
      spenderAddress: string;
      ownerAddress: string;
      amount?: string;
      allowInfinite?: boolean;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Gets balances of different supported protocols
   * @tags Protocol Balances
   * @name BalanceControllerGetProtocolBalancesV2
   * @summary Protocol Balances
   * @request GET:/v1/protocols/{protocol}/balances
   * @secure
   */
  export namespace BalanceControllerGetProtocolBalancesV2 {
    export type RequestParams = {
      protocol:
        | "aave"
        | "aave-safety-module"
        | "aave-amm"
        | "aave-v2"
        | "aavegotchi"
        | "abracadabra"
        | "adamant"
        | "alchemix"
        | "alpha-v1"
        | "alpha-v2"
        | "apeswap"
        | "apy"
        | "arcx"
        | "armor"
        | "augur"
        | "autofarm"
        | "b-protocol"
        | "badger"
        | "balancer-v1"
        | "balancer-v2"
        | "bancor"
        | "bao"
        | "barnbridge"
        | "barnbridge-smart-yield"
        | "based-money"
        | "basis-cash"
        | "basis-gold"
        | "basket-dao"
        | "beefy"
        | "bella"
        | "belt"
        | "benchmark"
        | "benqi"
        | "big-data"
        | "bitcoin"
        | "boring-dao"
        | "bzx"
        | "compound"
        | "convex"
        | "cover"
        | "cream"
        | "cream-iron-bank"
        | "cryptex"
        | "curve"
        | "defi-dollar"
        | "defi-swap"
        | "defisaver"
        | "derivadex"
        | "deversifi"
        | "dfi-money"
        | "dforce"
        | "dfyn"
        | "dhedge"
        | "dodo"
        | "dopex"
        | "dsd"
        | "dydx"
        | "88mph"
        | "88mph-v3"
        | "element"
        | "ellipsis"
        | "epns"
        | "esd"
        | "essentia"
        | "fei"
        | "float-protocol"
        | "frax"
        | "futureswap"
        | "gro"
        | "governor-dao"
        | "harvest"
        | "hegic"
        | "idle"
        | "illuvium"
        | "impossible-finance"
        | "index-coop"
        | "indexed"
        | "inverse"
        | "iron"
        | "keep-network"
        | "keeper-dao"
        | "klondike"
        | "klondike-v2"
        | "kyber-dmm"
        | "kyber-network"
        | "launchpool"
        | "linkswap"
        | "liquity"
        | "loopring"
        | "lydia"
        | "lyra"
        | "maker"
        | "mintr"
        | "mirror"
        | "mith-cash"
        | "mooniswap"
        | "mstable"
        | "mushroom"
        | "nft"
        | "nft20"
        | "nftx"
        | "nsure-network"
        | "olympus"
        | "1inch"
        | "onx"
        | "opium-network"
        | "opyn"
        | "orion-protocol"
        | "other"
        | "pancakeswap"
        | "pangolin"
        | "penguin"
        | "perpetual-protocol"
        | "pickle"
        | "pie-dao"
        | "polywhale"
        | "pooltogether"
        | "popsicle"
        | "powerpool"
        | "quickswap"
        | "rally"
        | "rari"
        | "rari-fuse"
        | "realt"
        | "reflexer"
        | "ribbon"
        | "sablier"
        | "saddle"
        | "sfinance"
        | "shapeshift"
        | "shared-stake"
        | "shell"
        | "smoothy"
        | "snowball"
        | "snowswap"
        | "spiritswap"
        | "spookyswap"
        | "superfluid"
        | "sushiswap"
        | "sushiswap-bentobox"
        | "sushiswap-kashi"
        | "stake-dao"
        | "strudel"
        | "swerve"
        | "synthetix"
        | "the-graph"
        | "tokemak"
        | "tokensets"
        | "tokenlon"
        | "tokens"
        | "tornado-cash"
        | "traderjoe"
        | "uniswap"
        | "uniswap-v2"
        | "uniswap-v3"
        | "unit"
        | "universe"
        | "value"
        | "venus"
        | "vesper"
        | "waultswap"
        | "wepiggy"
        | "xsigma"
        | "xtoken"
        | "yam"
        | "yaxis"
        | "yearn"
        | "yieldyak"
        | "zlot";
    };
    export type RequestQuery = {
      "addresses[]": string[];
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ProtocolBalanceResponse;
  }

  /**
   * @description Gets the protocols supported for each supported network
   * @tags Protocol Balances
   * @name BalanceControllerGetSupportedV2Balances
   * @summary Supported Protocols
   * @request GET:/v1/protocols/balances/supported
   * @secure
   */
  export namespace BalanceControllerGetSupportedV2Balances {
    export type RequestParams = {};
    export type RequestQuery = { "addresses[]": string[] };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Gets the pool types supported for retrieving stats on each supported network
   * @tags Supported Protocols
   * @name PoolControllerGetSupportedPoolStatsTypes
   * @summary Supported Pool Stats
   * @request GET:/v1/pool-stats/supported
   * @secure
   */
  export namespace PoolControllerGetSupportedPoolStatsTypes {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Retrieve pool stats for a given protocol
   * @tags Protocol Stats
   * @name PoolControllerGetPoolStats
   * @summary Pool Stats
   * @request GET:/v1/pool-stats/{poolStatsType}
   * @secure
   */
  export namespace PoolControllerGetPoolStats {
    export type RequestParams = {
      poolStatsType:
        | "balancer-v1"
        | "curve"
        | "dhedge"
        | "element"
        | "loopring"
        | "1inch"
        | "pancakeswap"
        | "quickswap"
        | "sushiswap"
        | "uniswap-v2";
    };
    export type RequestQuery = {
      network:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Retrieve pool stats for a given protocol
   * @tags Protocol Stats
   * @name PoolControllerGetPoolStatsByAddress
   * @summary Pool Stats
   * @request GET:/v1/pool-stats/{poolStatsType}/{poolAddress}
   * @secure
   */
  export namespace PoolControllerGetPoolStatsByAddress {
    export type RequestParams = {
      poolStatsType:
        | "balancer-v1"
        | "curve"
        | "dhedge"
        | "element"
        | "loopring"
        | "1inch"
        | "pancakeswap"
        | "quickswap"
        | "sushiswap"
        | "uniswap-v2";
      poolAddress: string;
    };
    export type RequestQuery = {
      network:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Gets the vault types supported for retrieving stats on each supported network
   * @tags Supported Protocols
   * @name PoolControllerGetSupportedVaultStatsTypes
   * @summary Supported Vault Stats
   * @request GET:/v1/vault-stats/supported
   * @secure
   */
  export namespace PoolControllerGetSupportedVaultStatsTypes {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Retrieve vault stats for a given protocol
   * @tags Protocol Stats
   * @name PoolControllerGetVaultStats
   * @summary Vault Stats
   * @request GET:/v1/vault-stats/{vaultStatsType}
   * @secure
   */
  export namespace PoolControllerGetVaultStats {
    export type RequestParams = {
      vaultStatsType: "cover" | "element" | "mushroom" | "pickle" | "pooltogether" | "yearn";
    };
    export type RequestQuery = {
      network:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Gets the lending types supported for retrieving stats on each supported network
   * @tags Supported Protocols
   * @name PoolControllerGetSupportedLendingStats
   * @summary Supported Lending Stats
   * @request GET:/v1/lending-stats/supported
   * @secure
   */
  export namespace PoolControllerGetSupportedLendingStats {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Retrieve lending stats for a given protocol
   * @tags Protocol Stats
   * @name PoolControllerGetLendingPoolStats
   * @summary Lending Stats
   * @request GET:/v1/lending-stats/{lendingPoolStatsType}
   * @secure
   */
  export namespace PoolControllerGetLendingPoolStats {
    export type RequestParams = {
      lendingPoolStatsType: "alpha-v1" | "alpha-v2" | "compound" | "cream-iron-bank" | "inverse";
    };
    export type RequestQuery = {
      network:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Retrieve token market data for a given protocol
   * @tags Market Data
   * @name MarketControllerGetMarketData
   * @summary Protocol Market Data
   * @request GET:/v1/protocols/{protocol}/token-market-data
   * @secure
   */
  export namespace MarketControllerGetMarketData {
    export type RequestParams = {
      protocol:
        | "aave"
        | "aave-safety-module"
        | "aave-amm"
        | "aave-v2"
        | "aavegotchi"
        | "abracadabra"
        | "adamant"
        | "alchemix"
        | "alpha-v1"
        | "alpha-v2"
        | "apeswap"
        | "apy"
        | "arcx"
        | "armor"
        | "augur"
        | "autofarm"
        | "b-protocol"
        | "badger"
        | "balancer-v1"
        | "balancer-v2"
        | "bancor"
        | "bao"
        | "barnbridge"
        | "barnbridge-smart-yield"
        | "based-money"
        | "basis-cash"
        | "basis-gold"
        | "basket-dao"
        | "beefy"
        | "bella"
        | "belt"
        | "benchmark"
        | "benqi"
        | "big-data"
        | "bitcoin"
        | "boring-dao"
        | "bzx"
        | "compound"
        | "convex"
        | "cover"
        | "cream"
        | "cream-iron-bank"
        | "cryptex"
        | "curve"
        | "defi-dollar"
        | "defi-swap"
        | "defisaver"
        | "derivadex"
        | "deversifi"
        | "dfi-money"
        | "dforce"
        | "dfyn"
        | "dhedge"
        | "dodo"
        | "dopex"
        | "dsd"
        | "dydx"
        | "88mph"
        | "88mph-v3"
        | "element"
        | "ellipsis"
        | "epns"
        | "esd"
        | "essentia"
        | "fei"
        | "float-protocol"
        | "frax"
        | "futureswap"
        | "gro"
        | "governor-dao"
        | "harvest"
        | "hegic"
        | "idle"
        | "illuvium"
        | "impossible-finance"
        | "index-coop"
        | "indexed"
        | "inverse"
        | "iron"
        | "keep-network"
        | "keeper-dao"
        | "klondike"
        | "klondike-v2"
        | "kyber-dmm"
        | "kyber-network"
        | "launchpool"
        | "linkswap"
        | "liquity"
        | "loopring"
        | "lydia"
        | "lyra"
        | "maker"
        | "mintr"
        | "mirror"
        | "mith-cash"
        | "mooniswap"
        | "mstable"
        | "mushroom"
        | "nft"
        | "nft20"
        | "nftx"
        | "nsure-network"
        | "olympus"
        | "1inch"
        | "onx"
        | "opium-network"
        | "opyn"
        | "orion-protocol"
        | "other"
        | "pancakeswap"
        | "pangolin"
        | "penguin"
        | "perpetual-protocol"
        | "pickle"
        | "pie-dao"
        | "polywhale"
        | "pooltogether"
        | "popsicle"
        | "powerpool"
        | "quickswap"
        | "rally"
        | "rari"
        | "rari-fuse"
        | "realt"
        | "reflexer"
        | "ribbon"
        | "sablier"
        | "saddle"
        | "sfinance"
        | "shapeshift"
        | "shared-stake"
        | "shell"
        | "smoothy"
        | "snowball"
        | "snowswap"
        | "spiritswap"
        | "spookyswap"
        | "superfluid"
        | "sushiswap"
        | "sushiswap-bentobox"
        | "sushiswap-kashi"
        | "stake-dao"
        | "strudel"
        | "swerve"
        | "synthetix"
        | "the-graph"
        | "tokemak"
        | "tokensets"
        | "tokenlon"
        | "tokens"
        | "tornado-cash"
        | "traderjoe"
        | "uniswap"
        | "uniswap-v2"
        | "uniswap-v3"
        | "unit"
        | "universe"
        | "value"
        | "venus"
        | "vesper"
        | "waultswap"
        | "wepiggy"
        | "xsigma"
        | "xtoken"
        | "yam"
        | "yaxis"
        | "yearn"
        | "yieldyak"
        | "zlot";
    };
    export type RequestQuery = {
      network:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Retrieve farms for a given protocol
   * @tags Farms Market Data
   * @name FarmsControllerGetFarmsMarketData
   * @summary Protocol Farms
   * @request GET:/v1/protocols/{protocol}/farms
   * @secure
   */
  export namespace FarmsControllerGetFarmsMarketData {
    export type RequestParams = {
      protocol:
        | "aave"
        | "aave-safety-module"
        | "aave-amm"
        | "aave-v2"
        | "aavegotchi"
        | "abracadabra"
        | "adamant"
        | "alchemix"
        | "alpha-v1"
        | "alpha-v2"
        | "apeswap"
        | "apy"
        | "arcx"
        | "armor"
        | "augur"
        | "autofarm"
        | "b-protocol"
        | "badger"
        | "balancer-v1"
        | "balancer-v2"
        | "bancor"
        | "bao"
        | "barnbridge"
        | "barnbridge-smart-yield"
        | "based-money"
        | "basis-cash"
        | "basis-gold"
        | "basket-dao"
        | "beefy"
        | "bella"
        | "belt"
        | "benchmark"
        | "benqi"
        | "big-data"
        | "bitcoin"
        | "boring-dao"
        | "bzx"
        | "compound"
        | "convex"
        | "cover"
        | "cream"
        | "cream-iron-bank"
        | "cryptex"
        | "curve"
        | "defi-dollar"
        | "defi-swap"
        | "defisaver"
        | "derivadex"
        | "deversifi"
        | "dfi-money"
        | "dforce"
        | "dfyn"
        | "dhedge"
        | "dodo"
        | "dopex"
        | "dsd"
        | "dydx"
        | "88mph"
        | "88mph-v3"
        | "element"
        | "ellipsis"
        | "epns"
        | "esd"
        | "essentia"
        | "fei"
        | "float-protocol"
        | "frax"
        | "futureswap"
        | "gro"
        | "governor-dao"
        | "harvest"
        | "hegic"
        | "idle"
        | "illuvium"
        | "impossible-finance"
        | "index-coop"
        | "indexed"
        | "inverse"
        | "iron"
        | "keep-network"
        | "keeper-dao"
        | "klondike"
        | "klondike-v2"
        | "kyber-dmm"
        | "kyber-network"
        | "launchpool"
        | "linkswap"
        | "liquity"
        | "loopring"
        | "lydia"
        | "lyra"
        | "maker"
        | "mintr"
        | "mirror"
        | "mith-cash"
        | "mooniswap"
        | "mstable"
        | "mushroom"
        | "nft"
        | "nft20"
        | "nftx"
        | "nsure-network"
        | "olympus"
        | "1inch"
        | "onx"
        | "opium-network"
        | "opyn"
        | "orion-protocol"
        | "other"
        | "pancakeswap"
        | "pangolin"
        | "penguin"
        | "perpetual-protocol"
        | "pickle"
        | "pie-dao"
        | "polywhale"
        | "pooltogether"
        | "popsicle"
        | "powerpool"
        | "quickswap"
        | "rally"
        | "rari"
        | "rari-fuse"
        | "realt"
        | "reflexer"
        | "ribbon"
        | "sablier"
        | "saddle"
        | "sfinance"
        | "shapeshift"
        | "shared-stake"
        | "shell"
        | "smoothy"
        | "snowball"
        | "snowswap"
        | "spiritswap"
        | "spookyswap"
        | "superfluid"
        | "sushiswap"
        | "sushiswap-bentobox"
        | "sushiswap-kashi"
        | "stake-dao"
        | "strudel"
        | "swerve"
        | "synthetix"
        | "the-graph"
        | "tokemak"
        | "tokensets"
        | "tokenlon"
        | "tokens"
        | "tornado-cash"
        | "traderjoe"
        | "uniswap"
        | "uniswap-v2"
        | "uniswap-v3"
        | "unit"
        | "universe"
        | "value"
        | "venus"
        | "vesper"
        | "waultswap"
        | "wepiggy"
        | "xsigma"
        | "xtoken"
        | "yam"
        | "yaxis"
        | "yearn"
        | "yieldyak"
        | "zlot";
    };
    export type RequestQuery = {
      network:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Returns data about the amount received if a trade would be made. **Should be called whenever a price needs to be calculated.**
   * @tags Exchange
   * @name ExchangeControllerGetExchangePrice
   * @summary Exchange Price
   * @request GET:/v1/exchange/price
   * @secure
   */
  export namespace ExchangeControllerGetExchangePrice {
    export type RequestParams = {};
    export type RequestQuery = {
      gasPrice: string;
      maxFeePerGas?: string;
      maxPriorityFeePerGas?: string;
      sellTokenAddress: string;
      buyTokenAddress: string;
      sellAmount: string;
      ownerAddress?: string;
      slippagePercentage?: number;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Returns both the relative price for a trade as well as the call data used to sumbit a transaction for a trade. **Should only be called when a trade is ready to be submitted.**
   * @tags Exchange
   * @name ExchangeControllerGetExchangeQuote
   * @summary Exchange Quote
   * @request GET:/v1/exchange/quote
   * @secure
   */
  export namespace ExchangeControllerGetExchangeQuote {
    export type RequestParams = {};
    export type RequestQuery = {
      gasPrice: string;
      maxFeePerGas?: string;
      maxPriorityFeePerGas?: string;
      sellTokenAddress: string;
      buyTokenAddress: string;
      sellAmount: string;
      ownerAddress?: string;
      slippagePercentage?: number;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Returns the exchanges supported by Zapper API.
   * @tags Exchange
   * @name ExchangeControllerGetSupportedExchanges
   * @summary Supported exchanges
   * @request GET:/v1/exchange/supported
   * @secure
   */
  export namespace ExchangeControllerGetSupportedExchanges {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Retrieves farms for a given farm type on the Ethereum mainnet network
   * @tags Protocol Stats
   * @name FarmFetcherControllerGetEthereumFarms
   * @summary Farm Stats
   * @request GET:/v1/farms/{farmStatsType}
   * @secure
   */
  export namespace FarmFetcherControllerGetEthereumFarms {
    export type RequestParams = { farmStatsType: "masterchef" | "single-staking" | "geyser" | "gauge" };
    export type RequestQuery = {
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Retrieves an ERC20 approval status for a protocol zap-in
   * @tags Farm Transactions
   * @name FarmStakingControllerGetApprovalState
   * @summary Farm Approval State
   * @request GET:/v1/farms/{farmStatsType}/approval-state
   * @secure
   */
  export namespace FarmStakingControllerGetApprovalState {
    export type RequestParams = { farmStatsType: "masterchef" | "single-staking" | "geyser" | "gauge" };
    export type RequestQuery = {
      ownerAddress: string;
      rewardAddress: string;
      poolIndex: number;
      amount?: string;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Builds an ERC20 approval transaction for staking a token in a farm
   * @tags Farm Transactions
   * @name FarmStakingControllerGetApprovalTransaction
   * @summary Farm Approval Transaction
   * @request GET:/v1/farms/{farmStatsType}/approval-transaction
   * @secure
   */
  export namespace FarmStakingControllerGetApprovalTransaction {
    export type RequestParams = { farmStatsType: "masterchef" | "single-staking" | "geyser" | "gauge" };
    export type RequestQuery = {
      gasPrice: string;
      maxFeePerGas?: string;
      maxPriorityFeePerGas?: string;
      ownerAddress: string;
      rewardAddress: string;
      poolIndex: number;
      amount?: string;
      allowInfinite?: boolean;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Transaction;
  }

  /**
   * @description Builds a staking transaction for usage with Web3
   * @tags Farm Transactions
   * @name FarmStakingControllerGetStakeTransaction
   * @summary Farm Stake Transaction
   * @request GET:/v1/farms/{farmStatsType}/stake
   * @secure
   */
  export namespace FarmStakingControllerGetStakeTransaction {
    export type RequestParams = { farmStatsType: "masterchef" | "single-staking" | "geyser" | "gauge" };
    export type RequestQuery = {
      gasPrice: string;
      maxFeePerGas?: string;
      maxPriorityFeePerGas?: string;
      ownerAddress: string;
      rewardAddress: string;
      poolIndex: number;
      amount: string;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Transaction;
  }

  /**
   * @description Builds a claim transaction for usage with Web3
   * @tags Farm Transactions
   * @name FarmStakingControllerGetClaimTransaction
   * @summary Farm Claim Transaction
   * @request GET:/v1/farms/{farmStatsType}/claim
   * @secure
   */
  export namespace FarmStakingControllerGetClaimTransaction {
    export type RequestParams = { farmStatsType: "masterchef" | "single-staking" | "geyser" | "gauge" };
    export type RequestQuery = {
      gasPrice: string;
      maxFeePerGas?: string;
      maxPriorityFeePerGas?: string;
      ownerAddress: string;
      rewardAddress: string;
      poolIndex: number;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Transaction;
  }

  /**
   * @description Builds an exit transaction for usage with Web3
   * @tags Farm Transactions
   * @name FarmStakingControllerGetExitTransaction
   * @summary Farm Exit Transaction
   * @request GET:/v1/farms/{farmStatsType}/exit
   * @secure
   */
  export namespace FarmStakingControllerGetExitTransaction {
    export type RequestParams = { farmStatsType: "masterchef" | "single-staking" | "geyser" | "gauge" };
    export type RequestQuery = {
      gasPrice: string;
      maxFeePerGas?: string;
      maxPriorityFeePerGas?: string;
      ownerAddress: string;
      rewardAddress: string;
      poolIndex: number;
      amount: string;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Transaction;
  }

  /**
   * @description Retrieve a gas price aggregated from multiple different sources
   * @tags Miscellaneous Data Endpoints
   * @name GasPriceControllerGetGasPrice
   * @summary Gas Price
   * @request GET:/v1/gas-price
   * @secure
   */
  export namespace GasPriceControllerGetGasPrice {
    export type RequestParams = {};
    export type RequestQuery = {
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
      eip1559: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GasPricesResponse;
  }

  /**
   * @description Provides a list of networks to protocols that are supported by the Zap In routes.
   * @tags Zap In
   * @name ZapInControllerGetSupportedZapIns
   * @summary Supported Zap Ins
   * @request GET:/v1/zap-in/{type}/supported
   * @secure
   */
  export namespace ZapInControllerGetSupportedZapIns {
    export type RequestParams = {
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
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Retrieves an ERC20 approval status for a protocol zap-in
   * @tags Zap In
   * @name ZapInControllerGetZapInApprovalState
   * @summary Zap In Approval State
   * @request GET:/v1/zap-in/{type}/{protocol}/approval-state
   * @secure
   */
  export namespace ZapInControllerGetZapInApprovalState {
    export type RequestParams = {
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
      protocol:
        | "aave"
        | "aave-safety-module"
        | "aave-amm"
        | "aave-v2"
        | "aavegotchi"
        | "abracadabra"
        | "adamant"
        | "alchemix"
        | "alpha-v1"
        | "alpha-v2"
        | "apeswap"
        | "apy"
        | "arcx"
        | "armor"
        | "augur"
        | "autofarm"
        | "b-protocol"
        | "badger"
        | "balancer-v1"
        | "balancer-v2"
        | "bancor"
        | "bao"
        | "barnbridge"
        | "barnbridge-smart-yield"
        | "based-money"
        | "basis-cash"
        | "basis-gold"
        | "basket-dao"
        | "beefy"
        | "bella"
        | "belt"
        | "benchmark"
        | "benqi"
        | "big-data"
        | "bitcoin"
        | "boring-dao"
        | "bzx"
        | "compound"
        | "convex"
        | "cover"
        | "cream"
        | "cream-iron-bank"
        | "cryptex"
        | "curve"
        | "defi-dollar"
        | "defi-swap"
        | "defisaver"
        | "derivadex"
        | "deversifi"
        | "dfi-money"
        | "dforce"
        | "dfyn"
        | "dhedge"
        | "dodo"
        | "dopex"
        | "dsd"
        | "dydx"
        | "88mph"
        | "88mph-v3"
        | "element"
        | "ellipsis"
        | "epns"
        | "esd"
        | "essentia"
        | "fei"
        | "float-protocol"
        | "frax"
        | "futureswap"
        | "gro"
        | "governor-dao"
        | "harvest"
        | "hegic"
        | "idle"
        | "illuvium"
        | "impossible-finance"
        | "index-coop"
        | "indexed"
        | "inverse"
        | "iron"
        | "keep-network"
        | "keeper-dao"
        | "klondike"
        | "klondike-v2"
        | "kyber-dmm"
        | "kyber-network"
        | "launchpool"
        | "linkswap"
        | "liquity"
        | "loopring"
        | "lydia"
        | "lyra"
        | "maker"
        | "mintr"
        | "mirror"
        | "mith-cash"
        | "mooniswap"
        | "mstable"
        | "mushroom"
        | "nft"
        | "nft20"
        | "nftx"
        | "nsure-network"
        | "olympus"
        | "1inch"
        | "onx"
        | "opium-network"
        | "opyn"
        | "orion-protocol"
        | "other"
        | "pancakeswap"
        | "pangolin"
        | "penguin"
        | "perpetual-protocol"
        | "pickle"
        | "pie-dao"
        | "polywhale"
        | "pooltogether"
        | "popsicle"
        | "powerpool"
        | "quickswap"
        | "rally"
        | "rari"
        | "rari-fuse"
        | "realt"
        | "reflexer"
        | "ribbon"
        | "sablier"
        | "saddle"
        | "sfinance"
        | "shapeshift"
        | "shared-stake"
        | "shell"
        | "smoothy"
        | "snowball"
        | "snowswap"
        | "spiritswap"
        | "spookyswap"
        | "superfluid"
        | "sushiswap"
        | "sushiswap-bentobox"
        | "sushiswap-kashi"
        | "stake-dao"
        | "strudel"
        | "swerve"
        | "synthetix"
        | "the-graph"
        | "tokemak"
        | "tokensets"
        | "tokenlon"
        | "tokens"
        | "tornado-cash"
        | "traderjoe"
        | "uniswap"
        | "uniswap-v2"
        | "uniswap-v3"
        | "unit"
        | "universe"
        | "value"
        | "venus"
        | "vesper"
        | "waultswap"
        | "wepiggy"
        | "xsigma"
        | "xtoken"
        | "yam"
        | "yaxis"
        | "yearn"
        | "yieldyak"
        | "zlot";
    };
    export type RequestQuery = {
      ownerAddress: string;
      sellTokenAddress: string;
      amount?: string;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Builds an ERC20 approval transaction for a protocol zap-in
   * @tags Zap In
   * @name ZapInControllerGetZapInApprovalTransaction
   * @summary Zap In Approval Transaction
   * @request GET:/v1/zap-in/{type}/{protocol}/approval-transaction
   * @secure
   */
  export namespace ZapInControllerGetZapInApprovalTransaction {
    export type RequestParams = {
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
      protocol:
        | "aave"
        | "aave-safety-module"
        | "aave-amm"
        | "aave-v2"
        | "aavegotchi"
        | "abracadabra"
        | "adamant"
        | "alchemix"
        | "alpha-v1"
        | "alpha-v2"
        | "apeswap"
        | "apy"
        | "arcx"
        | "armor"
        | "augur"
        | "autofarm"
        | "b-protocol"
        | "badger"
        | "balancer-v1"
        | "balancer-v2"
        | "bancor"
        | "bao"
        | "barnbridge"
        | "barnbridge-smart-yield"
        | "based-money"
        | "basis-cash"
        | "basis-gold"
        | "basket-dao"
        | "beefy"
        | "bella"
        | "belt"
        | "benchmark"
        | "benqi"
        | "big-data"
        | "bitcoin"
        | "boring-dao"
        | "bzx"
        | "compound"
        | "convex"
        | "cover"
        | "cream"
        | "cream-iron-bank"
        | "cryptex"
        | "curve"
        | "defi-dollar"
        | "defi-swap"
        | "defisaver"
        | "derivadex"
        | "deversifi"
        | "dfi-money"
        | "dforce"
        | "dfyn"
        | "dhedge"
        | "dodo"
        | "dopex"
        | "dsd"
        | "dydx"
        | "88mph"
        | "88mph-v3"
        | "element"
        | "ellipsis"
        | "epns"
        | "esd"
        | "essentia"
        | "fei"
        | "float-protocol"
        | "frax"
        | "futureswap"
        | "gro"
        | "governor-dao"
        | "harvest"
        | "hegic"
        | "idle"
        | "illuvium"
        | "impossible-finance"
        | "index-coop"
        | "indexed"
        | "inverse"
        | "iron"
        | "keep-network"
        | "keeper-dao"
        | "klondike"
        | "klondike-v2"
        | "kyber-dmm"
        | "kyber-network"
        | "launchpool"
        | "linkswap"
        | "liquity"
        | "loopring"
        | "lydia"
        | "lyra"
        | "maker"
        | "mintr"
        | "mirror"
        | "mith-cash"
        | "mooniswap"
        | "mstable"
        | "mushroom"
        | "nft"
        | "nft20"
        | "nftx"
        | "nsure-network"
        | "olympus"
        | "1inch"
        | "onx"
        | "opium-network"
        | "opyn"
        | "orion-protocol"
        | "other"
        | "pancakeswap"
        | "pangolin"
        | "penguin"
        | "perpetual-protocol"
        | "pickle"
        | "pie-dao"
        | "polywhale"
        | "pooltogether"
        | "popsicle"
        | "powerpool"
        | "quickswap"
        | "rally"
        | "rari"
        | "rari-fuse"
        | "realt"
        | "reflexer"
        | "ribbon"
        | "sablier"
        | "saddle"
        | "sfinance"
        | "shapeshift"
        | "shared-stake"
        | "shell"
        | "smoothy"
        | "snowball"
        | "snowswap"
        | "spiritswap"
        | "spookyswap"
        | "superfluid"
        | "sushiswap"
        | "sushiswap-bentobox"
        | "sushiswap-kashi"
        | "stake-dao"
        | "strudel"
        | "swerve"
        | "synthetix"
        | "the-graph"
        | "tokemak"
        | "tokensets"
        | "tokenlon"
        | "tokens"
        | "tornado-cash"
        | "traderjoe"
        | "uniswap"
        | "uniswap-v2"
        | "uniswap-v3"
        | "unit"
        | "universe"
        | "value"
        | "venus"
        | "vesper"
        | "waultswap"
        | "wepiggy"
        | "xsigma"
        | "xtoken"
        | "yam"
        | "yaxis"
        | "yearn"
        | "yieldyak"
        | "zlot";
    };
    export type RequestQuery = {
      gasPrice: string;
      maxFeePerGas?: string;
      maxPriorityFeePerGas?: string;
      ownerAddress: string;
      sellTokenAddress: string;
      amount?: string;
      allowInfinite?: boolean;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Transaction;
  }

  /**
   * @description Builds a zap-in transaction for usage with Web3, complete with best swap from 0x.
   * @tags Zap In
   * @name ZapInControllerGetZapInTransaction
   * @summary Zap In Transaction
   * @request GET:/v1/zap-in/{type}/{protocol}/transaction
   * @secure
   */
  export namespace ZapInControllerGetZapInTransaction {
    export type RequestParams = {
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
      protocol:
        | "aave"
        | "aave-safety-module"
        | "aave-amm"
        | "aave-v2"
        | "aavegotchi"
        | "abracadabra"
        | "adamant"
        | "alchemix"
        | "alpha-v1"
        | "alpha-v2"
        | "apeswap"
        | "apy"
        | "arcx"
        | "armor"
        | "augur"
        | "autofarm"
        | "b-protocol"
        | "badger"
        | "balancer-v1"
        | "balancer-v2"
        | "bancor"
        | "bao"
        | "barnbridge"
        | "barnbridge-smart-yield"
        | "based-money"
        | "basis-cash"
        | "basis-gold"
        | "basket-dao"
        | "beefy"
        | "bella"
        | "belt"
        | "benchmark"
        | "benqi"
        | "big-data"
        | "bitcoin"
        | "boring-dao"
        | "bzx"
        | "compound"
        | "convex"
        | "cover"
        | "cream"
        | "cream-iron-bank"
        | "cryptex"
        | "curve"
        | "defi-dollar"
        | "defi-swap"
        | "defisaver"
        | "derivadex"
        | "deversifi"
        | "dfi-money"
        | "dforce"
        | "dfyn"
        | "dhedge"
        | "dodo"
        | "dopex"
        | "dsd"
        | "dydx"
        | "88mph"
        | "88mph-v3"
        | "element"
        | "ellipsis"
        | "epns"
        | "esd"
        | "essentia"
        | "fei"
        | "float-protocol"
        | "frax"
        | "futureswap"
        | "gro"
        | "governor-dao"
        | "harvest"
        | "hegic"
        | "idle"
        | "illuvium"
        | "impossible-finance"
        | "index-coop"
        | "indexed"
        | "inverse"
        | "iron"
        | "keep-network"
        | "keeper-dao"
        | "klondike"
        | "klondike-v2"
        | "kyber-dmm"
        | "kyber-network"
        | "launchpool"
        | "linkswap"
        | "liquity"
        | "loopring"
        | "lydia"
        | "lyra"
        | "maker"
        | "mintr"
        | "mirror"
        | "mith-cash"
        | "mooniswap"
        | "mstable"
        | "mushroom"
        | "nft"
        | "nft20"
        | "nftx"
        | "nsure-network"
        | "olympus"
        | "1inch"
        | "onx"
        | "opium-network"
        | "opyn"
        | "orion-protocol"
        | "other"
        | "pancakeswap"
        | "pangolin"
        | "penguin"
        | "perpetual-protocol"
        | "pickle"
        | "pie-dao"
        | "polywhale"
        | "pooltogether"
        | "popsicle"
        | "powerpool"
        | "quickswap"
        | "rally"
        | "rari"
        | "rari-fuse"
        | "realt"
        | "reflexer"
        | "ribbon"
        | "sablier"
        | "saddle"
        | "sfinance"
        | "shapeshift"
        | "shared-stake"
        | "shell"
        | "smoothy"
        | "snowball"
        | "snowswap"
        | "spiritswap"
        | "spookyswap"
        | "superfluid"
        | "sushiswap"
        | "sushiswap-bentobox"
        | "sushiswap-kashi"
        | "stake-dao"
        | "strudel"
        | "swerve"
        | "synthetix"
        | "the-graph"
        | "tokemak"
        | "tokensets"
        | "tokenlon"
        | "tokens"
        | "tornado-cash"
        | "traderjoe"
        | "uniswap"
        | "uniswap-v2"
        | "uniswap-v3"
        | "unit"
        | "universe"
        | "value"
        | "venus"
        | "vesper"
        | "waultswap"
        | "wepiggy"
        | "xsigma"
        | "xtoken"
        | "yam"
        | "yaxis"
        | "yearn"
        | "yieldyak"
        | "zlot";
    };
    export type RequestQuery = {
      gasPrice: string;
      maxFeePerGas?: string;
      maxPriorityFeePerGas?: string;
      ownerAddress: string;
      sellAmount: string;
      sellTokenAddress: string;
      poolAddress: string;
      slippagePercentage: number;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
      affiliateAddress?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Transaction;
  }

  /**
   * @description Provides a list of networks to protocols that are supported by the Zap In routes. Use `/v1/zap-in/:type/supported` instead.
   * @tags Zap In
   * @name ZapInLegacyControllerGetSupportedZapIns
   * @summary Supported Zap Ins (DEPRECATED)
   * @request GET:/v1/zap-in/supported
   * @deprecated
   * @secure
   */
  export namespace ZapInLegacyControllerGetSupportedZapIns {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Retrieves an ERC20 approval status for a protocol zap-in. Use `/v1/zap-in/:type/:protocol/approval-state` instead.
   * @tags Zap In
   * @name ZapInLegacyControllerGetZapInApprovalState
   * @summary Zap In Approval State (DEPRECATED)
   * @request GET:/v1/zap-in/{protocol}/approval-state
   * @deprecated
   * @secure
   */
  export namespace ZapInLegacyControllerGetZapInApprovalState {
    export type RequestParams = {
      protocol:
        | "aave"
        | "aave-safety-module"
        | "aave-amm"
        | "aave-v2"
        | "aavegotchi"
        | "abracadabra"
        | "adamant"
        | "alchemix"
        | "alpha-v1"
        | "alpha-v2"
        | "apeswap"
        | "apy"
        | "arcx"
        | "armor"
        | "augur"
        | "autofarm"
        | "b-protocol"
        | "badger"
        | "balancer-v1"
        | "balancer-v2"
        | "bancor"
        | "bao"
        | "barnbridge"
        | "barnbridge-smart-yield"
        | "based-money"
        | "basis-cash"
        | "basis-gold"
        | "basket-dao"
        | "beefy"
        | "bella"
        | "belt"
        | "benchmark"
        | "benqi"
        | "big-data"
        | "bitcoin"
        | "boring-dao"
        | "bzx"
        | "compound"
        | "convex"
        | "cover"
        | "cream"
        | "cream-iron-bank"
        | "cryptex"
        | "curve"
        | "defi-dollar"
        | "defi-swap"
        | "defisaver"
        | "derivadex"
        | "deversifi"
        | "dfi-money"
        | "dforce"
        | "dfyn"
        | "dhedge"
        | "dodo"
        | "dopex"
        | "dsd"
        | "dydx"
        | "88mph"
        | "88mph-v3"
        | "element"
        | "ellipsis"
        | "epns"
        | "esd"
        | "essentia"
        | "fei"
        | "float-protocol"
        | "frax"
        | "futureswap"
        | "gro"
        | "governor-dao"
        | "harvest"
        | "hegic"
        | "idle"
        | "illuvium"
        | "impossible-finance"
        | "index-coop"
        | "indexed"
        | "inverse"
        | "iron"
        | "keep-network"
        | "keeper-dao"
        | "klondike"
        | "klondike-v2"
        | "kyber-dmm"
        | "kyber-network"
        | "launchpool"
        | "linkswap"
        | "liquity"
        | "loopring"
        | "lydia"
        | "lyra"
        | "maker"
        | "mintr"
        | "mirror"
        | "mith-cash"
        | "mooniswap"
        | "mstable"
        | "mushroom"
        | "nft"
        | "nft20"
        | "nftx"
        | "nsure-network"
        | "olympus"
        | "1inch"
        | "onx"
        | "opium-network"
        | "opyn"
        | "orion-protocol"
        | "other"
        | "pancakeswap"
        | "pangolin"
        | "penguin"
        | "perpetual-protocol"
        | "pickle"
        | "pie-dao"
        | "polywhale"
        | "pooltogether"
        | "popsicle"
        | "powerpool"
        | "quickswap"
        | "rally"
        | "rari"
        | "rari-fuse"
        | "realt"
        | "reflexer"
        | "ribbon"
        | "sablier"
        | "saddle"
        | "sfinance"
        | "shapeshift"
        | "shared-stake"
        | "shell"
        | "smoothy"
        | "snowball"
        | "snowswap"
        | "spiritswap"
        | "spookyswap"
        | "superfluid"
        | "sushiswap"
        | "sushiswap-bentobox"
        | "sushiswap-kashi"
        | "stake-dao"
        | "strudel"
        | "swerve"
        | "synthetix"
        | "the-graph"
        | "tokemak"
        | "tokensets"
        | "tokenlon"
        | "tokens"
        | "tornado-cash"
        | "traderjoe"
        | "uniswap"
        | "uniswap-v2"
        | "uniswap-v3"
        | "unit"
        | "universe"
        | "value"
        | "venus"
        | "vesper"
        | "waultswap"
        | "wepiggy"
        | "xsigma"
        | "xtoken"
        | "yam"
        | "yaxis"
        | "yearn"
        | "yieldyak"
        | "zlot";
    };
    export type RequestQuery = {
      ownerAddress: string;
      sellTokenAddress: string;
      amount?: string;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Builds an ERC20 approval transaction for a protocol zap-in. Use `/v1/zap-in/:type/:protocol/approval-transaction` instead.
   * @tags Zap In
   * @name ZapInLegacyControllerGetZapInApprovalTransaction
   * @summary Zap In Approval Transaction (DEPRECATED)
   * @request GET:/v1/zap-in/{protocol}/approval-transaction
   * @deprecated
   * @secure
   */
  export namespace ZapInLegacyControllerGetZapInApprovalTransaction {
    export type RequestParams = {
      protocol:
        | "aave"
        | "aave-safety-module"
        | "aave-amm"
        | "aave-v2"
        | "aavegotchi"
        | "abracadabra"
        | "adamant"
        | "alchemix"
        | "alpha-v1"
        | "alpha-v2"
        | "apeswap"
        | "apy"
        | "arcx"
        | "armor"
        | "augur"
        | "autofarm"
        | "b-protocol"
        | "badger"
        | "balancer-v1"
        | "balancer-v2"
        | "bancor"
        | "bao"
        | "barnbridge"
        | "barnbridge-smart-yield"
        | "based-money"
        | "basis-cash"
        | "basis-gold"
        | "basket-dao"
        | "beefy"
        | "bella"
        | "belt"
        | "benchmark"
        | "benqi"
        | "big-data"
        | "bitcoin"
        | "boring-dao"
        | "bzx"
        | "compound"
        | "convex"
        | "cover"
        | "cream"
        | "cream-iron-bank"
        | "cryptex"
        | "curve"
        | "defi-dollar"
        | "defi-swap"
        | "defisaver"
        | "derivadex"
        | "deversifi"
        | "dfi-money"
        | "dforce"
        | "dfyn"
        | "dhedge"
        | "dodo"
        | "dopex"
        | "dsd"
        | "dydx"
        | "88mph"
        | "88mph-v3"
        | "element"
        | "ellipsis"
        | "epns"
        | "esd"
        | "essentia"
        | "fei"
        | "float-protocol"
        | "frax"
        | "futureswap"
        | "gro"
        | "governor-dao"
        | "harvest"
        | "hegic"
        | "idle"
        | "illuvium"
        | "impossible-finance"
        | "index-coop"
        | "indexed"
        | "inverse"
        | "iron"
        | "keep-network"
        | "keeper-dao"
        | "klondike"
        | "klondike-v2"
        | "kyber-dmm"
        | "kyber-network"
        | "launchpool"
        | "linkswap"
        | "liquity"
        | "loopring"
        | "lydia"
        | "lyra"
        | "maker"
        | "mintr"
        | "mirror"
        | "mith-cash"
        | "mooniswap"
        | "mstable"
        | "mushroom"
        | "nft"
        | "nft20"
        | "nftx"
        | "nsure-network"
        | "olympus"
        | "1inch"
        | "onx"
        | "opium-network"
        | "opyn"
        | "orion-protocol"
        | "other"
        | "pancakeswap"
        | "pangolin"
        | "penguin"
        | "perpetual-protocol"
        | "pickle"
        | "pie-dao"
        | "polywhale"
        | "pooltogether"
        | "popsicle"
        | "powerpool"
        | "quickswap"
        | "rally"
        | "rari"
        | "rari-fuse"
        | "realt"
        | "reflexer"
        | "ribbon"
        | "sablier"
        | "saddle"
        | "sfinance"
        | "shapeshift"
        | "shared-stake"
        | "shell"
        | "smoothy"
        | "snowball"
        | "snowswap"
        | "spiritswap"
        | "spookyswap"
        | "superfluid"
        | "sushiswap"
        | "sushiswap-bentobox"
        | "sushiswap-kashi"
        | "stake-dao"
        | "strudel"
        | "swerve"
        | "synthetix"
        | "the-graph"
        | "tokemak"
        | "tokensets"
        | "tokenlon"
        | "tokens"
        | "tornado-cash"
        | "traderjoe"
        | "uniswap"
        | "uniswap-v2"
        | "uniswap-v3"
        | "unit"
        | "universe"
        | "value"
        | "venus"
        | "vesper"
        | "waultswap"
        | "wepiggy"
        | "xsigma"
        | "xtoken"
        | "yam"
        | "yaxis"
        | "yearn"
        | "yieldyak"
        | "zlot";
    };
    export type RequestQuery = {
      gasPrice: string;
      maxFeePerGas?: string;
      maxPriorityFeePerGas?: string;
      ownerAddress: string;
      sellTokenAddress: string;
      amount?: string;
      allowInfinite?: boolean;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Transaction;
  }

  /**
   * @description Builds a zap-in transaction for usage with Web3, complete with best swap from 0x. Use `/v1/zap-in/:type/:protocol/transaction` instead.
   * @tags Zap In
   * @name ZapInLegacyControllerGetZapInTransaction
   * @summary Zap In Transaction (DEPRECATED)
   * @request GET:/v1/zap-in/{protocol}/transaction
   * @deprecated
   * @secure
   */
  export namespace ZapInLegacyControllerGetZapInTransaction {
    export type RequestParams = {
      protocol:
        | "aave"
        | "aave-safety-module"
        | "aave-amm"
        | "aave-v2"
        | "aavegotchi"
        | "abracadabra"
        | "adamant"
        | "alchemix"
        | "alpha-v1"
        | "alpha-v2"
        | "apeswap"
        | "apy"
        | "arcx"
        | "armor"
        | "augur"
        | "autofarm"
        | "b-protocol"
        | "badger"
        | "balancer-v1"
        | "balancer-v2"
        | "bancor"
        | "bao"
        | "barnbridge"
        | "barnbridge-smart-yield"
        | "based-money"
        | "basis-cash"
        | "basis-gold"
        | "basket-dao"
        | "beefy"
        | "bella"
        | "belt"
        | "benchmark"
        | "benqi"
        | "big-data"
        | "bitcoin"
        | "boring-dao"
        | "bzx"
        | "compound"
        | "convex"
        | "cover"
        | "cream"
        | "cream-iron-bank"
        | "cryptex"
        | "curve"
        | "defi-dollar"
        | "defi-swap"
        | "defisaver"
        | "derivadex"
        | "deversifi"
        | "dfi-money"
        | "dforce"
        | "dfyn"
        | "dhedge"
        | "dodo"
        | "dopex"
        | "dsd"
        | "dydx"
        | "88mph"
        | "88mph-v3"
        | "element"
        | "ellipsis"
        | "epns"
        | "esd"
        | "essentia"
        | "fei"
        | "float-protocol"
        | "frax"
        | "futureswap"
        | "gro"
        | "governor-dao"
        | "harvest"
        | "hegic"
        | "idle"
        | "illuvium"
        | "impossible-finance"
        | "index-coop"
        | "indexed"
        | "inverse"
        | "iron"
        | "keep-network"
        | "keeper-dao"
        | "klondike"
        | "klondike-v2"
        | "kyber-dmm"
        | "kyber-network"
        | "launchpool"
        | "linkswap"
        | "liquity"
        | "loopring"
        | "lydia"
        | "lyra"
        | "maker"
        | "mintr"
        | "mirror"
        | "mith-cash"
        | "mooniswap"
        | "mstable"
        | "mushroom"
        | "nft"
        | "nft20"
        | "nftx"
        | "nsure-network"
        | "olympus"
        | "1inch"
        | "onx"
        | "opium-network"
        | "opyn"
        | "orion-protocol"
        | "other"
        | "pancakeswap"
        | "pangolin"
        | "penguin"
        | "perpetual-protocol"
        | "pickle"
        | "pie-dao"
        | "polywhale"
        | "pooltogether"
        | "popsicle"
        | "powerpool"
        | "quickswap"
        | "rally"
        | "rari"
        | "rari-fuse"
        | "realt"
        | "reflexer"
        | "ribbon"
        | "sablier"
        | "saddle"
        | "sfinance"
        | "shapeshift"
        | "shared-stake"
        | "shell"
        | "smoothy"
        | "snowball"
        | "snowswap"
        | "spiritswap"
        | "spookyswap"
        | "superfluid"
        | "sushiswap"
        | "sushiswap-bentobox"
        | "sushiswap-kashi"
        | "stake-dao"
        | "strudel"
        | "swerve"
        | "synthetix"
        | "the-graph"
        | "tokemak"
        | "tokensets"
        | "tokenlon"
        | "tokens"
        | "tornado-cash"
        | "traderjoe"
        | "uniswap"
        | "uniswap-v2"
        | "uniswap-v3"
        | "unit"
        | "universe"
        | "value"
        | "venus"
        | "vesper"
        | "waultswap"
        | "wepiggy"
        | "xsigma"
        | "xtoken"
        | "yam"
        | "yaxis"
        | "yearn"
        | "yieldyak"
        | "zlot";
    };
    export type RequestQuery = {
      gasPrice: string;
      maxFeePerGas?: string;
      maxPriorityFeePerGas?: string;
      ownerAddress: string;
      sellAmount: string;
      sellTokenAddress: string;
      poolAddress: string;
      slippagePercentage: number;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
      affiliateAddress?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Transaction;
  }

  /**
   * @description Provides a list of networks to protocols that are supported by the Zap Out routes.
   * @tags Zap Out
   * @name ZapOutControllerGetSupportedZapOuts
   * @summary Supported Zap Outs
   * @request GET:/v1/zap-out/{type}/supported
   * @secure
   */
  export namespace ZapOutControllerGetSupportedZapOuts {
    export type RequestParams = {
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
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Retrieves an ERC20 approval status for a protocol zap-out
   * @tags Zap Out
   * @name ZapOutControllerGetZapOutApprovalState
   * @summary Zap Out Approval State
   * @request GET:/v1/zap-out/{type}/{protocol}/approval-state
   * @secure
   */
  export namespace ZapOutControllerGetZapOutApprovalState {
    export type RequestParams = {
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
      protocol:
        | "aave"
        | "aave-safety-module"
        | "aave-amm"
        | "aave-v2"
        | "aavegotchi"
        | "abracadabra"
        | "adamant"
        | "alchemix"
        | "alpha-v1"
        | "alpha-v2"
        | "apeswap"
        | "apy"
        | "arcx"
        | "armor"
        | "augur"
        | "autofarm"
        | "b-protocol"
        | "badger"
        | "balancer-v1"
        | "balancer-v2"
        | "bancor"
        | "bao"
        | "barnbridge"
        | "barnbridge-smart-yield"
        | "based-money"
        | "basis-cash"
        | "basis-gold"
        | "basket-dao"
        | "beefy"
        | "bella"
        | "belt"
        | "benchmark"
        | "benqi"
        | "big-data"
        | "bitcoin"
        | "boring-dao"
        | "bzx"
        | "compound"
        | "convex"
        | "cover"
        | "cream"
        | "cream-iron-bank"
        | "cryptex"
        | "curve"
        | "defi-dollar"
        | "defi-swap"
        | "defisaver"
        | "derivadex"
        | "deversifi"
        | "dfi-money"
        | "dforce"
        | "dfyn"
        | "dhedge"
        | "dodo"
        | "dopex"
        | "dsd"
        | "dydx"
        | "88mph"
        | "88mph-v3"
        | "element"
        | "ellipsis"
        | "epns"
        | "esd"
        | "essentia"
        | "fei"
        | "float-protocol"
        | "frax"
        | "futureswap"
        | "gro"
        | "governor-dao"
        | "harvest"
        | "hegic"
        | "idle"
        | "illuvium"
        | "impossible-finance"
        | "index-coop"
        | "indexed"
        | "inverse"
        | "iron"
        | "keep-network"
        | "keeper-dao"
        | "klondike"
        | "klondike-v2"
        | "kyber-dmm"
        | "kyber-network"
        | "launchpool"
        | "linkswap"
        | "liquity"
        | "loopring"
        | "lydia"
        | "lyra"
        | "maker"
        | "mintr"
        | "mirror"
        | "mith-cash"
        | "mooniswap"
        | "mstable"
        | "mushroom"
        | "nft"
        | "nft20"
        | "nftx"
        | "nsure-network"
        | "olympus"
        | "1inch"
        | "onx"
        | "opium-network"
        | "opyn"
        | "orion-protocol"
        | "other"
        | "pancakeswap"
        | "pangolin"
        | "penguin"
        | "perpetual-protocol"
        | "pickle"
        | "pie-dao"
        | "polywhale"
        | "pooltogether"
        | "popsicle"
        | "powerpool"
        | "quickswap"
        | "rally"
        | "rari"
        | "rari-fuse"
        | "realt"
        | "reflexer"
        | "ribbon"
        | "sablier"
        | "saddle"
        | "sfinance"
        | "shapeshift"
        | "shared-stake"
        | "shell"
        | "smoothy"
        | "snowball"
        | "snowswap"
        | "spiritswap"
        | "spookyswap"
        | "superfluid"
        | "sushiswap"
        | "sushiswap-bentobox"
        | "sushiswap-kashi"
        | "stake-dao"
        | "strudel"
        | "swerve"
        | "synthetix"
        | "the-graph"
        | "tokemak"
        | "tokensets"
        | "tokenlon"
        | "tokens"
        | "tornado-cash"
        | "traderjoe"
        | "uniswap"
        | "uniswap-v2"
        | "uniswap-v3"
        | "unit"
        | "universe"
        | "value"
        | "venus"
        | "vesper"
        | "waultswap"
        | "wepiggy"
        | "xsigma"
        | "xtoken"
        | "yam"
        | "yaxis"
        | "yearn"
        | "yieldyak"
        | "zlot";
    };
    export type RequestQuery = {
      ownerAddress: string;
      sellTokenAddress: string;
      amount?: string;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Builds an ERC20 approval transaction for a protocol zap-out
   * @tags Zap Out
   * @name ZapOutControllerGetZapOutApprovalTransaction
   * @summary Zap Out Approval Transaction
   * @request GET:/v1/zap-out/{type}/{protocol}/approval-transaction
   * @secure
   */
  export namespace ZapOutControllerGetZapOutApprovalTransaction {
    export type RequestParams = {
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
      protocol:
        | "aave"
        | "aave-safety-module"
        | "aave-amm"
        | "aave-v2"
        | "aavegotchi"
        | "abracadabra"
        | "adamant"
        | "alchemix"
        | "alpha-v1"
        | "alpha-v2"
        | "apeswap"
        | "apy"
        | "arcx"
        | "armor"
        | "augur"
        | "autofarm"
        | "b-protocol"
        | "badger"
        | "balancer-v1"
        | "balancer-v2"
        | "bancor"
        | "bao"
        | "barnbridge"
        | "barnbridge-smart-yield"
        | "based-money"
        | "basis-cash"
        | "basis-gold"
        | "basket-dao"
        | "beefy"
        | "bella"
        | "belt"
        | "benchmark"
        | "benqi"
        | "big-data"
        | "bitcoin"
        | "boring-dao"
        | "bzx"
        | "compound"
        | "convex"
        | "cover"
        | "cream"
        | "cream-iron-bank"
        | "cryptex"
        | "curve"
        | "defi-dollar"
        | "defi-swap"
        | "defisaver"
        | "derivadex"
        | "deversifi"
        | "dfi-money"
        | "dforce"
        | "dfyn"
        | "dhedge"
        | "dodo"
        | "dopex"
        | "dsd"
        | "dydx"
        | "88mph"
        | "88mph-v3"
        | "element"
        | "ellipsis"
        | "epns"
        | "esd"
        | "essentia"
        | "fei"
        | "float-protocol"
        | "frax"
        | "futureswap"
        | "gro"
        | "governor-dao"
        | "harvest"
        | "hegic"
        | "idle"
        | "illuvium"
        | "impossible-finance"
        | "index-coop"
        | "indexed"
        | "inverse"
        | "iron"
        | "keep-network"
        | "keeper-dao"
        | "klondike"
        | "klondike-v2"
        | "kyber-dmm"
        | "kyber-network"
        | "launchpool"
        | "linkswap"
        | "liquity"
        | "loopring"
        | "lydia"
        | "lyra"
        | "maker"
        | "mintr"
        | "mirror"
        | "mith-cash"
        | "mooniswap"
        | "mstable"
        | "mushroom"
        | "nft"
        | "nft20"
        | "nftx"
        | "nsure-network"
        | "olympus"
        | "1inch"
        | "onx"
        | "opium-network"
        | "opyn"
        | "orion-protocol"
        | "other"
        | "pancakeswap"
        | "pangolin"
        | "penguin"
        | "perpetual-protocol"
        | "pickle"
        | "pie-dao"
        | "polywhale"
        | "pooltogether"
        | "popsicle"
        | "powerpool"
        | "quickswap"
        | "rally"
        | "rari"
        | "rari-fuse"
        | "realt"
        | "reflexer"
        | "ribbon"
        | "sablier"
        | "saddle"
        | "sfinance"
        | "shapeshift"
        | "shared-stake"
        | "shell"
        | "smoothy"
        | "snowball"
        | "snowswap"
        | "spiritswap"
        | "spookyswap"
        | "superfluid"
        | "sushiswap"
        | "sushiswap-bentobox"
        | "sushiswap-kashi"
        | "stake-dao"
        | "strudel"
        | "swerve"
        | "synthetix"
        | "the-graph"
        | "tokemak"
        | "tokensets"
        | "tokenlon"
        | "tokens"
        | "tornado-cash"
        | "traderjoe"
        | "uniswap"
        | "uniswap-v2"
        | "uniswap-v3"
        | "unit"
        | "universe"
        | "value"
        | "venus"
        | "vesper"
        | "waultswap"
        | "wepiggy"
        | "xsigma"
        | "xtoken"
        | "yam"
        | "yaxis"
        | "yearn"
        | "yieldyak"
        | "zlot";
    };
    export type RequestQuery = {
      gasPrice: string;
      maxFeePerGas?: string;
      maxPriorityFeePerGas?: string;
      ownerAddress: string;
      sellTokenAddress: string;
      amount?: string;
      allowInfinite?: boolean;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Transaction;
  }

  /**
   * @description Builds a zap-out transaction for usage with Web3, complete with best swap from 0x.
   * @tags Zap Out
   * @name ZapOutControllerGetZapOutTransaction
   * @summary Zap Out Transaction
   * @request GET:/v1/zap-out/{type}/{protocol}/transaction
   * @secure
   */
  export namespace ZapOutControllerGetZapOutTransaction {
    export type RequestParams = {
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
      protocol:
        | "aave"
        | "aave-safety-module"
        | "aave-amm"
        | "aave-v2"
        | "aavegotchi"
        | "abracadabra"
        | "adamant"
        | "alchemix"
        | "alpha-v1"
        | "alpha-v2"
        | "apeswap"
        | "apy"
        | "arcx"
        | "armor"
        | "augur"
        | "autofarm"
        | "b-protocol"
        | "badger"
        | "balancer-v1"
        | "balancer-v2"
        | "bancor"
        | "bao"
        | "barnbridge"
        | "barnbridge-smart-yield"
        | "based-money"
        | "basis-cash"
        | "basis-gold"
        | "basket-dao"
        | "beefy"
        | "bella"
        | "belt"
        | "benchmark"
        | "benqi"
        | "big-data"
        | "bitcoin"
        | "boring-dao"
        | "bzx"
        | "compound"
        | "convex"
        | "cover"
        | "cream"
        | "cream-iron-bank"
        | "cryptex"
        | "curve"
        | "defi-dollar"
        | "defi-swap"
        | "defisaver"
        | "derivadex"
        | "deversifi"
        | "dfi-money"
        | "dforce"
        | "dfyn"
        | "dhedge"
        | "dodo"
        | "dopex"
        | "dsd"
        | "dydx"
        | "88mph"
        | "88mph-v3"
        | "element"
        | "ellipsis"
        | "epns"
        | "esd"
        | "essentia"
        | "fei"
        | "float-protocol"
        | "frax"
        | "futureswap"
        | "gro"
        | "governor-dao"
        | "harvest"
        | "hegic"
        | "idle"
        | "illuvium"
        | "impossible-finance"
        | "index-coop"
        | "indexed"
        | "inverse"
        | "iron"
        | "keep-network"
        | "keeper-dao"
        | "klondike"
        | "klondike-v2"
        | "kyber-dmm"
        | "kyber-network"
        | "launchpool"
        | "linkswap"
        | "liquity"
        | "loopring"
        | "lydia"
        | "lyra"
        | "maker"
        | "mintr"
        | "mirror"
        | "mith-cash"
        | "mooniswap"
        | "mstable"
        | "mushroom"
        | "nft"
        | "nft20"
        | "nftx"
        | "nsure-network"
        | "olympus"
        | "1inch"
        | "onx"
        | "opium-network"
        | "opyn"
        | "orion-protocol"
        | "other"
        | "pancakeswap"
        | "pangolin"
        | "penguin"
        | "perpetual-protocol"
        | "pickle"
        | "pie-dao"
        | "polywhale"
        | "pooltogether"
        | "popsicle"
        | "powerpool"
        | "quickswap"
        | "rally"
        | "rari"
        | "rari-fuse"
        | "realt"
        | "reflexer"
        | "ribbon"
        | "sablier"
        | "saddle"
        | "sfinance"
        | "shapeshift"
        | "shared-stake"
        | "shell"
        | "smoothy"
        | "snowball"
        | "snowswap"
        | "spiritswap"
        | "spookyswap"
        | "superfluid"
        | "sushiswap"
        | "sushiswap-bentobox"
        | "sushiswap-kashi"
        | "stake-dao"
        | "strudel"
        | "swerve"
        | "synthetix"
        | "the-graph"
        | "tokemak"
        | "tokensets"
        | "tokenlon"
        | "tokens"
        | "tornado-cash"
        | "traderjoe"
        | "uniswap"
        | "uniswap-v2"
        | "uniswap-v3"
        | "unit"
        | "universe"
        | "value"
        | "venus"
        | "vesper"
        | "waultswap"
        | "wepiggy"
        | "xsigma"
        | "xtoken"
        | "yam"
        | "yaxis"
        | "yearn"
        | "yieldyak"
        | "zlot";
    };
    export type RequestQuery = {
      gasPrice: string;
      maxFeePerGas?: string;
      maxPriorityFeePerGas?: string;
      ownerAddress: string;
      sellAmount: string;
      toTokenAddress: string;
      poolAddress: string;
      slippagePercentage: number;
      signature?: string;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
      affiliateAddress?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Transaction;
  }

  /**
   * @description Provides a list of networks to protocols that are supported by the Zap Out routes. Use `/v1/zap-out/:type/supported` instead.
   * @tags Zap Out
   * @name ZapOutLegacyControllerGetSupportedZapOuts
   * @summary Supported Zap Outs (DEPRECATED)
   * @request GET:/v1/zap-out/supported
   * @deprecated
   * @secure
   */
  export namespace ZapOutLegacyControllerGetSupportedZapOuts {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Retrieves an ERC20 approval status for a protocol zap-out Use `/v1/zap-out/:type/:protocol/approval-state` instead.
   * @tags Zap Out
   * @name ZapOutLegacyControllerGetZapOutApprovalState
   * @summary Zap Out Approval State (DEPRECATED)
   * @request GET:/v1/zap-out/{protocol}/approval-state
   * @deprecated
   * @secure
   */
  export namespace ZapOutLegacyControllerGetZapOutApprovalState {
    export type RequestParams = {
      protocol:
        | "aave"
        | "aave-safety-module"
        | "aave-amm"
        | "aave-v2"
        | "aavegotchi"
        | "abracadabra"
        | "adamant"
        | "alchemix"
        | "alpha-v1"
        | "alpha-v2"
        | "apeswap"
        | "apy"
        | "arcx"
        | "armor"
        | "augur"
        | "autofarm"
        | "b-protocol"
        | "badger"
        | "balancer-v1"
        | "balancer-v2"
        | "bancor"
        | "bao"
        | "barnbridge"
        | "barnbridge-smart-yield"
        | "based-money"
        | "basis-cash"
        | "basis-gold"
        | "basket-dao"
        | "beefy"
        | "bella"
        | "belt"
        | "benchmark"
        | "benqi"
        | "big-data"
        | "bitcoin"
        | "boring-dao"
        | "bzx"
        | "compound"
        | "convex"
        | "cover"
        | "cream"
        | "cream-iron-bank"
        | "cryptex"
        | "curve"
        | "defi-dollar"
        | "defi-swap"
        | "defisaver"
        | "derivadex"
        | "deversifi"
        | "dfi-money"
        | "dforce"
        | "dfyn"
        | "dhedge"
        | "dodo"
        | "dopex"
        | "dsd"
        | "dydx"
        | "88mph"
        | "88mph-v3"
        | "element"
        | "ellipsis"
        | "epns"
        | "esd"
        | "essentia"
        | "fei"
        | "float-protocol"
        | "frax"
        | "futureswap"
        | "gro"
        | "governor-dao"
        | "harvest"
        | "hegic"
        | "idle"
        | "illuvium"
        | "impossible-finance"
        | "index-coop"
        | "indexed"
        | "inverse"
        | "iron"
        | "keep-network"
        | "keeper-dao"
        | "klondike"
        | "klondike-v2"
        | "kyber-dmm"
        | "kyber-network"
        | "launchpool"
        | "linkswap"
        | "liquity"
        | "loopring"
        | "lydia"
        | "lyra"
        | "maker"
        | "mintr"
        | "mirror"
        | "mith-cash"
        | "mooniswap"
        | "mstable"
        | "mushroom"
        | "nft"
        | "nft20"
        | "nftx"
        | "nsure-network"
        | "olympus"
        | "1inch"
        | "onx"
        | "opium-network"
        | "opyn"
        | "orion-protocol"
        | "other"
        | "pancakeswap"
        | "pangolin"
        | "penguin"
        | "perpetual-protocol"
        | "pickle"
        | "pie-dao"
        | "polywhale"
        | "pooltogether"
        | "popsicle"
        | "powerpool"
        | "quickswap"
        | "rally"
        | "rari"
        | "rari-fuse"
        | "realt"
        | "reflexer"
        | "ribbon"
        | "sablier"
        | "saddle"
        | "sfinance"
        | "shapeshift"
        | "shared-stake"
        | "shell"
        | "smoothy"
        | "snowball"
        | "snowswap"
        | "spiritswap"
        | "spookyswap"
        | "superfluid"
        | "sushiswap"
        | "sushiswap-bentobox"
        | "sushiswap-kashi"
        | "stake-dao"
        | "strudel"
        | "swerve"
        | "synthetix"
        | "the-graph"
        | "tokemak"
        | "tokensets"
        | "tokenlon"
        | "tokens"
        | "tornado-cash"
        | "traderjoe"
        | "uniswap"
        | "uniswap-v2"
        | "uniswap-v3"
        | "unit"
        | "universe"
        | "value"
        | "venus"
        | "vesper"
        | "waultswap"
        | "wepiggy"
        | "xsigma"
        | "xtoken"
        | "yam"
        | "yaxis"
        | "yearn"
        | "yieldyak"
        | "zlot";
    };
    export type RequestQuery = {
      ownerAddress: string;
      sellTokenAddress: string;
      amount?: string;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Builds an ERC20 approval transaction for a protocol zap-out Use `/v1/zap-out/:type/:protocol/approval-transaction` instead.
   * @tags Zap Out
   * @name ZapOutLegacyControllerGetZapOutApprovalTransaction
   * @summary Zap Out Approval Transaction (DEPRECATED)
   * @request GET:/v1/zap-out/{protocol}/approval-transaction
   * @deprecated
   * @secure
   */
  export namespace ZapOutLegacyControllerGetZapOutApprovalTransaction {
    export type RequestParams = {
      protocol:
        | "aave"
        | "aave-safety-module"
        | "aave-amm"
        | "aave-v2"
        | "aavegotchi"
        | "abracadabra"
        | "adamant"
        | "alchemix"
        | "alpha-v1"
        | "alpha-v2"
        | "apeswap"
        | "apy"
        | "arcx"
        | "armor"
        | "augur"
        | "autofarm"
        | "b-protocol"
        | "badger"
        | "balancer-v1"
        | "balancer-v2"
        | "bancor"
        | "bao"
        | "barnbridge"
        | "barnbridge-smart-yield"
        | "based-money"
        | "basis-cash"
        | "basis-gold"
        | "basket-dao"
        | "beefy"
        | "bella"
        | "belt"
        | "benchmark"
        | "benqi"
        | "big-data"
        | "bitcoin"
        | "boring-dao"
        | "bzx"
        | "compound"
        | "convex"
        | "cover"
        | "cream"
        | "cream-iron-bank"
        | "cryptex"
        | "curve"
        | "defi-dollar"
        | "defi-swap"
        | "defisaver"
        | "derivadex"
        | "deversifi"
        | "dfi-money"
        | "dforce"
        | "dfyn"
        | "dhedge"
        | "dodo"
        | "dopex"
        | "dsd"
        | "dydx"
        | "88mph"
        | "88mph-v3"
        | "element"
        | "ellipsis"
        | "epns"
        | "esd"
        | "essentia"
        | "fei"
        | "float-protocol"
        | "frax"
        | "futureswap"
        | "gro"
        | "governor-dao"
        | "harvest"
        | "hegic"
        | "idle"
        | "illuvium"
        | "impossible-finance"
        | "index-coop"
        | "indexed"
        | "inverse"
        | "iron"
        | "keep-network"
        | "keeper-dao"
        | "klondike"
        | "klondike-v2"
        | "kyber-dmm"
        | "kyber-network"
        | "launchpool"
        | "linkswap"
        | "liquity"
        | "loopring"
        | "lydia"
        | "lyra"
        | "maker"
        | "mintr"
        | "mirror"
        | "mith-cash"
        | "mooniswap"
        | "mstable"
        | "mushroom"
        | "nft"
        | "nft20"
        | "nftx"
        | "nsure-network"
        | "olympus"
        | "1inch"
        | "onx"
        | "opium-network"
        | "opyn"
        | "orion-protocol"
        | "other"
        | "pancakeswap"
        | "pangolin"
        | "penguin"
        | "perpetual-protocol"
        | "pickle"
        | "pie-dao"
        | "polywhale"
        | "pooltogether"
        | "popsicle"
        | "powerpool"
        | "quickswap"
        | "rally"
        | "rari"
        | "rari-fuse"
        | "realt"
        | "reflexer"
        | "ribbon"
        | "sablier"
        | "saddle"
        | "sfinance"
        | "shapeshift"
        | "shared-stake"
        | "shell"
        | "smoothy"
        | "snowball"
        | "snowswap"
        | "spiritswap"
        | "spookyswap"
        | "superfluid"
        | "sushiswap"
        | "sushiswap-bentobox"
        | "sushiswap-kashi"
        | "stake-dao"
        | "strudel"
        | "swerve"
        | "synthetix"
        | "the-graph"
        | "tokemak"
        | "tokensets"
        | "tokenlon"
        | "tokens"
        | "tornado-cash"
        | "traderjoe"
        | "uniswap"
        | "uniswap-v2"
        | "uniswap-v3"
        | "unit"
        | "universe"
        | "value"
        | "venus"
        | "vesper"
        | "waultswap"
        | "wepiggy"
        | "xsigma"
        | "xtoken"
        | "yam"
        | "yaxis"
        | "yearn"
        | "yieldyak"
        | "zlot";
    };
    export type RequestQuery = {
      gasPrice: string;
      maxFeePerGas?: string;
      maxPriorityFeePerGas?: string;
      ownerAddress: string;
      sellTokenAddress: string;
      amount?: string;
      allowInfinite?: boolean;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Transaction;
  }

  /**
   * @description Builds a zap-out transaction for usage with Web3, complete with best swap from 0x. Use `/v1/zap-out/:type/:protocol/transaction` instead.
   * @tags Zap Out
   * @name ZapOutLegacyControllerGetZapOutTransaction
   * @summary Zap Out Transaction (DEPRECATED)
   * @request GET:/v1/zap-out/{protocol}/transaction
   * @deprecated
   * @secure
   */
  export namespace ZapOutLegacyControllerGetZapOutTransaction {
    export type RequestParams = {
      protocol:
        | "aave"
        | "aave-safety-module"
        | "aave-amm"
        | "aave-v2"
        | "aavegotchi"
        | "abracadabra"
        | "adamant"
        | "alchemix"
        | "alpha-v1"
        | "alpha-v2"
        | "apeswap"
        | "apy"
        | "arcx"
        | "armor"
        | "augur"
        | "autofarm"
        | "b-protocol"
        | "badger"
        | "balancer-v1"
        | "balancer-v2"
        | "bancor"
        | "bao"
        | "barnbridge"
        | "barnbridge-smart-yield"
        | "based-money"
        | "basis-cash"
        | "basis-gold"
        | "basket-dao"
        | "beefy"
        | "bella"
        | "belt"
        | "benchmark"
        | "benqi"
        | "big-data"
        | "bitcoin"
        | "boring-dao"
        | "bzx"
        | "compound"
        | "convex"
        | "cover"
        | "cream"
        | "cream-iron-bank"
        | "cryptex"
        | "curve"
        | "defi-dollar"
        | "defi-swap"
        | "defisaver"
        | "derivadex"
        | "deversifi"
        | "dfi-money"
        | "dforce"
        | "dfyn"
        | "dhedge"
        | "dodo"
        | "dopex"
        | "dsd"
        | "dydx"
        | "88mph"
        | "88mph-v3"
        | "element"
        | "ellipsis"
        | "epns"
        | "esd"
        | "essentia"
        | "fei"
        | "float-protocol"
        | "frax"
        | "futureswap"
        | "gro"
        | "governor-dao"
        | "harvest"
        | "hegic"
        | "idle"
        | "illuvium"
        | "impossible-finance"
        | "index-coop"
        | "indexed"
        | "inverse"
        | "iron"
        | "keep-network"
        | "keeper-dao"
        | "klondike"
        | "klondike-v2"
        | "kyber-dmm"
        | "kyber-network"
        | "launchpool"
        | "linkswap"
        | "liquity"
        | "loopring"
        | "lydia"
        | "lyra"
        | "maker"
        | "mintr"
        | "mirror"
        | "mith-cash"
        | "mooniswap"
        | "mstable"
        | "mushroom"
        | "nft"
        | "nft20"
        | "nftx"
        | "nsure-network"
        | "olympus"
        | "1inch"
        | "onx"
        | "opium-network"
        | "opyn"
        | "orion-protocol"
        | "other"
        | "pancakeswap"
        | "pangolin"
        | "penguin"
        | "perpetual-protocol"
        | "pickle"
        | "pie-dao"
        | "polywhale"
        | "pooltogether"
        | "popsicle"
        | "powerpool"
        | "quickswap"
        | "rally"
        | "rari"
        | "rari-fuse"
        | "realt"
        | "reflexer"
        | "ribbon"
        | "sablier"
        | "saddle"
        | "sfinance"
        | "shapeshift"
        | "shared-stake"
        | "shell"
        | "smoothy"
        | "snowball"
        | "snowswap"
        | "spiritswap"
        | "spookyswap"
        | "superfluid"
        | "sushiswap"
        | "sushiswap-bentobox"
        | "sushiswap-kashi"
        | "stake-dao"
        | "strudel"
        | "swerve"
        | "synthetix"
        | "the-graph"
        | "tokemak"
        | "tokensets"
        | "tokenlon"
        | "tokens"
        | "tornado-cash"
        | "traderjoe"
        | "uniswap"
        | "uniswap-v2"
        | "uniswap-v3"
        | "unit"
        | "universe"
        | "value"
        | "venus"
        | "vesper"
        | "waultswap"
        | "wepiggy"
        | "xsigma"
        | "xtoken"
        | "yam"
        | "yaxis"
        | "yearn"
        | "yieldyak"
        | "zlot";
    };
    export type RequestQuery = {
      gasPrice: string;
      maxFeePerGas?: string;
      maxPriorityFeePerGas?: string;
      ownerAddress: string;
      sellAmount: string;
      toTokenAddress: string;
      poolAddress: string;
      slippagePercentage: number;
      signature?: string;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
      affiliateAddress?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Transaction;
  }

  /**
   * @description Returns a list of tokens supported on a specific network
   * @tags Zap Bridge
   * @name ZapBridgeControllerGetZapInSupportedTokens
   * @summary Bridge Supported Tokens
   * @request GET:/v1/zap-bridge/{destinationNetwork}/supported-tokens
   * @secure
   */
  export namespace ZapBridgeControllerGetZapInSupportedTokens {
    export type RequestParams = {
      destinationNetwork:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestQuery = {
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Retrieves an ERC20 approval state for a zap bridge into a network
   * @tags Zap Bridge
   * @name ZapBridgeControllerGetZapInApprovalState
   * @summary Bridge Approval State
   * @request GET:/v1/zap-bridge/{destinationNetwork}/approval-state
   * @secure
   */
  export namespace ZapBridgeControllerGetZapInApprovalState {
    export type RequestParams = {
      destinationNetwork:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestQuery = {
      ownerAddress: string;
      sellAmount: string;
      sellTokenAddress: string;
      buyTokenAddress: string;
      allowInfinite?: boolean;
      slippagePercentage: number;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
      affiliateAddress?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Builds an ERC20 approval transaction for a zap bridge into a network
   * @tags Zap Bridge
   * @name ZapBridgeControllerGetZapInApprovalTransaction
   * @summary Bridge Approval Transaction
   * @request GET:/v1/zap-bridge/{destinationNetwork}/approval-transaction
   * @secure
   */
  export namespace ZapBridgeControllerGetZapInApprovalTransaction {
    export type RequestParams = {
      destinationNetwork:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestQuery = {
      gasPrice: string;
      maxFeePerGas?: string;
      maxPriorityFeePerGas?: string;
      ownerAddress: string;
      sellAmount: string;
      sellTokenAddress: string;
      buyTokenAddress: string;
      allowInfinite?: boolean;
      slippagePercentage: number;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
      affiliateAddress?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Transaction;
  }

  /**
   * @description Builds a zap-bridge transaction for use with Web3
   * @tags Zap Bridge
   * @name ZapBridgeControllerGetZapInTransaction
   * @summary Bridge Transaction
   * @request GET:/v1/zap-bridge/{destinationNetwork}/transaction
   * @secure
   */
  export namespace ZapBridgeControllerGetZapInTransaction {
    export type RequestParams = {
      destinationNetwork:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestQuery = {
      gasPrice: string;
      maxFeePerGas?: string;
      maxPriorityFeePerGas?: string;
      ownerAddress: string;
      sellAmount: string;
      sellTokenAddress: string;
      buyTokenAddress: string;
      allowInfinite?: boolean;
      slippagePercentage: number;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
      affiliateAddress?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Transaction;
  }

  /**
   * @description Retrieves staked balances for a given type
   * @tags Protocol Balances
   * @name StakingControllerGetStakedBalances
   * @summary Staked Balances
   * @request GET:/v1/staked-balance/{stakedBalanceType}
   * @secure
   */
  export namespace StakingControllerGetStakedBalances {
    export type RequestParams = { stakedBalanceType: "masterchef" | "geyser" | "gauge" | "single-staking" };
    export type RequestQuery = {
      "addresses[]": string[];
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description A list of support Ethereum ERC20 tokens
   * @tags Miscellaneous Data Endpoints
   * @name TokenListControllerGetGasPrice
   * @summary Zapper Token List
   * @request GET:/v1/token-list
   * @secure
   */
  export namespace TokenListControllerGetGasPrice {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Returns the information required to execute a transaction that will send over tokens to another wallet
   * @tags Token Transfer
   * @name TokenTransferControllerGetTokenTransferTransaction
   * @summary Transfer Token to Another Wallet
   * @request GET:/v1/token-transfer/transaction
   * @secure
   */
  export namespace TokenTransferControllerGetTokenTransferTransaction {
    export type RequestParams = {};
    export type RequestQuery = {
      gasPrice: string;
      maxFeePerGas?: string;
      maxPriorityFeePerGas?: string;
      tokenAddress: string;
      senderAddress: string;
      receiverAddress: string;
      amount: string;
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Data on past transactions for a specific address. Deprecated, use /transactions
   * @tags Historical Transactions
   * @name TransactionControllerGetTransactionsDeprecated
   * @summary Historical Transactions
   * @request GET:/v1/transactions/{address}
   * @deprecated
   * @secure
   */
  export namespace TransactionControllerGetTransactionsDeprecated {
    export type RequestParams = { address: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }

  /**
   * @description Data on past transactions for addresses
   * @tags Historical Transactions
   * @name TransactionControllerGetTransactions
   * @summary Historical Transactions
   * @request GET:/v1/transactions
   * @secure
   */
  export namespace TransactionControllerGetTransactions {
    export type RequestParams = {};
    export type RequestQuery = {
      address: string;
      "addresses[]": string[];
      network?:
        | "ethereum"
        | "polygon"
        | "optimism"
        | "xdai"
        | "binance-smart-chain"
        | "fantom"
        | "avalanche"
        | "arbitrum";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {};
  }
}
