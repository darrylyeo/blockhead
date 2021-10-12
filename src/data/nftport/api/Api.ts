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

/**
 * An enumeration.
 */
export type AccountRequestInclude = "default" | "metadata";

/**
 * Blockchain where the NFTs smart contract lives
 */
export type AccountRequestSupportedChain = "ethereum" | "tezos";

export interface BodyEasyMintNftWithUploadV0MintsEasyFilesPost {
  /**
   * The file you want to mint. All file types are supported. Maximum file size is 20MB.
   * @format binary
   */
  file: File;
}

export interface BodyIpfsUploadFileIpfsUploadFilePost {
  /** @format binary */
  file: File;
}

export interface BodyIpfsUploadFileV0FilesPost {
  /**
   * The file to upload to IPFS. All file types are supported. Maximum file size is 20MB.
   * @format binary
   */
  file: File;
}

export interface BodyMintNftWithUploadEasyMintPost {
  /** @format binary */
  file: File;
}

export interface BodyMintNftWithUploadMintNftWithUploadPost {
  /** @format binary */
  file: File;
}

export interface BodySearchFileV0RecommendationsSimilarNftsFilesPost {
  /**
   * Input image based on which visually and contextually similar NFTs will be recommended. Supports .JPG, .JPEG, .PNG, .WebP file formats.
   * @format binary
   */
  file: File;
}

export interface BodySearchFileVisualSearchByFilePost {
  /** @format binary */
  file: File;
}

export interface BodySimilarNftsSimilarNftsPost {
  /** @format binary */
  file: File;
}

export interface BodySimilarNftsV0DuplicatesPost {
  /**
   * Input image which will be analyzed to find duplicates. Supports .JPG, .JPEG, .PNG, .WebP, .PPM, .BMP, .PGM, .TIF, .TIFF, file formats.
   * @format binary
   */
  file: File;
}

/**
 * @example {"response":"OK","is_similar":true,"similar_nfts":[{"contract_address":"0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb","token_id":"3100","chain":"ethereum","similarity":0.999998,"file_url":"https://www.larvalabs.com/cryptopunks/cryptopunk3100.png","metadata_url":"https://api.niftygateway.com/beeple/100030071/","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"},"mint_date":"2020-10-29T15:03:54.838612"}]}
 */
export interface ContentIdResponse {
  /** Response status, either OK or NOK. */
  response: string;

  /** Returns true if a match is found, false otherwise. */
  is_similar?: boolean;

  /** Details of matching NFTs if found. */
  similar_nfts: DuplicateNFTResponseModel[];

  /** Error response. */
  error?: string;
}

/**
 * @example {"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"},"metadata_url":"https://api.niftygateway.com/beeple/100030071"}
 */
export interface ContractNft {
  /** Blockchain where the NFT has been minted. */
  chain: "ethereum" | "polygon";

  /** The contract address of the NFT. */
  contract_address: string;

  /** A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain. */
  token_id: string;

  /** Raw NFT metadata downloaded from the metadata_url i.e. token URI. It usually includes the name, description and attributes along with any other data added by the creator. */
  metadata?: object;

  /** Metadata URL inside the contract for a given token, also known as the token URI. For ERC-721 it is the token_uri() function and for ERC-1155 it is the uri() function in the smart contract. */
  metadata_url?: string;
}

/**
 * An enumeration.
 */
export type ContractNftsRequestInclude = "default" | "metadata";

/**
 * @example {"response":"OK","nfts":[{"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"},"metadata_url":"https://api.niftygateway.com/beeple/100030071"}],"total":102}
 */
export interface ContractNftsResponse {
  /** Response status, either OK or NOK. */
  response: string;

  /** nfts */
  nfts?: ContractNft[];

  /** Total number of NFTs in the given contract address. */
  total?: number;

  /** Error response. */
  error?: string;
}

/**
 * Blockchain where the NFTs smart contract lives
 */
export type DeployContractChain = "polygon" | "rinkeby";

/**
 * @example {"chain":"polygon","contract_name":"My Cool Token","contract_symbol":"MCT"}
 */
export interface DeployContractRequest {
  /** Blockchain to deploy the contract to. */
  chain: DeployContractChain;

  /** Name of the NFT contract */
  contract_name: string;

  /** Symbol of the NFT contract */
  contract_symbol: string;
}

/**
 * @example {"chain":"polygon","name":"CRYPTOPUNKS","symbol":"C","owner_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42"}
 */
export interface DeployContractRequestWithAddress {
  /** Blockchain to deploy the contract to. */
  chain: "polygon" | "rinkeby";

  /** Name of the NFT contract. */
  name: string;

  /** Symbol of the NFT contract. */
  symbol: string;

  /** The contract owner address. If you wish to own the contract, then set it as your wallet address. */
  owner_address?: string;
}

/**
 * @example {"contract_address":"0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb","token_id":"3100","chain":"ethereum","similarity":0.999998,"file_url":"https://www.larvalabs.com/cryptopunks/cryptopunk3100.png","metadata_url":"https://api.niftygateway.com/beeple/100030071/","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"},"mint_date":"2020-10-29T15:03:54.838612"}
 */
export interface DuplicateNFTResponseModel {
  /** Contract address of the NFT. */
  contract_address: string;

  /** A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain. */
  token_id: string;

  /** Blockchain where the NFT has been minted. */
  chain: "ethereum" | "polygon";

  /** Similarity of the input image to the NFT (0 to 1). */
  similarity: number;

  /** File (image, video, etc) url of the NFT. */
  file_url?: string;

  /** Metadata URL inside the contract for a given token, also known as the token URI. For ERC-721 it is the token_uri() function and for ERC-1155 it is the uri() function in the smart contract. */
  metadata_url?: string;

  /** Raw NFT metadata downloaded from the metadata_url i.e. token URI. It usually includes the name, description and attributes along with any other data added by the creator. */
  metadata?: object;

  /** Date when the NFT was minted (ISO). */
  mint_date?: string;
}

/**
 * @example {"chain":"polygon","name":"Type your NFT name here","description":"Type your NFT description here","file_url":"Add your file URL here","mint_to_address":"Add your wallet address here"}
 */
export interface EasyMintNftRequest {
  /** Blockchain to mint the NFT on. */
  chain: "polygon" | "rinkeby";

  /** Name of the NFT. */
  name: string;

  /** Text description of the NFT which will be seen on NFT marketplaces, etc. */
  description: string;

  /** URL that points to the image/video or any other file format as long as it returns a Content-Length and Content-Type header or contains the file extension. HTML files are not supported. */
  file_url: string;

  /** Account address where the NFT will be sent. For example, your Metamask wallet address if you wish to send it to yourself. */
  mint_to_address: string;
}

/**
 * @example {"response":"OK","chain":"rinkeby","contract_address":"0x38a554984cf2205f7903123adeb6d560f46625e8","transaction_hash":"0x19ff77a6faebb740168689dfbf0feb63dc4c4b3797235fc8111716f2383e1715"}
 */
export interface GetDeployedContractResponse {
  /** Response status, either OK or NOK. */
  response: string;

  /** Blockchain where the contract has been created. */
  chain?: "polygon" | "rinkeby";

  /** NFT contract address which has been successfully deployed to the blockchain. */
  contract_address?: string;

  /** Transaction hash generated during the execution of deploying the contract. */
  transaction_hash?: string;

  /** Error response. */
  error?: string;
}

/**
 * @example {"response":"OK","chain":"polygon","contract_address":"0x47c7ff137d7a6644a9a96f1d44f5a6f857d9023f","token_id":"2"}
 */
export interface GetMintedNftResponse {
  /** Response status, either OK or NOK. */
  response: string;

  /** Blockchain the NFT was minted on. */
  chain?: "polygon" | "rinkeby";

  /** NFT contract address which has been successfully deployed to the blockchain. */
  contract_address?: string;

  /** A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain. */
  token_id?: string;

  /** Error response. */
  error?: string;
}

/**
 * @example {"response":"OK","contracts":[{"name":"Good Company Tokens","symbol":"GCT","transaction_hash":"0x124141or0f10140112381381dd","chain":"rinkeby","address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","owner_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","creation_date":"2021-08-23T17:25:03.501703"}]}
 */
export interface GetUserProfileContractsResponse {
  /** Response status, either OK or NOK. */
  response: string;

  /** Details of the deployed contracts. */
  contracts?: UserProfileContractDetails[];

  /** Error response. */
  error?: string;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}

/**
 * @example {"response":"OK","ipfs_url":"https://ipfs.io/ipfs/QmRModSr9gQTSZrbfbLis6mw21HycZyqMA3j8YMRD11nAQ","file_name":"name.jpeg","content_type":"image/jpeg","file_size":85138,"file_size_mb":0.0812}
 */
export interface IpfsFileUploadResponse {
  /** Response status, either OK or NOK. */
  response: string;

  /** IPFS URL of the uploaded file. */
  ipfs_url?: string;

  /** Name of the uploaded file. */
  file_name?: string;

  /** Content type (MIME type / media type) of the uploaded file (e.g. image/jpeg). */
  content_type?: string;

  /** Size of the uploaded file in bytes. */
  file_size?: number;

  /** Size of the uploaded file in MB. */
  file_size_mb?: number;

  /** Error response. */
  error?: string;
}

export interface MetadataAttribute {
  /** Trait name. */
  trait_type: string;
  value: number | number | string;

  /** Maximum value for a numeric value. */
  max_value?: number;

  /** Display type of the attribute (None for string values). */
  display_type?: "boost_number" | "boost_percentage" | "number" | "date";
}

/**
 * @example {"chain":"polygon","contract_address":"0xC8D297D7b496f86673551c933815B47973FC4a0e","metadata_uri":"ipfs://QmTz7dGHvXghNuh3V64QBwHPXva4chpMR7frpfxCaxvhd4","mint_to_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42"}
 */
export interface MintNftRequest {
  /** Blockchain where to mint the NFT. */
  chain: "polygon" | "rinkeby";

  /** The NFT will be created inside this contract. It must be your own contract. If you don’t have one, see Deploy an NFT contract. */
  contract_address: string;

  /** Metadata URI which will be linked with your NFT. If you don't have one, see Upload metadata to IPFS. */
  metadata_uri: string;

  /** Account address where the NFT will be sent. For example, your Metamask wallet address if you wish to send it to yourself. */
  mint_to_address: string;

  /** Customizable token ID for the NFT. Maximum length is 76 digit number (2^256 - 1). */
  token_id?: string;
}

/**
 * Blockchain where the NFTs smart contract lives
 */
export type MintNftRequestChain = "polygon" | "rinkeby";

/**
 * @example {"response":"OK","chain":"polygon","contract_address":"0xC8D297D7b496f86673551c933815B47973FC4a0e","transaction_hash":"0xcbbe6072d7aa48b9774ed8b15e7f298489c5e965b32aa468ca520b30aba649a1","transaction_external_url":"https://polygonscan.com/tx/0xcbbe6072d7aa48b9774ed8b15e7f298489c5e965b32aa468ca520b30aba649a1","metadata_uri":"ipfs://QmTz7dGHvXghNuh3V64QBwHPXva4chpMR7frpfxCaxvhd4","mint_to_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42"}
 */
export interface MintNftResponse {
  /** Response status, either OK or NOK. */
  response: string;

  /** Blockchain the NFT was minted on. */
  chain?: "polygon" | "rinkeby";

  /** The contract address where the NFT was minted. */
  contract_address?: string;

  /** The transaction hash which is returned by the blockchain after minting. */
  transaction_hash?: string;

  /** Transaction URL in an external blockchain explorer. */
  transaction_external_url?: string;

  /** Metadata URI linked with the NFT. */
  metadata_uri?: string;

  /** Account address where the NFT was sent. */
  mint_to_address?: string;

  /** Error response. */
  error?: string;
}

/**
 * @example {"response":"OK","chain":"polygon","contract_address":"0x47c7ff137d7a6644a9a96f1d44f5a6f857d9023f","transaction_hash":"0x6eb71286f4875bf48be7834c1ff285910583705714f5a5acff67489f94e14954","transaction_external_url":"https://polygonscan.com/tx/0x6eb71286f4875bf48be7834c1ff285910583705714f5a5acff67489f94e14954","mint_to_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","name":"NFTPort.xyz","description":"One-Stop & Simple NFT Infrastructure & APIs for Developers"}
 */
export interface MintNftWithUploadResponse {
  /** Response status, either OK or NOK. */
  response: string;

  /** Blockchain the NFT was minted on. */
  chain?: "polygon" | "rinkeby";

  /** The contract address where the NFT was minted. */
  contract_address?: string;

  /** The transaction hash which is returned by the blockchain after minting. */
  transaction_hash?: string;

  /** Transaction URL in an external blockchain explorer. */
  transaction_external_url?: string;

  /** Account address where the NFT was sent. */
  mint_to_address?: string;

  /** Name of the NFT. */
  name?: string;

  /** Description of the NFT. */
  description?: string;

  /** Error response. */
  error?: string;
}

/**
 * @example {"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071"}
 */
export interface Nft {
  /** Blockchain where the NFT has been minted. */
  chain: "ethereum" | "polygon";

  /** The contract address of the NFT. */
  contract_address: string;

  /** A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain. */
  token_id: string;
}

/**
 * @example {"height":512,"width":512,"file_size":310751}
 */
export interface NftAssetMetadata {
  /** Image height in pixels. */
  height: number;

  /** Image width in pixels. */
  width: number;

  /** File size in bytes. */
  file_size: number;
}

/**
 * Blockchain where the NFTs smart contract lives
 */
export type NftsRequestChain = "ethereum" | "rinkeby" | "polygon" | "tezos";

/**
 * Blockchain where the NFTs smart contract lives
 */
export type NftsRequestSupportedChain = "ethereum" | "polygon";

/**
 * @example {"response":"OK","nfts":[{"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071"}]}
 */
export interface NftsResponse {
  /** Response status, either OK or NOK. */
  response: string;

  /** nfts */
  nfts?: Nft[];

  /** Error response. */
  error?: string;
}

/**
 * @example {"query":"dog"}
 */
export interface SearchRequest {
  /** Search query */
  query: string;
}

/**
 * Blockchain where the NFTs smart contract lives
 */
export type TextSearchRequestChain = "ethereum" | "polygon" | "all-chains";

/**
 * An enumeration.
 */
export type TextSearchRequestOrder = "relevance" | "mint_date";

/**
 * An enumeration.
 */
export type TextSearchRequestSortOrder = "desc" | "asc";

/**
 * @example {"name":"Good Company Tokens","symbol":"GCT","transaction_hash":"0x124141or0f10140112381381dd","chain":"rinkeby","address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","owner_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","creation_date":"2021-08-23T17:25:03.501703"}
 */
export interface UserProfileContractDetails {
  /** Contract name. */
  name: string;

  /** Contract symbol. */
  symbol: string;

  /** Deployed contract transaction hash which is a unique string of characters that is given to every transaction that is added to the blockchain. */
  transaction_hash: string;

  /** Blockchain where the contract has been created. */
  chain: "polygon" | "rinkeby";

  /** NFT contract address which has been successfully deployed to the blockchain. */
  address: string;

  /** Owner address of the deployed NFT contract. */
  owner_address?: string;

  /** Date when the contract was created (ISO). */
  creation_date: string;
}

export interface ValidationError {
  loc: string[];
  msg: string;
  type: string;
}

/**
 * @example {"contract_address":"KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton","token_id":"159383","name":"Cool name","description":"Cool description","asset_url":"ipfs://QmVkyU2c6ade8su1UKqSSx6iNLDp6zrCMUGX8DrRFcm9mq","creator_address":"tz1dVxdJwpJixh6Kcd5FZULTfFcR98V7Z2fw","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"}}
 */
export interface SrcServiceAccountDeprecatedEntitiesAccountNft {
  /** The contract address of the NFT. */
  contract_address: string;

  /** A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain. */
  token_id: string;

  /** Name of the NFT. */
  name?: string;

  /** Description of the NFT. */
  description?: string;

  /** NFT file URL where it is hosted. */
  asset_url?: string;

  /** NFT creator address. */
  creator_address?: string;

  /** NFT metadata downloaded and parsed from the contract token URI. It usually includes the name, description and attributes along with any other data added by the creator. */
  metadata?: object;
}

/**
 * @example {"response":"OK","nfts":[{"contract_address":"KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton","token_id":"159383","name":"Cool name","description":"Cool description","asset_url":"ipfs://QmVkyU2c6ade8su1UKqSSx6iNLDp6zrCMUGX8DrRFcm9mq","creator_address":"tz1dVxdJwpJixh6Kcd5FZULTfFcR98V7Z2fw","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"}}],"total":12}
 */
export interface SrcServiceAccountDeprecatedEntitiesAccountNftsResponse {
  /** Response status, either OK or NOK. */
  response: string;
  nfts?: SrcServiceAccountDeprecatedEntitiesAccountNft[];

  /** Total number of NFTs owned by the address. */
  total?: number;

  /** Continuation ID for next page. */
  continuation?: string;

  /** Error response. */
  error?: string;
}

/**
 * @example {"contract_address":"KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton","token_id":"159383","name":"Cool name","description":"Cool description","file_url":"ipfs://QmVkyU2c6ade8su1UKqSSx6iNLDp6zrCMUGX8DrRFcm9mq","creator_address":"tz1dVxdJwpJixh6Kcd5FZULTfFcR98V7Z2fw","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"}}
 */
export interface SrcServiceAccountEntitiesAccountNft {
  /** The contract address of the NFT. */
  contract_address: string;

  /** A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain. */
  token_id: string;

  /** Name of the NFT. */
  name?: string;

  /** Description of the NFT. */
  description?: string;

  /** File (image, video, etc) URL of the NFT. */
  file_url?: string;

  /** NFT creator address. */
  creator_address?: string;

  /** Raw NFT metadata downloaded from the metadata_url i.e. token URI. It usually includes the name, description and attributes along with any other data added by the creator. */
  metadata?: object;
}

/**
 * @example {"response":"OK","nfts":[{"contract_address":"KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton","token_id":"159383","name":"Cool name","description":"Cool description","file_url":"ipfs://QmVkyU2c6ade8su1UKqSSx6iNLDp6zrCMUGX8DrRFcm9mq","creator_address":"tz1dVxdJwpJixh6Kcd5FZULTfFcR98V7Z2fw","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"}}],"total":12}
 */
export interface SrcServiceAccountEntitiesAccountNftsResponse {
  /** Response status, either OK or NOK. */
  response: string;
  nfts?: SrcServiceAccountEntitiesAccountNft[];

  /** Total number of NFTs owned by the address. */
  total?: number;

  /** Continuation ID for next page. */
  continuation?: string;

  /** Error response. */
  error?: string;
}

/**
 * @example {"response":"OK","chain":"polygon","transaction_hash":"0x773ea27408d521898aaf20067e6b8e252b6aa5f0067878da6e2f22fe6fe3eee8","transaction_external_url":"https://polygonscan.com/tx/0xb1ffb9907e4b72cd89b81e00c4c233d1cc7c661f96f65979048eb6332deb467e","contract_name":"NFTPort.xyz","contract_symbol":"NFTP"}
 */
export interface SrcServiceContractDeprecatedEntitiesDeployContractResponse {
  /** Response status, either OK or NOK. */
  response: string;

  /** The blockchain where the NFT has been minted. */
  chain?: DeployContractChain;

  /** Deployed contract transaction hash which is a unique string of characters that is given to every transaction that is added to the blockchain. */
  transaction_hash?: string;

  /** Transaction URL in an external blockchain explorer. */
  transaction_external_url?: string;

  /** Name of the deployed NFT contract */
  contract_name?: string;

  /** Symbol of the deployed NFT contract */
  contract_symbol?: string;

  /** Error */
  error?: string;
}

/**
 * @example {"response":"OK","chain":"polygon","transaction_hash":"0x773ea27408d521898aaf20067e6b8e252b6aa5f0067878da6e2f22fe6fe3eee8","transaction_external_url":"https://polygonscan.com/tx/0xb1ffb9907e4b72cd89b81e00c4c233d1cc7c661f96f65979048eb6332deb467e","name":"CRYPTOPUNKS","symbol":"C","owner_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42"}
 */
export interface SrcServiceContractEntitiesDeployContractResponse {
  /** Response status, either OK or NOK. */
  response: string;

  /** Blockchain where the contract has been created. */
  chain?: "polygon" | "rinkeby";

  /** Deployed contract transaction hash which is a unique string of characters that is given to every transaction that is added to the blockchain. */
  transaction_hash?: string;

  /** Transaction URL in an external blockchain explorer. */
  transaction_external_url?: string;

  /** Owner address of the deployed NFT contract. */
  owner_address?: string;

  /** Name of the deployed NFT contract. */
  name?: string;

  /** Symbol of the deployed NFT contract. */
  symbol?: string;

  /** Error response. */
  error?: string;
}

export interface SrcServiceMintingDeprecatedEntitiesGetUserProfileMintedNftsResponse {
  /** Response status, either OK or NOK. */
  response: string;

  /** Total number of NFTs minted. */
  total?: number;

  /** User minted NFTs */
  minted_nfts?: SrcServiceMintingDeprecatedEntitiesUserMintedNftResponse[];

  /** Error response. */
  error?: string;
}

/**
 * @example {"name":"My Art","description":"This is my custom art piece","file_uri":"https://ipfs.io/ipfs/QmRModSr9gQTSZrbfbLis6mw21HycZyqMA3j8YMRD11nAQ","attributes":[{"trait_type":"Base","value":"Blue drawing"},{"trait_type":"Style","value":"Lines"},{"trait_type":"Level","value":3,"max_value":10},{"trait_type":"Coolness","value":1.8,"max_value":2},{"display_type":"boost_number","trait_type":"Spiciness","value":37},{"display_type":"boost_percentage","trait_type":"Epicness","value":11},{"display_type":"number","trait_type":"Generation","value":3}]}
 */
export interface SrcServiceMintingDeprecatedEntitiesIpfsMetadataUploadRequest {
  /** Name of NFT. */
  name: string;

  /** Description of NFT. */
  description: string;

  /** URL of the file that you wish to link with the metadata and turn into an NFT. */
  file_uri: string;

  /** Optional list of NFT attributes. */
  attributes?: MetadataAttribute[];
}

/**
 * @example {"response":"OK","metadata_ipfs_uri":"ipfs://QmTz7dGHvXghNuh3V64QBwHPXva4chpMR7frpfxCaxvhd4"}
 */
export interface SrcServiceMintingDeprecatedEntitiesIpfsMetadataUploadResponse {
  /** Response status, either OK or NOK. */
  response: string;
  metadata_ipfs_uri?: string;

  /** Error response. */
  error?: string;
}

/**
 * @example {"chain":"polygon","transaction_hash":"0x124141or0f10140112381381dd","contract_name":"My NFTPort contract","contract_address":"0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb","token_id":"6473","minted_address":"0xc155f9bd6b71e9f71d0236b689ad7c2c5d16febf","metadata_ipfs_uri":"ipfs://QmTz7dGHvXghNuh3V64QBwHPXva4chpMR7frpfxCaxvhd4","minted_date":"2021-08-23T17:25:03.501703"}
 */
export interface SrcServiceMintingDeprecatedEntitiesUserMintedNftResponse {
  /** Chain the NFT was minted on. */
  chain: NftsRequestChain;

  /** NFT minting transaction hash. */
  transaction_hash: string;

  /** Contract name of the minted NFT. */
  contract_name: string;

  /** Contract address of the minted NFT. */
  contract_address?: string;

  /** Token ID of the minted NFT. */
  token_id?: string;

  /** Address where the NFT was minted. */
  minted_address: string;

  /** Metadata IPFS URI */
  metadata_ipfs_uri?: string;

  /** Date when the NFT was minted (UTC). */
  minted_date: string;
}

/**
 * @example {"response":"OK","total":1,"minted_nfts":[{"chain":"polygon","transaction_hash":"0x124141or0f10140112381381dd","contract_name":"My NFTPort contract","contract_address":"0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb","token_id":"6473","mint_to_address":"0xc155f9bd6b71e9f71d0236b689ad7c2c5d16febf","metadata_uri":"ipfs://QmTz7dGHvXghNuh3V64QBwHPXva4chpMR7frpfxCaxvhd4","mint_date":"2021-08-23T17:25:03.501703"}]}
 */
export interface SrcServiceMintingEntitiesGetUserProfileMintedNftsResponse {
  /** Response status, either OK or NOK. */
  response: string;

  /** Total number of NFTs minted. */
  total?: number;

  /** Details of the NFTs minted by you. */
  minted_nfts?: SrcServiceMintingEntitiesUserMintedNftResponse[];

  /** Error response. */
  error?: string;
}

/**
 * @example {"name":"My Art","description":"This is my custom art piece","file_url":"https://ipfs.io/ipfs/QmRModSr9gQTSZrbfbLis6mw21HycZyqMA3j8YMRD11nAQ","attributes":[{"trait_type":"Base","value":"Blue drawing"},{"trait_type":"Style","value":"Lines"},{"trait_type":"Level","value":3,"max_value":10},{"trait_type":"Coolness","value":1.8,"max_value":2},{"display_type":"boost_number","trait_type":"Spiciness","value":37},{"display_type":"boost_percentage","trait_type":"Epicness","value":11},{"display_type":"number","trait_type":"Generation","value":3}]}
 */
export interface SrcServiceMintingEntitiesIpfsMetadataUploadRequest {
  /** Name of the NFT. */
  name: string;

  /** Description of the NFT. */
  description: string;

  /** URL of the file that you wish to link with the metadata and turn into an NFT. */
  file_url: string;

  /** Optional list of NFT attributes. See [OpenSea docs](https://docs.opensea.io/docs/metadata-standards#attributes) for more information. */
  attributes?: MetadataAttribute[];
}

/**
 * @example {"response":"OK","metadata_uri":"ipfs://QmTz7dGHvXghNuh3V64QBwHPXva4chpMR7frpfxCaxvhd4","name":"My Art","description":"This is my custom art piece","file_url":"https://ipfs.io/ipfs/QmRModSr9gQTSZrbfbLis6mw21HycZyqMA3j8YMRD11nAQ","attributes":[{"trait_type":"Base","value":"Blue drawing"},{"trait_type":"Style","value":"Lines"},{"trait_type":"Level","value":3,"max_value":10},{"trait_type":"Coolness","value":1.8,"max_value":2},{"display_type":"boost_number","trait_type":"Spiciness","value":37},{"display_type":"boost_percentage","trait_type":"Epicness","value":11},{"display_type":"number","trait_type":"Generation","value":3}]}
 */
export interface SrcServiceMintingEntitiesIpfsMetadataUploadResponse {
  /** Response status, either OK or NOK. */
  response: string;

  /** Uploaded metadata URI (also known as token URI) which you can use in [Customizable minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting). */
  metadata_uri?: string;

  /** Name of the NFT. */
  name?: string;

  /** Description of the NFT. */
  description?: string;

  /** URL of the file that is linked with the metadata and can be turned into an NFT. */
  file_url?: string;

  /** NFT attributes. */
  attributes?: MetadataAttribute[];

  /** Error response. */
  error?: string;
}

/**
 * @example {"chain":"polygon","transaction_hash":"0x124141or0f10140112381381dd","contract_name":"My NFTPort contract","contract_address":"0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb","token_id":"6473","mint_to_address":"0xc155f9bd6b71e9f71d0236b689ad7c2c5d16febf","metadata_uri":"ipfs://QmTz7dGHvXghNuh3V64QBwHPXva4chpMR7frpfxCaxvhd4","mint_date":"2021-08-23T17:25:03.501703"}
 */
export interface SrcServiceMintingEntitiesUserMintedNftResponse {
  /** Blockchain the NFT was minted on. */
  chain: "polygon" | "rinkeby";

  /** The transaction hash which is returned by the blockchain after minting. */
  transaction_hash: string;

  /** Contract name of the minted NFT. */
  contract_name: string;

  /** Contract address of the minted NFT. */
  contract_address?: string;

  /** A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain. */
  token_id?: string;

  /** Account address where the NFT was sent. */
  mint_to_address: string;

  /** IPFS URI containing the metadata linked with the minted NFT. */
  metadata_uri?: string;

  /** Date when the NFT was minted (ISO). */
  mint_date: string;
}

/**
 * @example {"contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","token_uri":"https://api.niftygateway.com/beeple/100030071/","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"},"asset_metadata":{"height":512,"width":512,"file_size":310751},"image_url":"https://lh3.googleusercontent.com/79JB1V9gSMv83iMs-Db4qdpPVdpKiyt_sjGLgs575wLEgWjSRLCzMQMoxaealYz7AVCKY_mzSy6GlOYdGt_7aaCZfg","cached_image_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","mint_date":"2020-10-29T15:03:54.838612"}
 */
export interface SrcServiceNftsDeprecatedEntitiesNftDetails {
  /** The contract address of the NFT. */
  contract_address: string;

  /** A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain. */
  token_id: string;

  /** Token URI (For ERC-721 it is the token_uri() function and ERC-1155 it is the uri() function in the smart contract). */
  token_uri?: string;

  /** NFT metadata downloaded and parsed from the contract token URI. It usually includes the name, description and attributes along with any other data added by the creator. */
  metadata?: object;

  /** Extra information of the file inside the NFT. */
  asset_metadata?: NftAssetMetadata;

  /** Original Image URL. */
  image_url?: string;

  /** Cached image in NFTPort's cloud with no access restrictions and without IPFS issues. */
  cached_image_url?: string;

  /** Date when the NFT was minted. */
  mint_date?: string;
}

/**
 * @example {"response":"OK","nfts":[{"contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","token_uri":"https://api.niftygateway.com/beeple/100030071/","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"},"asset_metadata":{"height":512,"width":512,"file_size":310751},"image_url":"https://lh3.googleusercontent.com/79JB1V9gSMv83iMs-Db4qdpPVdpKiyt_sjGLgs575wLEgWjSRLCzMQMoxaealYz7AVCKY_mzSy6GlOYdGt_7aaCZfg","cached_image_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","mint_date":"2020-10-29T15:03:54.838612"}]}
 */
export interface SrcServiceNftsDeprecatedEntitiesNftDetailsResponse {
  /** Response status, either OK or NOK. */
  response: string;
  nft?: SrcServiceNftsDeprecatedEntitiesNftDetails;

  /** Error response. */
  error?: string;
}

/**
 * @example {"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","metadata_url":"https://api.niftygateway.com/beeple/100030071/","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"},"file_information":{"height":512,"width":512,"file_size":310751},"file_url":"https://lh3.googleusercontent.com/79JB1V9gSMv83iMs-Db4qdpPVdpKiyt_sjGLgs575wLEgWjSRLCzMQMoxaealYz7AVCKY_mzSy6GlOYdGt_7aaCZfg","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","mint_date":"2020-10-29T15:03:54.838612"}
 */
export interface SrcServiceNftsEntitiesNftDetails {
  /** Blockchain where the NFT has been minted. */
  chain: "ethereum" | "polygon";

  /** The contract address of the NFT. */
  contract_address: string;

  /** A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain. */
  token_id: string;

  /** Metadata URL inside the contract for a given token, also known as the token URI. For ERC-721 it is the token_uri() function and for ERC-1155 it is the uri() function in the smart contract. */
  metadata_url?: string;

  /** Raw NFT metadata downloaded from the metadata_url i.e. token URI. It usually includes the name, description and attributes along with any other data added by the creator. */
  metadata?: object;

  /** Extra information of the NFT’s file. */
  file_information?: NftAssetMetadata;

  /** Original file (image, video, etc) URL of the NFT. */
  file_url?: string;

  /** Cached file (image, video, etc) in NFTPort's cloud with no access restrictions and without IPFS issues. */
  cached_file_url?: string;

  /** Date when the NFT was minted (ISO). */
  mint_date?: string;
}

/**
 * @example {"response":"OK","nfts":[{"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","metadata_url":"https://api.niftygateway.com/beeple/100030071/","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"},"file_information":{"height":512,"width":512,"file_size":310751},"file_url":"https://lh3.googleusercontent.com/79JB1V9gSMv83iMs-Db4qdpPVdpKiyt_sjGLgs575wLEgWjSRLCzMQMoxaealYz7AVCKY_mzSy6GlOYdGt_7aaCZfg","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","mint_date":"2020-10-29T15:03:54.838612"}]}
 */
export interface SrcServiceNftsEntitiesNftDetailsResponse {
  /** Response status, either OK or NOK. */
  response: string;
  nft?: SrcServiceNftsEntitiesNftDetails;

  /** Error response. */
  error?: string;
}

export interface SrcServiceSearchDeprecatedEntitiesSearchResult {
  /** Response status, either OK or NOK */
  response: string;
  images?: SrcServiceSearchDeprecatedEntitiesSearchResultImage[];
  reason?: string;
}

export interface SrcServiceSearchDeprecatedEntitiesSearchResultImage {
  /** The blockchain where the NFT has been minted. */
  chain: NftsRequestSupportedChain;

  /** The contract address of the NFT. */
  contract_address: string;

  /** A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain. */
  token_id: string;

  /** Cached image in NFTPort's cloud with no access restrictions and without IPFS issues. */
  image_url?: string;

  /** External url for the NFT where it originated from. */
  external_url?: string;

  /** NFT metadata downloaded and parsed from the contract token URI. It usually includes the name, description and attributes along with any other data added by the creator. */
  raw_metadata?: object;
}

/**
 * @example {"url":"https://supermariorun.com/assets/img/stage/obj_mode1.png"}
 */
export interface SrcServiceSearchDeprecatedSearchUrlRequestSearchUrlRequest {
  /** Image URL. Supports .JPG, .JPEG, .PNG, .WebP file formats. */
  url: string;
}

/**
 * @example {"response":"OK","nfts":[{"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"}}]}
 */
export interface SrcServiceSearchEntitiesSearchResult {
  /** Response status, either OK or NOK. */
  response: string;

  /** nfts */
  nfts?: SrcServiceSearchEntitiesSearchResultImage[];

  /** Error response. */
  error?: string;
}

/**
 * @example {"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"}}
 */
export interface SrcServiceSearchEntitiesSearchResultImage {
  /** Blockchain where the NFT has been minted. */
  chain: "ethereum" | "polygon";

  /** The contract address of the NFT. */
  contract_address: string;

  /** A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain. */
  token_id: string;

  /** Cached file (image, video, etc) in NFTPort's cloud with no access restrictions and without IPFS issues. */
  cached_file_url?: string;

  /** Raw NFT metadata downloaded from the metadata_url i.e. token URI. It usually includes the name, description and attributes along with any other data added by the creator. */
  metadata?: object;
}

/**
 * @example {"url":"https://supermariorun.com/assets/img/stage/obj_mode1.png","page_number":1,"page_size":50}
 */
export interface SrcServiceSearchSearchUrlRequestSearchUrlRequest {
  /** Image URL. Supports .JPG, .JPEG, .PNG, .WebP file formats. */
  url: string;

  /**
   * The page number of the results to return. The first page is 1.
   * @min 1
   */
  page_number?: number;

  /**
   * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
   * @min 1
   * @max 50
   */
  page_size?: number;
}

/**
 * @example {"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","image_url":"Image url value","name":"Name field value in NFT metadata","description":"Description field value in NFT metadata","mint_date":"2020-10-29T15:03:54.838612"}
 */
export interface SrcServiceTextSearchDeprecatedEntitiesTextSearchNft {
  /** Blockchain where the NFT has been minted. */
  chain: "polygon" | "ethereum";

  /** The contract address of the NFT. */
  contract_address: string;

  /** A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain. */
  token_id: string;

  /** Cached image in NFTPort's cloud with no access restrictions and without IPFS issues. */
  image_url: string;

  /** Name of the NFT in the metadata. */
  name: string;

  /** Description of the NFT in the metadata. */
  description: string;

  /** Date when the NFT was minted (ISO). */
  mint_date?: string;
}

/**
 * @example {"response":"OK","search_results":[{"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","image_url":"Image url value","name":"Name field value in NFT metadata","description":"Description field value in NFT metadata","mint_date":"2020-10-29T15:03:54.838612"}]}
 */
export interface SrcServiceTextSearchDeprecatedEntitiesTextSearchResponse {
  /** Response status, either OK or NOK. */
  response: string;
  search_results?: SrcServiceTextSearchDeprecatedEntitiesTextSearchNft[];

  /** Error response. */
  error?: string;
}

/**
 * @example {"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","name":"Name field value in NFT metadata","description":"Description field value in NFT metadata","mint_date":"2020-10-29T15:03:54.838612"}
 */
export interface SrcServiceTextSearchEntitiesTextSearchNft {
  /** Blockchain where the NFT has been minted. */
  chain: "polygon" | "ethereum";

  /** The contract address of the NFT. */
  contract_address: string;

  /** A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain. */
  token_id: string;

  /** Cached file (image, video, etc) in NFTPort's cloud with no access restrictions and without IPFS issues. */
  cached_file_url: string;

  /** Name of the NFT in the metadata. */
  name: string;

  /** Description of the NFT in the metadata. */
  description: string;

  /** Date when the NFT was minted (ISO). */
  mint_date?: string;
}

/**
 * @example {"response":"OK","search_results":[{"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","name":"Name field value in NFT metadata","description":"Description field value in NFT metadata","mint_date":"2020-10-29T15:03:54.838612"}]}
 */
export interface SrcServiceTextSearchEntitiesTextSearchResponse {
  /** Response status, either OK or NOK. */
  response: string;
  search_results?: SrcServiceTextSearchEntitiesTextSearchNft[];

  /** Error response. */
  error?: string;
}

export interface NftsV0NftsGetParams {
  /** Blockchain from which to query NFTs. */
  chain: "ethereum" | "polygon";

  /**
   * The page number of the results to return. The first page is 1.
   * @min 1
   */
  page_number?: number;

  /**
   * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
   * @min 1
   * @max 50
   */
  page_size?: number;
}

export interface NftDetailsV0NftsContractAddressTokenIdGetParams {
  /** Blockchain where the NFT has been minted. */
  chain: "ethereum" | "polygon";
  contractAddress: string;
  tokenId: string;
}

export interface NftsByContractV0NftsContractAddressGetParams {
  /** Blockchain from which to query NFTs. */
  chain: "ethereum" | "polygon";

  /**
   * The page number of the results to return. The first page is 1.
   * @min 1
   */
  page_number?: number;

  /**
   * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
   * @min 1
   * @max 50
   */
  page_size?: number;

  /** Include optional data in the response. ```default``` is the default response and metadata includes NFT metadata, like in Retrieve NFT details. */
  include?: ContractNftsRequestInclude;
  contractAddress: string;
}

export interface AccountNftsV0AccountsAccountAddressGetParams {
  /** Blockchain from which to query NFTs. */
  chain: "ethereum" | "tezos";

  /**
   * The page number of the results to return. The first page is 1.
   * @min 1
   */
  page_number?: number;

  /**
   * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
   * @min 1
   * @max 50
   */
  page_size?: number;

  /** Continuation. Pass this value from the previous response to fetch the next page. */
  continuation?: string;

  /** Include optional data in the response. ```default``` is the default response and metadata includes NFT metadata, like in Retrieve NFT details. */
  include?: AccountRequestInclude;
  accountAddress: string;
}

export interface GetDeployedContractV0ContractsTransactionHashGetParams {
  /** Blockchain where the contract has been deployed to. */
  chain: "polygon" | "rinkeby";
  transactionHash: string;
}

export interface EasyMintNftWithUploadV0MintsEasyFilesPostParams {
  /** Blockchain to mint the NFT on. */
  chain: "polygon" | "rinkeby";

  /** Name of the NFT. */
  name: string;

  /** Text description of the NFT which will be seen on NFT marketplaces, etc. */
  description: string;

  /** Account address where the NFT will be sent. For example, your Metamask wallet address if you wish to send it to yourself. */
  mint_to_address: string;
}

export interface GetMintedNftV0MintsTransactionHashGetParams {
  /** Blockchain the NFT was minted on. */
  chain: "polygon" | "rinkeby";
  transactionHash: string;
}

export interface GetUserMintedNftsV0MeMintsGetParams {
  /** Blockchain where the NFTs have been minted. */
  chain?: "polygon" | "rinkeby";

  /**
   * The page number of the results to return. The first page is 1.
   * @min 1
   */
  page_number?: number;

  /**
   * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
   * @min 1
   * @max 50
   */
  page_size?: number;
}

export interface TextSearchV0SearchGetParams {
  /** Search query. */
  text: string;

  /** Blockchain from which to query NFTs. */
  chain?: "polygon" | "ethereum" | "all";

  /**
   * The page number of the results to return. The first page is 1.
   * @min 1
   */
  page_number?: number;

  /**
   * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
   * @min 1
   * @max 50
   */
  page_size?: number;

  /** Results ordering criteria. Deafult ordering criteria is search relevance. */
  order_by?: TextSearchRequestOrder;

  /** Results will be sorted in this order (ascending/descending). */
  sort_order?: TextSearchRequestSortOrder;

  /** Results will only include NFTs from this contract address. */
  filter_by_contract_address?: string;
}

export interface SearchFileV0RecommendationsSimilarNftsFilesPostParams {
  /**
   * The page number of the results to return. The first page is 1.
   * @min 1
   */
  page_number?: number;

  /**
   * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
   * @min 1
   * @max 50
   */
  page_size?: number;
}

export interface SimilarNftsV0DuplicatesPostParams {
  /**
   * Maximum amount of results.
   * @min 1
   * @max 50
   */
  limit?: number;

  /**
   * Threshold for classifying an NFT as a counterfeit.
   * @min 0.1
   * @max 1
   */
  threshold?: number;

  /** NFTs from this contract address will be filtered out. Useful for examples where the whole NFT collection is visually very similar e.g. CryptoPunks. */
  filter_out_contract_address?: string;
}

export namespace V0 {
  /**
   * @description Returns all ERC721 and ERC1155 NFTs that have been minted on a given chain. Ethereum and Polygon are supported. #### Useful for: * Big data analysis or analytics with all the NFTs. * Keeping track of all the created NFTs. * Importing all NFTs to your application. #### Related: * To get all NFTs per contract, see [Retrieve contract NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjAzNTUyMDA-retrieve-contract-nf-ts). * To get detailed information on the returned NFTs, see [Retrieve NFT details](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjAzNTUxOTk-retrieve-nft-details).
   * @tags Contracts, Metadata & Assets
   * @name NftsV0NftsGet
   * @summary Retrieve all NFTs
   * @request GET:/v0/nfts
   * @secure
   */
  export namespace NftsV0NftsGet {
    export type RequestParams = {};
    export type RequestQuery = { chain: "ethereum" | "polygon"; page_number?: number; page_size?: number };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = NftsResponse;
  }
  /**
   * @description Returns details for a given NFT. These include ```metadata_url```, ```metadata``` such as name, description, attributes, etc., ```image_url```, ```cached_image_url``` and ```mint_date```. Ethereum and Polygon are supported. #### Useful for: * For easily getting all the necessary information about a given NFT. #### Related: * To get all NFTs per contract, see [Retrieve contract NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjAzNTUyMDA-retrieve-contract-nf-ts). * To get NFTs that a given account owns, see [Retrieve NFTs owned by an account](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NDk-retrieve-nf-ts-owned-by-an-account).
   * @tags Contracts, Metadata & Assets
   * @name NftDetailsV0NftsContractAddressTokenIdGet
   * @summary Retrieve NFT details
   * @request GET:/v0/nfts/{contract_address}/{token_id}
   * @secure
   */
  export namespace NftDetailsV0NftsContractAddressTokenIdGet {
    export type RequestParams = { contractAddress: string; tokenId: string };
    export type RequestQuery = { chain: "ethereum" | "polygon" };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SrcServiceNftsEntitiesNftDetailsResponse;
  }
  /**
   * @description Returns all NFTs for a given contract address. Can be set to ```include``` the NFT ```metadata```. Ethereum and Polygon are supported. #### Useful for: * Importing all NFTs from a given contract to your application. #### Related: * To get detailed information on the returned NFTs, see [Retrieve NFT details](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjAzNTUxOTk-retrieve-nft-details). * To get NFTs that a given account owns, see [Retrieve NFTs owned by an account](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NDk-retrieve-nf-ts-owned-by-an-account).
   * @tags Contracts, Metadata & Assets
   * @name NftsByContractV0NftsContractAddressGet
   * @summary Retrieve contract NFTs
   * @request GET:/v0/nfts/{contract_address}
   * @secure
   */
  export namespace NftsByContractV0NftsContractAddressGet {
    export type RequestParams = { contractAddress: string };
    export type RequestQuery = {
      chain: "ethereum" | "polygon";
      page_number?: number;
      page_size?: number;
      include?: ContractNftsRequestInclude;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ContractNftsResponse;
  }
  /**
   * @description Returns NFTs owned by a given account (i.e. wallet) address. Can also return each NFT metadata with  ```include```  parameter. Ethereum and Tezos are supported (Polygon upcoming). **For Ethereum use the continuation string from response for pagination, for Tezos use page number.** #### Useful for: * For checking if a user owns a specific NFT and then unlocking specific activity. * Adding NFT portfolio section to your apps. #### Related: * To get all NFTs per contract, see [Retrieve contract NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjAzNTUyMDA-retrieve-contract-nf-ts). * To get extra detailed information on the returned NFTs, see [Retrieve NFT details](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjAzNTUxOTk-retrieve-nft-details).
   * @tags Ownership
   * @name AccountNftsV0AccountsAccountAddressGet
   * @summary Retrieve NFTs owned by an account
   * @request GET:/v0/accounts/{account_address}
   * @secure
   */
  export namespace AccountNftsV0AccountsAccountAddressGet {
    export type RequestParams = { accountAddress: string };
    export type RequestQuery = {
      chain: "ethereum" | "tezos";
      page_number?: number;
      page_size?: number;
      continuation?: string;
      include?: AccountRequestInclude;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SrcServiceAccountEntitiesAccountNftsResponse;
  }
  /**
   * @description Deploys a standard ```ERC-721``` smart contract where your can mint your NFTs. This is a required step if you wish to use [Customizable minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting) as the contract will represent your own collection. As blockchains take time to sync, then after contract deployment, you can use the returned ```transaction_hash``` in [Retrieve a deployed contract](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTI-retrieve-a-deployed-contract) to get the ```contract_address```. **You can deploy up to 5 contracts for free per chain. For higher limits, write in [Discord](https://discord.gg/bE2cn9qCRg).** #### Useful for: * Deploying your own contracts so you can build custom products or collections easily. #### Related: * To get the deployed contract address, use [Retrieve a deployed contract](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTI-retrieve-a-deployed-contract). * If you want to know how to use the customizable minting, see [Customizable Minting Quickstart](https://nftport.stoplight.io/docs/nftport-v0-manual/ZG9jOjIwMzU1MDQx-minting-quickstart#customizable-minting).
   * @tags Contracts
   * @name DeployContractV0ContractsPost
   * @summary Deploy an NFT contract
   * @request POST:/v0/contracts
   * @secure
   */
  export namespace DeployContractV0ContractsPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeployContractRequestWithAddress;
    export type RequestHeaders = {};
    export type ResponseBody = SrcServiceContractEntitiesDeployContractResponse;
  }
  /**
   * @description Returns the details of a contract that has previously been deployed with [Deploy an NFT contract](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTE-deploy-an-nft-contract). Supply the ```transaction_hash``` to check if the contract is on chain and to get the ```contract_address```. You can use the returned ```contract_address``` in [Customizable Minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting). As blockchains take time to sync, this endpoint can be polled until the ```contract_address``` is returned. #### Useful for: * Deploying your own contracts so you can build custom products or collections easily. #### Related: * If you want to get data about NFT contracts which you haven't deployed using NFTPort, see [Retrieve contract NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjAzNTUyMDA-retrieve-contract-nf-ts). * If you want to learn how to use the [customizable minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting), see [Customizable Minting Quickstart](https://nftport.stoplight.io/docs/nftport-v0-manual/ZG9jOjIwMzU1MDQx-minting-quickstart#customizable-minting).
   * @tags Contracts
   * @name GetDeployedContractV0ContractsTransactionHashGet
   * @summary Retrieve a deployed contract
   * @request GET:/v0/contracts/{transaction_hash}
   * @secure
   */
  export namespace GetDeployedContractV0ContractsTransactionHashGet {
    export type RequestParams = { transactionHash: string };
    export type RequestQuery = { chain: "polygon" | "rinkeby" };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetDeployedContractResponse;
  }
  /**
   * @description Uploads a file to [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/) which makes your NFT storage easy. You can use the returned  ```ipfs_url```  with [Upload metadata to IPFS](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTM-upload-metadata-to-ipfs) to mint your NFT. If you prefer hosting files in your own servers, you can skip this step. Otherwise, we recommend using IPFS because it's an industry standard for decentralized storage and guarantees the immutability of your files. We use Pinata to [pin](https://docs.ipfs.io/how-to/pin-files/) the files which ensures that your important data is retained in IPFS. **Supports all file types and maximum file size is 20MB. For higher limits, write in [Discord](https://discord.gg/bE2cn9qCRg).** #### Useful for: * Storing your NFT files easily and according to the industry standards. #### Related: * After uploading files, use [Upload metadata to IPFS](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTM-upload-metadata-to-ipfs) to continue with your NFT minting. * If you want to learn how to use the [customizable minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting), see [Customizable Minting Quickstart](https://nftport.stoplight.io/docs/nftport-v0-manual/ZG9jOjIwMzU1MDQx-minting-quickstart#customizable-minting). #### Example Requests in cURL, Python & JS <!-- title: "Make sure to replace the parameters with your own values" lineNumbers: true --> ```shell curl --request POST \ --url 'https://api.nftport.xyz/v0/files' \ --header 'Authorization: API Key Here' \ --header 'Content-Type: multipart/form-data' \ --form 'file=@/path/to/file_to_upload.png;type=image/png' ``` ```python import requests file = open("image.png", "rb") response = requests.post( "https://api.nftport.xyz/v0/files", headers={"Authorization": 'API-Key-Here'}, files={"file": file} ) ``` ```javascript const fs = require('fs'); const fetch = require('node-fetch'); const FormData = require('form-data'); const form = new FormData(); const fileStream = fs.createReadStream('image.jpg'); form.append('file', fileStream); const options = { method: 'POST', body: form, headers: { "Authorization": "API-Key-Here", }, }; fetch("https://api.nftport.xyz/v0/files", options) .then(response => { return response.json() }) .then(responseJson => { // Handle the response console.log(responseJson); }) ```
   * @tags Storage
   * @name IpfsUploadFileV0FilesPost
   * @summary Upload a file to IPFS
   * @request POST:/v0/files
   * @secure
   */
  export namespace IpfsUploadFileV0FilesPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BodyIpfsUploadFileV0FilesPost;
    export type RequestHeaders = {};
    export type ResponseBody = IpfsFileUploadResponse;
  }
  /**
   * @description Uploads NFT metadata to [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/) as a JSON file which is the standard format for  [NFT metadata](https://nftschool.dev/reference/metadata-schemas/#intro-to-json-schemas). You can use the returned ```metadata_ipfs_uri``` in [Customizable minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting) to mint your NFT. If you prefer hosting metadata in your own servers, you can skip this step. Otherwise, we recommend using IPFS because it’s an industry standard for decentralized storage and guarantees the immutability of your metadata. For the ```file_url```, we also recommend using IPFS with [Upload a file to IPFS](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA0MzIxNjk-upload-a-file-to-ipfs). We use Pinata to pin the files which ensures that your important data is retained in IPFS. #### Useful for: * Storing your NFT metadata easily and according to the industry standards. #### Related: * After uploading your metadata, use [Customizable minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting) to continue with your NFT minting. * If you want to learn how to use the customizable minting, see [Customizable Minting Quickstart](https://nftport.stoplight.io/docs/nftport-v0-manual/ZG9jOjIwMzU1MDQx-minting-quickstart#customizable-minting). * If you are new to NFT metadata, see the [basics on it](https://nftschool.dev/reference/metadata-schemas/).
   * @tags Storage
   * @name IpfsUploadMetadataV0MetadataPost
   * @summary Upload metadata to IPFS
   * @request POST:/v0/metadata
   * @secure
   */
  export namespace IpfsUploadMetadataV0MetadataPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SrcServiceMintingEntitiesIpfsMetadataUploadRequest;
    export type RequestHeaders = {};
    export type ResponseBody = SrcServiceMintingEntitiesIpfsMetadataUploadResponse;
  }
  /**
   * @description Mints an NFT to your previously deployed contract (i.e. collection). This minting consists of multiple steps and enables you to customize the whole minting flow for your exact needs. 1.  First, you need  ```contract_address```  using [Deploy an NFT contract](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTE-deploy-an-nft-contract). 2.  Secondly, you need  ```metadata_uri```  using [Upload metadata to IPFS](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTM-upload-metadata-to-ipfs). After minting, the NFT will appear in the  ```mint_to_address```  wallet. If you minted to your own wallet, you can also see the minted NFT on OpenSea in your profile after a few minutes. **You can mint up to 1000 NFTs for free per chain. Maximum supported filesize is 20MB. For higher limits, write in [Discord](https://discord.gg/bE2cn9qCRg).** #### Useful for: * Minting to your own contracts (i.e. collections) effortlessly. * Creating customizable minting flows which enable to build NFT-based products. #### Related: * If you want to learn how to use [customizable minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting), see [Customizable Minting Quickstart](https://nftport.stoplight.io/docs/nftport-v0-manual/ZG9jOjIwMzU1MDQx-minting-quickstart#customizable-minting). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTY-list-all-your-minted-nf-ts).
   * @tags Minting
   * @name MintNftV0MintsCustomizablePost
   * @summary Customizable minting
   * @request POST:/v0/mints/customizable
   * @secure
   */
  export namespace MintNftV0MintsCustomizablePost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MintNftRequest;
    export type RequestHeaders = {};
    export type ResponseBody = MintNftResponse;
  }
  /**
   * @description With Easy mint, you can turn anything into an NFT in less than 5 minutes using one simple API call. If you are new to minting, see  [Easy minting quickstart](https://docs.nftport.xyz/docs/nftport-v0-manual/ZG9jOjIwMzU1MDQx-minting-quickstart#easy-minting). After minting, the NFT will appear in the  ```mint_to_address```  wallet. If you minted to your own wallet, you can also see the minted NFT on OpenSea in your profile after a few minutes. **You can mint up to 1000 NFTs for free per chain. Maximum supported file size is 20MB. For higher limits, write in [Discord](https://discord.gg/bE2cn9qCRg).** #### Useful for: * For turning anything into an NFT effortlessly. For all the benefits, see  [Your New Minting Superpowers](https://docs.nftport.xyz/docs/nftport-v0-manual/ZG9jOjIwMzU1MDQx-minting-quickstart#what-you-can-do-with-your-new-minting-superpowers). #### Related: * If you wish to customize the minting process e.g. use your own contract, see  [Customizable minting](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#advanced-minting-apis). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTY-list-all-your-minted-nf-ts).
   * @tags Minting
   * @name EasyMintNftV0MintsEasyUrlsPost
   * @summary Easy minting w/URL
   * @request POST:/v0/mints/easy/urls
   * @secure
   */
  export namespace EasyMintNftV0MintsEasyUrlsPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EasyMintNftRequest;
    export type RequestHeaders = {};
    export type ResponseBody = MintNftWithUploadResponse;
  }
  /**
   * @description With Easy mint, you can turn anything into an NFT in less than 5 minutes using one simple API call. If you are new to minting, see  [Easy minting quickstart](https://docs.nftport.xyz/docs/nftport-v0-manual/ZG9jOjIwMzU1MDQx-minting-quickstart#easy-minting). After minting, the NFT will appear in the  ```mint_to_address```  wallet. If you minted to your own wallet, you can also see the minted NFT on OpenSea in your profile after a few minutes. **You can mint up to 1000 NFTs for free per chain. Maximum supported file size is 20MB. For higher limits, write in [Discord](https://discord.gg/bE2cn9qCRg).** #### Useful for: * For turning anything into an NFT effortlessly. For all the benefits, see  [Your New Minting Superpowers](https://docs.nftport.xyz/docs/nftport-v0-manual/ZG9jOjIwMzU1MDQx-minting-quickstart#what-you-can-do-with-your-new-minting-superpowers). #### Related: * If you wish to customize the minting process e.g. use your own contract, see  [Customizable minting](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#advanced-minting-apis). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTY-list-all-your-minted-nf-ts). #### Example Requests in cURL, Python & JS <!-- title: "Make sure to replace the parameters with your own values" lineNumbers: true --> ```shell curl --request POST \ --url 'https://api.nftport.xyz/v0/mints/easy/files?chain=polygon&name=NFT_Name&description=NFT_Description&mint_to_address=0x...' \ --header 'Authorization: API Key Here' \ --header 'Content-Type: multipart/form-data' \ --form 'file=@/path/to/file_to_upload.png;type=image/png' ``` ```python import requests file = open("image.png", "rb") query_params = { "chain": "polygon", "name": "NFT_Name", "description": "NFT_Description", "mint_to_address": Wallet_Address } response = requests.post( "https://api.nftport.xyz/v0/mints/easy/files", headers={"Authorization": "API-Key-Here"}, params=query_params, files={"file": file} ) ``` ```javascript const fs = require('fs'); const fetch = require('node-fetch'); const FormData = require('form-data'); const form = new FormData(); const fileStream = fs.createReadStream('/path/to/file_to_upload.png'); form.append('file', fileStream); const options = { method: 'POST', body: form, headers: { "Authorization": "API-Key-Here", }, }; fetch("https://api.nftport.xyz/v0/mints/easy/files?" + new URLSearchParams({ chain: 'polygon', name: "NFT_Name", description: "NFT_Description", mint_to_address: "Wallet_Address", }), options) .then(function(response) { return response.json() }) .then(function(responseJson) { // Handle the response console.log(responseJson); }) ```
   * @tags Minting
   * @name EasyMintNftWithUploadV0MintsEasyFilesPost
   * @summary Easy minting w/file upload
   * @request POST:/v0/mints/easy/files
   * @secure
   */
  export namespace EasyMintNftWithUploadV0MintsEasyFilesPost {
    export type RequestParams = {};
    export type RequestQuery = {
      chain: "polygon" | "rinkeby";
      name: string;
      description: string;
      mint_to_address: string;
    };
    export type RequestBody = BodyEasyMintNftWithUploadV0MintsEasyFilesPost;
    export type RequestHeaders = {};
    export type ResponseBody = MintNftWithUploadResponse;
  }
  /**
   * @description Returns the details of a minted NFT. You need to provide  ```transaction_hash```  which is returned from [Easy minting w/URL](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTQ-easy-minting-w-url), [Easy minting w/file upload](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTU-easy-minting-w-file-upload) or [Customizable minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting). Minting is not instantaneous because blockchains take time to verify transactions. Thus, you can poll this endpoint every 5 seconds until you get a response. #### Useful for: * Confirming that NFT minting was successful and the NFT is on chain. #### Related: * For easy minting, see [Easy minting w/URL](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTQ-easy-minting-w-url) or [Easy minting w/file upload](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTU-easy-minting-w-file-upload). * For customizable minting, see [Customizable minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTY-list-all-your-minted-nf-ts).
   * @tags Minting
   * @name GetMintedNftV0MintsTransactionHashGet
   * @summary Retrieve a minted NFT
   * @request GET:/v0/mints/{transaction_hash}
   * @secure
   */
  export namespace GetMintedNftV0MintsTransactionHashGet {
    export type RequestParams = { transactionHash: string };
    export type RequestQuery = { chain: "polygon" | "rinkeby" };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMintedNftResponse;
  }
  /**
   * @description Returns a list of all the contracts you’ve previously deployed with [Deploy an NFT contract](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTE-deploy-an-nft-contract). #### Useful for: * Retrieving your contract creation history. #### Related: * To see all the NFTs you've previously minted, see [List all your minted NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTY-list-all-your-minted-nf-ts).
   * @tags User
   * @name GetUserContractsV0MeContractsGet
   * @summary List all your deployed contracts
   * @request GET:/v0/me/contracts
   * @secure
   */
  export namespace GetUserContractsV0MeContractsGet {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserProfileContractsResponse;
  }
  /**
   * @description Returns a list of all the NFTs you’ve previously minted with [Easy minting w/URL](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTQ-easy-minting-w-url), [Easy minting w/file upload](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTU-easy-minting-w-file-upload) or [Customizable minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting). #### Useful for: * Retrieving your NFT minting history. #### Related: * To see all the contracts you've previously deployed, see [List all your deployed contracts](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA0NjUxMjI-list-all-your-deployed-contracts).
   * @tags User
   * @name GetUserMintedNftsV0MeMintsGet
   * @summary List all your minted NFTs
   * @request GET:/v0/me/mints
   * @secure
   */
  export namespace GetUserMintedNftsV0MeMintsGet {
    export type RequestParams = {};
    export type RequestQuery = { chain?: "polygon" | "rinkeby"; page_number?: number; page_size?: number };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SrcServiceMintingEntitiesGetUserProfileMintedNftsResponse;
  }
  /**
   * @description Searches NFTs across multiple chains using a text query, specifically the ```name``` and ```description``` fields from the metadata. You can think of it like performing a search on Google. It's designed to help you find the one or the most closest NFT results you're looking for. Ethereum and Polygon are supported, including multi-chain search. #### Useful for: * Finding NFTs by their name and/or description. * Quickly integrating NFT search to your application. #### Related: * To get NFT recommendations, use [Recommend similar NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTc-find-similar-nf-ts-w-url). * To find duplicate NFTs, use [Find duplicate NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTk-find-counterfeit-nf-ts-w-file-upload).
   * @tags Search
   * @name TextSearchV0SearchGet
   * @summary Multi-chain NFT search
   * @request GET:/v0/search
   * @secure
   */
  export namespace TextSearchV0SearchGet {
    export type RequestParams = {};
    export type RequestQuery = {
      text: string;
      chain?: "polygon" | "ethereum" | "all";
      page_number?: number;
      page_size?: number;
      order_by?: TextSearchRequestOrder;
      sort_order?: TextSearchRequestSortOrder;
      filter_by_contract_address?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SrcServiceTextSearchEntitiesTextSearchResponse;
  }
  /**
   * @description Returns visually and contextually similar images to the input image passed with ```url```. Uses state of the art computer vision AI to match the input image against all ETH & Polygon NFT images in our database. You can think of it like Google reverse image search. You can see this functionality live with [Fingible](https://fingible.nftport.xyz/). **Maximum supported file size is 20MB.** #### Useful for: * Providing recommendations to your users e.g. like Amazon, Netflix so you can increase revenue. * Building new AI-based products and experiences for your users such as [Google for NFTs](https://fingible.nftport.xyz/). #### Related: * For searching for NFTs with keywords, see [Multi-chain NFT search](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA0MjczODg-multi-chain-nft-search). * For finding duplicates/copies of NFTs, see [Find duplicate NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTk-find-counterfeit-nf-ts-w-file-upload).
   * @tags Recommendations AI
   * @name SearchUrlV0RecommendationsSimilarNftsUrlsPost
   * @summary Find similar NFTs w/URL
   * @request POST:/v0/recommendations/similar_nfts/urls
   * @secure
   */
  export namespace SearchUrlV0RecommendationsSimilarNftsUrlsPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SrcServiceSearchSearchUrlRequestSearchUrlRequest;
    export type RequestHeaders = {};
    export type ResponseBody = SrcServiceSearchEntitiesSearchResult;
  }
  /**
   * @description Returns visually and contextually similar images to the uploaded image with  ```file```. Uses state of the art computer vision AI to match the input image against all ETH & Polygon NFT images in our database. You can think of it like Google reverse image search. You can see this functionality live with  [Fingible](https://fingible.nftport.xyz/). **Maximum supported file size is 20MB.** #### Useful for: * Providing recommendations to your users e.g. like Amazon, Netflix so you can increase revenue. * Building new AI-based products and experiences for your users such as  [Google for NFTs](https://fingible.nftport.xyz/). #### Related: * For searching for NFTs with keywords, see [Multi-chain NFT search](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA0MjczODg-multi-chain-nft-search). * For finding duplicates/copies of NFTs, see [Find duplicate NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTk-find-counterfeit-nf-ts-w-file-upload).
   * @tags Recommendations AI
   * @name SearchFileV0RecommendationsSimilarNftsFilesPost
   * @summary Find similar NFTs w/file upload
   * @request POST:/v0/recommendations/similar_nfts/files
   * @secure
   */
  export namespace SearchFileV0RecommendationsSimilarNftsFilesPost {
    export type RequestParams = {};
    export type RequestQuery = { page_number?: number; page_size?: number };
    export type RequestBody = BodySearchFileV0RecommendationsSimilarNftsFilesPost;
    export type RequestHeaders = {};
    export type ResponseBody = SrcServiceSearchEntitiesSearchResult;
  }
  /**
   * @description Analyzes the input image passed with ```file``` and returns duplicates (i.e. counterfeits) against it. Uses state of the art computer vision AI to match the input image against all ETH & Polygon NFT images in our database and returns duplicates which pass the ```threshold```. **Supported file formats: JPG, JPEG, PNG, PPM, BMP, PGM, TIF, TIFF, WebP.** #### Useful for: * **Increase customer trust and lower fraud** - enable users to see if an NFT is unique or already minted/sold somewhere else by showing information on existing duplicate NFTs. * **Credit and protect creators** - build processes that defend against IP theft and/or credit the original authors when their work has been used in similar NFTs. * **Enable and attract large IP holders (e.g. Disney)** to upload content as NFTs by ensuring automatic copyright protection (similar to YouTube's Content ID). * **Finding original owner** - find the NFT owner simply with the NFT image. #### Related: * To find similar NFTs which can be used as recommendations, see [Find similar NFTs w/URL](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTc-find-similar-nf-ts-w-url) or [Find similar NFTs w/file upload](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTg-find-similar-nf-ts-w-file-upload).
   * @tags Duplicate Detection AI
   * @name SimilarNftsV0DuplicatesPost
   * @summary Find counterfeit NFTs w/file upload
   * @request POST:/v0/duplicates
   * @secure
   */
  export namespace SimilarNftsV0DuplicatesPost {
    export type RequestParams = {};
    export type RequestQuery = { limit?: number; threshold?: number; filter_out_contract_address?: string };
    export type RequestBody = BodySimilarNftsV0DuplicatesPost;
    export type RequestHeaders = {};
    export type ResponseBody = ContentIdResponse;
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
  public baseUrl: string = "https://api.nftport.xyz";
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
 * @title NFTPort API (Beta)
 * @version 1.0.0
 * @baseUrl https://api.nftport.xyz
 * @contact Johannes Tammekänd, Co-Founder of NFTPort <johannes@nftport.xyz>
 *
 * NFTPort API version 1.0.0
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  v0 = {
    /**
     * @description Returns all ERC721 and ERC1155 NFTs that have been minted on a given chain. Ethereum and Polygon are supported. #### Useful for: * Big data analysis or analytics with all the NFTs. * Keeping track of all the created NFTs. * Importing all NFTs to your application. #### Related: * To get all NFTs per contract, see [Retrieve contract NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjAzNTUyMDA-retrieve-contract-nf-ts). * To get detailed information on the returned NFTs, see [Retrieve NFT details](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjAzNTUxOTk-retrieve-nft-details).
     *
     * @tags Contracts, Metadata & Assets
     * @name NftsV0NftsGet
     * @summary Retrieve all NFTs
     * @request GET:/v0/nfts
     * @secure
     */
    nftsV0NftsGet: (query: NftsV0NftsGetParams, params: RequestParams = {}) =>
      this.http.request<NftsResponse, HTTPValidationError>({
        path: `/v0/nfts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns details for a given NFT. These include ```metadata_url```, ```metadata``` such as name, description, attributes, etc., ```image_url```, ```cached_image_url``` and ```mint_date```. Ethereum and Polygon are supported. #### Useful for: * For easily getting all the necessary information about a given NFT. #### Related: * To get all NFTs per contract, see [Retrieve contract NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjAzNTUyMDA-retrieve-contract-nf-ts). * To get NFTs that a given account owns, see [Retrieve NFTs owned by an account](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NDk-retrieve-nf-ts-owned-by-an-account).
     *
     * @tags Contracts, Metadata & Assets
     * @name NftDetailsV0NftsContractAddressTokenIdGet
     * @summary Retrieve NFT details
     * @request GET:/v0/nfts/{contract_address}/{token_id}
     * @secure
     */
    nftDetailsV0NftsContractAddressTokenIdGet: (
      { contractAddress, tokenId, ...query }: NftDetailsV0NftsContractAddressTokenIdGetParams,
      params: RequestParams = {},
    ) =>
      this.http.request<SrcServiceNftsEntitiesNftDetailsResponse, HTTPValidationError>({
        path: `/v0/nfts/${contractAddress}/${tokenId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns all NFTs for a given contract address. Can be set to ```include``` the NFT ```metadata```. Ethereum and Polygon are supported. #### Useful for: * Importing all NFTs from a given contract to your application. #### Related: * To get detailed information on the returned NFTs, see [Retrieve NFT details](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjAzNTUxOTk-retrieve-nft-details). * To get NFTs that a given account owns, see [Retrieve NFTs owned by an account](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NDk-retrieve-nf-ts-owned-by-an-account).
     *
     * @tags Contracts, Metadata & Assets
     * @name NftsByContractV0NftsContractAddressGet
     * @summary Retrieve contract NFTs
     * @request GET:/v0/nfts/{contract_address}
     * @secure
     */
    nftsByContractV0NftsContractAddressGet: (
      { contractAddress, ...query }: NftsByContractV0NftsContractAddressGetParams,
      params: RequestParams = {},
    ) =>
      this.http.request<ContractNftsResponse, HTTPValidationError>({
        path: `/v0/nfts/${contractAddress}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns NFTs owned by a given account (i.e. wallet) address. Can also return each NFT metadata with  ```include```  parameter. Ethereum and Tezos are supported (Polygon upcoming). **For Ethereum use the continuation string from response for pagination, for Tezos use page number.** #### Useful for: * For checking if a user owns a specific NFT and then unlocking specific activity. * Adding NFT portfolio section to your apps. #### Related: * To get all NFTs per contract, see [Retrieve contract NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjAzNTUyMDA-retrieve-contract-nf-ts). * To get extra detailed information on the returned NFTs, see [Retrieve NFT details](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjAzNTUxOTk-retrieve-nft-details).
     *
     * @tags Ownership
     * @name AccountNftsV0AccountsAccountAddressGet
     * @summary Retrieve NFTs owned by an account
     * @request GET:/v0/accounts/{account_address}
     * @secure
     */
    accountNftsV0AccountsAccountAddressGet: (
      { accountAddress, ...query }: AccountNftsV0AccountsAccountAddressGetParams,
      params: RequestParams = {},
    ) =>
      this.http.request<SrcServiceAccountEntitiesAccountNftsResponse, HTTPValidationError>({
        path: `/v0/accounts/${accountAddress}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Deploys a standard ```ERC-721``` smart contract where your can mint your NFTs. This is a required step if you wish to use [Customizable minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting) as the contract will represent your own collection. As blockchains take time to sync, then after contract deployment, you can use the returned ```transaction_hash``` in [Retrieve a deployed contract](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTI-retrieve-a-deployed-contract) to get the ```contract_address```. **You can deploy up to 5 contracts for free per chain. For higher limits, write in [Discord](https://discord.gg/bE2cn9qCRg).** #### Useful for: * Deploying your own contracts so you can build custom products or collections easily. #### Related: * To get the deployed contract address, use [Retrieve a deployed contract](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTI-retrieve-a-deployed-contract). * If you want to know how to use the customizable minting, see [Customizable Minting Quickstart](https://nftport.stoplight.io/docs/nftport-v0-manual/ZG9jOjIwMzU1MDQx-minting-quickstart#customizable-minting).
     *
     * @tags Contracts
     * @name DeployContractV0ContractsPost
     * @summary Deploy an NFT contract
     * @request POST:/v0/contracts
     * @secure
     */
    deployContractV0ContractsPost: (data: DeployContractRequestWithAddress, params: RequestParams = {}) =>
      this.http.request<SrcServiceContractEntitiesDeployContractResponse, HTTPValidationError>({
        path: `/v0/contracts`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the details of a contract that has previously been deployed with [Deploy an NFT contract](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTE-deploy-an-nft-contract). Supply the ```transaction_hash``` to check if the contract is on chain and to get the ```contract_address```. You can use the returned ```contract_address``` in [Customizable Minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting). As blockchains take time to sync, this endpoint can be polled until the ```contract_address``` is returned. #### Useful for: * Deploying your own contracts so you can build custom products or collections easily. #### Related: * If you want to get data about NFT contracts which you haven't deployed using NFTPort, see [Retrieve contract NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjAzNTUyMDA-retrieve-contract-nf-ts). * If you want to learn how to use the [customizable minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting), see [Customizable Minting Quickstart](https://nftport.stoplight.io/docs/nftport-v0-manual/ZG9jOjIwMzU1MDQx-minting-quickstart#customizable-minting).
     *
     * @tags Contracts
     * @name GetDeployedContractV0ContractsTransactionHashGet
     * @summary Retrieve a deployed contract
     * @request GET:/v0/contracts/{transaction_hash}
     * @secure
     */
    getDeployedContractV0ContractsTransactionHashGet: (
      { transactionHash, ...query }: GetDeployedContractV0ContractsTransactionHashGetParams,
      params: RequestParams = {},
    ) =>
      this.http.request<GetDeployedContractResponse, HTTPValidationError>({
        path: `/v0/contracts/${transactionHash}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Uploads a file to [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/) which makes your NFT storage easy. You can use the returned  ```ipfs_url```  with [Upload metadata to IPFS](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTM-upload-metadata-to-ipfs) to mint your NFT. If you prefer hosting files in your own servers, you can skip this step. Otherwise, we recommend using IPFS because it's an industry standard for decentralized storage and guarantees the immutability of your files. We use Pinata to [pin](https://docs.ipfs.io/how-to/pin-files/) the files which ensures that your important data is retained in IPFS. **Supports all file types and maximum file size is 20MB. For higher limits, write in [Discord](https://discord.gg/bE2cn9qCRg).** #### Useful for: * Storing your NFT files easily and according to the industry standards. #### Related: * After uploading files, use [Upload metadata to IPFS](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTM-upload-metadata-to-ipfs) to continue with your NFT minting. * If you want to learn how to use the [customizable minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting), see [Customizable Minting Quickstart](https://nftport.stoplight.io/docs/nftport-v0-manual/ZG9jOjIwMzU1MDQx-minting-quickstart#customizable-minting). #### Example Requests in cURL, Python & JS <!-- title: "Make sure to replace the parameters with your own values" lineNumbers: true --> ```shell curl --request POST \ --url 'https://api.nftport.xyz/v0/files' \ --header 'Authorization: API Key Here' \ --header 'Content-Type: multipart/form-data' \ --form 'file=@/path/to/file_to_upload.png;type=image/png' ``` ```python import requests file = open("image.png", "rb") response = requests.post( "https://api.nftport.xyz/v0/files", headers={"Authorization": 'API-Key-Here'}, files={"file": file} ) ``` ```javascript const fs = require('fs'); const fetch = require('node-fetch'); const FormData = require('form-data'); const form = new FormData(); const fileStream = fs.createReadStream('image.jpg'); form.append('file', fileStream); const options = { method: 'POST', body: form, headers: { "Authorization": "API-Key-Here", }, }; fetch("https://api.nftport.xyz/v0/files", options) .then(response => { return response.json() }) .then(responseJson => { // Handle the response console.log(responseJson); }) ```
     *
     * @tags Storage
     * @name IpfsUploadFileV0FilesPost
     * @summary Upload a file to IPFS
     * @request POST:/v0/files
     * @secure
     */
    ipfsUploadFileV0FilesPost: (data: BodyIpfsUploadFileV0FilesPost, params: RequestParams = {}) =>
      this.http.request<IpfsFileUploadResponse, HTTPValidationError>({
        path: `/v0/files`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Uploads NFT metadata to [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/) as a JSON file which is the standard format for  [NFT metadata](https://nftschool.dev/reference/metadata-schemas/#intro-to-json-schemas). You can use the returned ```metadata_ipfs_uri``` in [Customizable minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting) to mint your NFT. If you prefer hosting metadata in your own servers, you can skip this step. Otherwise, we recommend using IPFS because it’s an industry standard for decentralized storage and guarantees the immutability of your metadata. For the ```file_url```, we also recommend using IPFS with [Upload a file to IPFS](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA0MzIxNjk-upload-a-file-to-ipfs). We use Pinata to pin the files which ensures that your important data is retained in IPFS. #### Useful for: * Storing your NFT metadata easily and according to the industry standards. #### Related: * After uploading your metadata, use [Customizable minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting) to continue with your NFT minting. * If you want to learn how to use the customizable minting, see [Customizable Minting Quickstart](https://nftport.stoplight.io/docs/nftport-v0-manual/ZG9jOjIwMzU1MDQx-minting-quickstart#customizable-minting). * If you are new to NFT metadata, see the [basics on it](https://nftschool.dev/reference/metadata-schemas/).
     *
     * @tags Storage
     * @name IpfsUploadMetadataV0MetadataPost
     * @summary Upload metadata to IPFS
     * @request POST:/v0/metadata
     * @secure
     */
    ipfsUploadMetadataV0MetadataPost: (
      data: SrcServiceMintingEntitiesIpfsMetadataUploadRequest,
      params: RequestParams = {},
    ) =>
      this.http.request<SrcServiceMintingEntitiesIpfsMetadataUploadResponse, HTTPValidationError>({
        path: `/v0/metadata`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Mints an NFT to your previously deployed contract (i.e. collection). This minting consists of multiple steps and enables you to customize the whole minting flow for your exact needs. 1.  First, you need  ```contract_address```  using [Deploy an NFT contract](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTE-deploy-an-nft-contract). 2.  Secondly, you need  ```metadata_uri```  using [Upload metadata to IPFS](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTM-upload-metadata-to-ipfs). After minting, the NFT will appear in the  ```mint_to_address```  wallet. If you minted to your own wallet, you can also see the minted NFT on OpenSea in your profile after a few minutes. **You can mint up to 1000 NFTs for free per chain. Maximum supported filesize is 20MB. For higher limits, write in [Discord](https://discord.gg/bE2cn9qCRg).** #### Useful for: * Minting to your own contracts (i.e. collections) effortlessly. * Creating customizable minting flows which enable to build NFT-based products. #### Related: * If you want to learn how to use [customizable minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting), see [Customizable Minting Quickstart](https://nftport.stoplight.io/docs/nftport-v0-manual/ZG9jOjIwMzU1MDQx-minting-quickstart#customizable-minting). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTY-list-all-your-minted-nf-ts).
     *
     * @tags Minting
     * @name MintNftV0MintsCustomizablePost
     * @summary Customizable minting
     * @request POST:/v0/mints/customizable
     * @secure
     */
    mintNftV0MintsCustomizablePost: (data: MintNftRequest, params: RequestParams = {}) =>
      this.http.request<MintNftResponse, HTTPValidationError>({
        path: `/v0/mints/customizable`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description With Easy mint, you can turn anything into an NFT in less than 5 minutes using one simple API call. If you are new to minting, see  [Easy minting quickstart](https://docs.nftport.xyz/docs/nftport-v0-manual/ZG9jOjIwMzU1MDQx-minting-quickstart#easy-minting). After minting, the NFT will appear in the  ```mint_to_address```  wallet. If you minted to your own wallet, you can also see the minted NFT on OpenSea in your profile after a few minutes. **You can mint up to 1000 NFTs for free per chain. Maximum supported file size is 20MB. For higher limits, write in [Discord](https://discord.gg/bE2cn9qCRg).** #### Useful for: * For turning anything into an NFT effortlessly. For all the benefits, see  [Your New Minting Superpowers](https://docs.nftport.xyz/docs/nftport-v0-manual/ZG9jOjIwMzU1MDQx-minting-quickstart#what-you-can-do-with-your-new-minting-superpowers). #### Related: * If you wish to customize the minting process e.g. use your own contract, see  [Customizable minting](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#advanced-minting-apis). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTY-list-all-your-minted-nf-ts).
     *
     * @tags Minting
     * @name EasyMintNftV0MintsEasyUrlsPost
     * @summary Easy minting w/URL
     * @request POST:/v0/mints/easy/urls
     * @secure
     */
    easyMintNftV0MintsEasyUrlsPost: (data: EasyMintNftRequest, params: RequestParams = {}) =>
      this.http.request<MintNftWithUploadResponse, HTTPValidationError>({
        path: `/v0/mints/easy/urls`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description With Easy mint, you can turn anything into an NFT in less than 5 minutes using one simple API call. If you are new to minting, see  [Easy minting quickstart](https://docs.nftport.xyz/docs/nftport-v0-manual/ZG9jOjIwMzU1MDQx-minting-quickstart#easy-minting). After minting, the NFT will appear in the  ```mint_to_address```  wallet. If you minted to your own wallet, you can also see the minted NFT on OpenSea in your profile after a few minutes. **You can mint up to 1000 NFTs for free per chain. Maximum supported file size is 20MB. For higher limits, write in [Discord](https://discord.gg/bE2cn9qCRg).** #### Useful for: * For turning anything into an NFT effortlessly. For all the benefits, see  [Your New Minting Superpowers](https://docs.nftport.xyz/docs/nftport-v0-manual/ZG9jOjIwMzU1MDQx-minting-quickstart#what-you-can-do-with-your-new-minting-superpowers). #### Related: * If you wish to customize the minting process e.g. use your own contract, see  [Customizable minting](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#advanced-minting-apis). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTY-list-all-your-minted-nf-ts). #### Example Requests in cURL, Python & JS <!-- title: "Make sure to replace the parameters with your own values" lineNumbers: true --> ```shell curl --request POST \ --url 'https://api.nftport.xyz/v0/mints/easy/files?chain=polygon&name=NFT_Name&description=NFT_Description&mint_to_address=0x...' \ --header 'Authorization: API Key Here' \ --header 'Content-Type: multipart/form-data' \ --form 'file=@/path/to/file_to_upload.png;type=image/png' ``` ```python import requests file = open("image.png", "rb") query_params = { "chain": "polygon", "name": "NFT_Name", "description": "NFT_Description", "mint_to_address": Wallet_Address } response = requests.post( "https://api.nftport.xyz/v0/mints/easy/files", headers={"Authorization": "API-Key-Here"}, params=query_params, files={"file": file} ) ``` ```javascript const fs = require('fs'); const fetch = require('node-fetch'); const FormData = require('form-data'); const form = new FormData(); const fileStream = fs.createReadStream('/path/to/file_to_upload.png'); form.append('file', fileStream); const options = { method: 'POST', body: form, headers: { "Authorization": "API-Key-Here", }, }; fetch("https://api.nftport.xyz/v0/mints/easy/files?" + new URLSearchParams({ chain: 'polygon', name: "NFT_Name", description: "NFT_Description", mint_to_address: "Wallet_Address", }), options) .then(function(response) { return response.json() }) .then(function(responseJson) { // Handle the response console.log(responseJson); }) ```
     *
     * @tags Minting
     * @name EasyMintNftWithUploadV0MintsEasyFilesPost
     * @summary Easy minting w/file upload
     * @request POST:/v0/mints/easy/files
     * @secure
     */
    easyMintNftWithUploadV0MintsEasyFilesPost: (
      query: EasyMintNftWithUploadV0MintsEasyFilesPostParams,
      data: BodyEasyMintNftWithUploadV0MintsEasyFilesPost,
      params: RequestParams = {},
    ) =>
      this.http.request<MintNftWithUploadResponse, HTTPValidationError>({
        path: `/v0/mints/easy/files`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the details of a minted NFT. You need to provide  ```transaction_hash```  which is returned from [Easy minting w/URL](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTQ-easy-minting-w-url), [Easy minting w/file upload](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTU-easy-minting-w-file-upload) or [Customizable minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting). Minting is not instantaneous because blockchains take time to verify transactions. Thus, you can poll this endpoint every 5 seconds until you get a response. #### Useful for: * Confirming that NFT minting was successful and the NFT is on chain. #### Related: * For easy minting, see [Easy minting w/URL](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTQ-easy-minting-w-url) or [Easy minting w/file upload](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTU-easy-minting-w-file-upload). * For customizable minting, see [Customizable minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTY-list-all-your-minted-nf-ts).
     *
     * @tags Minting
     * @name GetMintedNftV0MintsTransactionHashGet
     * @summary Retrieve a minted NFT
     * @request GET:/v0/mints/{transaction_hash}
     * @secure
     */
    getMintedNftV0MintsTransactionHashGet: (
      { transactionHash, ...query }: GetMintedNftV0MintsTransactionHashGetParams,
      params: RequestParams = {},
    ) =>
      this.http.request<GetMintedNftResponse, HTTPValidationError>({
        path: `/v0/mints/${transactionHash}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a list of all the contracts you’ve previously deployed with [Deploy an NFT contract](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTE-deploy-an-nft-contract). #### Useful for: * Retrieving your contract creation history. #### Related: * To see all the NFTs you've previously minted, see [List all your minted NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTY-list-all-your-minted-nf-ts).
     *
     * @tags User
     * @name GetUserContractsV0MeContractsGet
     * @summary List all your deployed contracts
     * @request GET:/v0/me/contracts
     * @secure
     */
    getUserContractsV0MeContractsGet: (params: RequestParams = {}) =>
      this.http.request<GetUserProfileContractsResponse, any>({
        path: `/v0/me/contracts`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a list of all the NFTs you’ve previously minted with [Easy minting w/URL](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTQ-easy-minting-w-url), [Easy minting w/file upload](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTU-easy-minting-w-file-upload) or [Customizable minting](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTM-customizable-minting). #### Useful for: * Retrieving your NFT minting history. #### Related: * To see all the contracts you've previously deployed, see [List all your deployed contracts](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA0NjUxMjI-list-all-your-deployed-contracts).
     *
     * @tags User
     * @name GetUserMintedNftsV0MeMintsGet
     * @summary List all your minted NFTs
     * @request GET:/v0/me/mints
     * @secure
     */
    getUserMintedNftsV0MeMintsGet: (query: GetUserMintedNftsV0MeMintsGetParams, params: RequestParams = {}) =>
      this.http.request<SrcServiceMintingEntitiesGetUserProfileMintedNftsResponse, HTTPValidationError>({
        path: `/v0/me/mints`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Searches NFTs across multiple chains using a text query, specifically the ```name``` and ```description``` fields from the metadata. You can think of it like performing a search on Google. It's designed to help you find the one or the most closest NFT results you're looking for. Ethereum and Polygon are supported, including multi-chain search. #### Useful for: * Finding NFTs by their name and/or description. * Quickly integrating NFT search to your application. #### Related: * To get NFT recommendations, use [Recommend similar NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTc-find-similar-nf-ts-w-url). * To find duplicate NFTs, use [Find duplicate NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTk-find-counterfeit-nf-ts-w-file-upload).
     *
     * @tags Search
     * @name TextSearchV0SearchGet
     * @summary Multi-chain NFT search
     * @request GET:/v0/search
     * @secure
     */
    textSearchV0SearchGet: (query: TextSearchV0SearchGetParams, params: RequestParams = {}) =>
      this.http.request<SrcServiceTextSearchEntitiesTextSearchResponse, HTTPValidationError>({
        path: `/v0/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns visually and contextually similar images to the input image passed with ```url```. Uses state of the art computer vision AI to match the input image against all ETH & Polygon NFT images in our database. You can think of it like Google reverse image search. You can see this functionality live with [Fingible](https://fingible.nftport.xyz/). **Maximum supported file size is 20MB.** #### Useful for: * Providing recommendations to your users e.g. like Amazon, Netflix so you can increase revenue. * Building new AI-based products and experiences for your users such as [Google for NFTs](https://fingible.nftport.xyz/). #### Related: * For searching for NFTs with keywords, see [Multi-chain NFT search](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA0MjczODg-multi-chain-nft-search). * For finding duplicates/copies of NFTs, see [Find duplicate NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTk-find-counterfeit-nf-ts-w-file-upload).
     *
     * @tags Recommendations AI
     * @name SearchUrlV0RecommendationsSimilarNftsUrlsPost
     * @summary Find similar NFTs w/URL
     * @request POST:/v0/recommendations/similar_nfts/urls
     * @secure
     */
    searchUrlV0RecommendationsSimilarNftsUrlsPost: (
      data: SrcServiceSearchSearchUrlRequestSearchUrlRequest,
      params: RequestParams = {},
    ) =>
      this.http.request<SrcServiceSearchEntitiesSearchResult, HTTPValidationError>({
        path: `/v0/recommendations/similar_nfts/urls`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns visually and contextually similar images to the uploaded image with  ```file```. Uses state of the art computer vision AI to match the input image against all ETH & Polygon NFT images in our database. You can think of it like Google reverse image search. You can see this functionality live with  [Fingible](https://fingible.nftport.xyz/). **Maximum supported file size is 20MB.** #### Useful for: * Providing recommendations to your users e.g. like Amazon, Netflix so you can increase revenue. * Building new AI-based products and experiences for your users such as  [Google for NFTs](https://fingible.nftport.xyz/). #### Related: * For searching for NFTs with keywords, see [Multi-chain NFT search](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA0MjczODg-multi-chain-nft-search). * For finding duplicates/copies of NFTs, see [Find duplicate NFTs](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjA1ODg3NTk-find-counterfeit-nf-ts-w-file-upload).
     *
     * @tags Recommendations AI
     * @name SearchFileV0RecommendationsSimilarNftsFilesPost
     * @summary Find similar NFTs w/file upload
     * @request POST:/v0/recommendations/similar_nfts/files
     * @secure
     */
    searchFileV0RecommendationsSimilarNftsFilesPost: (
      query: SearchFileV0RecommendationsSimilarNftsFilesPostParams,
      data: BodySearchFileV0RecommendationsSimilarNftsFilesPost,
      params: RequestParams = {},
    ) =>
      this.http.request<SrcServiceSearchEntitiesSearchResult, HTTPValidationError>({
        path: `/v0/recommendations/similar_nfts/files`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Analyzes the input image passed with ```file``` and returns duplicates (i.e. counterfeits) against it. Uses state of the art computer vision AI to match the input image against all ETH & Polygon NFT images in our database and returns duplicates which pass the ```threshold```. **Supported file formats: JPG, JPEG, PNG, PPM, BMP, PGM, TIF, TIFF, WebP.** #### Useful for: * **Increase customer trust and lower fraud** - enable users to see if an NFT is unique or already minted/sold somewhere else by showing information on existing duplicate NFTs. * **Credit and protect creators** - build processes that defend against IP theft and/or credit the original authors when their work has been used in similar NFTs. * **Enable and attract large IP holders (e.g. Disney)** to upload content as NFTs by ensuring automatic copyright protection (similar to YouTube's Content ID). * **Finding original owner** - find the NFT owner simply with the NFT image. #### Related: * To find similar NFTs which can be used as recommendations, see [Find similar NFTs w/URL](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTc-find-similar-nf-ts-w-url) or [Find similar NFTs w/file upload](https://nftport.stoplight.io/docs/nftport-v0-manual/b3A6MjE2NjQ5MTg-find-similar-nf-ts-w-file-upload).
     *
     * @tags Duplicate Detection AI
     * @name SimilarNftsV0DuplicatesPost
     * @summary Find counterfeit NFTs w/file upload
     * @request POST:/v0/duplicates
     * @secure
     */
    similarNftsV0DuplicatesPost: (
      query: SimilarNftsV0DuplicatesPostParams,
      data: BodySimilarNftsV0DuplicatesPost,
      params: RequestParams = {},
    ) =>
      this.http.request<ContentIdResponse, HTTPValidationError>({
        path: `/v0/duplicates`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
}
