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

export interface LogEventByAddress {
  /**
   * The transaction hash
   * @example 0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09
   */
  transaction_hash: string;

  /**
   * The address of the contract
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  address: string;

  /**
   * The block timestamp
   * @example 2021-04-02T10:07:54.000Z
   */
  block_timestamp: string;

  /**
   * The block number
   * @example 12526958
   */
  block_number: string;

  /**
   * The block hash
   * @example 0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86
   */
  block_hash: string;

  /**
   * The data of the log
   * @example 0x00000000000000000000000000000000000000000000000de05239bccd4d537400000000000000000000000000024dbc80a9f80e3d5fc0a0ee30e2693781a443
   */
  data: string;

  /** @example 0x2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a */
  topic0: string;

  /** @example 0x000000000000000000000000031002d15b0d0cd7c9129d6f644446368deae391 */
  topic1: string;

  /** @example 0x000000000000000000000000d25943be09f968ba740e0782a34e710100defae9 */
  topic2: string;

  /** @example null */
  topic3: string;
}

export interface LogEvent {
  /**
   * The transaction hash
   * @example 0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09
   */
  transaction_hash: string;

  /**
   * The address of the contract
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  address: string;

  /**
   * The block timestamp
   * @example 2021-04-02T10:07:54.000Z
   */
  block_timestamp: string;

  /**
   * The block number
   * @example 12526958
   */
  block_number: string;

  /**
   * The block hash
   * @example 0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86
   */
  block_hash: string;

  /** The content of the event */
  data: object;
}

export interface Log {
  /** @example 273 */
  log_index: string;

  /**
   * The hash of the transaction
   * @example 0xdd9006489e46670e0e85d1fb88823099e7f596b08aeaac023e9da0851f26fdd5
   */
  transaction_hash: string;

  /** @example 204 */
  transaction_index: string;

  /**
   * The address of the contract
   * @example 0x3105d328c66d8d55092358cf595d54608178e9b5
   */
  address: string;

  /**
   * The data of the log
   * @example 0x00000000000000000000000000000000000000000000000de05239bccd4d537400000000000000000000000000024dbc80a9f80e3d5fc0a0ee30e2693781a443
   */
  data: string;

  /** @example 0x2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a */
  topic0: string;

  /** @example 0x000000000000000000000000031002d15b0d0cd7c9129d6f644446368deae391 */
  topic1?: string;

  /** @example 0x000000000000000000000000d25943be09f968ba740e0782a34e710100defae9 */
  topic2?: string;

  /** @example null */
  topic3?: string;

  /**
   * The timestamp of the block
   * @example 2021-05-07T11:08:35.000Z
   */
  block_timestamp: string;

  /**
   * The block number
   * @example 12386788
   */
  block_number: string;

  /**
   * The hash of the block
   * @example 0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171
   */
  block_hash: string;
}

export interface BlockTransaction {
  /**
   * The hash of the transaction
   * @example 0x1ed85b3757a6d31d01a4d6677fc52fd3911d649a0af21fe5ca3f886b153773ed
   */
  hash: string;

  /**
   * The nonce
   * @example 1848059
   */
  nonce: string;

  /** @example 108 */
  transaction_index: string;

  /**
   * The from address
   * @example 0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0
   */
  from_address: string;

  /**
   * The to address
   * @example 0x003dde3494f30d861d063232c6a8c04394b686ff
   */
  to_address: string;

  /**
   * The value sent
   * @example 115580000000000000
   */
  value: string;

  /** @example 30000 */
  gas?: string;

  /**
   * The gas price
   * @example 52500000000
   */
  gas_price: string;

  /** @example 0x */
  input: string;

  /** @example 4923073 */
  receipt_cumulative_gas_used: string;

  /** @example 21000 */
  receipt_gas_used: string;

  /** @example null */
  receipt_contract_address?: string;

  /** @example null */
  receipt_root?: string;

  /** @example 1 */
  receipt_status: string;

  /**
   * The block timestamp
   * @example 2021-05-07T11:08:35.000Z
   */
  block_timestamp: string;

  /**
   * The block number
   * @example 12386788
   */
  block_number: string;

  /**
   * The hash of the block
   * @example 0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171
   */
  block_hash: string;

  /** The logs of the transaction */
  logs: Log[];
}

export interface Block {
  /**
   * The block timestamp
   * @example 2021-05-07T11:08:35.000Z
   */
  timestamp: string;

  /**
   * The block number
   * @example 12386788
   */
  number: string;

  /**
   * The block hash
   * @example 0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171
   */
  hash: string;

  /**
   * The block hash of the parent block
   * @example 0x011d1fc45839de975cc55d758943f9f1d204f80a90eb631f3bf064b80d53e045
   */
  parent_hash: string;

  /**
   * The nonce
   * @example 0xedeb2d8fd2b2bdec
   */
  nonce: string;

  /** @example 0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347 */
  sha3_uncles: string;

  /** @example 0xdde5fc46c5d8bcbd58207bc9f267bf43298e23791a326ff02661e99790da9996b3e0dd912c0b8202d389d282c56e4d11eb2dec4898a32b6b165f1f4cae6aa0079498eab50293f3b8defbf6af11bb75f0408a563ddfc26a3323d1ff5f9849e95d5f034d88a757ddea032c75c00708c9ff34d2207f997cc7d93fd1fa160a6bfaf62a54e31f9fe67ab95752106ba9d185bfdc9b6dc3e17427f844ee74e5c09b17b83ad6e8fc7360f5c7c3e4e1939e77a6374bee57d1fa6b2322b11ad56ad0398302de9b26d6fbfe414aa416bff141fad9d4af6aea19322e47595e342cd377403f417dfd396ab5f151095a5535f51cbc34a40ce9648927b7d1d72ab9daf253e31daf */
  logs_bloom: string;

  /** @example 0xe4c7bf3aff7ad07f9e80d57f7189f0252592fee6321c2a9bd9b09b6ce0690d27 */
  transactions_root: string;

  /** @example 0x49e3bfe7b618e27fde8fa08884803a8458b502c6534af69873a3cc926a7c724b */
  state_root: string;

  /** @example 0x7cf43d7e837284f036cf92c56973f5e27bdd253ca46168fa195a6b07fa719f23 */
  receipts_root: string;

  /**
   * The address of the miner
   * @example 0xea674fdde714fd979de3edf0f56aa9716b898ec8
   */
  miner: string;

  /**
   * The difficulty of the block
   * @example 7253857437305950
   */
  difficulty: string;

  /**
   * The total difficulty
   * @example 24325637817906576196890
   */
  total_difficulty: string;

  /**
   * The block size
   * @example 61271
   */
  size: string;

  /** @example 0x65746865726d696e652d6575726f70652d7765737433 */
  extra_data: string;

  /**
   * The gas limit
   * @example 14977947
   */
  gas_limit: string;

  /**
   * The gas used
   * @example 14964688
   */
  gas_used: string;

  /**
   * The number of transactions in the block
   * @example 252
   */
  transaction_count: string;

  /** The transactions in the block */
  transactions: BlockTransaction[];
}

export interface BlockDate {
  /**
   * The date of the block
   * @example 2020-01-01T00:00:00+00:00
   */
  date: number;

  /**
   * The blocknumber
   * @example 9193266
   */
  block: number;

  /**
   * The timestamp of the block
   * @example 1577836811
   */
  timestamp: number;
}

export interface TransactionCollection {
  /**
   * The total number of matches for this query
   * @example 2000
   */
  total?: number;

  /**
   * The page of the current result
   * @example 2
   */
  page?: number;

  /**
   * The number of results per page
   * @example 100
   */
  page_size?: number;
  result?: Transaction[];
}

export interface Transaction {
  /**
   * The hash of the transaction
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  hash: string;

  /**
   * The nonce of the transaction
   * @example 326595425
   */
  nonce: string;

  /**
   * The transaction index
   * @example 25
   */
  transaction_index: string;

  /**
   * The sender
   * @example 0xd4a3BebD824189481FC45363602b83C9c7e9cbDf
   */
  from_address: string;

  /**
   * The recipient
   * @example 0xa71db868318f0a0bae9411347cd4a6fa23d8d4ef
   */
  to_address: string;

  /**
   * The value that was transfered (in wei)
   * @example 650000000000000000
   */
  value: string;

  /**
   * The gas of the transaction
   * @example 6721975
   */
  gas: string;

  /**
   * The gas price
   * @example 20000000000
   */
  gas_price: string;

  /** The input */
  input: string;

  /**
   * The receipt cumulative gas used
   * @example 1340925
   */
  receipt_cumulative_gas_used: string;

  /**
   * The receipt gas used
   * @example 1340925
   */
  receipt_gas_used: string;

  /**
   * The receipt contract address
   * @example 0x1d6a4cf64b52f6c73f201839aded7379ce58059c
   */
  receipt_contract_address: string;

  /** The receipt root */
  receipt_root: string;

  /**
   * The receipt status
   * @example 1
   */
  receipt_status: string;

  /**
   * The block timestamp
   * @example 2021-04-02T10:07:54.000Z
   */
  block_timestamp: string;

  /**
   * The block number
   * @example 12526958
   */
  block_number: string;

  /**
   * The block hash
   * @example 0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86
   */
  block_hash: string;
}

export interface Erc20Allowance {
  /** The allowance */
  allowance: string;
}

export interface Erc20TokenBalance {
  /**
   * The address of the token contract
   * @example 0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09
   */
  token_address: string;

  /**
   * The name of the token Contract
   * @example Kylin Network
   */
  name: string;

  /**
   * The symbol of the NFT contract
   * @example KYL
   */
  symbol: string;

  /**
   * The logo of the token
   * @example https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png
   */
  logo?: string;

  /**
   * The thumbnail of the logo
   * @example https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c_thumb.png
   */
  thumbnail?: string;

  /**
   * The number of decimals on of the token
   * @example 18
   */
  decimals: string;

  /**
   * Timestamp of when the contract was last synced with the node
   * @example 123456789
   */
  balance: string;
}

export interface NativeBalance {
  /**
   * The balance
   * @example 1234567890
   */
  balance: string;
}

/**
 * @example eth
 */
export type ChainList =
  | "eth"
  | "0x1"
  | "ropsten"
  | "0x3"
  | "rinkeby"
  | "0x4"
  | "goerli"
  | "0x5"
  | "kovan"
  | "0x2a"
  | "polygon"
  | "0x89"
  | "mumbai"
  | "0x13881"
  | "bsc"
  | "0x38"
  | "bsc testnet"
  | "0x61"
  | "avalanche"
  | "0xa86a";

export interface Nft {
  /**
   * The address of the contract of the NFT
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  token_address: string;

  /**
   * The token id of the NFT
   * @example 15
   */
  token_id: string;

  /**
   * The type of NFT contract standard
   * @example ERC721
   */
  contract_type: string;

  /** The uri to the metadata of the token */
  token_uri?: string;

  /** The metadata of the token */
  metadata?: string;

  /** when the metadata was last updated */
  synced_at?: string;

  /**
   * The number of this item the user owns (used by ERC1155)
   * @example 1
   */
  amount?: string;

  /**
   * The name of the Token contract
   * @example CryptoKitties
   */
  name: string;

  /**
   * The symbol of the NFT contract
   * @example RARI
   */
  symbol: string;
}

export interface NftMetadata {
  /**
   * The address of the contract of the NFT
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  token_address: string;

  /**
   * The token id of the NFT
   * @example 15
   */
  token_id: string;

  /**
   * The type of NFT contract standard
   * @example ERC721
   */
  contract_type: string;

  /** The uri to the metadata of the token */
  token_uri: string;

  /** The metadata of the token */
  metadata: string;

  /** when the metadata was last updated */
  synced_at: string;
}

export interface NftCollection {
  /**
   * The total number of matches for this query
   * @example 2000
   */
  total?: number;

  /**
   * The page of the current result
   * @example 2
   */
  page?: number;

  /**
   * The number of results per page
   * @example 100
   */
  page_size?: number;
  result?: Nft[];
}

export interface NftMetadataCollection {
  /**
   * The total number of matches for this query
   * @example 2000
   */
  total?: number;

  /**
   * The page of the current result
   * @example 2
   */
  page?: number;

  /**
   * The number of results per page
   * @example 100
   */
  page_size?: number;
  result?: NftMetadata[];
}

export interface NftOwner {
  /**
   * The address of the contract of the NFT
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  token_address: string;

  /**
   * The token id of the NFT
   * @example 15
   */
  token_id: string;

  /**
   * The type of NFT contract standard
   * @example ERC721
   */
  contract_type: string;

  /**
   * The address of the owner of the NFT
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  owner_of: string;

  /**
   * The blocknumber when the amount or owner changed
   * @example 88256
   */
  block_number: string;

  /**
   * The blocknumber when the NFT was minted
   * @example 88256
   */
  block_number_minted: string;

  /** The uri to the metadata of the token */
  token_uri?: string;

  /** The metadata of the token */
  metadata?: string;

  /** when the metadata was last updated */
  synced_at?: string;

  /**
   * The number of this item the user owns (used by ERC1155)
   * @example 1
   */
  amount?: string;

  /**
   * The name of the Token contract
   * @example CryptoKitties
   */
  name: string;

  /**
   * The symbol of the NFT contract
   * @example RARI
   */
  symbol: string;
}

export interface NftOwnerCollection {
  /**
   * The syncing status of the address [SYNCING/SYNCED]
   * @example SYNCING
   */
  status?: string;

  /**
   * The total number of matches for this query
   * @example 2000
   */
  total?: number;

  /**
   * The page of the current result
   * @example 2
   */
  page?: number;

  /**
   * The number of results per page
   * @example 100
   */
  page_size?: number;
  result?: NftOwner[];
}

export interface NftTransfer {
  /**
   * The address of the contract of the NFT
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  token_address: string;

  /**
   * The token id of the NFT
   * @example 15
   */
  token_id: string;

  /**
   * The address that sent the NFT
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  from_address?: string;

  /**
   * The address that recieved the NFT
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  to_address: string;

  /**
   * The value that was sent in the transaction (ETH/BNB/etc..)
   * @example 1000000000000000
   */
  value?: string;

  /**
   * The number of tokens transferred
   * @example 1
   */
  amount?: string;

  /**
   * The type of NFT contract standard
   * @example ERC721
   */
  contract_type: string;

  /**
   * The blocknumber of the transaction
   * @example 88256
   */
  block_number: string;

  /**
   * The block timestamp
   * @example 2021-06-04T16:00:15
   */
  block_timestamp: string;

  /** The block hash of the transaction */
  block_hash: string;

  /**
   * The transaction hash
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  transaction_hash: string;

  /** The transaction type */
  transaction_type?: string;

  /** The transaction index */
  transaction_index?: string;

  /** The log index */
  log_index: number;

  /**
   * The operator present only for ERC1155 Transfers
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  operator?: string;
}

export interface NftTransferCollection {
  /**
   * The total number of matches for this query
   * @example 2000
   */
  total: number;

  /**
   * The page of the current result
   * @example 2
   */
  page: number;

  /**
   * The number of results per page
   * @example 100
   */
  page_size: number;
  result: NftTransfer[];
}

export interface NftContractMetadata {
  /**
   * The address of the token contract
   * @example 0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09
   */
  token_address: string;

  /**
   * The name of the token Contract
   * @example KryptoKitties
   */
  name: string;

  /** The abi of the token Contract */
  abi?: string;

  /** value -1 if the contract does not support token_uri */
  supports_token_uri?: number;

  /** Timestamp of when the contract was last synced with the node */
  synced_at?: string;

  /**
   * The symbol of the NFT contract
   * @example RARI
   */
  symbol: string;

  /**
   * The type of NFT contract
   * @example ERC721
   */
  contract_type: string;
}

export interface NftContractMetadataCollection {
  /**
   * The total number of matches for this query
   * @example 2000
   */
  total: number;

  /**
   * The page of the current result
   * @example 2
   */
  page: number;

  /**
   * The number of results per page
   * @example 100
   */
  page_size: number;
  result: NftContractMetadata[];
}

export interface Erc20Transaction {
  /**
   * The transaction hash
   * @example 0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09
   */
  transaction_hash: string;

  /**
   * The address of the token
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  address: string;

  /**
   * The block timestamp
   * @example 2021-04-02T10:07:54.000Z
   */
  block_timestamp: string;

  /**
   * The block number
   * @example 12526958
   */
  block_number: string;

  /**
   * The block hash
   * @example 0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86
   */
  block_hash: string;

  /**
   * The recipient
   * @example 0x62AED87d21Ad0F3cdE4D147Fdcc9245401Af0044
   */
  to_address: string;

  /**
   * The sender
   * @example 0xd4a3BebD824189481FC45363602b83C9c7e9cbDf
   */
  from_address: string;

  /**
   * The value that was transfered (in wei)
   * @example 650000000000000000
   */
  value: string;
}

export interface HistoricalNftTransfer {
  /**
   * The transaction hash
   * @example 0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09
   */
  transaction_hash: string;

  /**
   * The address of the token
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  address: string;

  /**
   * The block timestamp
   * @example 2021-04-02T10:07:54.000Z
   */
  block_timestamp: string;

  /**
   * The block number
   * @example 12526958
   */
  block_number: string;

  /**
   * The block hash
   * @example 0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86
   */
  block_hash: string;

  /**
   * The recipient
   * @example 0x62AED87d21Ad0F3cdE4D147Fdcc9245401Af0044
   */
  to_address: string;

  /**
   * The sender
   * @example 0xd4a3BebD824189481FC45363602b83C9c7e9cbDf
   */
  from_address: string;

  /** The token ids of the tokens that were transfered */
  token_ids: string[];

  /** The amounts that were transfered */
  amounts: string[];

  /**
   * They contract type of the transfer
   * @example ERC721
   */
  contract_type: string;
}

export interface Erc20Metadata {
  /**
   * The address of the token contract
   * @example 0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09
   */
  address: string;

  /**
   * The name of the token Contract
   * @example Kylin Network
   */
  name: string;

  /**
   * The symbol of the NFT contract
   * @example KYL
   */
  symbol: string;

  /**
   * The number of decimals on of the token
   * @example 18
   */
  decimals: string;

  /**
   * The logo of the token
   * @example https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png
   */
  logo?: string;

  /**
   * The logo hash
   * @example ee7aa2cdf100649a3521a082116258e862e6971261a39b5cd4e4354fcccbc54d
   */
  logo_hash?: string;

  /**
   * The thumbnail of the logo
   * @example https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c_thumb.png
   */
  thumbnail?: string;
  block_number?: string;
  validated?: string;
}

export interface Erc721Metadata {
  /**
   * The name of the token Contract
   * @example Kylin Network
   */
  name: string;

  /**
   * The symbol of the NFT contract
   * @example KYL
   */
  symbol: string;
  token_uri?: string;
}

export interface Erc20Price {
  nativePrice?: NativeErc20Price;

  /**
   * The price in USD for the token
   * @format double
   * @example 19.722370676
   */
  usdPrice: number;

  /**
   * The address of the exchange used to calculate the price
   * @example 0x1f98431c8ad98523631ae4a59f267346ea31f984
   */
  exchangeAddress?: string;

  /**
   * The name of the exchange used for calculating the price
   * @example Uniswap v3
   */
  exchangeName?: string;
}

export interface NativeErc20Price {
  /**
   * The native price of the token
   * @example 8409770570506626
   */
  value: string;

  /**
   * The number of decimals of the token
   * @example 18
   */
  decimals: number;

  /**
   * The Name of the token
   * @example Ether
   */
  name: string;

  /**
   * The Symbol of the token
   * @example ETH
   */
  symbol: string;
}

export interface Resolve {
  /**
   * Resolved domain address
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  address: string;
}

export interface ReservesCollection {
  /**
   * reserve0
   * @example 1177323085102288091856004
   */
  reserve0: string;

  /**
   * reserve1
   * @example 9424175928981149993184
   */
  reserve1: string;
}

export interface GetBlockParams {
  /** The chain to query */
  chain?: ChainList;

  /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
  subdomain?: string;

  /** The block hash or block number */
  blockNumberOrHash: string;
}

export interface GetDateToBlockParams {
  /** The chain to query */
  chain?: ChainList;

  /** web3 provider url to user when using local dev chain */
  providerUrl?: string;

  /** Unix date in miliseconds or a datestring (any format that is accepted by momentjs) */
  date: string;
}

export interface GetLogsByAddressParams {
  /** The chain to query */
  chain?: ChainList;

  /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
  subdomain?: string;

  /**
   * The block number
   * * Provide the param 'block_numer' or ('from_block' and / or 'to_block')
   * * If 'block_numer' is provided in conbinaison with 'from_block' and / or 'to_block', 'block_number' will will be used
   *
   */
  block_number?: string;

  /**
   * The minimum block number from where to get the logs
   * * Provide the param 'block_numer' or ('from_block' and / or 'to_block')
   * * If 'block_numer' is provided in conbinaison with 'from_block' and / or 'to_block', 'block_number' will will be used
   *
   */
  from_block?: string;

  /**
   * The maximum block number from where to get the logs
   * * Provide the param 'block_numer' or ('from_block' and / or 'to_block')
   * * If 'block_numer' is provided in conbinaison with 'from_block' and / or 'to_block', 'block_number' will will be used
   *
   */
  to_block?: string;

  /**
   * The date from where to get the logs (any format that is accepted by momentjs)
   * * Provide the param 'from_block' or 'from_date'
   * * If 'from_date' and 'from_block' are provided, 'from_block' will be used.
   * * If 'from_date' and the block params are provided, the block params will be used. Please refer to the blocks params sections (block_number,from_block and to_block) on how to use them
   *
   */
  from_date?: string;

  /**
   * Get the logs to this date (any format that is accepted by momentjs)
   * * Provide the param 'to_block' or 'to_date'
   * * If 'to_date' and 'to_block' are provided, 'to_block' will be used.
   * * If 'to_date' and the block params are provided, the block params will be used. Please refer to the blocks params sections (block_number,from_block and to_block) on how to use them
   *
   */
  to_date?: string;

  /** topic0 */
  topic0?: string;

  /** topic1 */
  topic1?: string;

  /** topic2 */
  topic2?: string;

  /** topic3 */
  topic3?: string;

  /** address */
  address: string;
}

export interface GetNftTransfersByBlockParams {
  /** The chain to query */
  chain?: ChainList;

  /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
  subdomain?: string;

  /** The block hash or block number */
  blockNumberOrHash: string;
}

export interface GetTransactionParams {
  /** The chain to query */
  chain?: ChainList;

  /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
  subdomain?: string;

  /**
   * The transaction hash
   * @example 0x8d88ab7b4eb2d8284901dfacef64453106cdbce7311f48c710a75eeff9e378cc
   */
  transactionHash: string;
}

export type GetContractEventsPayload = object;

export interface GetContractEventsParams {
  /** The chain to query */
  chain?: ChainList;

  /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
  subdomain?: string;

  /** web3 provider url to user when using local dev chain */
  providerUrl?: string;

  /**
   * The minimum block number from where to get the logs
   * * Provide the param 'from_block' or 'from_date'
   * * If 'from_date' and 'from_block' are provided, 'from_block' will be used.
   *
   * @min 0
   */
  from_block?: number;

  /**
   * The maximum block number from where to get the logs.
   * * Provide the param 'to_block' or 'to_date'
   * * If 'to_date' and 'to_block' are provided, 'to_block' will be used.
   *
   * @min 0
   */
  to_block?: number;

  /**
   * The date from where to get the logs (any format that is accepted by momentjs)
   * * Provide the param 'from_block' or 'from_date'
   * * If 'from_date' and 'from_block' are provided, 'from_block' will be used.
   *
   */
  from_date?: string;

  /**
   * Get the logs to this date (any format that is accepted by momentjs)
   * * Provide the param 'to_block' or 'to_date'
   * * If 'to_date' and 'to_block' are provided, 'to_block' will be used.
   *
   */
  to_date?: any;

  /** The topic of the event */
  topic: string;

  /**
   * offset
   * @min 0
   */
  offset?: number;

  /**
   * limit
   * @min 0
   */
  limit?: number;

  /** address */
  address: string;
}

export type RunContractFunctionPayload = object;

export interface RunContractFunctionParams {
  /** The chain to query */
  chain?: ChainList;

  /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
  subdomain?: string;

  /** web3 provider url to user when using local dev chain */
  providerUrl?: string;

  /** function_name */
  function_name: string;

  /** address */
  address: string;
}

export interface GetTransactionsParams {
  /** The chain to query */
  chain?: ChainList;

  /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
  subdomain?: string;

  /**
   * The minimum block number from where to get the transactions
   * * Provide the param 'from_block' or 'from_date'
   * * If 'from_date' and 'from_block' are provided, 'from_block' will be used.
   *
   * @min 0
   */
  from_block?: number;

  /**
   * The maximum block number from where to get the transactions.
   * * Provide the param 'to_block' or 'to_date'
   * * If 'to_date' and 'to_block' are provided, 'to_block' will be used.
   *
   * @min 0
   */
  to_block?: number;

  /**
   * The date from where to get the transactions (any format that is accepted by momentjs)
   * * Provide the param 'from_block' or 'from_date'
   * * If 'from_date' and 'from_block' are provided, 'from_block' will be used.
   *
   */
  from_date?: string;

  /**
   * Get the transactions to this date (any format that is accepted by momentjs)
   * * Provide the param 'to_block' or 'to_date'
   * * If 'to_date' and 'to_block' are provided, 'to_block' will be used.
   *
   */
  to_date?: any;

  /**
   * offset
   * @min 0
   */
  offset?: number;

  /**
   * limit
   * @min 0
   */
  limit?: number;

  /** address */
  address: string;
}

export interface GetNativeBalanceParams {
  /** The chain to query */
  chain?: ChainList;

  /** web3 provider url to user when using local dev chain */
  providerUrl?: string;

  /** The block number on which the balances should be checked */
  to_block?: number;

  /**
   * The address for which the native balance will be checked
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  address: string;
}

export interface GetTokenBalancesParams {
  /** The chain to query */
  chain?: ChainList;

  /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
  subdomain?: string;

  /** The block number on which the balances should be checked */
  to_block?: number;

  /**
   * The address for which token balances will be checked
   * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
   */
  address: string;
}

export interface GetTokenTransfersParams {
  /** The chain to query */
  chain?: ChainList;

  /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
  subdomain?: string;

  /**
   * The minimum block number from where to get the transactions
   * * Provide the param 'from_block' or 'from_date'
   * * If 'from_date' and 'from_block' are provided, 'from_block' will be used.
   *
   * @min 0
   */
  from_block?: number;

  /**
   * The maximum block number from where to get the transactions.
   * * Provide the param 'to_block' or 'to_date'
   * * If 'to_date' and 'to_block' are provided, 'to_block' will be used.
   *
   * @min 0
   */
  to_block?: number;

  /**
   * The date from where to get the transactions (any format that is accepted by momentjs)
   * * Provide the param 'from_block' or 'from_date'
   * * If 'from_date' and 'from_block' are provided, 'from_block' will be used.
   *
   */
  from_date?: string;

  /**
   * Get the transactions to this date (any format that is accepted by momentjs)
   * * Provide the param 'to_block' or 'to_date'
   * * If 'to_date' and 'to_block' are provided, 'to_block' will be used.
   *
   */
  to_date?: any;

  /**
   * offset
   * @min 0
   */
  offset?: number;

  /**
   * limit
   * @min 0
   */
  limit?: number;

  /** address */
  address: string;
}

export interface GetNfTsParams {
  /** The chain to query */
  chain?: ChainList;

  /**
   * The format of the token id
   * @example decimal
   */
  format?: "decimal" | "hex";

  /**
   * offset
   * @min 0
   */
  offset?: number;

  /**
   * limit
   * @min 0
   */
  limit?: number;

  /** The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: "name", "name.ASC", "name.DESC", Example 2: "Name and Symbol", "name.ASC,symbol.DESC" */
  order?: string;

  /** The owner of a given token */
  address: string;
}

export interface GetNftTransfersParams {
  /** The chain to query */
  chain?: ChainList;

  /**
   * The format of the token id
   * @example decimal
   */
  format?: "decimal" | "hex";

  /**
   * The transfer direction
   * @example both
   */
  direction?: "both" | "to" | "from";

  /**
   * offset
   * @min 0
   */
  offset?: number;

  /**
   * limit
   * @min 0
   */
  limit?: number;

  /** The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: "token_address", "token_address.ASC", "token_address.DESC", Example 2: "token_address and token_id", "token_address.ASC,token_id.DESC" */
  order?: string;

  /** The sender or recepient of the transfer */
  address: string;
}

export interface GetNfTsForContractParams {
  /** The chain to query */
  chain?: ChainList;

  /**
   * The format of the token id
   * @example decimal
   */
  format?: "decimal" | "hex";

  /**
   * offset
   * @min 0
   */
  offset?: number;

  /**
   * limit
   * @min 0
   */
  limit?: number;

  /** The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: "name", "name.ASC", "name.DESC", Example 2: "Name and Symbol", "name.ASC,symbol.DESC" */
  order?: string;

  /** The owner of a given token */
  address: string;

  /** Address of the contract */
  tokenAddress?: string;
}

export interface GetTokenMetadataParams {
  /** The chain to query */
  chain?: ChainList;

  /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
  subdomain?: string;

  /** web3 provider url to user when using local dev chain */
  providerUrl?: string;

  /** The addresses to get metadata for */
  addresses: string[];
}

export interface GetTokenMetadataBySymbolParams {
  /** The chain to query */
  chain?: ChainList;

  /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
  subdomain?: string;

  /** The symbols to get metadata for */
  symbols: string[];
}

export interface GetTokenPriceParams {
  /** The chain to query */
  chain?: ChainList;

  /** web3 provider url to user when using local dev chain */
  providerUrl?: string;

  /** The factory name or address of the token exchange */
  exchange?: string;

  /**
   * to_block
   * @min 0
   */
  to_block?: number;

  /** The address of the token contract */
  address: string;
}

export interface GetTokenAdressTransfersParams {
  /** The chain to query */
  chain?: ChainList;

  /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
  subdomain?: string;

  /**
   * The minimum block number from where to get the transfers
   * * Provide the param 'from_block' or 'from_date'
   * * If 'from_date' and 'from_block' are provided, 'from_block' will be used.
   *
   * @min 0
   */
  from_block?: number;

  /**
   * The maximum block number from where to get the transfers.
   * * Provide the param 'to_block' or 'to_date'
   * * If 'to_date' and 'to_block' are provided, 'to_block' will be used.
   *
   * @min 0
   */
  to_block?: number;

  /**
   * The date from where to get the transfers (any format that is accepted by momentjs)
   * * Provide the param 'from_block' or 'from_date'
   * * If 'from_date' and 'from_block' are provided, 'from_block' will be used.
   *
   */
  from_date?: string;

  /**
   * Get the transfers to this date (any format that is accepted by momentjs)
   * * Provide the param 'to_block' or 'to_date'
   * * If 'to_date' and 'to_block' are provided, 'to_block' will be used.
   *
   */
  to_date?: any;

  /**
   * offset
   * @min 0
   */
  offset?: number;

  /**
   * limit
   * @min 0
   */
  limit?: number;

  /** The address of the token contract */
  address: string;
}

export interface GetTokenAllowanceParams {
  /** The chain to query */
  chain?: ChainList;

  /** web3 provider url to user when using local dev chain */
  providerUrl?: string;

  /** The address of the token owner */
  owner_address: string;

  /** The address of the token spender */
  spender_address: string;

  /** The address of the token contract */
  address: string;
}

export interface SearchNfTsParams {
  /** The chain to query */
  chain?: ChainList;

  /**
   * The format of the token id
   * @example decimal
   */
  format?: "decimal" | "hex";

  /** The search string */
  q: string;

  /**
   * What fields the search should match on. To look into the entire metadata set the value to 'global'. To have a better response time you can look into a specific field like name
   * @example name
   */
  filter?:
    | "name"
    | "description"
    | "attributes"
    | "global"
    | "name,description"
    | "name,attributes"
    | "description,attributes"
    | "name,description,attributes";

  /**
   * offset
   * @min 0
   */
  offset?: number;

  /**
   * limit
   * @min 0
   */
  limit?: number;
}

export interface GetAllTokenIdsParams {
  /** The chain to query */
  chain?: ChainList;

  /**
   * The format of the token id
   * @example decimal
   */
  format?: "decimal" | "hex";

  /**
   * offset
   * @min 0
   */
  offset?: number;

  /**
   * limit
   * @min 0
   */
  limit?: number;

  /**
   * If the order should be Ascending or Descending based on the blocknumber on which the NFT was minted. Allowed values: "ASC", "DESC"
   * @example DESC
   */
  order?: string;

  /** Address of the contract */
  address: string;
}

export interface GetContractNftTransfersParams {
  /** The chain to query */
  chain?: ChainList;

  /**
   * The format of the token id
   * @example decimal
   */
  format?: "decimal" | "hex";

  /**
   * offset
   * @min 0
   */
  offset?: number;

  /**
   * limit
   * @min 0
   */
  limit?: number;

  /** The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: "block_number", "block_number.ASC", "block_number.DESC", Example 2: "block_number and contract_type", "block_number.ASC,contract_type.DESC" */
  order?: string;

  /** Address of the contract */
  address: string;
}

export interface GetNftOwnersParams {
  /** The chain to query */
  chain?: ChainList;

  /**
   * The format of the token id
   * @example decimal
   */
  format?: "decimal" | "hex";

  /**
   * offset
   * @min 0
   */
  offset?: number;

  /**
   * limit
   * @min 0
   */
  limit?: number;

  /** The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: "name", "name.ASC", "name.DESC", Example 2: "Name and Symbol", "name.ASC,symbol.DESC" */
  order?: string;

  /** Address of the contract */
  address: string;
}

export interface GetNftMetadataParams {
  /** The chain to query */
  chain?: ChainList;

  /** Address of the contract */
  address: string;
}

export interface GetTokenIdMetadataParams {
  /** The chain to query */
  chain?: ChainList;

  /**
   * The format of the token id
   * @example decimal
   */
  format?: "decimal" | "hex";

  /** Address of the contract */
  address: string;

  /** The id of the token */
  tokenId: string;
}

export interface GetTokenIdOwnersParams {
  /** The chain to query */
  chain?: ChainList;

  /**
   * The format of the token id
   * @example decimal
   */
  format?: "decimal" | "hex";

  /**
   * offset
   * @min 0
   */
  offset?: number;

  /**
   * limit
   * @min 0
   */
  limit?: number;

  /** The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: "name", "name.ASC", "name.DESC", Example 2: "Name and Symbol", "name.ASC,symbol.DESC" */
  order?: string;

  /** Address of the contract */
  address: string;

  /** The id of the token */
  tokenId: string;
}

export interface GetWalletTokenIdTransfersParams {
  /** The chain to query */
  chain?: ChainList;

  /**
   * The format of the token id
   * @example decimal
   */
  format?: "decimal" | "hex";

  /**
   * offset
   * @min 0
   */
  offset?: number;

  /**
   * limit
   * @min 0
   */
  limit?: number;

  /** The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: "block_number", "block_number.ASC", "block_number.DESC", Example 2: "block_number and contract_type", "block_number.ASC,contract_type.DESC" */
  order?: string;

  /** Address of the contract */
  address: string;

  /** The id of the token */
  tokenId: string;
}

export interface ResolveDomainParams {
  /**
   * The currency to query
   * @example eth
   */
  currency?: "eth" | "0x1";

  /**
   * Domain to be resolved
   * @example brad.crypto
   */
  domain: string;
}

export interface GetPairReservesParams {
  /** The chain to query */
  chain?: ChainList;

  /** To get the reserves at this block number */
  to_block?: string;

  /**
   * Get the reserves to this date (any format that is accepted by momentjs)
   * * Provide the param 'to_block' or 'to_date'
   * * If 'to_date' and 'to_block' are provided, 'to_block' will be used.
   *
   */
  to_date?: any;

  /** web3 provider url to user when using local dev chain */
  provider_url?: string;

  /**
   * Liquidity pair address
   * @example 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
   */
  pairAddress: string;
}

export interface GetPairAddressParams {
  /** The chain to query */
  chain?: ChainList;

  /** To get the reserves at this block number */
  to_block?: string;

  /**
   * Get the reserves to this date (any format that is accepted by momentjs)
   * * Provide the param 'to_block' or 'to_date'
   * * If 'to_date' and 'to_block' are provided, 'to_block' will be used.
   *
   */
  to_date?: any;

  /**
   * The factory name or address of the token exchange
   * @example uniswapv2
   */
  exchange: "uniswapv2" | "uniswapv3" | "sushiswapv2" | "pancakeswapv2" | "pancakeswapv1" | "quickswap";

  /**
   * Token0 address
   * @example 0x2b591e99afe9f32eaa6214f7b7629768c40eeb39
   */
  token0Address: string;

  /**
   * Token1 address
   * @example 0xdac17f958d2ee523a2206206994597c13d831ec7
   */
  token1Address: string;
}

export namespace Block {
  /**
   * @description Gets the contents of a block by block hash
   * @tags native
   * @name GetBlock
   * @summary Gets block contents by block hash
   * @request GET:/block/{block_number_or_hash}
   * @secure
   */
  export namespace GetBlock {
    export type RequestParams = { blockNumberOrHash: string };
    export type RequestQuery = { chain?: ChainList; subdomain?: string };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Block;
  }
  /**
   * @description Gets NFT transfers by block number or block hash
   * @tags native
   * @name GetNftTransfersByBlock
   * @summary Gets NFT transfers by block number or block hash
   * @request GET:/block/{block_number_or_hash}/nft/transfers
   * @secure
   */
  export namespace GetNftTransfersByBlock {
    export type RequestParams = { blockNumberOrHash: string };
    export type RequestQuery = { chain?: ChainList; subdomain?: string };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = NftTransferCollection;
  }
}

export namespace DateToBlock {
  /**
   * @description Gets the closest block of the provided date
   * @tags native
   * @name GetDateToBlock
   * @summary Gets the closest block of the provided date
   * @request GET:/dateToBlock
   * @secure
   */
  export namespace GetDateToBlock {
    export type RequestParams = {};
    export type RequestQuery = { chain?: ChainList; providerUrl?: string; date: string };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BlockDate;
  }
}

export namespace Address {
  /**
   * @description Gets the logs from an address
   * @tags native
   * @name GetLogsByAddress
   * @summary Gets address logs
   * @request GET:/{address}/logs
   * @secure
   */
  export namespace GetLogsByAddress {
    export type RequestParams = { address: string };
    export type RequestQuery = {
      chain?: ChainList;
      subdomain?: string;
      block_number?: string;
      from_block?: string;
      to_block?: string;
      from_date?: string;
      to_date?: string;
      topic0?: string;
      topic1?: string;
      topic2?: string;
      topic3?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = LogEventByAddress;
  }
  /**
   * @description Gets events in descending order based on block number
   * @tags native
   * @name GetContractEvents
   * @summary Gets events by topic
   * @request POST:/{address}/events
   * @secure
   */
  export namespace GetContractEvents {
    export type RequestParams = { address: string };
    export type RequestQuery = {
      chain?: ChainList;
      subdomain?: string;
      providerUrl?: string;
      from_block?: number;
      to_block?: number;
      from_date?: string;
      to_date?: any;
      topic: string;
      offset?: number;
      limit?: number;
    };
    export type RequestBody = GetContractEventsPayload;
    export type RequestHeaders = {};
    export type ResponseBody = LogEvent[];
  }
  /**
   * @description Runs a given function of a contract abi and returns readonly data
   * @tags native
   * @name RunContractFunction
   * @summary Runs a function of a contract abi
   * @request POST:/{address}/function
   * @secure
   */
  export namespace RunContractFunction {
    export type RequestParams = { address: string };
    export type RequestQuery = { chain?: ChainList; subdomain?: string; providerUrl?: string; function_name: string };
    export type RequestBody = RunContractFunctionPayload;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }
  /**
   * @description Gets native transactions in descending order based on block number
   * @tags account
   * @name GetTransactions
   * @summary Gets native transactions
   * @request GET:/{address}
   * @secure
   */
  export namespace GetTransactions {
    export type RequestParams = { address: string };
    export type RequestQuery = {
      chain?: ChainList;
      subdomain?: string;
      from_block?: number;
      to_block?: number;
      from_date?: string;
      to_date?: any;
      offset?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TransactionCollection;
  }
  /**
   * @description Gets native balance for a specific address
   * @tags account
   * @name GetNativeBalance
   * @summary Gets native balance for a specific address.
   * @request GET:/{address}/balance
   * @secure
   */
  export namespace GetNativeBalance {
    export type RequestParams = { address: string };
    export type RequestQuery = { chain?: ChainList; providerUrl?: string; to_block?: number };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = NativeBalance;
  }
  /**
   * @description Gets token balances for a specific address
   * @tags account
   * @name GetTokenBalances
   * @summary Gets token balances for a specific address.
   * @request GET:/{address}/erc20
   * @secure
   */
  export namespace GetTokenBalances {
    export type RequestParams = { address: string };
    export type RequestQuery = { chain?: ChainList; subdomain?: string; to_block?: number };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Erc20TokenBalance[];
  }
  /**
   * @description Gets ERC20 token transactions in descending order based on block number
   * @tags account
   * @name GetTokenTransfers
   * @summary Gets erc 20 token transactions
   * @request GET:/{address}/erc20/transfers
   * @secure
   */
  export namespace GetTokenTransfers {
    export type RequestParams = { address: string };
    export type RequestQuery = {
      chain?: ChainList;
      subdomain?: string;
      from_block?: number;
      to_block?: number;
      from_date?: string;
      to_date?: any;
      offset?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Erc20Transaction[];
  }
  /**
   * @description Gets NFTs owned by the given address * The response will include status [SYNCED/SYNCING] based on the contracts being indexed. * Use the token_address param to get results for a specific contract only * Note results will include all indexed NFTs * Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested
   * @tags account
   * @name GetNfTs
   * @summary Gets the NFTs owned by a given address
   * @request GET:/{address}/nft
   * @secure
   */
  export namespace GetNfTs {
    export type RequestParams = { address: string };
    export type RequestQuery = {
      chain?: ChainList;
      format?: "decimal" | "hex";
      offset?: number;
      limit?: number;
      order?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = NftOwnerCollection;
  }
  /**
   * @description Gets the transfers of the tokens matching the given parameters
   * @tags account
   * @name GetNftTransfers
   * @summary Gets NFT transfers to and from a given address
   * @request GET:/{address}/nft/transfers
   * @secure
   */
  export namespace GetNftTransfers {
    export type RequestParams = { address: string };
    export type RequestQuery = {
      chain?: ChainList;
      format?: "decimal" | "hex";
      direction?: "both" | "to" | "from";
      offset?: number;
      limit?: number;
      order?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = NftTransferCollection;
  }
  /**
   * @description Gets NFTs owned by the given address * Use the token_address param to get results for a specific contract only * Note results will include all indexed NFTs * Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested
   * @tags account
   * @name GetNfTsForContract
   * @summary Gets the NFTs owned by a given address
   * @request GET:/{address}/nft/{token_address}
   * @secure
   */
  export namespace GetNfTsForContract {
    export type RequestParams = { address: string; tokenAddress?: string };
    export type RequestQuery = {
      chain?: ChainList;
      format?: "decimal" | "hex";
      offset?: number;
      limit?: number;
      order?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = NftOwnerCollection;
  }
}

export namespace Transaction {
  /**
   * @description Gets the contents of a block transaction by hash
   * @tags native
   * @name GetTransaction
   * @summary Gets block contents by block hash
   * @request GET:/transaction/{transaction_hash}
   * @secure
   */
  export namespace GetTransaction {
    export type RequestParams = { transactionHash: string };
    export type RequestQuery = { chain?: ChainList; subdomain?: string };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BlockTransaction;
  }
}

export namespace Erc20 {
  /**
   * @description Returns metadata (name, symbol, decimals, logo) for a given token contract address.
   * @tags token
   * @name GetTokenMetadata
   * @summary Gets token metadata
   * @request GET:/erc20/metadata
   * @secure
   */
  export namespace GetTokenMetadata {
    export type RequestParams = {};
    export type RequestQuery = { chain?: ChainList; subdomain?: string; providerUrl?: string; addresses: string[] };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Erc20Metadata[];
  }
  /**
   * @description Returns metadata (name, symbol, decimals, logo) for a given token contract address.
   * @tags token
   * @name GetTokenMetadataBySymbol
   * @summary Gets token metadata
   * @request GET:/erc20/metadata/symbols
   * @secure
   */
  export namespace GetTokenMetadataBySymbol {
    export type RequestParams = {};
    export type RequestQuery = { chain?: ChainList; subdomain?: string; symbols: string[] };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Erc20Metadata[];
  }
  /**
   * @description Returns the price nominated in the native token and usd for a given token contract address.
   * @tags token
   * @name GetTokenPrice
   * @summary Gets token price
   * @request GET:/erc20/{address}/price
   * @secure
   */
  export namespace GetTokenPrice {
    export type RequestParams = { address: string };
    export type RequestQuery = { chain?: ChainList; providerUrl?: string; exchange?: string; to_block?: number };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Erc20Price;
  }
  /**
   * @description Gets ERC20 token contract transactions in descending order based on block number
   * @tags token
   * @name GetTokenAdressTransfers
   * @summary Gets erc20 transactions of a token contract
   * @request GET:/erc20/{address}/transfers
   * @secure
   */
  export namespace GetTokenAdressTransfers {
    export type RequestParams = { address: string };
    export type RequestQuery = {
      chain?: ChainList;
      subdomain?: string;
      from_block?: number;
      to_block?: number;
      from_date?: string;
      to_date?: any;
      offset?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Erc20Transaction[];
  }
  /**
   * @description Gets the amount which the spender is allowed to withdraw from the spender
   * @tags token
   * @name GetTokenAllowance
   * @summary Gets the amount which the spender is allowed to withdraw from the owner.
   * @request GET:/erc20/{address}/allowance
   * @secure
   */
  export namespace GetTokenAllowance {
    export type RequestParams = { address: string };
    export type RequestQuery = {
      chain?: ChainList;
      providerUrl?: string;
      owner_address: string;
      spender_address: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Erc20Allowance;
  }
}

export namespace Nft {
  /**
   * @description Gets NFTs that match a given metadata search.
   * @tags token
   * @name SearchNfTs
   * @summary Retrieves the NFT data based on a metadata search
   * @request GET:/nft/search
   * @secure
   */
  export namespace SearchNfTs {
    export type RequestParams = {};
    export type RequestQuery = {
      chain?: ChainList;
      format?: "decimal" | "hex";
      q: string;
      filter?:
        | "name"
        | "description"
        | "attributes"
        | "global"
        | "name,description"
        | "name,attributes"
        | "description,attributes"
        | "name,description,attributes";
      offset?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = NftMetadataCollection;
  }
  /**
   * @description Gets data, including metadata (where available), for all token ids for the given contract address. * Results are sorted by the block the token id was minted (descending) and limited to 100 per page by default * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
   * @tags token
   * @name GetAllTokenIds
   * @summary Retrieves the unique NFTs inside a given contract
   * @request GET:/nft/{address}
   * @secure
   */
  export namespace GetAllTokenIds {
    export type RequestParams = { address: string };
    export type RequestQuery = {
      chain?: ChainList;
      format?: "decimal" | "hex";
      offset?: number;
      limit?: number;
      order?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = NftCollection;
  }
  /**
   * @description Gets the transfers of the tokens matching the given parameters
   * @tags token
   * @name GetContractNftTransfers
   * @summary Gets NFT transfers of a given contract
   * @request GET:/nft/{address}/transfers
   * @secure
   */
  export namespace GetContractNftTransfers {
    export type RequestParams = { address: string };
    export type RequestQuery = {
      chain?: ChainList;
      format?: "decimal" | "hex";
      offset?: number;
      limit?: number;
      order?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = NftTransferCollection;
  }
  /**
   * @description Gets all owners of NFT items within a given contract collection * Use after /nft/contract/{token_address} to find out who owns each token id in a collection * Make sure to include a sort parm on a column like block_number_minted for consistent pagination results * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
   * @tags token
   * @name GetNftOwners
   * @summary Gets the owners of the NFTs of a given contract
   * @request GET:/nft/{address}/owners
   * @secure
   */
  export namespace GetNftOwners {
    export type RequestParams = { address: string };
    export type RequestQuery = {
      chain?: ChainList;
      format?: "decimal" | "hex";
      offset?: number;
      limit?: number;
      order?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = NftOwnerCollection;
  }
  /**
   * @description Gets the contract level metadata (name, symbol, base token uri) for the given contract * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
   * @tags token
   * @name GetNftMetadata
   * @summary Gets the global metadata for a given contract
   * @request GET:/nft/{address}/metadata
   * @secure
   */
  export namespace GetNftMetadata {
    export type RequestParams = { address: string };
    export type RequestQuery = { chain?: ChainList };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = NftContractMetadata;
  }
  /**
   * @description Gets data, including metadata (where available), for the given token id of the given contract address. * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
   * @tags token
   * @name GetTokenIdMetadata
   * @summary Gets the NFT with the given id of a given contract
   * @request GET:/nft/{address}/{token_id}
   * @secure
   */
  export namespace GetTokenIdMetadata {
    export type RequestParams = { address: string; tokenId: string };
    export type RequestQuery = { chain?: ChainList; format?: "decimal" | "hex" };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Nft;
  }
  /**
   * @description Gets all owners of NFT items within a given contract collection * Use after /nft/contract/{token_address} to find out who owns each token id in a collection * Make sure to include a sort parm on a column like block_number_minted for consistent pagination results * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
   * @tags token
   * @name GetTokenIdOwners
   * @summary Gets the owners of NFTs for a given contract
   * @request GET:/nft/{address}/{token_id}/owners
   * @secure
   */
  export namespace GetTokenIdOwners {
    export type RequestParams = { address: string; tokenId: string };
    export type RequestQuery = {
      chain?: ChainList;
      format?: "decimal" | "hex";
      offset?: number;
      limit?: number;
      order?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = NftOwnerCollection;
  }
  /**
   * @description Gets the transfers of the tokens matching the given parameters
   * @tags token
   * @name GetWalletTokenIdTransfers
   * @summary Gets NFT transfers of a given contract
   * @request GET:/nft/{address}/{token_id}/transfers
   * @secure
   */
  export namespace GetWalletTokenIdTransfers {
    export type RequestParams = { address: string; tokenId: string };
    export type RequestQuery = {
      chain?: ChainList;
      format?: "decimal" | "hex";
      offset?: number;
      limit?: number;
      order?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = NftTransferCollection;
  }
}

export namespace Resolve {
  /**
   * @description Resolves an Unstoppable domain and returns the address
   * @tags resolve
   * @name ResolveDomain
   * @summary Resolves an Unstoppable domain and returns the address
   * @request GET:/resolve/{domain}
   * @secure
   */
  export namespace ResolveDomain {
    export type RequestParams = { domain: string };
    export type RequestQuery = { currency?: "eth" | "0x1" };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Resolve;
  }
}

export namespace PairAddress {
  /**
   * @description Get the liquidity reserves for a given pair address
   * @tags defi
   * @name GetPairReserves
   * @summary Get liquidity pair reserves
   * @request GET:/{pair_address}/reserves
   * @secure
   */
  export namespace GetPairReserves {
    export type RequestParams = { pairAddress: string };
    export type RequestQuery = { chain?: ChainList; to_block?: string; to_date?: any; provider_url?: string };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ReservesCollection;
  }
}

export namespace Token0Address {
  /**
   * @description Fetches and returns pair data of the provided token0+token1 combination. The token0 and token1 options are interchangable (ie. there is no different outcome in "token0=WETH and token1=USDT" or "token0=USDT and token1=WETH")
   * @tags defi
   * @name GetPairAddress
   * @summary Get pair address based on token0 and token1 address
   * @request GET:/{token0_address}/{token1_address}/pairAddress
   * @secure
   */
  export namespace GetPairAddress {
    export type RequestParams = { token0Address: string; token1Address: string };
    export type RequestQuery = {
      chain?: ChainList;
      to_block?: string;
      to_date?: any;
      exchange: "uniswapv2" | "uniswapv3" | "sushiswapv2" | "pancakeswapv2" | "pancakeswapv1" | "quickswap";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ReservesCollection;
  }
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://deep-index.moralis.io/api/v2";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = (null as unknown) as T;
      r.error = (null as unknown) as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data.data;
    });
  };
}

/**
 * @title Moralis API
 * @version 2
 * @baseUrl https://deep-index.moralis.io/api/v2
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  block = {
    /**
     * @description Gets the contents of a block by block hash
     *
     * @tags native
     * @name GetBlock
     * @summary Gets block contents by block hash
     * @request GET:/block/{block_number_or_hash}
     * @secure
     */
    getBlock: ({ blockNumberOrHash, ...query }: GetBlockParams, params: RequestParams = {}) =>
      this.http.request<Block, any>({
        path: `/block/${blockNumberOrHash}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets NFT transfers by block number or block hash
     *
     * @tags native
     * @name GetNftTransfersByBlock
     * @summary Gets NFT transfers by block number or block hash
     * @request GET:/block/{block_number_or_hash}/nft/transfers
     * @secure
     */
    getNftTransfersByBlock: (
      { blockNumberOrHash, ...query }: GetNftTransfersByBlockParams,
      params: RequestParams = {},
    ) =>
      this.http.request<NftTransferCollection, any>({
        path: `/block/${blockNumberOrHash}/nft/transfers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  dateToBlock = {
    /**
     * @description Gets the closest block of the provided date
     *
     * @tags native
     * @name GetDateToBlock
     * @summary Gets the closest block of the provided date
     * @request GET:/dateToBlock
     * @secure
     */
    getDateToBlock: (query: GetDateToBlockParams, params: RequestParams = {}) =>
      this.http.request<BlockDate, any>({
        path: `/dateToBlock`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  address = {
    /**
     * @description Gets the logs from an address
     *
     * @tags native
     * @name GetLogsByAddress
     * @summary Gets address logs
     * @request GET:/{address}/logs
     * @secure
     */
    getLogsByAddress: ({ address, ...query }: GetLogsByAddressParams, params: RequestParams = {}) =>
      this.http.request<LogEventByAddress, any>({
        path: `/${address}/logs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets events in descending order based on block number
     *
     * @tags native
     * @name GetContractEvents
     * @summary Gets events by topic
     * @request POST:/{address}/events
     * @secure
     */
    getContractEvents: (
      { address, ...query }: GetContractEventsParams,
      data?: GetContractEventsPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<LogEvent[], any>({
        path: `/${address}/events`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Runs a given function of a contract abi and returns readonly data
     *
     * @tags native
     * @name RunContractFunction
     * @summary Runs a function of a contract abi
     * @request POST:/{address}/function
     * @secure
     */
    runContractFunction: (
      { address, ...query }: RunContractFunctionParams,
      data: RunContractFunctionPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<string, any>({
        path: `/${address}/function`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets native transactions in descending order based on block number
     *
     * @tags account
     * @name GetTransactions
     * @summary Gets native transactions
     * @request GET:/{address}
     * @secure
     */
    getTransactions: ({ address, ...query }: GetTransactionsParams, params: RequestParams = {}) =>
      this.http.request<TransactionCollection, any>({
        path: `/${address}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets native balance for a specific address
     *
     * @tags account
     * @name GetNativeBalance
     * @summary Gets native balance for a specific address.
     * @request GET:/{address}/balance
     * @secure
     */
    getNativeBalance: ({ address, ...query }: GetNativeBalanceParams, params: RequestParams = {}) =>
      this.http.request<NativeBalance, any>({
        path: `/${address}/balance`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets token balances for a specific address
     *
     * @tags account
     * @name GetTokenBalances
     * @summary Gets token balances for a specific address.
     * @request GET:/{address}/erc20
     * @secure
     */
    getTokenBalances: ({ address, ...query }: GetTokenBalancesParams, params: RequestParams = {}) =>
      this.http.request<Erc20TokenBalance[], any>({
        path: `/${address}/erc20`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets ERC20 token transactions in descending order based on block number
     *
     * @tags account
     * @name GetTokenTransfers
     * @summary Gets erc 20 token transactions
     * @request GET:/{address}/erc20/transfers
     * @secure
     */
    getTokenTransfers: ({ address, ...query }: GetTokenTransfersParams, params: RequestParams = {}) =>
      this.http.request<Erc20Transaction[], any>({
        path: `/${address}/erc20/transfers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets NFTs owned by the given address * The response will include status [SYNCED/SYNCING] based on the contracts being indexed. * Use the token_address param to get results for a specific contract only * Note results will include all indexed NFTs * Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested
     *
     * @tags account
     * @name GetNfTs
     * @summary Gets the NFTs owned by a given address
     * @request GET:/{address}/nft
     * @secure
     */
    getNfTs: ({ address, ...query }: GetNfTsParams, params: RequestParams = {}) =>
      this.http.request<NftOwnerCollection, any>({
        path: `/${address}/nft`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the transfers of the tokens matching the given parameters
     *
     * @tags account
     * @name GetNftTransfers
     * @summary Gets NFT transfers to and from a given address
     * @request GET:/{address}/nft/transfers
     * @secure
     */
    getNftTransfers: ({ address, ...query }: GetNftTransfersParams, params: RequestParams = {}) =>
      this.http.request<NftTransferCollection, any>({
        path: `/${address}/nft/transfers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets NFTs owned by the given address * Use the token_address param to get results for a specific contract only * Note results will include all indexed NFTs * Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested
     *
     * @tags account
     * @name GetNfTsForContract
     * @summary Gets the NFTs owned by a given address
     * @request GET:/{address}/nft/{token_address}
     * @secure
     */
    getNfTsForContract: ({ address, tokenAddress, ...query }: GetNfTsForContractParams, params: RequestParams = {}) =>
      this.http.request<NftOwnerCollection, any>({
        path: `/${address}/nft/${tokenAddress}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  transaction = {
    /**
     * @description Gets the contents of a block transaction by hash
     *
     * @tags native
     * @name GetTransaction
     * @summary Gets block contents by block hash
     * @request GET:/transaction/{transaction_hash}
     * @secure
     */
    getTransaction: ({ transactionHash, ...query }: GetTransactionParams, params: RequestParams = {}) =>
      this.http.request<BlockTransaction, any>({
        path: `/transaction/${transactionHash}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  erc20 = {
    /**
     * @description Returns metadata (name, symbol, decimals, logo) for a given token contract address.
     *
     * @tags token
     * @name GetTokenMetadata
     * @summary Gets token metadata
     * @request GET:/erc20/metadata
     * @secure
     */
    getTokenMetadata: (query: GetTokenMetadataParams, params: RequestParams = {}) =>
      this.http.request<Erc20Metadata[], any>({
        path: `/erc20/metadata`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns metadata (name, symbol, decimals, logo) for a given token contract address.
     *
     * @tags token
     * @name GetTokenMetadataBySymbol
     * @summary Gets token metadata
     * @request GET:/erc20/metadata/symbols
     * @secure
     */
    getTokenMetadataBySymbol: (query: GetTokenMetadataBySymbolParams, params: RequestParams = {}) =>
      this.http.request<Erc20Metadata[], any>({
        path: `/erc20/metadata/symbols`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the price nominated in the native token and usd for a given token contract address.
     *
     * @tags token
     * @name GetTokenPrice
     * @summary Gets token price
     * @request GET:/erc20/{address}/price
     * @secure
     */
    getTokenPrice: ({ address, ...query }: GetTokenPriceParams, params: RequestParams = {}) =>
      this.http.request<Erc20Price, any>({
        path: `/erc20/${address}/price`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets ERC20 token contract transactions in descending order based on block number
     *
     * @tags token
     * @name GetTokenAdressTransfers
     * @summary Gets erc20 transactions of a token contract
     * @request GET:/erc20/{address}/transfers
     * @secure
     */
    getTokenAdressTransfers: (
      { address, ...query }: GetTokenAdressTransfersParams,
      params: RequestParams = {},
    ) =>
      this.http.request<Erc20Transaction[], any>({
        path: `/erc20/${address}/transfers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the amount which the spender is allowed to withdraw from the spender
     *
     * @tags token
     * @name GetTokenAllowance
     * @summary Gets the amount which the spender is allowed to withdraw from the owner.
     * @request GET:/erc20/{address}/allowance
     * @secure
     */
    getTokenAllowance: ({ address, ...query }: GetTokenAllowanceParams, params: RequestParams = {}) =>
      this.http.request<Erc20Allowance, any>({
        path: `/erc20/${address}/allowance`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  nft = {
    /**
     * @description Gets NFTs that match a given metadata search.
     *
     * @tags token
     * @name SearchNfTs
     * @summary Retrieves the NFT data based on a metadata search
     * @request GET:/nft/search
     * @secure
     */
    searchNfTs: (query: SearchNfTsParams, params: RequestParams = {}) =>
      this.http.request<NftMetadataCollection, any>({
        path: `/nft/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets data, including metadata (where available), for all token ids for the given contract address. * Results are sorted by the block the token id was minted (descending) and limited to 100 per page by default * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
     *
     * @tags token
     * @name GetAllTokenIds
     * @summary Retrieves the unique NFTs inside a given contract
     * @request GET:/nft/{address}
     * @secure
     */
    getAllTokenIds: ({ address, ...query }: GetAllTokenIdsParams, params: RequestParams = {}) =>
      this.http.request<NftCollection, any>({
        path: `/nft/${address}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the transfers of the tokens matching the given parameters
     *
     * @tags token
     * @name GetContractNftTransfers
     * @summary Gets NFT transfers of a given contract
     * @request GET:/nft/{address}/transfers
     * @secure
     */
    getContractNftTransfers: ({ address, ...query }: GetContractNftTransfersParams, params: RequestParams = {}) =>
      this.http.request<NftTransferCollection, any>({
        path: `/nft/${address}/transfers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets all owners of NFT items within a given contract collection * Use after /nft/contract/{token_address} to find out who owns each token id in a collection * Make sure to include a sort parm on a column like block_number_minted for consistent pagination results * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
     *
     * @tags token
     * @name GetNftOwners
     * @summary Gets the owners of the NFTs of a given contract
     * @request GET:/nft/{address}/owners
     * @secure
     */
    getNftOwners: ({ address, ...query }: GetNftOwnersParams, params: RequestParams = {}) =>
      this.http.request<NftOwnerCollection, any>({
        path: `/nft/${address}/owners`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the contract level metadata (name, symbol, base token uri) for the given contract * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
     *
     * @tags token
     * @name GetNftMetadata
     * @summary Gets the global metadata for a given contract
     * @request GET:/nft/{address}/metadata
     * @secure
     */
    getNftMetadata: ({ address, ...query }: GetNftMetadataParams, params: RequestParams = {}) =>
      this.http.request<NftContractMetadata, any>({
        path: `/nft/${address}/metadata`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets data, including metadata (where available), for the given token id of the given contract address. * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
     *
     * @tags token
     * @name GetTokenIdMetadata
     * @summary Gets the NFT with the given id of a given contract
     * @request GET:/nft/{address}/{token_id}
     * @secure
     */
    getTokenIdMetadata: ({ address, tokenId, ...query }: GetTokenIdMetadataParams, params: RequestParams = {}) =>
      this.http.request<Nft, any>({
        path: `/nft/${address}/${tokenId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets all owners of NFT items within a given contract collection * Use after /nft/contract/{token_address} to find out who owns each token id in a collection * Make sure to include a sort parm on a column like block_number_minted for consistent pagination results * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
     *
     * @tags token
     * @name GetTokenIdOwners
     * @summary Gets the owners of NFTs for a given contract
     * @request GET:/nft/{address}/{token_id}/owners
     * @secure
     */
    getTokenIdOwners: ({ address, tokenId, ...query }: GetTokenIdOwnersParams, params: RequestParams = {}) =>
      this.http.request<NftOwnerCollection, any>({
        path: `/nft/${address}/${tokenId}/owners`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the transfers of the tokens matching the given parameters
     *
     * @tags token
     * @name GetWalletTokenIdTransfers
     * @summary Gets NFT transfers of a given contract
     * @request GET:/nft/{address}/{token_id}/transfers
     * @secure
     */
    getWalletTokenIdTransfers: (
      { address, tokenId, ...query }: GetWalletTokenIdTransfersParams,
      params: RequestParams = {},
    ) =>
      this.http.request<NftTransferCollection, any>({
        path: `/nft/${address}/${tokenId}/transfers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  resolve = {
    /**
     * @description Resolves an Unstoppable domain and returns the address
     *
     * @tags resolve
     * @name ResolveDomain
     * @summary Resolves an Unstoppable domain and returns the address
     * @request GET:/resolve/{domain}
     * @secure
     */
    resolveDomain: ({ domain, ...query }: ResolveDomainParams, params: RequestParams = {}) =>
      this.http.request<Resolve, any>({
        path: `/resolve/${domain}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  pairAddress = {
    /**
     * @description Get the liquidity reserves for a given pair address
     *
     * @tags defi
     * @name GetPairReserves
     * @summary Get liquidity pair reserves
     * @request GET:/{pair_address}/reserves
     * @secure
     */
    getPairReserves: ({ pairAddress, ...query }: GetPairReservesParams, params: RequestParams = {}) =>
      this.http.request<ReservesCollection, any>({
        path: `/${pairAddress}/reserves`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  token0Address = {
    /**
     * @description Fetches and returns pair data of the provided token0+token1 combination. The token0 and token1 options are interchangable (ie. there is no different outcome in "token0=WETH and token1=USDT" or "token0=USDT and token1=WETH")
     *
     * @tags defi
     * @name GetPairAddress
     * @summary Get pair address based on token0 and token1 address
     * @request GET:/{token0_address}/{token1_address}/pairAddress
     * @secure
     */
    getPairAddress: ({ token0Address, token1Address, ...query }: GetPairAddressParams, params: RequestParams = {}) =>
      this.http.request<ReservesCollection, any>({
        path: `/{token0_address}/{token1_address}/pairAddress`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
