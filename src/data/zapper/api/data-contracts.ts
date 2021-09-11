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

  /** Human readable balance */
  balance: number;

  /** Total value in USD */
  balanceUSD: number;

  /** Raw balance read from the contract */
  balanceRaw?: string;
}

export interface PoolTokenBalance {
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

  /** Human readable balance */
  balance: number;

  /** Total value in USD */
  balanceUSD: number;

  /** Raw balance read from the contract */
  balanceRaw?: string;

  /** Name of protocol */
  protocol: string;

  /** Display for the protocol */
  protocolDisplay: string;

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

  /** Human readable balance */
  balance: number;

  /** Total value in USD */
  balanceUSD: number;

  /** Raw balance read from the contract */
  balanceRaw?: string;

  /** Name of protocol */
  protocol: string;

  /** Display for the protocol */
  protocolDisplay: string;

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

export interface CollateralTokenBalance {
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

  /** Human readable balance */
  balance: number;

  /** Total value in USD */
  balanceUSD: number;

  /** Raw balance read from the contract */
  balanceRaw?: string;

  /** Name of protocol */
  protocol: string;

  /** Display for the protocol */
  protocolDisplay: string;

  /** The balance type of the response */
  type: string;

  /** Collateralization ratio */
  cRatio?: number;
}

export interface InterestBearingTokenBalance {
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

  /** Human readable balance */
  balance: number;

  /** Total value in USD */
  balanceUSD: number;

  /** Raw balance read from the contract */
  balanceRaw?: string;

  /** Name of protocol */
  protocol: string;

  /** Display for the protocol */
  protocolDisplay: string;

  /** The balance type of the response */
  type: string;

  /** Percent yield earned annually */
  apy?: number;
}

export interface InsuranceTokenBalance {
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

  /** Human readable balance */
  balance: number;

  /** Total value in USD */
  balanceUSD: number;

  /** Raw balance read from the contract */
  balanceRaw?: string;

  /** Name of protocol */
  protocol: string;

  /** Display for the protocol */
  protocolDisplay: string;

  /** The balance type of the response */
  type: string;

  /** Unix timestamp at which the insurance expires */
  expiry: string;
}

export interface OptionTokenBalance {
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

  /** Human readable balance */
  balance: number;

  /** Total value in USD */
  balanceUSD: number;

  /** Raw balance read from the contract */
  balanceRaw?: string;

  /** Name of protocol */
  protocol: string;

  /** Display for the protocol */
  protocolDisplay: string;

  /** The balance type of the response */
  type: string;
}

export interface NonFungibleTokenBalance {
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

  /** Human readable balance */
  balance: number;

  /** Total value in USD */
  balanceUSD: number;

  /** Raw balance read from the contract */
  balanceRaw?: string;

  /** The balance type of the response */
  type: string;
}

export interface ClaimableTokenBalance {
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

  /** Human readable balance */
  balance: number;

  /** Total value in USD */
  balanceUSD: number;

  /** Raw balance read from the contract */
  balanceRaw?: string;

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

  /** Different types of balance responses */
  assets: (
    | BaseTokenBalance
    | PoolTokenBalance
    | VaultTokenBalance
    | CollateralTokenBalance
    | InterestBearingTokenBalance
    | InsuranceTokenBalance
    | OptionTokenBalance
    | NonFungibleTokenBalance
    | ClaimableTokenBalance
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";
}

export interface PricesControllerGetTokenPricesParams {
  /** Retrieve prices for this network */
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";
}

export interface BalanceControllerGetProtocolBalancesV2Params {
  /** Addresses for which to retrieve balances */
  "addresses[]": string[];

  /** Retrieve protocol balances for this network */
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Protocol for which to retrieve the wallet balances */
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
}

export interface BalanceControllerGetSupportedV2BalancesParams {
  /** Addresses for which to retrieve balances */
  "addresses[]": string[];
}

export interface PoolControllerGetPoolStatsParams {
  /** Retrieve supported pool types for this network */
  network: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Protocol for which to retrieve pool stats */
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
}

export interface PoolControllerGetPoolStatsByAddressParams {
  /** Retrieve pool stats for this network */
  network: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Protocol for which to retrieve pool stats */
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

  /** Address of the pool */
  poolAddress: string;
}

export interface PoolControllerGetVaultStatsParams {
  /** Retrieve vault stats for this network */
  network: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Protocol for which to retrieve vault stats */
  vaultStatsType: "cover" | "element" | "mushroom" | "pickle" | "pooltogether" | "yearn";
}

export interface PoolControllerGetLendingPoolStatsParams {
  /** Retrieve lending stats for this network */
  network: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Protocol for which to retrieve lending pool stats */
  lendingPoolStatsType: "alpha-v1" | "alpha-v2" | "compound" | "cream-iron-bank" | "inverse";
}

export interface MarketControllerGetMarketDataParams {
  /** Retrieve market data for this network */
  network: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

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

  /** Protocol for which to retrieve market data */
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
}

export interface FarmsControllerGetFarmsMarketDataParams {
  /** Retrieve farms for this network */
  network: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Protocol for which to retrieve farms */
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";
}

export interface FarmFetcherControllerGetEthereumFarmsParams {
  /** Retrieve farms for this network */
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Type of farms to fetch */
  farmStatsType: "masterchef" | "single-staking" | "geyser" | "gauge";
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Type of farms to fetch */
  farmStatsType: "masterchef" | "single-staking" | "geyser" | "gauge";
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Type of farms to fetch */
  farmStatsType: "masterchef" | "single-staking" | "geyser" | "gauge";
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Type of farms to fetch */
  farmStatsType: "masterchef" | "single-staking" | "geyser" | "gauge";
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Type of farms to fetch */
  farmStatsType: "masterchef" | "single-staking" | "geyser" | "gauge";
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Type of farms to fetch */
  farmStatsType: "masterchef" | "single-staking" | "geyser" | "gauge";
}

export interface GasPriceControllerGetGasPriceParams {
  /** Retrieve gas price for this network */
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Retrieve post London gas price details */
  eip1559: boolean;
}

export interface ZapInControllerGetZapInApprovalStateParams {
  /** Address of the seller */
  ownerAddress: string;

  /** Address of the token to sell */
  sellTokenAddress: string;

  /** Amount to validate against approved amount; defaults to user balance */
  amount?: string;

  /** Retrieve approval state for this network */
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

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

  /** Protocol to which to zap in */
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

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

  /** Protocol to which to zap in */
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

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

  /** Protocol to which to zap in */
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
}

export interface ZapInLegacyControllerGetZapInApprovalStateParams {
  /** Address of the seller */
  ownerAddress: string;

  /** Address of the token to sell */
  sellTokenAddress: string;

  /** Amount to validate against approved amount; defaults to user balance */
  amount?: string;

  /** Retrieve approval state for this network */
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Protocol to which to zap in */
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Protocol to which to zap in */
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Affiliate address to receive goodwill and fees when enabled */
  affiliateAddress?: string;

  /** Protocol to which to zap in */
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
}

export interface ZapOutControllerGetZapOutApprovalStateParams {
  /** Address of the seller */
  ownerAddress: string;

  /** Address of the token to sell */
  sellTokenAddress: string;

  /** Amount to validate against approved amount; defaults to user balance */
  amount?: string;

  /** Retrieve approval state for this network */
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

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

  /** Protocol from which to zap out */
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

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

  /** Protocol from which to zap out */
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

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

  /** Protocol from which to zap out */
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
}

export interface ZapOutLegacyControllerGetZapOutApprovalStateParams {
  /** Address of the seller */
  ownerAddress: string;

  /** Address of the token to sell */
  sellTokenAddress: string;

  /** Amount to validate against approved amount; defaults to user balance */
  amount?: string;

  /** Retrieve approval state for this network */
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Protocol from which to zap out */
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Protocol from which to zap out */
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Affiliate address to receive goodwill and fees when enabled */
  affiliateAddress?: string;

  /** Protocol from which to zap out */
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
}

export interface ZapBridgeControllerGetZapInSupportedTokensParams {
  /** Retrieve gas price for this network */
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Network to which to zap in */
  destinationNetwork:
    | "ethereum"
    | "polygon"
    | "optimism"
    | "xdai"
    | "binance-smart-chain"
    | "fantom"
    | "avalanche"
    | "arbitrum";
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

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
    | "arbitrum";
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

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
    | "arbitrum";
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

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
    | "arbitrum";
}

export interface StakingControllerGetStakedBalancesParams {
  /** Addresses for which to retrieve balances */
  "addresses[]": string[];

  /** Retrieve staked balances for this network */
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";

  /** Staked balance type for which to retrieve the wallet balances */
  stakedBalanceType: "masterchef" | "geyser" | "gauge" | "single-staking";
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
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";
}

export interface TransactionControllerGetTransactionsParams {
  /** Address to get historical transactions for */
  address: string;

  /** Addresses for which to retrieve ENS */
  "addresses[]": string[];

  /** Retrieve transactions for this network or all supported networks if not specified */
  network?: "ethereum" | "polygon" | "optimism" | "xdai" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum";
}
