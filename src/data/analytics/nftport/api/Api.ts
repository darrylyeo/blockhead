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
export type AccountContractsRequestType = 'owns_contract_nfts';

/**
 * @example {"response":"OK","contracts":[{"name":"Decentraland LAND","symbol":"LAND","type":"ERC721","metadata":{"description":"The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles [...]","thumbnail_url":"https://i.imgur.com/Y8hQ4Uc.png","cached_thumbnail_url":"https://i.imgur.com/Nn5J1Mp.png","banner_url":"https://i.imgur.com/u8YlHT6.jpg","cached_banner_url":"https://i.imgur.com/GIO7kdF.jpg"},"address":"0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d","num_nfts_owned":3}],"total":12}
 */
export interface AccountContractsResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/** Contracts */
	contracts: ContractsModelResponse[];

	/**
	 * Total
	 * Total number of contracts owned by the account address.
	 */
	total: number;

	/**
	 * Continuation
	 * Continuation ID for next page.
	 */
	continuation?: string;
}

/**
 * @example {"contract_address":"KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton","token_id":"159383","name":"Cool name","description":"Cool description","file_url":"ipfs://QmVkyU2c6ade8su1UKqSSx6iNLDp6zrCMUGX8DrRFcm9mq","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","cached_animation_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/e129f89af4022209258d1a547f421583f0701b54572c4616e50b59d3294ba8fb.mp4","creator_address":"tz1dVxdJwpJixh6Kcd5FZULTfFcR98V7Z2fw","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"},"metadata_url":"https://api.niftygateway.com/beeple/100030071","contract":{"name":"Decentraland LAND","symbol":"LAND","type":"ERC721","metadata":{"description":"The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles [...]","thumbnail_url":"https://i.imgur.com/Y8hQ4Uc.png","cached_thumbnail_url":"https://i.imgur.com/Nn5J1Mp.png","banner_url":"https://i.imgur.com/u8YlHT6.jpg","cached_banner_url":"https://i.imgur.com/GIO7kdF.jpg"}}}
 */
export interface AccountNft {
	/**
	 * Contract Address
	 * The contract address of the NFT.
	 */
	contract_address: string;

	/**
	 * Token Id
	 * A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain.
	 */
	token_id: string;

	/**
	 * Name
	 * Name of the NFT.
	 */
	name?: string;

	/**
	 * Description
	 * Description of the NFT.
	 */
	description?: string;

	/**
	 * File Url
	 * File (image, video, etc) URL of the NFT.
	 */
	file_url?: string;

	/**
	 * Animation Url
	 * URL of multi-media file set in the NFT metadata. Most commonly used file types are GLTF, GLB, WEBM, MP4, M4V, OGV, OGG, along with audio MP3, WAV, and OGA. Also HTML pages, allowing to build rich experiences and interactive NFTs using JavaScript canvas, WebGL, and more.
	 */
	animation_url?: string;

	/**
	 * Cached File Url
	 * Cached file (image, video, etc) in NFTPort's cloud with no access restrictions, low latency and high availability.
	 */
	cached_file_url?: string;

	/**
	 * Cached Animation Url
	 * Cached URL of animated file (video, gif, etc) as set in the NFT metadata. This URL points to a file cached in NFTPort's cloud storage with no access restrictions, low latency and high availability.
	 */
	cached_animation_url?: string;

	/**
	 * Creator Address
	 * NFT creator address.
	 */
	creator_address?: string;

	/**
	 * Metadata
	 * Raw NFT metadata downloaded from the metadata_url i.e. token URI. It usually includes the name, description and attributes along with any other data added by the creator.
	 */
	metadata?: object;

	/**
	 * Metadata Url
	 * Metadata URL inside the contract for a given token, also known as the token URI. For ERC-721 it is the token_uri() function and for ERC-1155 it is the uri() function in the smart contract.
	 */
	metadata_url?: string;

	/**
	 * Contract
	 * Information of the NFT’s contract.
	 */
	contract?: ContractInfoResponse;
}

/**
 * @example {"response":"OK","nfts":[{"contract_address":"KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton","token_id":"159383","name":"Cool name","description":"Cool description","file_url":"ipfs://QmVkyU2c6ade8su1UKqSSx6iNLDp6zrCMUGX8DrRFcm9mq","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","cached_animation_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/e129f89af4022209258d1a547f421583f0701b54572c4616e50b59d3294ba8fb.mp4","creator_address":"tz1dVxdJwpJixh6Kcd5FZULTfFcR98V7Z2fw","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"},"metadata_url":"https://api.niftygateway.com/beeple/100030071","contract":{"name":"Decentraland LAND","symbol":"LAND","type":"ERC721","metadata":{"description":"The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles [...]","thumbnail_url":"https://i.imgur.com/Y8hQ4Uc.png","cached_thumbnail_url":"https://i.imgur.com/Nn5J1Mp.png","banner_url":"https://i.imgur.com/u8YlHT6.jpg","cached_banner_url":"https://i.imgur.com/GIO7kdF.jpg"}}}],"total":12}
 */
export interface AccountNftsResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/** Nfts */
	nfts?: AccountNft[];

	/**
	 * Total
	 * Total number of NFTs owned by the address.
	 */
	total?: number;

	/**
	 * Continuation
	 * Continuation ID for next page.
	 */
	continuation?: string;
}

/**
 * An enumeration.
 */
export type AccountRequestExclude = 'erc721' | 'erc1155';

/**
 * An enumeration.
 */
export type AccountRequestInclude = 'default' | 'metadata' | 'contract_information';

/**
 * An enumeration.
 */
export type AccountRequestSupportedChain = 'ethereum' | 'polygon' | 'rinkeby';

/**
 * @example {"type":"bid","bidder_address":"0xb4cdc8dfd9ce9bf647f38cd8278036c0aacdc91e","nft":{"contract_type":"ERC1155_lazy","contract_address":"0xb66a603f4cfe17e3d27b87a8bfcad319856518b8","token_id":"15358604318467100856391476616408347066873708425523410565866333184395837440001","metadata_url":"ipfs://QmUNeWBXz4pJkBzMAaPTXS4dUXkHyVNsrfVTbN4bEsJnW1","creators":[{"account_address":"0x21f4a9780a52c7a8ca5e30bac89a6b0e2722bf65","creator_share":"10000"}],"royalties":[{"account_address":"0x21f4a9780a52c7a8ca5e30bac89a6b0e2722bf65","royalty_share":"1000"}],"signatures":["0xde8ee69a90450466de44e0025aec715d621afbcc1ad11361cc9d63666a7e3f3e33eb72d48f2753f6e5d414967ba5ae06d00e39d1f53e99d419038011c2f159f51b"],"total":5000},"quantity":1,"bid_details":{"asset_type":"ERC20","contract_address":"0xaa75b8c9e01ac2e9fc041a39d36a6536540b2072","price":"0.071","price_usd":271.5},"transaction_date":"2021-12-03T01:28:55.961","marketplace":"opensea"}
 */
export interface Bids {
	/**
	 * Type
	 * Activity type.
	 */
	type: 'bid' | 'cancel_bid';

	/**
	 * Bidder Address
	 * Account address of the bidder.
	 */
	bidder_address: string;

	/**
	 * Nft
	 * Details of the NFT.
	 */
	nft: SrcServiceTransactionsEntitiesNft;

	/**
	 * Quantity
	 * Number of NFTs bid on (can be more than 1 NFT for ERC1155).
	 */
	quantity?: number;

	/**
	 * Price Details
	 * Price details of the bid.
	 */
	price_details: PriceDetails;

	/**
	 * Transaction Hash
	 * A unique 66-character identifier that is generated when a transaction is executed on the blockchain.
	 */
	transaction_hash?: string;

	/**
	 * Block Hash
	 * The hash of the block header in which the transaction is recorded.
	 */
	block_hash?: string;

	/**
	 * Block Number
	 * Number of the block in which the transaction is recorded.
	 */
	block_number?: number;

	/**
	 * Transaction Date
	 * Date of the transaction (ISO).
	 */
	transaction_date: string;

	/** Marketplace where the bid was made. */
	marketplace?: Marketplace;
}

export interface BodyEasyMintNftWithUploadV0MintsEasyFilesPost {
	/**
	 * File
	 * The file you want to mint. All file types are supported. Maximum file size is 20MB.
	 * @format binary
	 */
	file: File;
}

export interface BodyIpfsUploadFileV0FilesPost {
	/**
	 * File
	 * The file to upload to IPFS. All file types are supported. Maximum file size is 20MB.
	 * @format binary
	 */
	file: File;
}

export interface BodyIpfsUploadMetadataDirectoryV0MetadataDirectoryPost {
	/**
	 * Metadata Files
	 * Array of JSON files containing metadata
	 */
	metadata_files: File[];
}

export interface BodySearchFileV0RecommendationsSimilarNftsFilesPost {
	/**
	 * File
	 * Input image based on which visually and contextually similar NFTs will be recommended. Supports .JPG, .JPEG, .PNG, .WebP file formats.
	 * @format binary
	 */
	file: File;
}

export interface BodySimilarNftsV0DuplicatesFilesPost {
	/**
	 * File
	 * Input image which will be analyzed to find duplicates. Supports .JPG, .JPEG, .PNG, .WebP, .PPM, .BMP, .PGM, .TIF, .TIFF, file formats.
	 * @format binary
	 */
	file: File;
}

/**
 * @example {"chain":"polygon","contract_address":"0xC8D297D7b496f86673551c933815B47973FC4a0e","tokens":[{"token_id":"1","quantity":"1"}]}
 */
export interface BurnBatchNftRequest {
	/**
	 * Chain
	 * Blockchain where the NFT is minted.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Contract Address
	 * Contract where the token is minted. It must be your own contract.
	 */
	contract_address: string;

	/**
	 * Tokens
	 * List of tokens to be burned. Each record contains the token ID of the NFT and quantity.
	 */
	tokens: BurnBatchTokenItem[];
}

export interface BurnBatchTokenItem {
	/** Token Id */
	token_id: string;

	/** Quantity */
	quantity: number;
}

/**
 * @example {"chain":"polygon","contract_address":"0xC8D297D7b496f86673551c933815B47973FC4a0e","token_id":"1"}
 */
export interface BurnNftRequest {
	/**
	 * Chain
	 * Blockchain where the NFT is minted.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Contract Address
	 * Contract where the token is minted. It must be your own contract.
	 */
	contract_address: string;

	/**
	 * Token Id
	 * Token ID of the NFT that will be burned.
	 */
	token_id: string;
}

/**
 * @example {"response":"OK","chain":"polygon","contract_address":"0xC8D297D7b496f86673551c933815B47973FC4a0e","transaction_hash":"0xcbbe6072d7aa48b9774ed8b15e7f298489c5e965b32aa468ca520b30aba649a1","transaction_external_url":"https://polygonscan.com/tx/0xcbbe6072d7aa48b9774ed8b15e7f298489c5e965b32aa468ca520b30aba649a1"}
 */
export interface BurnNftResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Chain
	 * Blockchain the NFT was burned on.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Contract Address
	 * The contract address of the burned NFT.
	 */
	contract_address: string;

	/**
	 * Transaction Hash
	 * The transaction hash which is returned by the blockchain after burning.
	 */
	transaction_hash: string;

	/**
	 * Transaction External Url
	 * Transaction URL in an external blockchain explorer.
	 */
	transaction_external_url: string;
}

/**
 * @example {"one_day_volume":194.7981,"one_day_change":0.4513354577078356,"one_day_sales":42,"one_day_average_price":4.63805,"seven_day_volume":1099.074207520107,"seven_day_change":-0.052033968595019554,"seven_day_sales":342,"seven_day_average_price":3.213667273450605,"thirty_day_volume":11672.513885632954,"thirty_day_change":-0.2564477340345068,"thirty_day_sales":3635,"thirty_day_average_price":3.211145498110854,"total_volume":27370.823769036146,"total_sales":13988,"total_supply":9999,"total_minted":9999,"num_owners":5250,"average_price":1.956736042967983,"market_cap":32133.4590672326,"floor_price":2.4,"floor_price_historic_one_day":2.3,"floor_price_historic_seven_day":3.9,"floor_price_historic_thirty_day":1,"updated_date":"2022-02-02T02:22:22.222222"}
 */
export interface CollectionStats {
	/**
	 * One Day Volume
	 * Volume of sales in the last 24 hours in ETH.
	 */
	one_day_volume?: number;

	/**
	 * One Day Change
	 * Change in volume of sales in the last 24 hours in ETH.
	 */
	one_day_change?: number;

	/**
	 * One Day Sales
	 * Number of sales in the last 24 hours.
	 */
	one_day_sales?: number;

	/**
	 * One Day Average Price
	 * Average price in the last 24 hours in ETH.
	 */
	one_day_average_price?: number;

	/**
	 * Seven Day Volume
	 * Volume of sales in the last 7 days in ETH.
	 */
	seven_day_volume?: number;

	/**
	 * Seven Day Change
	 * Change in volume of sales in the last 7 days in ETH.
	 */
	seven_day_change?: number;

	/**
	 * Seven Day Sales
	 * Number of sales in the last 7 days.
	 */
	seven_day_sales?: number;

	/**
	 * Seven Day Average Price
	 * Average price in the last 7 days in ETH.
	 */
	seven_day_average_price?: number;

	/**
	 * Thirty Day Volume
	 * Volume of sales in the last 30 days in ETH.
	 */
	thirty_day_volume?: number;

	/**
	 * Thirty Day Change
	 * Change in volume of sales in the last 30 days in ETH.
	 */
	thirty_day_change?: number;

	/**
	 * Thirty Day Sales
	 * Number of sales in the last 30 days.
	 */
	thirty_day_sales?: number;

	/**
	 * Thirty Day Average Price
	 * Average price in the last 30 days in ETH.
	 */
	thirty_day_average_price?: number;

	/**
	 * Total Volume
	 * Total volume of sales in ETH.
	 */
	total_volume?: number;

	/**
	 * Total Sales
	 * Total number of sales.
	 */
	total_sales?: number;

	/**
	 * Total Supply
	 * Total number of NFTs in supply.
	 */
	total_supply?: number;

	/**
	 * Total Minted
	 * Total number of NFTs minted.
	 */
	total_minted?: number;

	/**
	 * Num Owners
	 * Total number of owners.
	 */
	num_owners?: number;

	/**
	 * Average Price
	 * Average price of the collection since inception in ETH.
	 */
	average_price?: number;

	/**
	 * Market Cap
	 * Market cap of the collection in ETH.
	 */
	market_cap?: number;

	/**
	 * Floor Price
	 * Current floor price of the collection in ETH.
	 */
	floor_price?: number;

	/**
	 * Floor Price Historic One Day
	 * Floor price 1 day ago in ETH.
	 */
	floor_price_historic_one_day?: number;

	/**
	 * Floor Price Historic Seven Day
	 * Floor price 7 days ago in ETH.
	 */
	floor_price_historic_seven_day?: number;

	/**
	 * Floor Price Historic Thirty Day
	 * Floor price 30 days ago in ETH.
	 */
	floor_price_historic_thirty_day?: number;

	/**
	 * Updated Date
	 * Date when the collection statistics was last updated (ISO).
	 */
	updated_date?: string;
}

/**
 * @example {"response":"OK","statistics":{"one_day_volume":194.7981,"one_day_change":0.4513354577078356,"one_day_sales":42,"one_day_average_price":4.63805,"seven_day_volume":1099.074207520107,"seven_day_change":-0.052033968595019554,"seven_day_sales":342,"seven_day_average_price":3.213667273450605,"thirty_day_volume":11672.513885632954,"thirty_day_change":-0.2564477340345068,"thirty_day_sales":3635,"thirty_day_average_price":3.211145498110854,"total_volume":27370.823769036146,"total_sales":13988,"total_supply":9999,"total_minted":9999,"num_owners":5250,"average_price":1.956736042967983,"market_cap":32133.4590672326,"floor_price":2.4,"floor_price_historic_one_day":2.3,"floor_price_historic_seven_day":3.9,"floor_price_historic_thirty_day":1,"updated_date":"2022-02-02T02:22:22.222222"}}
 */
export interface CollectionStatsResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Statistics
	 * In-depth statistics of the queried NFT contract.
	 */
	statistics?: CollectionStats;
}

/**
 * @example {"chain":"ethereum","contract_address":"0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb","token_id":"9999","page_number":1,"page_size":50,"threshold":0.9}
 */
export interface ContentIdNftRequest {
	/**
	 * Chain
	 * Blockchain where the NFT has been minted.
	 */
	chain: 'ethereum' | 'polygon';

	/**
	 * Contract Address
	 * The contract address of the NFT.
	 */
	contract_address: string;

	/**
	 * Token Id
	 * A unique uint256 ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain.
	 */
	token_id: string;

	/**
	 * Page Number
	 * The page number of the results to return. The first page is 1.
	 * @min 1
	 */
	page_number?: number;

	/**
	 * Page Size
	 * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
	 * @min 1
	 * @max 50
	 */
	page_size?: number;

	/**
	 * Threshold
	 * Threshold for classifying an NFT as a counterfeit.
	 * @min 0.1
	 * @max 1
	 */
	threshold?: number;

	/**
	 * Filter Out Contract Address
	 * NFTs from this contract address will be filtered out. Useful for examples where the whole NFT collection is visually very similar e.g. CryptoPunks.
	 */
	filter_out_contract_address?: string;
}

/**
 * @example {"response":"OK","is_similar":true,"similar_nfts":[{"contract_address":"0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb","token_id":"3100","chain":"ethereum","similarity":0.999998,"file_url":"https://www.larvalabs.com/cryptopunks/cryptopunk3100.png","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb_t_3100_raw_asset.png","metadata_url":"https://api.niftygateway.com/beeple/100030071/","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"},"mint_date":"2020-10-29T15:03:54.838612"}]}
 */
export interface ContentIdResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Is Similar
	 * Returns true if a match is found, false otherwise.
	 */
	is_similar?: boolean;

	/**
	 * Similar Nfts
	 * Details of matching NFTs if found.
	 */
	similar_nfts: DuplicateNFTResponseModel[];
}

/**
 * @example {"url":"https://www.larvalabs.com/cryptopunks/cryptopunk7597.png","page_number":1,"page_size":50,"threshold":0.9}
 */
export interface ContentIdUrlRequest {
	/**
	 * Url
	 * URL that points to the image that returns a Content-Length and Content-Type header or contains the file extension. Supports .JPG, .JPEG, .PNG, .WebP, .PPM, .BMP, .PGM, .TIF, .TIFF file formats.
	 */
	url: string;

	/**
	 * Page Number
	 * The page number of the results to return. The first page is 1.
	 * @min 1
	 */
	page_number?: number;

	/**
	 * Page Size
	 * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
	 * @min 1
	 * @max 50
	 */
	page_size?: number;

	/**
	 * Threshold
	 * Threshold for classifying an NFT as a counterfeit.
	 * @min 0.1
	 * @max 1
	 */
	threshold?: number;

	/**
	 * Filter Out Contract Address
	 * NFTs from this contract address will be filtered out. Useful for examples where the whole NFT collection is visually very similar e.g. CryptoPunks.
	 */
	filter_out_contract_address?: string;
}

/**
 * @example {"name":"Decentraland LAND","symbol":"LAND","type":"ERC721","metadata":{"description":"The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles [...]","thumbnail_url":"https://i.imgur.com/Y8hQ4Uc.png","cached_thumbnail_url":"https://i.imgur.com/Nn5J1Mp.png","banner_url":"https://i.imgur.com/u8YlHT6.jpg","cached_banner_url":"https://i.imgur.com/GIO7kdF.jpg"}}
 */
export interface ContractInfoResponse {
	/**
	 * Name
	 * Name of the contract.
	 */
	name?: string;

	/**
	 * Symbol
	 * Symbol of the contract.
	 */
	symbol?: string;

	/**
	 * Type
	 * Contract type.
	 */
	type?: 'ERC721' | 'ERC1155';

	/**
	 * Metadata
	 * Metadata about the collection.
	 */
	metadata?: ContractMetadataResponse;
}

/**
 * @example {"description":"The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles [...]","thumbnail_url":"https://i.imgur.com/Y8hQ4Uc.png","cached_thumbnail_url":"https://i.imgur.com/Nn5J1Mp.png","banner_url":"https://i.imgur.com/u8YlHT6.jpg","cached_banner_url":"https://i.imgur.com/GIO7kdF.jpg"}
 */
export interface ContractMetadataResponse {
	/**
	 * Description
	 * A brief description of the collection.
	 */
	description?: string;

	/**
	 * Thumbnail Url
	 * A thumbnail image for previewing the collection.
	 */
	thumbnail_url?: string;

	/**
	 * Cached Thumbnail Url
	 * Cached version of the thumbnail image.
	 */
	cached_thumbnail_url?: string;

	/**
	 * Banner Url
	 * A banner image for previewing the collection.
	 */
	banner_url?: string;

	/**
	 * Cached Banner Url
	 * Cached version of the banner image.
	 */
	cached_banner_url?: string;
}

/**
 * @example {"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"},"metadata_url":"https://api.niftygateway.com/beeple/100030071","file_url":"https://lh3.googleusercontent.com/79JB1V9gSMv83iMs-Db4qdpPVdpKiyt_sjGLgs575wLEgWjSRLCzMQMoxaealYz7AVCKY_mzSy6GlOYdGt_7aaCZfg","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","cached_animation_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/e129f89af4022209258d1a547f421583f0701b54572c4616e50b59d3294ba8fb.mp4","mint_date":"2020-10-29T15:03:54.838612","file_information":{"height":512,"width":512,"file_size":310751},"updated_date":"2021-10-19T15:03:54.838612"}
 */
export interface ContractNft {
	/** Blockchain where the NFT has been minted. */
	chain: NftsRequestSupportedChain;

	/**
	 * Contract Address
	 * The contract address of the NFT.
	 */
	contract_address: string;

	/**
	 * Token Id
	 * A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain.
	 */
	token_id: string;

	/**
	 * Metadata
	 * Raw NFT metadata downloaded from the metadata_url i.e. token URI. It usually includes the name, description and attributes along with any other data added by the creator.
	 */
	metadata?: object;

	/**
	 * Metadata Url
	 * Metadata URL inside the contract for a given token, also known as the token URI. For ERC-721 it is the token_uri() function and for ERC-1155 it is the uri() function in the smart contract.
	 */
	metadata_url?: string;

	/**
	 * File Url
	 * Original file (image, video, etc) URL of the NFT.
	 */
	file_url?: string;

	/**
	 * Animation Url
	 * URL of multi-media file set in the NFT metadata. Most commonly used file types are GLTF, GLB, WEBM, MP4, M4V, OGV, OGG, along with audio MP3, WAV, and OGA. Also HTML pages, allowing to build rich experiences and interactive NFTs using JavaScript canvas, WebGL, and more.
	 */
	animation_url?: string;

	/**
	 * Cached File Url
	 * Cached file (image, video, etc) in NFTPort's cloud with no access restrictions, low latency and high availability.
	 */
	cached_file_url?: string;

	/**
	 * Cached Animation Url
	 * Cached URL of animated file (video, gif, etc) as set in the NFT metadata. This URL points to a file cached in NFTPort's cloud storage with no access restrictions, low latency and high availability.
	 */
	cached_animation_url?: string;

	/**
	 * Mint Date
	 * Date when the NFT was minted (ISO).
	 */
	mint_date?: string;

	/**
	 * File Information
	 * Extra information of the NFT’s file.
	 */
	file_information?: NftAssetMetadata;

	/**
	 * Updated Date
	 * Date when the NFT’s metadata was last downloaded or updated/refreshed.
	 */
	updated_date?: string;
}

/**
 * @example {"response":"OK","nfts":[{"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"},"metadata_url":"https://api.niftygateway.com/beeple/100030071","file_url":"https://lh3.googleusercontent.com/79JB1V9gSMv83iMs-Db4qdpPVdpKiyt_sjGLgs575wLEgWjSRLCzMQMoxaealYz7AVCKY_mzSy6GlOYdGt_7aaCZfg","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","cached_animation_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/e129f89af4022209258d1a547f421583f0701b54572c4616e50b59d3294ba8fb.mp4","mint_date":"2020-10-29T15:03:54.838612","file_information":{"height":512,"width":512,"file_size":310751},"updated_date":"2021-10-19T15:03:54.838612"}],"contract":{"name":"Decentraland LAND","symbol":"LAND","type":"ERC721","metadata":{"description":"The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles [...]","thumbnail_url":"https://i.imgur.com/Y8hQ4Uc.png","cached_thumbnail_url":"https://i.imgur.com/Nn5J1Mp.png","banner_url":"https://i.imgur.com/u8YlHT6.jpg","cached_banner_url":"https://i.imgur.com/GIO7kdF.jpg"}},"total":102}
 */
export interface ContractNftsResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Nfts
	 * Details of the NFTs.
	 */
	nfts?: ContractNft[];

	/**
	 * Contract
	 * Information of the NFT’s contract.
	 */
	contract?: ContractInfoResponse;

	/**
	 * Total
	 * Total number of NFTs in the given contract address.
	 */
	total?: number;

	/**
	 * Status
	 * Status of the contract tokens in the metadata refresh queue.
	 */
	status?: 'ADDED' | 'PROCESSING' | 'PENDING' | 'REFRESHED_RECENTLY';

	/**
	 * Status Message
	 * Detailed description of the ```status```.
	 */
	status_message?: string;
}

/**
 * An enumeration.
 */
export type ContractType = 'ERC721' | 'ERC1155' | 'ERC721_lazy' | 'ERC1155_lazy';

/**
 * @example {"name":"Decentraland LAND","symbol":"LAND","type":"ERC721","metadata":{"description":"The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles [...]","thumbnail_url":"https://i.imgur.com/Y8hQ4Uc.png","cached_thumbnail_url":"https://i.imgur.com/Nn5J1Mp.png","banner_url":"https://i.imgur.com/u8YlHT6.jpg","cached_banner_url":"https://i.imgur.com/GIO7kdF.jpg"},"address":"0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d","num_nfts_owned":3}
 */
export interface ContractsModelResponse {
	/**
	 * Name
	 * Name of the contract.
	 */
	name?: string;

	/**
	 * Symbol
	 * Symbol of the contract.
	 */
	symbol?: string;

	/**
	 * Type
	 * Contract type.
	 */
	type?: 'ERC721' | 'ERC1155';

	/**
	 * Metadata
	 * Metadata about the collection.
	 */
	metadata?: ContractMetadataResponse;

	/**
	 * Address
	 * The contract address of the collection.
	 */
	address: string;

	/**
	 * Num Nfts Owned
	 * Number of NFTs that account address owns in this contract.
	 */
	num_nfts_owned: number;
}

/**
 * @example {"chain":"ethereum","contract_address":"0xafb44cef938b1be600a4331bf9904f6cec2fcac3","token_id":"4083388403051261561560495289181218537481","name":"UniSwamp","description":"The UniSwamp is ground zero for warfare with The Institution and its army of Shills. Technically, “District 16”, Uniswamp is a region in southwest Cyber City still left unclaimed by the corporations. The de-facto home of the Cyber City underworld, Uniswamp is infested by renegade shills who do anything to turn a quick buck. Without proper guidance, all those who enter the UniSwamp are consumed by its devious inhabitants, leaving them rekt.","metadata":{"animation_url":"https://superfarm-images.s3.amazonaws.com/EllioTrades/uniswamp-epic.mp4","attributes":[{"trait_type":"Name","value":"UniSwamp"},{"trait_type":"Variant","value":"3D Animated"},{"trait_type":"Rarity","value":"Epic"},{"display_type":"number","trait_type":"Vote Power","value":5},{"max_value":50,"trait_type":"Issue","value":9}],"collection":"EllioTrades","description":"The UniSwamp is ground zero for warfare with The Institution and its army of Shills. Technically, “District 16”, Uniswamp is a region in southwest Cyber City still left unclaimed by the corporations. The de-facto home of the Cyber City underworld, Uniswamp is infested by renegade shills who do anything to turn a quick buck. Without proper guidance, all those who enter the UniSwamp are consumed by its devious inhabitants, leaving them rekt.","groupSize":50,"image":"https://superfarm-images.s3.amazonaws.com/EllioTrades/uniswamp-epic.png","issue":9,"name":"UniSwamp","type":"video/mp4","video":"https://superfarm-images.s3.amazonaws.com/EllioTrades/uniswamp-epic.mp4"},"metadata_url":"https://superfarm-metadata.s3.amazonaws.com/EllioTrades/0000000000000000000000000000000c00000000000000000000000000000009.json","file_url":"https://superfarm-images.s3.amazonaws.com/EllioTrades/uniswamp-epic.png","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0xafb44cef938b1be600a4331bf9904f6cec2fcac3_t_4083388403051261561560495289181218537481_raw_asset.png","cached_animation_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/e129f89af4022209258d1a547f421583f0701b54572c4616e50b59d3294ba8fb.mp4","owner_addresses":["0x86872bf79c77cc9f4244d70ede7a8a7a69a6864e"]}
 */
export interface CreatorNft {
	/**
	 * Chain
	 * Blockchain where the NFT has been minted.
	 */
	chain: 'ethereum';

	/**
	 * Contract Address
	 * The contract address of the NFT.
	 */
	contract_address: string;

	/**
	 * Token Id
	 * A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain.
	 */
	token_id: string;

	/**
	 * Name
	 * Name of the NFT.
	 */
	name?: string;

	/**
	 * Description
	 * Description of the NFT.
	 */
	description?: string;

	/**
	 * Metadata
	 * Raw NFT metadata downloaded from the metadata_url i.e. token URI. It usually includes the name, description and attributes along with any other data added by the creator.
	 */
	metadata?: object;

	/**
	 * Metadata Url
	 * Metadata URL inside the contract for a given token, also known as the token URI. For ERC-721 it is the token_uri() function and for ERC-1155 it is the uri() function in the smart contract.
	 */
	metadata_url?: string;

	/**
	 * File Url
	 * File (image, video, etc) URL of the NFT.
	 */
	file_url?: string;

	/**
	 * Animation Url
	 * URL of multi-media file set in the NFT metadata. Most commonly used file types are GLTF, GLB, WEBM, MP4, M4V, OGV, OGG, along with audio MP3, WAV, and OGA. Also HTML pages, allowing to build rich experiences and interactive NFTs using JavaScript canvas, WebGL, and more.
	 */
	animation_url?: string;

	/**
	 * Cached File Url
	 * Cached file (image, video, etc) in NFTPort's cloud with no access restrictions, low latency and high availability.
	 */
	cached_file_url?: string;

	/**
	 * Cached Animation Url
	 * Cached URL of animated file (video, gif, etc) as set in the NFT metadata. This URL points to a file cached in NFTPort's cloud storage with no access restrictions, low latency and high availability.
	 */
	cached_animation_url?: string;

	/**
	 * Owner Addresses
	 * List of account (i.e. wallet) addresses that own the NFT. For ERC1155, multiple owners can own the same NFT.
	 */
	owner_addresses?: string[];
}

/**
 * @example {"response":"OK","nfts":[{"chain":"ethereum","contract_address":"0xafb44cef938b1be600a4331bf9904f6cec2fcac3","token_id":"4083388403051261561560495289181218537481","name":"UniSwamp","description":"The UniSwamp is ground zero for warfare with The Institution and its army of Shills. Technically, “District 16”, Uniswamp is a region in southwest Cyber City still left unclaimed by the corporations. The de-facto home of the Cyber City underworld, Uniswamp is infested by renegade shills who do anything to turn a quick buck. Without proper guidance, all those who enter the UniSwamp are consumed by its devious inhabitants, leaving them rekt.","metadata":{"animation_url":"https://superfarm-images.s3.amazonaws.com/EllioTrades/uniswamp-epic.mp4","attributes":[{"trait_type":"Name","value":"UniSwamp"},{"trait_type":"Variant","value":"3D Animated"},{"trait_type":"Rarity","value":"Epic"},{"display_type":"number","trait_type":"Vote Power","value":5},{"max_value":50,"trait_type":"Issue","value":9}],"collection":"EllioTrades","description":"The UniSwamp is ground zero for warfare with The Institution and its army of Shills. Technically, “District 16”, Uniswamp is a region in southwest Cyber City still left unclaimed by the corporations. The de-facto home of the Cyber City underworld, Uniswamp is infested by renegade shills who do anything to turn a quick buck. Without proper guidance, all those who enter the UniSwamp are consumed by its devious inhabitants, leaving them rekt.","groupSize":50,"image":"https://superfarm-images.s3.amazonaws.com/EllioTrades/uniswamp-epic.png","issue":9,"name":"UniSwamp","type":"video/mp4","video":"https://superfarm-images.s3.amazonaws.com/EllioTrades/uniswamp-epic.mp4"},"metadata_url":"https://superfarm-metadata.s3.amazonaws.com/EllioTrades/0000000000000000000000000000000c00000000000000000000000000000009.json","file_url":"https://superfarm-images.s3.amazonaws.com/EllioTrades/uniswamp-epic.png","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0xafb44cef938b1be600a4331bf9904f6cec2fcac3_t_4083388403051261561560495289181218537481_raw_asset.png","cached_animation_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/e129f89af4022209258d1a547f421583f0701b54572c4616e50b59d3294ba8fb.mp4","owner_addresses":["0x86872bf79c77cc9f4244d70ede7a8a7a69a6864e"]}]}
 */
export interface CreatorNftsResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/** Nfts */
	nfts?: CreatorNft[];

	/**
	 * Continuation
	 * Continuation ID for the next page.
	 */
	continuation?: string;
}

/**
 * @example {"account_address":"0x21f4a9780a52c7a8ca5e30bac89a6b0e2722bf65","creator_share":"10000"}
 */
export interface Creators {
	/**
	 * Account Address
	 * Account address of the creator.
	 */
	account_address: string;

	/**
	 * Creator Share
	 * Creator share of the NFT (Range: 1-10000 i.e., 0.01%-100%). If an NFT has more than one creator, this tells how the creatorship is shared among the creators.
	 */
	creator_share: number;
}

export interface DataLimitsModel {
	/**
	 * Subscription Data Requests Included
	 * Number of requests included in your subscription. Requests exceeding this amount will incur extra charges as per our [pricing](https://www.nftport.xyz/pricing).
	 */
	subscription_data_requests_included?: number;

	/**
	 * Max Data Requests Per Second
	 * Number of requests allowed per second.
	 */
	max_data_requests_per_second: number;

	/**
	 * Max Data Requests Per Month
	 * Maximum number of requests you can make in a month. To increase this limit, please contact our support.
	 */
	max_data_requests_per_month: number;
}

export interface DataUsageModel {
	/**
	 * Subscription Data Requests Made
	 * Number of requests made in the current subscription period.
	 */
	subscription_data_requests_made?: number;
}

/**
 * @example {"chain":"polygon","name":"CRYPTOPUNKS","symbol":"C","max_supply":100,"team_reserve":0,"mint_price":0.1,"tokens_per_mint":10,"owner_address":"","treasury_address":"","public_mint_start_date":"2022-02-08T11:30:48+00:00","metadata_updatable":true,"base_uri":"","prereveal_token_uri":"ipfs://bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie","presale_mint_start_date":"2022-02-08T11:30:48+00:00","presale_whitelisted_addresses":["0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42"]}
 */
export interface DeployContractCollectionsRequest {
	/**
	 * Chain
	 * Blockchain to deploy the contract to.  **Cannot be changed later.**
	 */
	chain: 'ethereum' | 'polygon' | 'rinkeby';

	/**
	 * Name
	 * Name of the NFT contract. **Cannot be changed later.**
	 */
	name: string;

	/**
	 * Symbol
	 * Symbol of the NFT contract. **Cannot be changed later.**
	 */
	symbol: string;

	/**
	 * Max Supply
	 * The maximum number of NFTs that can be minted in this collection. **Cannot be changed later.**
	 * @min 1
	 */
	max_supply: number;

	/**
	 * Team Reserve
	 * The number of NFTs that can only be minted by the contract owner for free. **The `team_reserve` is part of `max_supply` and cannot be changed later.**
	 * @min 0
	 */
	team_reserve?: number;

	/**
	 * Mint Price
	 * Minting price per NFT, in units of the chain's native token. For example, if the contract is deployed to the Polygon chain, the minting price will be in MATIC.  **Cannot be changed later.**
	 * @min 0
	 */
	mint_price: number;

	/**
	 * Tokens Per Mint
	 * The maximum number of NFTs a user can mint in a single transaction. **Cannot be changed later.**
	 * @min 1
	 */
	tokens_per_mint: number;

	/**
	 * Owner Address
	 * The contract owner address. If you wish to own the contract, then set it as your wallet address. This is also the wallet that can manage the contract on NFT marketplaces. Use `transferOwnership()` to update the contract owner.
	 */
	owner_address: string;

	/**
	 * Treasury Address
	 * The treasury address: the balance of paid minting prices can be withdrawn to this address. Call `withdrawFees()` (on a block explorer like Polygonscan or Etherscan) in the contract ABI to transfer the entire balance to the treasury address.  **Cannot be changed later.**
	 */
	treasury_address: string;

	/**
	 * Public Mint Start Date
	 * Public minting start date (ISO). Eg: 2022-02-08T11:30:48+00:00.
	 */
	public_mint_start_date: string;

	/**
	 * Metadata Updatable
	 *  Default is `true`. If ```true```, the contract and metadata of the NFTs minted in the specified contract can be updated after minting (token URIs are not frozen on the contract level). This is useful for creating dynamic NFTs or revealing the NFTs after the drop. If ```false```, the contract and the metadata of NFTs minted in this contract are frozen, which means **token URIs cannot be updated, presale/public minting dates and whitelist cannot be changed, and royalties cannot be changed.**.
	 */
	metadata_updatable?: boolean;

	/**
	 * Base Uri
	 * Metadata base URI for tokens. If you specify this, then the metadata location of NFTs minted in this contract will be of the format ```base_uri``` + ```token_id```. This is useful for creating dynamic NFTs or revealing the NFTs after the drop.
	 */
	base_uri?: string;

	/**
	 * Prereveal Token Uri
	 * Pre-reveal token URI for placeholder metadata. This will be returned for all token IDs until a `baseURI` has been set.
	 */
	prereveal_token_uri?: string;

	/**
	 * Presale Mint Start Date
	 * Whitelisted/presale minting start date (ISO). Eg: 2022-02-08T11:30:48+00:00.
	 */
	presale_mint_start_date?: string;

	/**
	 * Presale Whitelisted Addresses
	 * List of addresses whitelisted for the presale.
	 */
	presale_whitelisted_addresses?: string[];

	/**
	 * Royalties Share
	 * Secondary market royalty rate in basis points (100 bps = 1%). This value cannot exceed 10,000 bps.
	 * @min 0
	 * @max 10000
	 */
	royalties_share?: number;

	/**
	 * Royalties Address
	 * Address that will have access to the balance of royalties paid. Defaults to `owner_address` if not set.
	 */
	royalties_address?: string;
}

/**
 * @example {"response":"OK","chain":"polygon","transaction_hash":"0x773ea27408d521898aaf20067e6b8e252b6aa5f0067878da6e2f22fe6fe3eee8","transaction_external_url":"https://polygonscan.com/tx/0xb1ffb9907e4b72cd89b81e00c4c233d1cc7c661f96f65979048eb6332deb467e","owner_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","name":"CRYPTOPUNKS","symbol":"C"}
 */
export interface DeployContractCollectionsResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Chain
	 * Blockchain where the contract has been created.
	 */
	chain: 'ethereum' | 'polygon' | 'rinkeby';

	/**
	 * Transaction Hash
	 * Deployed contract transaction hash which is a unique string of characters that is given to every transaction that is added to the blockchain.
	 */
	transaction_hash: string;

	/**
	 * Transaction External Url
	 * Transaction URL in an external blockchain explorer.
	 */
	transaction_external_url: string;

	/**
	 * Owner Address
	 * Owner address of the deployed NFT contract.
	 */
	owner_address: string;

	/**
	 * Name
	 * Name of the deployed NFT contract.
	 */
	name?: string;

	/**
	 * Symbol
	 * Symbol of the deployed NFT contract.
	 */
	symbol?: string;
}

/**
 * @example {"chain":"polygon","name":"CRYPTOPUNKS","symbol":"C","owner_address":"","metadata_updatable":false,"type":"erc721","roles":[{"role":"mint","addresses":["0xMockAddress1","0xMockAddress2"],"freeze":false}]}
 */
export interface DeployContractRequestWithAddress {
	/**
	 * Chain
	 * Blockchain to deploy the contract to.  **Cannot be changed later.**
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Name
	 * Name of the NFT contract. **Cannot be changed later.**
	 */
	name: string;

	/**
	 * Symbol
	 * Symbol of the NFT contract. **Cannot be changed later.**
	 */
	symbol: string;

	/**
	 * Owner Address
	 * The contract owner address. If you wish to own the contract, then set it as your wallet address.
	 */
	owner_address: string;

	/**
	 * Type
	 * Type of deployed contract (erc721/erc1155). Default type is erc721.
	 */
	type?: 'erc721' | 'erc1155';

	/**
	 * Metadata Updatable
	 * Default is `false`. If ```true```, the metadata of the NFTs minted in the specified contract can be updated after minting (token URIs are not frozen on the contract level). This is useful for creating dynamic NFTs or revealing the NFTs after the drop. If ```false```, all the NFTs minted in this contract are frozen by default which means token URIs are non-updatable. Metadata may also be frozen after deploying the contract on a contract and token level (see [Update a deployed contract for NFT products](https://docs.nftport.xyz/docs/nftport/b3A6MjU2NTIyMTM-update-a-deployed-contract) & [Update a minted NFT](https://docs.nftport.xyz/docs/nftport/b3A6MjU2NTIyMTg-update-a-minted-nft)).
	 */
	metadata_updatable?: boolean;

	/**
	 * Base Uri
	 * Optional metadata base URI for tokens. If you specify this, then NFTs minted in this contract will have metadata format of ```base_uri``` + ```token_id```. This is useful for creating dynamic NFTs or revealing the NFTs after the drop. ```base_uri``` can be changed with [Update a deployed contract for NFT products](https://docs.nftport.xyz/docs/nftport/b3A6MjU2NTIyMTM-update-a-deployed-contract) only if ```metadata_updatable``` is ```true``` and metadata hasn’t been frozen on the contract level. If an NFT’s metadata is frozen on the token level in [Update a minted NFT](https://docs.nftport.xyz/docs/nftport/b3A6MjU2NTIyMTg-update-a-minted-nft) the ```base_uri``` can still be updated.
	 */
	base_uri?: string;

	/**
	 * Royalties Share
	 * Secondary market royalty rate in basis points (100 bps = 1%). This value cannot exceed 10,000 bps.
	 * @min 0
	 * @max 10000
	 */
	royalties_share?: number;

	/**
	 * Royalties Address
	 * Address for royalties. Defaults to `owner_address` if not set.
	 */
	royalties_address?: string;

	/**
	 * Roles
	 * List of granular permissions for different wallet addresses set on the contract level. ```owner_address``` has all of the permissions.
	 */
	roles?: RolesItem[];
}

/**
 * @example {"response":"OK","chain":"polygon","transaction_hash":"0x773ea27408d521898aaf20067e6b8e252b6aa5f0067878da6e2f22fe6fe3eee8","transaction_external_url":"https://polygonscan.com/tx/0xb1ffb9907e4b72cd89b81e00c4c233d1cc7c661f96f65979048eb6332deb467e","owner_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","type":"erc721","name":"CRYPTOPUNKS","symbol":"C"}
 */
export interface DeployContractResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Chain
	 * Blockchain where the contract has been created.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Transaction Hash
	 * Deployed contract transaction hash which is a unique string of characters that is given to every transaction that is added to the blockchain.
	 */
	transaction_hash: string;

	/**
	 * Transaction External Url
	 * Transaction URL in an external blockchain explorer.
	 */
	transaction_external_url: string;

	/**
	 * Owner Address
	 * Owner address of the deployed NFT contract.
	 */
	owner_address: string;

	/**
	 * Type
	 * Type of deployed contract (erc721/erc1155). Default type is erc721.
	 */
	type: 'erc721' | 'erc1155';

	/**
	 * Name
	 * Name of the deployed NFT contract.
	 */
	name?: string;

	/**
	 * Symbol
	 * Symbol of the deployed NFT contract.
	 */
	symbol?: string;
}

/**
 * @example {"contract_address":"0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb","token_id":"3100","chain":"ethereum","similarity":0.999998,"file_url":"https://www.larvalabs.com/cryptopunks/cryptopunk3100.png","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb_t_3100_raw_asset.png","metadata_url":"https://api.niftygateway.com/beeple/100030071/","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"},"mint_date":"2020-10-29T15:03:54.838612"}
 */
export interface DuplicateNFTResponseModel {
	/**
	 * Contract Address
	 * Contract address of the NFT.
	 */
	contract_address: string;

	/**
	 * Token Id
	 * A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain.
	 */
	token_id: string;

	/**
	 * Chain
	 * Blockchain where the NFT has been minted.
	 */
	chain: 'ethereum' | 'polygon';

	/**
	 * Similarity
	 * Similarity of the input image to the NFT (0 to 1).
	 */
	similarity: number;

	/**
	 * File Url
	 * File (image, video, etc) url of the NFT.
	 */
	file_url?: string;

	/**
	 * Cached File Url
	 * Cached file (image, video, etc) in NFTPort's cloud with no access restrictions and without IPFS issues.
	 */
	cached_file_url?: string;

	/**
	 * Metadata Url
	 * Metadata URL inside the contract for a given token, also known as the token URI. For ERC-721 it is the token_uri() function and for ERC-1155 it is the uri() function in the smart contract.
	 */
	metadata_url?: string;

	/**
	 * Metadata
	 * Raw NFT metadata downloaded from the metadata_url i.e. token URI. It usually includes the name, description and attributes along with any other data added by the creator.
	 */
	metadata?: object;

	/**
	 * Mint Date
	 * Date when the NFT was minted (ISO).
	 */
	mint_date?: string;
}

/**
 * @example {"chain":"polygon","name":"Type your NFT name here","description":"Type your NFT description here","file_url":"Add your file URL here","mint_to_address":"Add your wallet address here"}
 */
export interface EasyMintNftRequest {
	/**
	 * Chain
	 * Blockchain to mint the NFT on.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Name
	 * Name of the NFT.
	 */
	name: string;

	/**
	 * Description
	 * Text description of the NFT which will be seen on NFT marketplaces, etc.
	 */
	description: string;

	/**
	 * File Url
	 * URL that points to the image/video or any other file format as long as it returns a Content-Length and Content-Type header or contains the file extension. HTML files are not supported.
	 */
	file_url: string;

	/**
	 * Mint To Address
	 * Account address where the NFT will be sent. For example, your Metamask wallet address if you wish to send it to yourself.
	 */
	mint_to_address: string;
}

/**
 * @example {"response":"OK","chain":"polygon","contract_address":"0x47c7ff137d7a6644a9a96f1d44f5a6f857d9023f","token_ids":["2"]}
 */
export interface GetBatchMintedNftResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Chain
	 * Blockchain the NFT was minted on.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Contract Address
	 * NFT contract address which has been successfully deployed to the blockchain.
	 */
	contract_address: string;

	/**
	 * Token Ids
	 * A unique ```uint256``` IDs list inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain.
	 */
	token_ids: string[];
}

/**
 * An enumeration.
 */
export type GetContractNftsRequestInclude = 'default' | 'metadata' | 'all';

/**
 * @example {"response":"OK","chain":"polygon","contract_address":"0x38a554984cf2205f7903123adeb6d560f46625e8","transaction_hash":"0x19ff77a6faebb740168689dfbf0feb63dc4c4b3797235fc8111716f2383e1715"}
 */
export interface GetDeployedContractResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Chain
	 * Blockchain where the contract has been created.
	 */
	chain: 'ethereum' | 'polygon' | 'rinkeby';

	/**
	 * Contract Address
	 * NFT contract address which has been successfully deployed to the blockchain.
	 */
	contract_address: string;

	/**
	 * Transaction Hash
	 * Transaction hash generated during the execution of deploying the contract.
	 */
	transaction_hash: string;
}

/**
 * @example {"response":"OK","chain":"polygon","contract_address":"0x47c7ff137d7a6644a9a96f1d44f5a6f857d9023f","token_id":"2"}
 */
export interface GetMintedNftResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Chain
	 * Blockchain the NFT was minted on.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Contract Address
	 * NFT contract address which has been successfully deployed to the blockchain.
	 */
	contract_address: string;

	/**
	 * Token Id
	 * A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain.
	 */
	token_id: string;
}

/**
 * An enumeration.
 */
export type GetNftsRequestInclude =
	| 'default'
	| 'metadata'
	| 'file_information'
	| 'contract_information'
	| 'all';

/**
 * @example {"response":"OK","abi":[{"inputs":[{"internalType":"address","name":"caller","type":"address"},{"internalType":"string","name":"tokenURI","type":"string"}],"name":"mintToCaller","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]}
 */
export interface GetUserProfileContractsABIsResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Abi
	 * Contract ABI, used for making direct, on chain, calls to a contract.
	 */
	abi: object[];
}

/**
 * @example {"response":"OK","contracts":[{"name":"Good Company Tokens","symbol":"GCT","transaction_hash":"0x124141or0f10140112381381dd","transaction_external_url":"https://rinkeby.etherscan.io/tx/0xf9bd460983cbd6cf974ac380760a914696bb68dd2b2cb38d1dbc4ba2358a83b0","chain":"rinkeby","address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","owner_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","creation_date":"2021-08-23T17:25:03.501703","metadata_frozen":true,"max_supply":10000,"team_reserve":10,"mint_price":0.5,"tokens_per_mint":10,"treasury_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","public_mint_start":"2022-03-12T14:20:23.526784","base_uri":"ipfs://c2fybeif3hkhukbitwkcsxzk5te6kc7yrtkxfy6epasg72dsozcpnkdcxv4/","prereveal_token_uri":"ipfs://bafybeif3hkhukbitwkcsxzk5te6kc7yrtkxfy6epasg72dsozcpnkdcxv4","presale_mint_start":"2022-03-10T14:20:23.526784","presale_whitelisted_addresses":["0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","0x7f7631fA2C3E7b78aD8CEA99E08844440c7626f0"],"presale_merkle_root":"f2c78c6bfba8dd539947c90750bf070feb989f955352a287da2a643be805a9b4","royalties_share":500,"royalties_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","merkle_proofs":{"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42":["0xf2c78c6bfba8dd539947c90750bf070feb989f955352a287da2a643be805a9b4","0x8b82aec4291a11f74942b91e0b303598148a382e6a1f43556b6dff54f1f4972d"],"0x7f7631fA2C3E7b78aD8CEA99E08844440c7626f0":["0xae9ff8919803844591e5320995dfae011d1d02cbb9e8505a9e0e57cb0397e1aa","0xfa7ad740f89fff5fbda6aa7096f0a904be4dc54abf3d7ba067bccb6afb138d04"]}}]}
 */
export interface GetUserProfileContractsCollectionsResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Contracts
	 * Details of the deployed contracts.
	 */
	contracts: UserProfileContractCollectionsDetails[];
}

/**
 * @example {"response":"OK","contracts":[{"name":"Good Company Tokens","symbol":"GCT","transaction_hash":"0x124141or0f10140112381381dd","transaction_external_url":"https://rinkeby.etherscan.io/tx/0xf9bd460983cbd6cf974ac380760a914696bb68dd2b2cb38d1dbc4ba2358a83b0","chain":"rinkeby","address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","owner_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","creation_date":"2021-08-23T17:25:03.501703","metadata_frozen":true,"type":"erc721","roles":[{"role":"mint","addresses":["0xMockAddress1","0xMockAddress2"],"freeze":false}],"royalties_share":500,"royalties_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","exited_nftport":false}]}
 */
export interface GetUserProfileContractsResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Contracts
	 * Details of the deployed contracts.
	 */
	contracts: UserProfileContractDetails[];
}

/**
 * @example {"response":"OK","total":1,"minted_nfts":[{"chain":"polygon","transaction_hash":"0x124141or0f10140112381381dd","transaction_external_url":"https://polygonscan.com/tx/0xcbbe6072d7aa48b9774ed8b15e7f298489c5e965b32aa468ca520b30aba649a1","contract_name":"My NFTPort contract","contract_address":"0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb","type":"erc721","token_id":"6473","mint_to_address":"0xc155f9bd6b71e9f71d0236b689ad7c2c5d16febf","metadata_uri":"ipfs://bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie","quantity":"1","burned_transferred_amount":"0","metadata_frozen":true,"mint_date":"2021-08-23T17:25:03.501703"}]}
 */
export interface GetUserProfileMintedNftsResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Total
	 * Total number of NFTs minted.
	 */
	total: number;

	/**
	 * Minted Nfts
	 * Details of the NFTs minted by you.
	 */
	minted_nfts: UserMintedNftResponse[];
}

/**
 * @example {"response":"OK","profile":{"name":"Satoshi Nakamoto","email":"satoshi@bitcoin.org","joined_date":"2021-10-17T00:00:00+00:00"},"subscription_period":{"start_date":"2022-01-18T12:40:51.519608","end_date":"2022-02-17T12:40:51.519613"},"data_usage_and_limits":{"data_usage":{"subscription_data_requests_made":1234},"data_limits":{"subscription_data_requests_included":150000,"max_data_requests_per_second":10,"max_data_requests_per_month":500000}},"minting_usage_and_limits":{"polygon":{"minting_usage":{"total_nfts_minted":12856,"subscription_nfts_minted":2856},"minting_limits":{"subscription_mints_included":500},"contract_deployment_usage":{"total_contracts_deployed":18,"subscription_contracts_deployed":4},"contract_deployment_limits":{"subscription_contracts_included":15}},"rinkeby":{"minting_usage":{"total_nfts_minted":9895,"subscription_nfts_minted":1100},"minting_limits":{"subscription_mints_included":500},"contract_deployment_usage":{"total_contracts_deployed":8,"subscription_contracts_deployed":6},"contract_deployment_limits":{"subscription_contracts_included":15}}}}
 */
export interface GetUserProfileSettingsResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Profile
	 * Your user profile.
	 */
	profile?: UserProfileResponseModel;

	/**
	 * Subscription Period
	 * Your subscription period.
	 */
	subscription_period?: UserSubscriptionPeriodResponseModel;

	/**
	 * Data Usage And Limits
	 * Your NFT Data usage and limits.
	 */
	data_usage_and_limits?: NFTDataLimitsResponseModel;

	/**
	 * Minting Usage And Limits
	 * Your minting and contract deployment usage and limits.
	 */
	minting_usage_and_limits?: MintingAndContractChainResponseModel;
}

/**
 * @example {"response":"OK","storage":[{"storage_type":"file","file_name":"my_cool_art.jpeg","ipfs_uri":"ipfs://QmRModSr9gQTSZrbfbLis6mw21HycZyqMA3j8YMRD11nAQ","ipfs_url":"https://ipfs.io/ipfs/QmRModSr9gQTSZrbfbLis6mw21HycZyqMA3j8YMRD11nAQ","uploaded_date":"2021-08-23T17:25:03.501703","content_type":"image/jpeg","file_size":85138,"file_size_mb":0.0812}]}
 */
export interface GetUserProfileStorageResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Storage
	 * Details of the data uploaded to IPFS by you.
	 */
	storage: (
		| UserFileModel
		| UserMetadataModel
		| UserMetadataDirectoryModel
		| (UserFileModel & UserMetadataModel & UserMetadataDirectoryModel)
	)[];
}

export interface HTTPValidationError {
	/** Detail */
	detail?: ValidationError[];
}

/**
 * @example {"response":"OK","ipfs_url":"https://ipfs.io/ipfs/QmRModSr9gQTSZrbfbLis6mw21HycZyqMA3j8YMRD11nAQ","file_name":"name.jpeg","content_type":"image/jpeg","file_size":85138,"file_size_mb":0.0812}
 */
export interface IpfsFileUploadResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Ipfs Url
	 * IPFS URL of the uploaded file.
	 */
	ipfs_url: string;

	/**
	 * File Name
	 * Name of the uploaded file.
	 */
	file_name?: string;

	/**
	 * Content Type
	 * Content type (MIME type / media type) of the uploaded file (e.g. image/jpeg).
	 */
	content_type?: string;

	/**
	 * File Size
	 * Size of the uploaded file in bytes.
	 */
	file_size?: number;

	/**
	 * File Size Mb
	 * Size of the uploaded file in MB.
	 */
	file_size_mb?: number;
}

/**
 * @example {"response":"OK","metadata_directory_ipfs_uri":"ipfs://bafybeif3hkhukbitwkcsxzk5te6kc7yrtkxfy6epasg72dsozcpnkdcxv4/","metadata_directory_ipfs_url":"https://ipfs.io/ipfs/bafybeif3hkhukbitwkcsxzk5te6kc7yrtkxfy6epasg72dsozcpnkdcxv4"}
 */
export interface IpfsMetadataDirectoryUploadResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Metadata Directory Ipfs Uri
	 * IPFS URI of the directory containing the uploaded metadata files which you can use as the `base_uri` in [Collection contracts](https://docs.nftport.xyz/docs/nftport/b3A6Mzk2MjA1MzQ-deploy-an-nft-collection-contract).
	 */
	metadata_directory_ipfs_uri?: string;

	/**
	 * Metadata Directory Ipfs Url
	 * IPFS URL of the directory containing the uploaded metadata files. You can view the directory along with all the uploaded files in this URL.
	 */
	metadata_directory_ipfs_url?: string;
}

/**
 * @example {"name":"My Art","description":"This is my custom art piece","file_url":"https://ipfs.io/ipfs/QmRModSr9gQTSZrbfbLis6mw21HycZyqMA3j8YMRD11nAQ"}
 */
export interface IpfsMetadataUploadRequest {
	/**
	 * Name
	 * Name of the NFT.
	 */
	name: string;

	/**
	 * Description
	 * Description of the NFT.
	 */
	description: string;

	/**
	 * File Url
	 * URL of the file that you wish to link with the metadata and turn into an NFT.
	 */
	file_url: string;

	/**
	 * External Url
	 * URL that will appear below the NFT on some of the NFT marketplaces such as OpenSea.
	 */
	external_url?: string;

	/**
	 * Animation Url
	 * URL to a multimedia attachment with all filetypes supported. If you want to make sure the file is supported by OpenSea, then see their [docs](https://docs.opensea.io/docs/metadata-standards#metadata-structure). When using ```animation_url```, set the ```file_url``` as the multimedia preview which will be displayed on the NFT marketplaces e.g. if your ```animation_url``` is a video then set ```file_url``` as the preview image for it.
	 */
	animation_url?: string;

	/**
	 * Custom Fields
	 * A dictionary which allows you to extend the metadata schema with your own arbitrary fields. You can pass anything here as long as it is follows “key”: “value” format inside a dictionary. All of the fields will be flattened and added to the top-level namespace e.g. like ```name```, ```description```, etc. Read more about [Metadata Schema](https://nftschool.dev/reference/metadata-schemas/#intro-to-json-schemas). Example:
	 *
	 *                     {
	 *                         "youtube_url": "https://www.youtube.com/watch?v=M2mBg7xHmY8&t=1s",
	 *                         "background_color": "ffffff",
	 *                         "random_key": "random_value"
	 *                     }
	 *
	 */
	custom_fields?: object;

	/**
	 * Attributes
	 * Optional list of NFT attributes. See [OpenSea docs](https://docs.opensea.io/docs/metadata-standards#attributes) for more information. Example:
	 *
	 *                     "attributes": [
	 *                         {
	 *                           "trait_type": "Background",
	 *                           "value": "Clean"
	 *                         },
	 *                           "trait_type": "Type",
	 *                           "value": "Rare"
	 *                           "trait_type": "Packaging",
	 *                         },
	 *                           "trait_type": "Personality",
	 *                           "value": "OG"
	 *                         }
	 *                     ]
	 *
	 */
	attributes?: MetadataAttribute[];
}

/**
 * @example {"response":"OK","metadata_uri":"ipfs://bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie","name":"My Art","description":"This is my custom art piece","file_url":"https://ipfs.io/ipfs/QmRModSr9gQTSZrbfbLis6mw21HycZyqMA3j8YMRD11nAQ"}
 */
export interface IpfsMetadataUploadResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Metadata Uri
	 * Uploaded metadata URI (also known as token URI) which you can use in [Customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting).
	 */
	metadata_uri: string;

	/**
	 * Name
	 * Name of the NFT.
	 */
	name?: string;

	/**
	 * Description
	 * Description of the NFT.
	 */
	description?: string;

	/**
	 * File Url
	 * URL of the file that is linked with the metadata and can be turned into an NFT.
	 */
	file_url?: string;

	/**
	 * External Url
	 * URL that will appear below the NFT on some of the NFT marketplaces such as OpenSea.
	 */
	external_url?: string;

	/**
	 * Animation Url
	 * URL to a multimedia attachment.
	 */
	animation_url?: string;

	/**
	 * Custom Fields
	 * Custom fields added to the metadata.
	 */
	custom_fields?: object;

	/**
	 * Attributes
	 * NFT attributes.
	 */
	attributes?: MetadataAttribute[];
}

/**
 * @example {"type":"list","lister_address":"0xb4cdc8dfd9ce9bf647f38cd8278036c0aacdc91e","nft":{"contract_type":"ERC1155_lazy","contract_address":"0xb66a603f4cfe17e3d27b87a8bfcad319856518b8","token_id":"15358604318467100856391476616408347066873708425523410565866333184395837440001","metadata_url":"ipfs://QmUNeWBXz4pJkBzMAaPTXS4dUXkHyVNsrfVTbN4bEsJnW1","creators":[{"account_address":"0x21f4a9780a52c7a8ca5e30bac89a6b0e2722bf65","creator_share":"10000"}],"royalties":[{"account_address":"0x21f4a9780a52c7a8ca5e30bac89a6b0e2722bf65","royalty_share":"1000"}],"signatures":["0xde8ee69a90450466de44e0025aec715d621afbcc1ad11361cc9d63666a7e3f3e33eb72d48f2753f6e5d414967ba5ae06d00e39d1f53e99d419038011c2f159f51b"],"total":5000},"quantity":1,"listing_details":{"asset_type":"ERC20","contract_address":"0xaa75b8c9e01ac2e9fc041a39d36a6536540b2072","price":"0.071","price_usd":271.5},"transaction_date":"2021-12-03T01:28:55.961","marketplace":"opensea"}
 */
export interface Listings {
	/**
	 * Type
	 * Activity type.
	 */
	type: 'list' | 'cancel_list';

	/**
	 * Lister Address
	 * Account address of the lister.
	 */
	lister_address: string;

	/**
	 * Nft
	 * Details of the listed NFT.
	 */
	nft: SrcServiceTransactionsEntitiesNft;

	/**
	 * Quantity
	 * Number of NFTs listed (can be more than 1 NFT for ERC1155).
	 */
	quantity?: number;

	/**
	 * Price Details
	 * Price details of the listing.
	 */
	price_details: PriceDetails;

	/**
	 * Transaction Hash
	 * A unique 66-character identifier that is generated when a transaction is executed on the blockchain.
	 */
	transaction_hash?: string;

	/**
	 * Block Hash
	 * The hash of the block header in which the transaction is recorded.
	 */
	block_hash?: string;

	/**
	 * Block Number
	 * Number of the block in which the transaction is recorded
	 */
	block_number?: number;

	/**
	 * Transaction Date
	 * Date of the transaction (ISO).
	 */
	transaction_date: string;

	/** Marketplace where the NFT was listed. */
	marketplace?: Marketplace;
}

/**
 * An enumeration.
 */
export type Marketplace = 'opensea' | 'rarible';

export interface MetadataAttribute {
	/**
	 * Trait Type
	 * Trait name.
	 */
	trait_type: string;

	/** String or numeric value of the attribute. */
	value: number | number | string;

	/**
	 * Max Value
	 * Maximum value for a numeric value.
	 */
	max_value?: number;

	/**
	 * Display Type
	 * Display type of the attribute (None for string values).
	 */
	display_type?: 'boost_number' | 'boost_percentage' | 'number' | 'date';
}

/**
 * @example {"chain":"polygon","contract_address":"0xC8D297D7b496f86673551c933815B47973FC4a0e","tokens":[{"mint_to_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","token_id":"123","metadata_uri":"ipfs://bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie","quantity":"1"}]}
 */
export interface MintBatchNftRequest {
	/**
	 * Chain
	 * Blockchain where to mint the NFT.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Contract Address
	 * The NFT will be minted inside this contract. It must be your own contract. If you don’t have one, see [Deploy a contract for NFT products](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzU-deploy-an-nft-contract).
	 */
	contract_address: string;

	/**
	 * Tokens
	 * List of tokens to be minted. Each record contains mint_to_address, token ID, metadata_uri and quantity. Maximum length is 50.
	 */
	tokens: MintBatchTokenItem[];
}

/**
 * @example {"response":"OK","chain":"polygon","contract_address":"0xC8D297D7b496f86673551c933815B47973FC4a0e","transaction_hash":"0xcbbe6072d7aa48b9774ed8b15e7f298489c5e965b32aa468ca520b30aba649a1","transaction_external_url":"https://polygonscan.com/tx/0xcbbe6072d7aa48b9774ed8b15e7f298489c5e965b32aa468ca520b30aba649a1","tokens":[{"mint_to_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","token_id":"123","metadata_uri":"ipfs://bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie","quantity":"1"}]}
 */
export interface MintBatchResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Chain
	 * Blockchain the NFTs were minted on.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Contract Address
	 * The contract address where the NFT were minted.
	 */
	contract_address: string;

	/**
	 * Transaction Hash
	 * The transaction hash which is returned by the blockchain after minting.
	 */
	transaction_hash: string;

	/**
	 * Transaction External Url
	 * Transaction URL in an external blockchain explorer.
	 */
	transaction_external_url: string;

	/**
	 * Tokens
	 * List of minted tokens.
	 */
	tokens: MintBatchTokenResponseItem[];
}

export interface MintBatchTokenItem {
	/**
	 * Mint To Address
	 * Account address where the NFTs will be sent. For example, your Metamask wallet address if you wish to send them to yourself.
	 */
	mint_to_address: string;

	/**
	 * Token Id
	 * Customizable token ID for the NFTs. If not set, will be chosen randomly. Maximum length is 76 digit number (2^256 - 1).
	 */
	token_id: string;

	/**
	 * Metadata Uri
	 * Metadata URI which will be linked with your NFTs. If you don't have one, see [Upload metadata to IPFS](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzc-upload-metadata-to-ipfs).
	 */
	metadata_uri: string;

	/**
	 * Quantity
	 * The quantity of the NFTs. Maximum quantity is 76 digit integer (2^256 - 1)
	 */
	quantity: number;
}

export interface MintBatchTokenResponseItem {
	/**
	 * Mint To Address
	 * Account address where the NFTs were minted.
	 */
	mint_to_address: string;

	/**
	 * Token Id
	 * Token ID of the NFTs.
	 */
	token_id: string;

	/**
	 * Metadata Uri
	 * Metadata URI linked with the NFTs.
	 */
	metadata_uri: string;

	/**
	 * Quantity
	 * The quantity of the NFTs.
	 */
	quantity: number;
}

/**
 * @example {"chain":"polygon","contract_address":"0xC8D297D7b496f86673551c933815B47973FC4a0e","metadata_uri":"ipfs://bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie","mint_to_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42"}
 */
export interface MintNftRequest {
	/**
	 * Chain
	 * Blockchain where to mint the NFT.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Contract Address
	 * The NFT will be minted inside this contract. It must be your own contract. If you don’t have one, see [Deploy a contract for NFT products](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzU-deploy-an-nft-contract).
	 */
	contract_address: string;

	/**
	 * Metadata Uri
	 * Metadata URI which will be linked with your NFT. If you don't have one, see [Upload metadata to IPFS](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzc-upload-metadata-to-ipfs).
	 */
	metadata_uri: string;

	/**
	 * Mint To Address
	 * Account address where the NFT will be sent. For example, your Metamask wallet address if you wish to send it to yourself.
	 */
	mint_to_address: string;

	/**
	 * Token Id
	 * Customizable token ID for the NFT. If not set, will be chosen randomly. Maximum length is 76 digit number (2^256 - 1).
	 */
	token_id?: string;
}

/**
 * @example {"response":"OK","chain":"polygon","contract_address":"0xC8D297D7b496f86673551c933815B47973FC4a0e","transaction_hash":"0xcbbe6072d7aa48b9774ed8b15e7f298489c5e965b32aa468ca520b30aba649a1","transaction_external_url":"https://polygonscan.com/tx/0xcbbe6072d7aa48b9774ed8b15e7f298489c5e965b32aa468ca520b30aba649a1","metadata_uri":"ipfs://bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie","mint_to_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42"}
 */
export interface MintNftResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Chain
	 * Blockchain the NFT was minted on.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Contract Address
	 * The contract address where the NFT was minted.
	 */
	contract_address: string;

	/**
	 * Transaction Hash
	 * The transaction hash which is returned by the blockchain after minting.
	 */
	transaction_hash: string;

	/**
	 * Transaction External Url
	 * Transaction URL in an external blockchain explorer.
	 */
	transaction_external_url: string;

	/**
	 * Metadata Uri
	 * Metadata URI linked with the NFT.
	 */
	metadata_uri: string;

	/**
	 * Mint To Address
	 * Account address where the NFT was sent.
	 */
	mint_to_address: string;
}

/**
 * @example {"response":"OK","chain":"polygon","contract_address":"0x47c7ff137d7a6644a9a96f1d44f5a6f857d9023f","transaction_hash":"0x6eb71286f4875bf48be7834c1ff285910583705714f5a5acff67489f94e14954","transaction_external_url":"https://polygonscan.com/tx/0x6eb71286f4875bf48be7834c1ff285910583705714f5a5acff67489f94e14954","mint_to_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","name":"NFTPort.xyz","description":"One-Stop & Simple NFT Infrastructure & APIs for Developers"}
 */
export interface MintNftWithUploadResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Chain
	 * Blockchain the NFT was minted on.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Contract Address
	 * The contract address where the NFT was minted.
	 */
	contract_address: string;

	/**
	 * Transaction Hash
	 * The transaction hash which is returned by the blockchain after minting.
	 */
	transaction_hash: string;

	/**
	 * Transaction External Url
	 * Transaction URL in an external blockchain explorer.
	 */
	transaction_external_url: string;

	/**
	 * Mint To Address
	 * Account address where the NFT was sent.
	 */
	mint_to_address: string;

	/**
	 * Name
	 * Name of the NFT.
	 */
	name?: string;

	/**
	 * Description
	 * Description of the NFT.
	 */
	description?: string;
}

export interface MintingAndContractChainResponseModel {
	/**
	 * Polygon
	 * Your minting and contract deployment usage and limits on Polygon.
	 */
	polygon: MintingUsageAndLimitsResponseModel;

	/**
	 * Rinkeby
	 * Your minting and contract deployment usage and limits on Rinkeby.
	 */
	rinkeby: MintingUsageAndLimitsResponseModel;
}

export interface MintingUsageAndLimitsResponseModel {
	/**
	 * Minting Usage
	 * Your minting usage.
	 */
	minting_usage?: UserMintingUsageResponseModel;

	/**
	 * Minting Limits
	 * Your minting limits.
	 */
	minting_limits?: UserMintingLimitsResponseModel;

	/**
	 * Contract Deployment Usage
	 * Your contract deployment usage.
	 */
	contract_deployment_usage?: UserContractUsageResponseModel;

	/**
	 * Contract Deployment Limits
	 * Your contract deployment limits.
	 */
	contract_deployment_limits?: UserContractLimitsResponseModel;
}

export interface NFTDataLimitsResponseModel {
	/**
	 * Data Usage
	 * Subscription data usage.
	 */
	data_usage: DataUsageModel;

	/**
	 * Data Limits
	 * Data usage limits.
	 */
	data_limits: DataLimitsModel;
}

/**
 * @example {"height":512,"width":512,"file_size":310751}
 */
export interface NftAssetMetadata {
	/**
	 * Height
	 * Image height in pixels.
	 */
	height: number;

	/**
	 * Width
	 * Image width in pixels.
	 */
	width: number;

	/**
	 * File Size
	 * File size in bytes.
	 */
	file_size: number;
}

/**
 * @example {"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","metadata_url":"https://api.niftygateway.com/beeple/100030071/","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"},"file_information":{"height":512,"width":512,"file_size":310751},"file_url":"https://lh3.googleusercontent.com/79JB1V9gSMv83iMs-Db4qdpPVdpKiyt_sjGLgs575wLEgWjSRLCzMQMoxaealYz7AVCKY_mzSy6GlOYdGt_7aaCZfg","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","cached_animation_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/e129f89af4022209258d1a547f421583f0701b54572c4616e50b59d3294ba8fb.mp4","mint_date":"2020-10-29T15:03:54.838612","updated_date":"2021-10-19T15:03:54.838612"}
 */
export interface NftDetails {
	/** Blockchain where the NFT has been minted. */
	chain: NftsRequestSupportedChain;

	/**
	 * Contract Address
	 * The contract address of the NFT.
	 */
	contract_address: string;

	/**
	 * Token Id
	 * A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain.
	 */
	token_id: string;

	/**
	 * Metadata Url
	 * Metadata URL inside the contract for a given token, also known as the token URI. For ERC-721 it is the token_uri() function and for ERC-1155 it is the uri() function in the smart contract.
	 */
	metadata_url?: string;

	/**
	 * Metadata
	 * Raw NFT metadata downloaded from the metadata_url i.e. token URI. It usually includes the name, description and attributes along with any other data added by the creator.
	 */
	metadata?: object;

	/**
	 * File Information
	 * Extra information of the NFT’s file.
	 */
	file_information?: NftAssetMetadata;

	/**
	 * File Url
	 * Original file (image, video, etc) URL of the NFT.
	 */
	file_url?: string;

	/**
	 * Animation Url
	 * URL of multi-media file set in the NFT metadata. Most commonly used file types are GLTF, GLB, WEBM, MP4, M4V, OGV, OGG, along with audio MP3, WAV, and OGA. Also HTML pages, allowing to build rich experiences and interactive NFTs using JavaScript canvas, WebGL, and more.
	 */
	animation_url?: string;

	/**
	 * Cached File Url
	 * Cached file (image, video, etc) in NFTPort's cloud with no access restrictions, low latency and high availability.
	 */
	cached_file_url?: string;

	/**
	 * Cached Animation Url
	 * Cached URL of animated file (video, gif, etc) as set in the NFT metadata. This URL points to a file cached in NFTPort's cloud storage with no access restrictions, low latency and high availability.
	 */
	cached_animation_url?: string;

	/**
	 * Mint Date
	 * Date when the NFT was minted (ISO).
	 */
	mint_date?: string;

	/**
	 * Updated Date
	 * Date when the NFT’s metadata was last downloaded or updated/refreshed.
	 */
	updated_date?: string;
}

/**
 * @example {"response":"OK","nft":{"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","metadata_url":"https://api.niftygateway.com/beeple/100030071/","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"},"file_information":{"height":512,"width":512,"file_size":310751},"file_url":"https://lh3.googleusercontent.com/79JB1V9gSMv83iMs-Db4qdpPVdpKiyt_sjGLgs575wLEgWjSRLCzMQMoxaealYz7AVCKY_mzSy6GlOYdGt_7aaCZfg","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","cached_animation_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/e129f89af4022209258d1a547f421583f0701b54572c4616e50b59d3294ba8fb.mp4","mint_date":"2020-10-29T15:03:54.838612","updated_date":"2021-10-19T15:03:54.838612"},"owner":"0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B","contract":{"name":"Decentraland LAND","symbol":"LAND","type":"ERC721","metadata":{"description":"The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles [...]","thumbnail_url":"https://i.imgur.com/Y8hQ4Uc.png","cached_thumbnail_url":"https://i.imgur.com/Nn5J1Mp.png","banner_url":"https://i.imgur.com/u8YlHT6.jpg","cached_banner_url":"https://i.imgur.com/GIO7kdF.jpg"}}}
 */
export interface NftDetailsResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Nft
	 * Details of the NFT.
	 */
	nft?: NftDetails;

	/**
	 * Owner
	 * Current owner of the NFT.
	 */
	owner?: string;

	/**
	 * Contract
	 * Information of the NFT’s contract.
	 */
	contract?: ContractInfoResponse;

	/**
	 * Status
	 * Status of the contract tokens in the metadata refresh queue.
	 */
	status?: 'ADDED' | 'PROCESSING' | 'PENDING' | 'REFRESHED_RECENTLY';

	/**
	 * Status Message
	 * Detailed description of the ```status```.
	 */
	status_message?: string;
}

/**
 * An enumeration.
 */
export type NftsRequestSupportedChain = 'ethereum' | 'polygon' | 'rinkeby';

/**
 * @example {"response":"OK","nfts":[{"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","contract":{"name":"Decentraland LAND","symbol":"LAND","type":"ERC721","metadata":{"description":"The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles [...]","thumbnail_url":"https://i.imgur.com/Y8hQ4Uc.png","cached_thumbnail_url":"https://i.imgur.com/Nn5J1Mp.png","banner_url":"https://i.imgur.com/u8YlHT6.jpg","cached_banner_url":"https://i.imgur.com/GIO7kdF.jpg"}},"metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"},"metadata_url":"https://api.niftygateway.com/beeple/100030071","file_url":"https://lh3.googleusercontent.com/79JB1V9gSMv83iMs-Db4qdpPVdpKiyt_sjGLgs575wLEgWjSRLCzMQMoxaealYz7AVCKY_mzSy6GlOYdGt_7aaCZfg","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","cached_animation_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/e129f89af4022209258d1a547f421583f0701b54572c4616e50b59d3294ba8fb.mp4","mint_date":"2020-10-29T15:03:54.838612","file_information":{"height":512,"width":512,"file_size":310751},"updated_date":"2021-10-19T15:03:54.838612"}],"continuation":"MHg0Zjg5Y2QwY2FlMWU1NGQ5OGRiNmE4MDE1MGE4MjRhNTMzNTAyZWVhXzI0MzU="}
 */
export interface NftsResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Nfts
	 * Details of the NFTs.
	 */
	nfts?: SrcServiceNftsEntitiesNft[];

	/**
	 * Continuation
	 * Continuation ID for next page.
	 */
	continuation?: string;
}

/**
 * @example {"asset_type":"ERC20","contract_address":"0xaa75b8c9e01ac2e9fc041a39d36a6536540b2072","price":"0.071","price_usd":271.5}
 */
export interface PriceDetails {
	/**
	 * Asset Type
	 * Type of the asset the NFT is traded for.
	 */
	asset_type?: 'ETH' | 'ERC20';

	/**
	 * Contract Address
	 * Contract address (for `ERC20`).
	 */
	contract_address?: string;

	/**
	 * Price
	 * Price in `asset_type`- `ETH` or `ERC20`.
	 */
	price?: number;

	/**
	 * Price Usd
	 * Price in USD.
	 */
	price_usd?: number;
}

/**
 * An enumeration.
 */
export type ReportTypes = 'uris';

/**
 * @example {"response":"OK","report":{"animation_uri_stats":{"http_centralized":{"count_failed":44520,"count_successful":819890,"floor_price_failed":22243.16,"floor_price_successful":45146357.81},"ipfs_cid":{"count_failed":38186,"count_successful":192870,"floor_price_failed":69696969711128.08,"floor_price_successful":139394140121173.48}}}}
 */
export interface ReportURIResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: 'OK' | 'NOK';

	/** Report */
	report?: object;

	/**
	 * Error
	 * Error response.
	 */
	error?: string;
}

/**
 * An enumeration.
 */
export type RoleType = 'mint' | 'update_contract' | 'update_token' | 'burn' | 'transfer';

export interface RolesItem {
	/** Permission set for the given wallet addresses. ```mint``` role allows the address to mint to the contract. ```update_contract``` role allows the address to update the contract with [Update a deployed contract for NFT products](https://docs.nftport.xyz/docs/nftport/b3A6MjU2NTIyMTM-update-a-deployed-contract-for-nft-products). ```update_token``` role allows the address to update the NFT with [Update a minted NFT](https://docs.nftport.xyz/docs/nftport/b3A6MjU2NTIyMTg-update-a-minted-nft). ```burn``` role allows the address to burn NFTs owned by the contract. ```transfer``` role allows the address to transfer NFTs owned by the contract. */
	role: RoleType;

	/**
	 * Addresses
	 * List of wallet addresses or a single address which will have this role.
	 */
	addresses: string[];

	/**
	 * Freeze
	 * If ```true```, this role/addresses list is frozen on a contract level and cannot be updated.
	 */
	freeze: boolean;
}

/**
 * @example {"account_address":"0x21f4a9780a52c7a8ca5e30bac89a6b0e2722bf65","royalty_share":"1000"}
 */
export interface Royalties {
	/**
	 * Account Address
	 * Account address where royalty is paid.
	 */
	account_address: string;

	/**
	 * Royalty Share
	 * Royalty share (Range: 1-100000 i.e., 0.01%-100%).
	 */
	royalty_share: number;
}

/**
 * @example {"type":"sale","buyer_address":"0xc2d131a52a7bc75f6558588d010d649e02710115","seller_address":"0xc2d131a52a7bc75f6558588d010d649e02710115","nft":{"contract_type":"ERC1155_lazy","contract_address":"0xb66a603f4cfe17e3d27b87a8bfcad319856518b8","token_id":"15358604318467100856391476616408347066873708425523410565866333184395837440001","metadata_url":"ipfs://QmUNeWBXz4pJkBzMAaPTXS4dUXkHyVNsrfVTbN4bEsJnW1","creators":[{"account_address":"0x21f4a9780a52c7a8ca5e30bac89a6b0e2722bf65","creator_share":"10000"}],"royalties":[{"account_address":"0x21f4a9780a52c7a8ca5e30bac89a6b0e2722bf65","royalty_share":"1000"}],"signatures":["0xde8ee69a90450466de44e0025aec715d621afbcc1ad11361cc9d63666a7e3f3e33eb72d48f2753f6e5d414967ba5ae06d00e39d1f53e99d419038011c2f159f51b"],"total":5000},"quantity":1,"price_details":{"asset_type":"ERC20","contract_address":"0xaa75b8c9e01ac2e9fc041a39d36a6536540b2072","price":"0.071","price_usd":271.5},"transaction_hash":"0x1c3b3e05961e5010e1b13d60a550ee9e14f9f3ef99a4d81e266b2b2067d6df87","block_hash":"0x8ad765098c04fa1b566b35848e951e99257a161a50a8732f06aef393f4e18dae","block_number":13733126,"transaction_date":"2021-12-03T10:37:41","marketplace":"opensea"}
 */
export interface Sales {
	/**
	 * Type
	 * Activity type.
	 */
	type: 'sale';

	/**
	 * Buyer Address
	 * Account address of the buyer.
	 */
	buyer_address?: string;

	/**
	 * Seller Address
	 * Account address of the seller.
	 */
	seller_address: string;

	/**
	 * Nft
	 * Details of the sold NFT.
	 */
	nft: SrcServiceTransactionsEntitiesNft;

	/**
	 * Quantity
	 * Number of NFT units (can be more than 1 NFT for ERC1155).
	 */
	quantity?: number;

	/**
	 * Price Details
	 * Price details of the sale.
	 */
	price_details: PriceDetails;

	/**
	 * Transaction Hash
	 * A unique 66-character identifier that is generated when a transaction is executed on the blockchain.
	 */
	transaction_hash: string;

	/**
	 * Block Hash
	 * The hash of the block header in which the transaction is recorded.
	 */
	block_hash: string;

	/**
	 * Block Number
	 * Number of the block in which the transaction is recorded.
	 */
	block_number: number;

	/**
	 * Transaction Date
	 * Date of the transaction (ISO).
	 */
	transaction_date: string;

	/** Marketplace where the sale took place. */
	marketplace?: Marketplace;
}

/**
 * @example {"response":"OK","nfts":[{"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"}}]}
 */
export interface SearchResult {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Nfts
	 * nfts
	 */
	nfts?: SearchResultImage[];
}

/**
 * @example {"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"}}
 */
export interface SearchResultImage {
	/**
	 * Chain
	 * Blockchain where the NFT has been minted.
	 */
	chain: 'ethereum' | 'polygon';

	/**
	 * Contract Address
	 * The contract address of the NFT.
	 */
	contract_address: string;

	/**
	 * Token Id
	 * A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain.
	 */
	token_id: string;

	/**
	 * Cached File Url
	 * Cached file (image, video, etc) in NFTPort's cloud with no access restrictions and without IPFS issues.
	 */
	cached_file_url?: string;

	/**
	 * Metadata
	 * Raw NFT metadata downloaded from the metadata_url i.e. token URI. It usually includes the name, description and attributes along with any other data added by the creator.
	 */
	metadata?: object;
}

/**
 * @example {"url":"https://supermariorun.com/assets/img/stage/obj_mode1.png","page_number":1,"page_size":50}
 */
export interface SearchUrlRequest {
	/**
	 * Url
	 * Image URL. Supports .JPG, .JPEG, .PNG, .WebP file formats.
	 */
	url: string;

	/**
	 * Page Number
	 * The page number of the results to return. The first page is 1.
	 * @min 1
	 */
	page_number?: number;

	/**
	 * Page Size
	 * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
	 * @min 1
	 * @max 50
	 */
	page_size?: number;
}

/**
 * An enumeration.
 */
export type StorageRequestType = 'file' | 'metadata' | 'metadata_directory' | 'all';

/**
 * @example {"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","name":"Name field value in NFT metadata","description":"Description field value in NFT metadata","mint_date":"2020-10-29T15:03:54.838612"}
 */
export interface TextSearchNft {
	/**
	 * Chain
	 * Blockchain where the NFT has been minted.
	 */
	chain: 'polygon' | 'ethereum';

	/**
	 * Contract Address
	 * The contract address of the NFT.
	 */
	contract_address: string;

	/**
	 * Token Id
	 * A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain.
	 */
	token_id: string;

	/**
	 * Cached File Url
	 * Cached file (image, video, etc) in NFTPort's cloud with no access restrictions and without IPFS issues.
	 */
	cached_file_url: string;

	/**
	 * Name
	 * Name of the NFT in the metadata.
	 */
	name: string;

	/**
	 * Description
	 * Description of the NFT in the metadata.
	 */
	description: string;

	/**
	 * Mint Date
	 * Date when the NFT was minted (ISO).
	 */
	mint_date?: string;
}

/**
 * An enumeration.
 */
export type TextSearchRequestOrder = 'relevance' | 'mint_date';

/**
 * An enumeration.
 */
export type TextSearchRequestSortOrder = 'desc' | 'asc';

/**
 * @example {"response":"OK","search_results":[{"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","name":"Name field value in NFT metadata","description":"Description field value in NFT metadata","mint_date":"2020-10-29T15:03:54.838612"}]}
 */
export interface TextSearchResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: 'OK' | 'NOK';

	/** Search Results */
	search_results?: TextSearchNft[];
}

/**
 * @example {"response":"OK","transactions":{"type":"sale","buyer_address":"0xc2d131a52a7bc75f6558588d010d649e02710115","seller_address":"0xc2d131a52a7bc75f6558588d010d649e02710115","nft":{"contract_type":"ERC1155_lazy","contract_address":"0xb66a603f4cfe17e3d27b87a8bfcad319856518b8","token_id":"15358604318467100856391476616408347066873708425523410565866333184395837440001","metadata_url":"ipfs://QmUNeWBXz4pJkBzMAaPTXS4dUXkHyVNsrfVTbN4bEsJnW1","creators":[{"account_address":"0x21f4a9780a52c7a8ca5e30bac89a6b0e2722bf65","creator_share":"10000"}],"royalties":[{"account_address":"0x21f4a9780a52c7a8ca5e30bac89a6b0e2722bf65","royalty_share":"1000"}],"signatures":["0xde8ee69a90450466de44e0025aec715d621afbcc1ad11361cc9d63666a7e3f3e33eb72d48f2753f6e5d414967ba5ae06d00e39d1f53e99d419038011c2f159f51b"],"total":5000},"quantity":1,"price_details":{"asset_type":"ERC20","contract_address":"0xaa75b8c9e01ac2e9fc041a39d36a6536540b2072","price":"0.071","price_usd":271.5},"transaction_hash":"0x1c3b3e05961e5010e1b13d60a550ee9e14f9f3ef99a4d81e266b2b2067d6df87","block_hash":"0x8ad765098c04fa1b566b35848e951e99257a161a50a8732f06aef393f4e18dae","block_number":13733126,"transaction_date":"2021-12-03T10:37:41","marketplace":"opensea"},"continuation":"1638479526000_61a936bd60c2ce3a0c68cd6f"}
 */
export interface TransactionsByAccountResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Transactions
	 * Transactions data.
	 */
	transactions?: (Transfers | Sales | Bids | Listings | (Transfers & Sales & Bids & Listings))[];

	/**
	 * Continuation
	 * Continuation string.
	 */
	continuation?: string;
}

/**
 * @example {"response":"OK","transactions":{"type":"transfer","transfer_from":"0xaf8acfa2d093a3569f9b1a2fd3c596d3b5d8f69d","transfer_to":"0xa42f6807522e4c786835e253c0735f130e58aa9d","contract_address":"0xb66a603f4cfe17e3d27b87a8bfcad319856518b8","token_id":"79400006447981872162108805936960249632419041130515543620398493819452073705492","quantity":1,"transaction_hash":"0x117cce93c9f67a19273f53caf6cba46485f9be03c04d0131b1df0f15ce005c90","block_hash":"0x80907f3c8bcaa5bc313b2c4114750aa38d255e740427404cefb99c231ebf9fe5","block_number":13732674,"transaction_date":"2021-12-03T09:00:46"},"continuation":"1638479526000_61a936bd60c2ce3a0c68cd6f"}
 */
export interface TransactionsByContractResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Transactions
	 * Transactions data.
	 */
	transactions?: (Transfers | Sales | Bids | Listings | (Transfers & Sales & Bids & Listings))[];

	/**
	 * Continuation
	 * Continuation string.
	 */
	continuation?: string;
}

/**
 * @example {"response":"OK","transactions":{"type":"list","lister_address":"0xb4cdc8dfd9ce9bf647f38cd8278036c0aacdc91e","nft":{"contract_type":"ERC1155_lazy","contract_address":"0xb66a603f4cfe17e3d27b87a8bfcad319856518b8","token_id":"15358604318467100856391476616408347066873708425523410565866333184395837440001","metadata_url":"ipfs://QmUNeWBXz4pJkBzMAaPTXS4dUXkHyVNsrfVTbN4bEsJnW1","creators":[{"account_address":"0x21f4a9780a52c7a8ca5e30bac89a6b0e2722bf65","creator_share":"10000"}],"royalties":[{"account_address":"0x21f4a9780a52c7a8ca5e30bac89a6b0e2722bf65","royalty_share":"1000"}],"signatures":["0xde8ee69a90450466de44e0025aec715d621afbcc1ad11361cc9d63666a7e3f3e33eb72d48f2753f6e5d414967ba5ae06d00e39d1f53e99d419038011c2f159f51b"],"total":5000},"quantity":1,"listing_details":{"asset_type":"ERC20","contract_address":"0xaa75b8c9e01ac2e9fc041a39d36a6536540b2072","price":"0.071","price_usd":271.5},"transaction_date":"2021-12-03T01:28:55.961","marketplace":"opensea"},"continuation":"1638479526000_61a936bd60c2ce3a0c68cd6f"}
 */
export interface TransactionsByTokenResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Transactions
	 * Transactions data.
	 */
	transactions?: (Transfers | Sales | Bids | Listings | (Transfers & Sales & Bids & Listings))[];

	/**
	 * Continuation
	 * Continuation string.
	 */
	continuation?: string;
}

/**
 * @example {"response":"OK","transactions":{"type":"transfer","transfer_from":"0xaf8acfa2d093a3569f9b1a2fd3c596d3b5d8f69d","transfer_to":"0xa42f6807522e4c786835e253c0735f130e58aa9d","contract_address":"0xb66a603f4cfe17e3d27b87a8bfcad319856518b8","token_id":"79400006447981872162108805936960249632419041130515543620398493819452073705492","quantity":1,"transaction_hash":"0x117cce93c9f67a19273f53caf6cba46485f9be03c04d0131b1df0f15ce005c90","block_hash":"0x80907f3c8bcaa5bc313b2c4114750aa38d255e740427404cefb99c231ebf9fe5","block_number":13732674,"transaction_date":"2021-12-03T09:00:46"},"continuation":"1638479526000_61a936bd60c2ce3a0c68cd6f"}
 */
export interface TransactionsResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Transactions
	 * Transactions data.
	 */
	transactions: (Transfers | Sales | (Transfers & Sales))[];

	/**
	 * Continuation
	 * Continuation string.
	 */
	continuation?: string;
}

/**
 * @example {"chain":"polygon","contract_address":"0xC8D297D7b496f86673551c933815B47973FC4a0e","tokens":[{"transfer_to_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","token_id":"1","quantity":"1"}]}
 */
export interface TransferBatchNftRequest {
	/**
	 * Chain
	 * Blockchain where the NFT is minted.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Contract Address
	 * Contract where the token is minted. It must be your own contract. If you don’t have one, see Deploy an NFT contract.
	 */
	contract_address: string;

	/**
	 * Tokens
	 * List of tokens to be transferred. Each record contains transfer_to_address (wallet adress to which the token will be transferred), token ID and quantity.
	 */
	tokens: TransferBatchTokenItem[];
}

export interface TransferBatchTokenItem {
	/** Transfer To Address */
	transfer_to_address: string;

	/** Token Id */
	token_id: string;

	/** Quantity */
	quantity: number;
}

/**
 * @example {"chain":"polygon","contract_address":"0xC8D297D7b496f86673551c933815B47973FC4a0e","token_id":"1","transfer_to_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42"}
 */
export interface TransferNftRequest {
	/**
	 * Chain
	 * Blockchain where the NFT is minted.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Contract Address
	 * Contract where the token is minted. It must be your own contract. If you don’t have one, see Deploy an NFT contract.
	 */
	contract_address: string;

	/**
	 * Token Id
	 * Token ID of the NFT to be transferred.
	 */
	token_id: string;

	/**
	 * Transfer To Address
	 *  Wallet address to which the NFT will be transferred.
	 */
	transfer_to_address: string;
}

/**
 * @example {"response":"OK","chain":"polygon","contract_address":"0xC8D297D7b496f86673551c933815B47973FC4a0e","transaction_hash":"0xcbbe6072d7aa48b9774ed8b15e7f298489c5e965b32aa468ca520b30aba649a1","transaction_external_url":"https://polygonscan.com/tx/0xcbbe6072d7aa48b9774ed8b15e7f298489c5e965b32aa468ca520b30aba649a1"}
 */
export interface TransferNftResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Chain
	 * Blockchain the NFT was transferred on.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Contract Address
	 * The contract address of the transferred NFT.
	 */
	contract_address: string;

	/**
	 * Transaction Hash
	 * The transaction hash which is returned by the blockchain after transferring.
	 */
	transaction_hash: string;

	/**
	 * Transaction External Url
	 * Transaction URL in an external blockchain explorer.
	 */
	transaction_external_url: string;
}

/**
 * @example {"type":"transfer","transfer_from":"0xaf8acfa2d093a3569f9b1a2fd3c596d3b5d8f69d","transfer_to":"0xa42f6807522e4c786835e253c0735f130e58aa9d","contract_address":"0xb66a603f4cfe17e3d27b87a8bfcad319856518b8","token_id":"79400006447981872162108805936960249632419041130515543620398493819452073705492","quantity":1,"transaction_hash":"0x117cce93c9f67a19273f53caf6cba46485f9be03c04d0131b1df0f15ce005c90","block_hash":"0x80907f3c8bcaa5bc313b2c4114750aa38d255e740427404cefb99c231ebf9fe5","block_number":13732674,"transaction_date":"2021-12-03T09:00:46"}
 */
export interface Transfers {
	/**
	 * Type
	 * Activity type.
	 */
	type: 'transfer' | 'mint' | 'burn';

	/**
	 * Owner Address
	 * NFT owner i.e. account address (for `type`- `mint` and `burn`).
	 */
	owner_address?: string;

	/**
	 * Transfer From
	 * Account address the NFT was transferred from (for `type`- `transfer`).
	 */
	transfer_from?: string;

	/**
	 * Transfer To
	 * Account address the NFT was transferred to (for `type`- `transfer`).
	 */
	transfer_to?: string;

	/**
	 * Contract Address
	 * Contract address of the NFT.
	 */
	contract_address: string;

	/**
	 * Token Id
	 * A unique `uint256` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain.
	 */
	token_id: string;

	/**
	 * Quantity
	 * Number of NFTs transferred (can be more than 1 NFT for ERC1155).
	 */
	quantity: number;

	/**
	 * Transaction Hash
	 * A unique 66-character identifier that is generated when a transaction is executed on the blockchain.
	 */
	transaction_hash: string;

	/**
	 * Block Hash
	 * The hash of the block header in which the transaction is recorded.
	 */
	block_hash: string;

	/**
	 * Block Number
	 * Number of the block in which the transaction is recorded.
	 */
	block_number: number;

	/**
	 * Transaction Date
	 * Date of the transaction (ISO).
	 */
	transaction_date: string;
}

/**
 * @example {"chain":"polygon","contract_address":"0xC8D297D7b496f86673551c933815B47973FC4a0e","public_mint_start_date":"2022-02-08T11:30:48+00:00","freeze_metadata":false,"base_uri":"ipfs://","presale_mint_start_date":"2022-02-08T11:30:48+00:00","presale_whitelisted_addresses":["0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42"]}
 */
export interface UpdateContractCollectionsRequest {
	/**
	 * Chain
	 * Blockchain where the contract was deployed to.
	 */
	chain: 'ethereum' | 'polygon' | 'rinkeby';

	/**
	 * Contract Address
	 * Address of the NFT contract.
	 */
	contract_address: string;

	/**
	 * Base Uri
	 * Metadata base URI for tokens. If you specify this, then the metadata location of NFTs minted in this contract will be of the format ```base_uri``` + ```token_id```. This is useful for creating dynamic NFTs or revealing the NFTs after the drop.
	 */
	base_uri?: string;

	/**
	 * Public Mint Start Date
	 * Public minting start time (ISO). Eg: 2022-02-08T11:30:48+00:00.
	 */
	public_mint_start_date?: string;

	/**
	 * Freeze Metadata
	 * If ```true```, freezes all token URIs inside the specified contract.
	 */
	freeze_metadata?: boolean;

	/**
	 * Prereveal Token Uri
	 * Pre-reveal token URI for placeholder metadata. This will be returned for all token IDs until a `baseURI` has been set.
	 */
	prereveal_token_uri?: string;

	/**
	 * Presale Mint Start Date
	 * Whitelisted/presale minting start time (ISO). Eg: 2022-02-08T11:30:48+00:00.
	 */
	presale_mint_start_date?: string;

	/**
	 * Presale Whitelisted Addresses
	 * List of addresses whitelisted for the presale.
	 */
	presale_whitelisted_addresses?: string[];

	/**
	 * Royalties Share
	 * Secondary market royalty rate in basis points (100 bps = 1%). This value cannot exceed 10,000 bps.
	 * @min 0
	 * @max 10000
	 */
	royalties_share?: number;

	/**
	 * Royalties Address
	 * Address that will have access to the balance of royalties paid.
	 */
	royalties_address?: string;
}

/**
 * @example {"response":"OK","chain":"polygon","transaction_hash":"0x773ea27408d521898aaf20067e6b8e252b6aa5f0067878da6e2f22fe6fe3eee8","transaction_external_url":"https://polygonscan.com/tx/0xb1ffb9907e4b72cd89b81e00c4c233d1cc7c661f96f65979048eb6332deb467e"}
 */
export interface UpdateContractCollectionsResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Chain
	 * Blockchain where the contract has been created.
	 */
	chain: 'ethereum' | 'polygon' | 'rinkeby';

	/**
	 * Transaction Hash
	 * Transaction hash which is a unique string of characters that is given to every transaction that is added to the blockchain.
	 */
	transaction_hash: string;

	/**
	 * Transaction External Url
	 * Transaction URL in an external blockchain explorer.
	 */
	transaction_external_url: string;
}

/**
 * @example {"chain":"polygon","contract_address":"0xC8D297D7b496f86673551c933815B47973FC4a0e","freeze_metadata":true,"owner_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","roles":[{"role":"mint","addresses":["0xMockAddress1","0xMockAddress2"],"freeze":false}]}
 */
export interface UpdateContractRequest {
	/**
	 * Chain
	 * Blockchain where the contract was deployed to.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Contract Address
	 * Address of the NFT contract.
	 */
	contract_address: string;

	/**
	 * Freeze Metadata
	 * If ```true```, freezes all token URIs inside the specified contract.
	 */
	freeze_metadata?: boolean;

	/**
	 * Base Uri
	 * Metadata base URI for tokens. Can only be changed if you deployed your contract with ```metadata_updatable``` as ```true``` and metadata hasn’t been frozen. If tokens are frozen separately in [Update a minted NFT](https://docs.nftport.xyz/docs/nftport/b3A6MjU2NTIyMTg-update-a-minted-nft) the ```base_uri``` can still be updated.
	 */
	base_uri?: string;

	/**
	 * Royalties Share
	 * Secondary market royalty rate in basis points (100 bps = 1%). This value cannot exceed 10,000 bps.
	 * @min 0
	 * @max 10000
	 */
	royalties_share?: number;

	/**
	 * Royalties Address
	 * Address for royalties.
	 */
	royalties_address?: string;

	/**
	 * Roles
	 * List of granular permissions for different wallet addresses set on the contract level. ```owner_address``` has all of the permissions. Only the specified roles are updated and to remove all the roles from a wallet address, the addresses list for that role must be an empty.
	 */
	roles?: RolesItem[];

	/**
	 * Exit Nftport
	 * Revoke NFTPort permissions from this contract. Default is ```false```
	 */
	exit_nftport?: boolean;
}

/**
 * @example {"response":"OK","chain":"polygon","transaction_hash":"0x773ea27408d521898aaf20067e6b8e252b6aa5f0067878da6e2f22fe6fe3eee8","transaction_external_url":"https://polygonscan.com/tx/0xb1ffb9907e4b72cd89b81e00c4c233d1cc7c661f96f65979048eb6332deb467e","freeze_metadata":true}
 */
export interface UpdateContractResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Chain
	 * Blockchain where the contract has been created.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Transaction Hash
	 * Transaction hash which is a unique string of characters that is given to every transaction that is added to the blockchain.
	 */
	transaction_hash: string;

	/**
	 * Transaction External Url
	 * Transaction URL in an external blockchain explorer.
	 */
	transaction_external_url: string;

	/**
	 * Freeze Metadata
	 * If ```true```, all token URIs inside the contract are frozen.
	 */
	freeze_metadata?: boolean;
}

/**
 * @example {"chain":"polygon","contract_address":"0xC8D297D7b496f86673551c933815B47973FC4a0e","token_id":"1","metadata_uri":"ipfs://bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie"}
 */
export interface UpdateNftRequest {
	/**
	 * Chain
	 * Blockchain where the NFT is minted.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Contract Address
	 * Contract where token is minted. It must be your own contract. If you don’t have one, see [Deploy a contract for NFT products](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzU-deploy-an-nft-contract).
	 */
	contract_address: string;

	/**
	 * Token Id
	 * Token ID of the NFT that will be updated.
	 */
	token_id: string;

	/**
	 * Metadata Uri
	 * Token URI for update.
	 */
	metadata_uri?: string;

	/**
	 * Freeze Metadata
	 * If ```true```, freezes the specified NFT token URI and further token metadata updates are blocked. You can still change the ```base_uri``` on contract level with [Update a deployed contract for NFT products](https://docs.nftport.xyz/docs/nftport/b3A6MjU2NTIyMTM-update-a-deployed-contract). If you wish to freeze all updates, then set ```freeze_metadata``` as ```true``` in Update a deployed product contract.
	 */
	freeze_metadata?: boolean;
}

/**
 * @example {"response":"OK","chain":"polygon","contract_address":"0xC8D297D7b496f86673551c933815B47973FC4a0e","transaction_hash":"0xcbbe6072d7aa48b9774ed8b15e7f298489c5e965b32aa468ca520b30aba649a1","transaction_external_url":"https://polygonscan.com/tx/0xcbbe6072d7aa48b9774ed8b15e7f298489c5e965b32aa468ca520b30aba649a1"}
 */
export interface UpdateNftResponse {
	/**
	 * Response
	 * Response status, either OK or NOK.
	 */
	response: string;

	/**
	 * Chain
	 * Blockchain the NFT was updated on.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Contract Address
	 * The contract address where the NFT was updated.
	 */
	contract_address: string;

	/**
	 * Transaction Hash
	 * The transaction hash which is returned by the blockchain after minting.
	 */
	transaction_hash: string;

	/**
	 * Transaction External Url
	 * Transaction URL in an external blockchain explorer.
	 */
	transaction_external_url: string;
}

export interface UserContractLimitsResponseModel {
	/**
	 * Subscription Contracts Included
	 * Contract deployments included in your subscription.
	 */
	subscription_contracts_included?: number;

	/**
	 * Max Contracts
	 * Contract deployment limit.
	 */
	max_contracts?: number;
}

export interface UserContractUsageResponseModel {
	/**
	 * Total Contracts Deployed
	 * Total number of contracts deployed.
	 */
	total_contracts_deployed: number;

	/**
	 * Subscription Contracts Deployed
	 * Number of contracts deployed during your current subscription cycle.
	 */
	subscription_contracts_deployed?: number;
}

/**
 * @example {"storage_type":"file","file_name":"my_cool_art.jpeg","ipfs_uri":"ipfs://QmRModSr9gQTSZrbfbLis6mw21HycZyqMA3j8YMRD11nAQ","ipfs_url":"https://ipfs.io/ipfs/QmRModSr9gQTSZrbfbLis6mw21HycZyqMA3j8YMRD11nAQ","uploaded_date":"2021-08-23T17:25:03.501703","content_type":"image/jpeg","file_size":85138,"file_size_mb":0.0812}
 */
export interface UserFileModel {
	/**
	 * Type
	 * Type of storage.
	 */
	type: 'file';

	/**
	 * File Name
	 * Name of the uploaded file.
	 */
	file_name?: string;

	/**
	 * Ipfs Uri
	 * IPFS URI of the uploaded file.
	 */
	ipfs_uri: string;

	/**
	 * Ipfs Url
	 * IPFS URL of the uploaded file.
	 */
	ipfs_url: string;

	/**
	 * Uploaded Date
	 * Date when the file was uploaded to IPFS (ISO).
	 */
	uploaded_date: string;

	/**
	 * Content Type
	 * Content type (MIME type / media type) of the uploaded file (e.g. image/jpeg).
	 */
	content_type?: string;

	/**
	 * File Size
	 * Size of the uploaded file in bytes.
	 */
	file_size?: number;

	/**
	 * File Size Mb
	 * Size of the uploaded file in MB.
	 */
	file_size_mb?: number;
}

/**
 * @example {"storage_type":"metadata_directory","ipfs_uri":"ipfs://bafybeif3hkhukbitwkcsxzk5te6kc7yrtkxfy6epasg72dsozcpnkdcxv4/","ipfs_url":"https://ipfs.io/ipfs/bafybeif3hkhukbitwkcsxzk5te6kc7yrtkxfy6epasg72dsozcpnkdcxv4","uploaded_date":"2021-12-13T17:25:03.501703"}
 */
export interface UserMetadataDirectoryModel {
	/**
	 * Type
	 * Type of storage.
	 */
	type: 'metadata_directory';

	/**
	 * Ipfs Uri
	 * IPFS URI of the uploaded directory.
	 */
	ipfs_uri: string;

	/**
	 * Ipfs Url
	 * IPFS URL of the uploaded directory.
	 */
	ipfs_url: string;

	/**
	 * Uploaded Date
	 * Date when the file was uploaded to IPFS (ISO).
	 */
	uploaded_date: string;
}

/**
 * @example {"storage_type":"metadata","ipfs_uri":"ipfs://QmRModSr9gQTSZrbfbLis6mw21HycZyqMA3j8YMRD11nAQ","ipfs_url":"https://ipfs.io/ipfs/QmRModSr9gQTSZrbfbLis6mw21HycZyqMA3j8YMRD11nAQ","uploaded_date":"2021-08-23T17:25:03.501703","metadata":{"attributes":[{"trait_type":"DNA","value":"Robot"},{"trait_type":"Hair","value":"BLU Pigtails"},{"trait_type":"Clothing","value":"BRWN TCTL Vest"},{"trait_type":"Mouth","value":"ROBO"}],"description":"🧬 CLONE X 🧬\n\n20,000 next-gen Avatars, by RTFKT and Takashi Murakami 🌸\n\nIf you own a clone without any Murakami trait please read the terms regarding RTFKT - Owned Content here: https://rtfkt.com/legal-2A\n\nYou are also entitled to a commercial license, please read the terms to that here: https://rtfkt.com/legal-2C","image":"https://clonex-assets.rtfkt.com/images/899.png","name":"CloneX #9400"}}
 */
export interface UserMetadataModel {
	/**
	 * Type
	 * Type of storage.
	 */
	type: 'metadata';

	/**
	 * Ipfs Uri
	 * IPFS URI of the uploaded file.
	 */
	ipfs_uri: string;

	/**
	 * Ipfs Url
	 * IPFS URL of the uploaded file.
	 */
	ipfs_url: string;

	/**
	 * Uploaded Date
	 * Date when the file was uploaded to IPFS (ISO).
	 */
	uploaded_date: string;

	/**
	 * Metadata
	 * JSON body of the metadata.
	 */
	metadata: object;
}

/**
 * @example {"chain":"polygon","transaction_hash":"0x124141or0f10140112381381dd","transaction_external_url":"https://polygonscan.com/tx/0xcbbe6072d7aa48b9774ed8b15e7f298489c5e965b32aa468ca520b30aba649a1","contract_name":"My NFTPort contract","contract_address":"0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb","type":"erc721","token_id":"6473","mint_to_address":"0xc155f9bd6b71e9f71d0236b689ad7c2c5d16febf","metadata_uri":"ipfs://bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie","quantity":"1","burned_transferred_amount":"0","metadata_frozen":true,"mint_date":"2021-08-23T17:25:03.501703"}
 */
export interface UserMintedNftResponse {
	/**
	 * Chain
	 * Blockchain the NFT was minted on.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Transaction Hash
	 * The transaction hash which is returned by the blockchain after minting.
	 */
	transaction_hash: string;

	/**
	 * Transaction External Url
	 * Transaction URL in an external blockchain explorer.
	 */
	transaction_external_url: string;

	/**
	 * Contract Name
	 * Contract name of the minted NFT.
	 */
	contract_name: string;

	/**
	 * Contract Address
	 * Contract address of the minted NFT.
	 */
	contract_address?: string;

	/**
	 * Type
	 * Contract type (erc721 or erc1155).
	 */
	type: string;

	/**
	 * Token Id
	 * A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain.
	 */
	token_id?: string;

	/**
	 * Mint To Address
	 * Account address where the NFT was sent.
	 */
	mint_to_address: string;

	/**
	 * Metadata Uri
	 * IPFS URI containing the metadata linked with the minted NFT.
	 */
	metadata_uri?: string;

	/**
	 * Quantity
	 * Quantity of minted tokens. For erc721 contract type it's always 1.
	 */
	quantity: number;

	/**
	 * Num Burned Or Transferred
	 * Quantity of tokens that were burned/transferred.
	 */
	num_burned_or_transferred: number;

	/**
	 * Metadata Frozen
	 * If ```true``` than the metadata can not be updated.
	 */
	metadata_frozen: boolean;

	/**
	 * Mint Date
	 * Date when the NFT was minted (ISO).
	 */
	mint_date: string;
}

export interface UserMintingLimitsResponseModel {
	/**
	 * Subscription Mints Included
	 * Mints included in your subscription.
	 */
	subscription_mints_included?: number;

	/**
	 * Max Mints
	 * Minting limit.
	 */
	max_mints?: number;
}

export interface UserMintingUsageResponseModel {
	/**
	 * Total Nfts Minted
	 * Total number of NFTs minted.
	 */
	total_nfts_minted: number;

	/**
	 * Subscription Nfts Minted
	 * Number of NFTs minted during your current subscription cycle.
	 */
	subscription_nfts_minted?: number;
}

/**
 * @example {"name":"Good Company Tokens","symbol":"GCT","transaction_hash":"0x124141or0f10140112381381dd","transaction_external_url":"https://rinkeby.etherscan.io/tx/0xf9bd460983cbd6cf974ac380760a914696bb68dd2b2cb38d1dbc4ba2358a83b0","chain":"rinkeby","address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","owner_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","creation_date":"2021-08-23T17:25:03.501703","metadata_frozen":true,"max_supply":10000,"team_reserve":10,"mint_price":0.5,"tokens_per_mint":10,"treasury_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","public_mint_start":"2022-03-12T14:20:23.526784","base_uri":"ipfs://c2fybeif3hkhukbitwkcsxzk5te6kc7yrtkxfy6epasg72dsozcpnkdcxv4/","prereveal_token_uri":"ipfs://bafybeif3hkhukbitwkcsxzk5te6kc7yrtkxfy6epasg72dsozcpnkdcxv4","presale_mint_start":"2022-03-10T14:20:23.526784","presale_whitelisted_addresses":["0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","0x7f7631fA2C3E7b78aD8CEA99E08844440c7626f0"],"presale_merkle_root":"f2c78c6bfba8dd539947c90750bf070feb989f955352a287da2a643be805a9b4","royalties_share":500,"royalties_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","merkle_proofs":{"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42":["0xf2c78c6bfba8dd539947c90750bf070feb989f955352a287da2a643be805a9b4","0x8b82aec4291a11f74942b91e0b303598148a382e6a1f43556b6dff54f1f4972d"],"0x7f7631fA2C3E7b78aD8CEA99E08844440c7626f0":["0xae9ff8919803844591e5320995dfae011d1d02cbb9e8505a9e0e57cb0397e1aa","0xfa7ad740f89fff5fbda6aa7096f0a904be4dc54abf3d7ba067bccb6afb138d04"]}}
 */
export interface UserProfileContractCollectionsDetails {
	/**
	 * Name
	 * Contract name.
	 */
	name: string;

	/**
	 * Symbol
	 * Contract symbol.
	 */
	symbol: string;

	/**
	 * Transaction Hash
	 * Deployed contract transaction hash which is a unique string of characters that is given to every transaction that is added to the blockchain.
	 */
	transaction_hash: string;

	/**
	 * Transaction External Url
	 * Transaction URL in an external blockchain explorer.
	 */
	transaction_external_url: string;

	/**
	 * Chain
	 * Blockchain where the contract has been created.
	 */
	chain: 'ethereum' | 'polygon' | 'rinkeby';

	/**
	 * Address
	 * NFT contract address which has been successfully deployed to the blockchain.
	 */
	address: string;

	/**
	 * Owner Address
	 * Owner address of the deployed NFT contract.
	 */
	owner_address?: string;

	/**
	 * Creation Date
	 * Date when the contract was created (ISO).
	 */
	creation_date: string;

	/**
	 * Metadata Frozen
	 * If ```true``` then the metadata URIs of the tokens can't be changed.
	 */
	metadata_frozen: boolean;

	/**
	 * Max Supply
	 * The maximum number of NFTs that can be minted in this collection.
	 */
	max_supply: number;

	/**
	 * Team Reserve
	 * The number of NFTs that can only be minted by the collection owner.
	 */
	team_reserve: number;

	/**
	 * Mint Price
	 * Minting price per NFT, in units of the chain's native token.
	 */
	mint_price: number;

	/**
	 * Tokens Per Mint
	 * The maximum number of NFTs a user can mint in a single transaction.
	 */
	tokens_per_mint: number;

	/**
	 * Treasury Address
	 * The treasury address: the balance of paid minting prices can be withdrawn to this address. Use `withdrawFees()` to transfer the entire balance to the treasury address.
	 */
	treasury_address?: string;

	/**
	 * Public Mint Start
	 * Public minting start time (ISO 8601 timestamp).
	 */
	public_mint_start: string;

	/**
	 * Base Uri
	 * Metadata base URI for tokens.
	 */
	base_uri?: string;

	/**
	 * Prereveal Token Uri
	 * Pre-reveal token URI for placholder metadata.
	 */
	prereveal_token_uri?: string;

	/**
	 * Presale Mint Start
	 * Whitelisted/presale minting start time (ISO 8601 timestamp).
	 */
	presale_mint_start?: string;

	/**
	 * Presale Whitelisted Addresses
	 * List of addresses whitelisted for the presale.
	 */
	presale_whitelisted_addresses?: string[];

	/**
	 * Presale Merkle Root
	 * Merkle tree root of addresses whitelisted for the presale.
	 */
	presale_merkle_root?: string;

	/**
	 * Royalties Share
	 * Secondary market royalty rate in basis points (100 bps = 1%). This value cannot exceed 10,000 bps.
	 */
	royalties_share?: number;

	/**
	 * Royalties Address
	 * Address for royalties.
	 */
	royalties_address?: string;

	/**
	 * Merkle Proofs
	 * Merkle proofs of the whitelisted addresses.
	 */
	merkle_proofs?: Record<string, string[]>;
}

/**
 * @example {"name":"Good Company Tokens","symbol":"GCT","transaction_hash":"0x124141or0f10140112381381dd","transaction_external_url":"https://rinkeby.etherscan.io/tx/0xf9bd460983cbd6cf974ac380760a914696bb68dd2b2cb38d1dbc4ba2358a83b0","chain":"rinkeby","address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","owner_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","creation_date":"2021-08-23T17:25:03.501703","metadata_frozen":true,"type":"erc721","roles":[{"role":"mint","addresses":["0xMockAddress1","0xMockAddress2"],"freeze":false}],"royalties_share":500,"royalties_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42","exited_nftport":false}
 */
export interface UserProfileContractDetails {
	/**
	 * Name
	 * Contract name.
	 */
	name: string;

	/**
	 * Symbol
	 * Contract symbol.
	 */
	symbol: string;

	/**
	 * Transaction Hash
	 * Deployed contract transaction hash which is a unique string of characters that is given to every transaction that is added to the blockchain.
	 */
	transaction_hash: string;

	/**
	 * Transaction External Url
	 * Transaction URL in an external blockchain explorer.
	 */
	transaction_external_url: string;

	/**
	 * Chain
	 * Blockchain where the contract has been created.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Address
	 * NFT contract address which has been successfully deployed to the blockchain.
	 */
	address: string;

	/**
	 * Owner Address
	 * Owner address of the deployed NFT contract.
	 */
	owner_address?: string;

	/**
	 * Creation Date
	 * Date when the contract was created (ISO).
	 */
	creation_date: string;

	/**
	 * Metadata Frozen
	 * If ```true``` than the metadata URIs of the tokens can't be changed.
	 */
	metadata_frozen: boolean;

	/**
	 * Tokens Burnable
	 * If ```true```, tokens may be burned by contract owner.
	 */
	tokens_burnable: boolean;

	/**
	 * Tokens Transferable
	 * If ```true```, tokens may be transferred by contract owner.
	 */
	tokens_transferable: boolean;

	/**
	 * Type
	 * Contract type (erc721 or erc1155).
	 */
	type: string;

	/**
	 * Royalties Share
	 * Secondary market royalty rate in basis points (100 bps = 1%). This value cannot exceed 10,000 bps.
	 */
	royalties_share?: number;

	/**
	 * Royalties Address
	 * Address for royalties
	 */
	royalties_address?: string;

	/**
	 * Roles
	 * List of granular permissions for different wallet addresses set on the contract level. ```owner_address``` has all of the permissions.
	 */
	roles?: RolesItem[];

	/**
	 * Exited Nftport
	 * If ```true```, contract can not be called by NFTPort API anymore.
	 */
	exited_nftport?: boolean;
}

/**
 * An enumeration.
 */
export type UserProfileContractsCollectionsInclude = 'default' | 'merkle_proofs';

export interface UserProfileResponseModel {
	/**
	 * Name
	 * Your name.
	 */
	name: string;

	/**
	 * Email
	 * Your email ID.
	 */
	email: string;

	/**
	 * Joined Date
	 * Date when you signed up (ISO).
	 */
	joined_date: string;
}

export interface UserSubscriptionPeriodResponseModel {
	/**
	 * Start Date
	 * Date when your subscription started (ISO).
	 */
	start_date: string;

	/**
	 * End Date
	 * Date when your subscription will end (ISO).
	 */
	end_date: string;
}

export interface ValidationError {
	/** Location */
	loc: string[];

	/** Message */
	msg: string;

	/** Error Type */
	type: string;
}

/**
 * @example {"chain":"ethereum","contract_address":"0x12f28e2106ce8fd8464885b80ea865e98b465149","token_id":"100030071","contract":{"name":"Decentraland LAND","symbol":"LAND","type":"ERC721","metadata":{"description":"The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles [...]","thumbnail_url":"https://i.imgur.com/Y8hQ4Uc.png","cached_thumbnail_url":"https://i.imgur.com/Nn5J1Mp.png","banner_url":"https://i.imgur.com/u8YlHT6.jpg","cached_banner_url":"https://i.imgur.com/GIO7kdF.jpg"}},"metadata":{"description":"ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.","background_color":"ffffff","external_url":"https://niftygateway.com/#/","image":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png","name":"POLITICS IS BULLSHIT #71/100","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"},"metadata_url":"https://api.niftygateway.com/beeple/100030071","file_url":"https://lh3.googleusercontent.com/79JB1V9gSMv83iMs-Db4qdpPVdpKiyt_sjGLgs575wLEgWjSRLCzMQMoxaealYz7AVCKY_mzSy6GlOYdGt_7aaCZfg","animation_url":"https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4","cached_file_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png","cached_animation_url":"https://storage.googleapis.com/sentinel-nft/raw-assets/e129f89af4022209258d1a547f421583f0701b54572c4616e50b59d3294ba8fb.mp4","mint_date":"2020-10-29T15:03:54.838612","file_information":{"height":512,"width":512,"file_size":310751},"updated_date":"2021-10-19T15:03:54.838612"}
 */
export interface SrcServiceNftsEntitiesNft {
	/** Blockchain where the NFT has been minted. */
	chain: NftsRequestSupportedChain;

	/**
	 * Contract Address
	 * The contract address of the NFT.
	 */
	contract_address: string;

	/**
	 * Token Id
	 * A unique ```uint256``` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain.
	 */
	token_id: string;

	/**
	 * Contract
	 * Information of the NFT’s contract.
	 */
	contract?: ContractInfoResponse;

	/**
	 * Metadata
	 * Raw NFT metadata downloaded from the metadata_url i.e. token URI. It usually includes the name, description and attributes along with any other data added by the creator.
	 */
	metadata?: object;

	/**
	 * Metadata Url
	 * Metadata URL inside the contract for a given token, also known as the token URI. For ERC-721 it is the token_uri() function and for ERC-1155 it is the uri() function in the smart contract.
	 */
	metadata_url?: string;

	/**
	 * File Url
	 * Original file (image, video, etc) URL of the NFT.
	 */
	file_url?: string;

	/**
	 * Animation Url
	 * URL of multi-media file set in the NFT metadata. Most commonly used file types are GLTF, GLB, WEBM, MP4, M4V, OGV, OGG, along with audio MP3, WAV, and OGA. Also HTML pages, allowing to build rich experiences and interactive NFTs using JavaScript canvas, WebGL, and more.
	 */
	animation_url?: string;

	/**
	 * Cached File Url
	 * Cached file (image, video, etc) in NFTPort's cloud with no access restrictions, low latency and high availability.
	 */
	cached_file_url?: string;

	/**
	 * Cached Animation Url
	 * Cached URL of animated file (video, gif, etc) as set in the NFT metadata. This URL points to a file cached in NFTPort's cloud storage with no access restrictions, low latency and high availability.
	 */
	cached_animation_url?: string;

	/**
	 * Mint Date
	 * Date when the NFT was minted (ISO).
	 */
	mint_date?: string;

	/**
	 * File Information
	 * Extra information of the NFT’s file.
	 */
	file_information?: NftAssetMetadata;

	/**
	 * Updated Date
	 * Date when the NFT’s metadata was last downloaded or updated/refreshed.
	 */
	updated_date?: string;
}

/**
 * @example {"contract_type":"ERC1155_lazy","contract_address":"0xb66a603f4cfe17e3d27b87a8bfcad319856518b8","token_id":"15358604318467100856391476616408347066873708425523410565866333184395837440001","metadata_url":"ipfs://QmUNeWBXz4pJkBzMAaPTXS4dUXkHyVNsrfVTbN4bEsJnW1","creators":[{"account_address":"0x21f4a9780a52c7a8ca5e30bac89a6b0e2722bf65","creator_share":"10000"}],"royalties":[{"account_address":"0x21f4a9780a52c7a8ca5e30bac89a6b0e2722bf65","royalty_share":"1000"}],"signatures":["0xde8ee69a90450466de44e0025aec715d621afbcc1ad11361cc9d63666a7e3f3e33eb72d48f2753f6e5d414967ba5ae06d00e39d1f53e99d419038011c2f159f51b"],"total":5000}
 */
export interface SrcServiceTransactionsEntitiesNft {
	/** Contract type. */
	contract_type?: ContractType;

	/**
	 * Contract Address
	 * Contract address of the NFT.
	 */
	contract_address?: string;

	/**
	 * Token Id
	 * A unique `uint256` ID inside the contract. The contract address and token ID pair is a globally unique and fully-qualified identifier for a specific NFT on chain.
	 */
	token_id?: string;

	/**
	 * Metadata Url
	 * Metadata URL inside the contract for a given token, also known as the token URI. For ERC-721 it is the token_uri() function and for ERC-1155 it is the uri() function in the smart contract.
	 */
	metadata_url?: string;

	/**
	 * Creators
	 * Details of the creators of the NFT.
	 */
	creators?: Creators[];

	/**
	 * Royalties
	 * Details of the royalty payments.
	 */
	royalties?: Royalties[];

	/**
	 * Signatures
	 * An array of wallet approval signatures for the transaction from every creator of the NFT (for `contract_type`- `ERC721_lazy` and `ERC1155_lazy`).
	 */
	signatures?: string[];

	/**
	 * Total
	 * Total supply of the minted NFTs.
	 */
	total?: number;
}

export interface NftsV0NftsGetParams {
	/** Blockchain from which to query NFTs. */
	chain: NftsRequestSupportedChain;

	/**
	 * Page Size
	 * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
	 * @min 1
	 * @max 50
	 */
	page_size?: number;

	/**
	 * Continuation
	 * Continuation. Pass this value from the previous response to fetch the next page.
	 */
	continuation?: string;

	/** Include optional data in the response. ```metadata``` includes NFT metadata, ```file_information``` includes extra information of the NFT’s file,  ```contract_infomation``` includes information of the NFT’s contract and ```all``` includes full details like in [Retrieve NFT details](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTM-retrieve-nft-details). Fields can be combined to get desired result. */
	include?: GetNftsRequestInclude[];
}

export interface NftDetailsV0NftsContractAddressTokenIdGetParams {
	/** Blockchain from which to query NFTs. */
	chain: NftsRequestSupportedChain;

	/**
	 * Refresh Metadata
	 * Queues and refreshes the metadata of the token if it has changed since the ```updated_date```. Useful for example, when NFT collections are revealed.
	 */
	refresh_metadata?: boolean;

	/** Contract Address */
	contractAddress: string;

	/** Token Id */
	tokenId: string;
}

export interface NftsByContractV0NftsContractAddressGetParams {
	/** Blockchain from which to query NFTs. */
	chain: NftsRequestSupportedChain;

	/**
	 * Page Number
	 * The page number of the results to return. The first page is 1.
	 * @min 1
	 */
	page_number?: number;

	/**
	 * Page Size
	 * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
	 * @min 1
	 * @max 50
	 */
	page_size?: number;

	/** Include optional data in the response. default is the default response, metadata includes NFT metadata and cached_file_url, and all includes extra information like file_information and mint_date in [Retrieve NFT details](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTM-retrieve-nft-details). */
	include?: GetContractNftsRequestInclude;

	/**
	 * Refresh Metadata
	 * Queues and refreshes all the NFTs metadata inside the contract (i.e. all tokens) if they have changed since the ```updated_date```. Useful for example, when NFT collections are revealed.
	 */
	refresh_metadata?: boolean;

	/** Contract Address */
	contractAddress: string;
}

export interface AccountNftsV0AccountsAccountAddressGetParams {
	/** Blockchain from which to query NFTs. */
	chain: AccountRequestSupportedChain;

	/**
	 * Page Number
	 * The page number of the results to return. The first page is 1.
	 * @min 1
	 */
	page_number?: number;

	/**
	 * Page Size
	 * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
	 * @min 1
	 * @max 50
	 */
	page_size?: number;

	/**
	 * Continuation
	 * Continuation. Pass this value from the previous response to fetch the next page.
	 */
	continuation?: string;

	/** Include optional data in the response. ```default``` is the default response and metadata includes NFT metadata, like in Retrieve NFT details, and ```contract_information``` includes information of the NFT’s contract. */
	include?: AccountRequestInclude[];

	/** Exclude data from the response. ```erc721``` excludes ERC721 tokens and ```erc1155``` excludes ERC1155 tokens. */
	exclude?: AccountRequestExclude[];

	/**
	 * Contract Address
	 * Filter by and return NFTs only from the given contract address.
	 */
	contract_address?: string;

	/** Account Address */
	accountAddress: string;
}

export interface CreatorNftsV0AccountsCreatorsAccountAddressGetParams {
	/**
	 * Chain
	 * Blockchain from which to query NFTs.
	 */
	chain: 'ethereum';

	/**
	 * Page Size
	 * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
	 * @min 1
	 * @max 50
	 */
	page_size?: number;

	/**
	 * Continuation
	 * Continuation. Pass this value from the previous response to fetch the next page.
	 */
	continuation?: string;

	/** Include optional data in the response. ```default``` is the default response and metadata includes NFT metadata, like in Retrieve NFT details. */
	include?: AccountRequestInclude;

	/** Account Address */
	accountAddress: string;
}

export interface AccountContractsV0AccountsContractsAccountAddressGetParams {
	/**
	 * Chain
	 * Blockchain from which to query contracts.
	 */
	chain: 'ethereum' | 'rinkeby';

	/** Type of ownership. */
	type: AccountContractsRequestType;

	/**
	 * Page Size
	 * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
	 * @min 1
	 * @max 50
	 */
	page_size?: number;

	/**
	 * Continuation
	 * Continuation. Pass this value from the previous response to fetch the next page.
	 */
	continuation?: string;

	/** Account Address */
	accountAddress: string;
}

export interface TransactionsByAccountV0TransactionsAccountsAccountAddressGetParams {
	/**
	 * Chain
	 * Blockchain from which to query NFT transactions.
	 */
	chain: 'ethereum';

	/**
	 * Page Size
	 * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
	 * @min 1
	 * @max 50
	 */
	page_size?: number;

	/**
	 * Type
	 * Transaction type. You can specify the event types as an array. `all` returns all transaction types.
	 */
	type: ('transfer_from' | 'transfer_to' | 'mint' | 'burn' | 'buy' | 'sell' | 'all')[];

	/**
	 * Continuation
	 * Continuation. Pass this value from the previous response to fetch the next page.
	 */
	continuation?: string;

	/** Account Address */
	accountAddress: string;
}

export interface TransactionsByTokenV0TransactionsNftsContractAddressTokenIdGetParams {
	/**
	 * Chain
	 * Blockchain of the NFT from which to query transactions.
	 */
	chain: 'ethereum';

	/**
	 * Page Size
	 * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
	 * @min 1
	 * @max 50
	 */
	page_size?: number;

	/**
	 * Type
	 * Transaction type. You can specify the event types as an array. `all` returns all transaction types.
	 */
	type: ('transfer' | 'mint' | 'burn' | 'sale' | 'all')[];

	/**
	 * Continuation
	 * Continuation. Pass this value from the previous response to fetch the next page.
	 */
	continuation?: string;

	/** Contract Address */
	contractAddress: string;

	/** Token Id */
	tokenId: string;
}

export interface TransactionsByContractV0TransactionsNftsContractAddressGetParams {
	/**
	 * Chain
	 * Blockchain from which to query NFT transactions.
	 */
	chain: 'ethereum';

	/**
	 * Page Size
	 * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
	 * @min 1
	 * @max 50
	 */
	page_size?: number;

	/**
	 * Type
	 * Transaction type. You can specify the event types as an array. `all` returns all transaction types.
	 */
	type: ('transfer' | 'mint' | 'burn' | 'sale' | 'all')[];

	/**
	 * Continuation
	 * Continuation. Pass this value from the previous response to fetch the next page.
	 */
	continuation?: string;

	/** Contract Address */
	contractAddress: string;
}

export interface TransactionsV0TransactionsGetParams {
	/**
	 * Chain
	 * Blockchain from which to query NFT transactions.
	 */
	chain: 'ethereum';

	/**
	 * From Block
	 * Block filter: returns transactions from this block or later.
	 * @min 0
	 */
	from_block?: number;

	/**
	 * To Block
	 * Block filter: returns transactions up to and including this block.
	 * @min 0
	 */
	to_block?: number;

	/**
	 * Page Size
	 * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
	 * @min 1
	 * @max 50
	 */
	page_size?: number;

	/**
	 * Type
	 * Transaction type. You can specify the event types as an array. `all` returns all transaction types.
	 */
	type: ('transfer' | 'mint' | 'burn' | 'sale' | 'all')[];

	/**
	 * Continuation
	 * Continuation. Pass this value from the previous response to fetch the next page.
	 */
	continuation?: string;
}

export interface CollectionStatsV0TransactionsStatsContractAddressGetParams {
	/**
	 * Chain
	 * Blockchain where the collection has been minted.
	 */
	chain: 'ethereum' | 'polygon';

	/** Contract Address */
	contractAddress: string;
}

export interface GetDeployedContractV0ContractsTransactionHashGetParams {
	/**
	 * Chain
	 * Blockchain where the contract has been deployed to.
	 */
	chain: 'polygon' | 'rinkeby' | 'ethereum';

	/** Transaction Hash */
	transactionHash: string;
}

export interface EasyMintNftWithUploadV0MintsEasyFilesPostParams {
	/**
	 * Chain
	 * Blockchain to mint the NFT on.
	 */
	chain: 'polygon' | 'rinkeby';

	/**
	 * Name
	 * Name of the NFT.
	 */
	name: string;

	/**
	 * Description
	 * Text description of the NFT which will be seen on NFT marketplaces, etc.
	 */
	description: string;

	/**
	 * Mint To Address
	 * Account address where the NFT will be sent. For example, your Metamask wallet address if you wish to send it to yourself.
	 */
	mint_to_address: string;
}

export interface GetMintedNftV0MintsTransactionHashGetParams {
	/**
	 * Chain
	 * Blockchain the NFT was minted on.
	 */
	chain: 'polygon' | 'rinkeby';

	/** Transaction Hash */
	transactionHash: string;
}

export interface GetBatchMintedNftV0MintsBatchTransactionHashGetParams {
	/**
	 * Chain
	 * Blockchain the NFT was minted on.
	 */
	chain: 'polygon' | 'rinkeby';

	/** Transaction Hash */
	transactionHash: string;
}

export interface GetUserContractsAbisV0MeContractsAbisContractAddressGetParams {
	/**
	 * Chain
	 * Blockchain where the contract has been deployed to.
	 */
	chain: 'polygon' | 'rinkeby' | 'ethereum';

	/** Contract Address */
	contractAddress: string;
}

export interface GetUserContractsCollectionV0MeContractsCollectionsGetParams {
	/**
	 * Chain
	 * Blockchain where the contracts have been deployed to.
	 */
	chain: 'polygon' | 'rinkeby' | 'ethereum';

	/** Include optional data in the response. ```merkle_proofs``` includes Merkle proofs of all the whitelisted addresses in the contract. */
	include?: UserProfileContractsCollectionsInclude[];
}

export interface GetUserMintedNftsV0MeMintsGetParams {
	/**
	 * Chain
	 * Blockchain where the NFTs have been minted.
	 */
	chain?: 'polygon' | 'rinkeby';

	/**
	 * Page Number
	 * The page number of the results to return. The first page is 1.
	 * @min 1
	 */
	page_number?: number;

	/**
	 * Page Size
	 * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
	 * @min 1
	 * @max 50
	 */
	page_size?: number;
}

export interface GetUserStorageV0MeStorageGetParams {
	/** Type of storage. */
	type: StorageRequestType[];

	/**
	 * Page Number
	 * The page number of the results to return. The first page is 1.
	 * @min 1
	 */
	page_number?: number;

	/**
	 * Page Size
	 * The number of results returned per page. Limit can range between 1 and 500, and the default is 50.
	 * @min 1
	 * @max 500
	 */
	page_size?: number;

	/**
	 * Start Date
	 * Data uploaded to IPFS after this date (ISO) will be in the repsonse. Eg: 2022-02-24T11:30:48.
	 */
	start_date?: string;

	/**
	 * End Date
	 * Data uploaded to IPFS till this date (ISO) will be in the repsonse. Eg: 2022-03-19T19:45:48.
	 */
	end_date?: string;
}

export interface TextSearchV0SearchGetParams {
	/**
	 * Text
	 * Search query.
	 */
	text: string;

	/**
	 * Chain
	 * Blockchain from which to query NFTs.
	 */
	chain?: 'polygon' | 'ethereum' | 'all';

	/**
	 * Page Number
	 * The page number of the results to return. The first page is 1.
	 * @min 1
	 */
	page_number?: number;

	/**
	 * Page Size
	 * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
	 * @min 1
	 * @max 50
	 */
	page_size?: number;

	/** Results ordering criteria. Deafult ordering criteria is search relevance. */
	order_by?: TextSearchRequestOrder;

	/** Results will be sorted in this order (ascending/descending). */
	sort_order?: TextSearchRequestSortOrder;

	/**
	 * Filter By Contract Address
	 * Results will only include NFTs from this contract address.
	 */
	filter_by_contract_address?: string;
}

export interface SearchFileV0RecommendationsSimilarNftsFilesPostParams {
	/**
	 * Page Number
	 * The page number of the results to return. The first page is 1.
	 * @min 1
	 */
	page_number?: number;

	/**
	 * Page Size
	 * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
	 * @min 1
	 * @max 50
	 */
	page_size?: number;
}

export interface SimilarNftsV0DuplicatesFilesPostParams {
	/**
	 * Page Number
	 * The page number of the results to return. The first page is 1.
	 * @min 1
	 */
	page_number?: number;

	/**
	 * Page Size
	 * The number of results returned per page. Limit can range between 1 and 50, and the default is 50.
	 * @min 1
	 * @max 50
	 */
	page_size?: number;

	/**
	 * Threshold
	 * Threshold for classifying an NFT as a counterfeit.
	 * @min 0.1
	 * @max 1
	 */
	threshold?: number;

	/**
	 * Filter Out Contract Address
	 * NFTs from this contract address will be filtered out. Useful for examples where the whole NFT collection is visually very similar e.g. CryptoPunks.
	 */
	filter_out_contract_address?: string;
}

export namespace V0 {
	/**
	 * @description Returns all ERC721 and ERC1155 NFTs that have been minted on a given chain. Can be set to ```include``` the NFT ```metadata```, ```file_information```,  ```contract_infomation``` and ```all``` which includes full details like in [Retrieve NFT details](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTM-retrieve-nft-details). Ethereum and Polygon are supported. **You have access to NFTs no older than 90 days. For full access see [pricing](https://www.nftport.xyz/pricing).** #### Useful for: * Big data analysis or analytics with all the NFTs. * Keeping track of all the created NFTs. * Importing all NFTs to your application. #### Related: * To get all NFTs per contract, see [Retrieve contract NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTQ-retrieve-contract-nf-ts). * To get detailed information on the returned NFTs, see [Retrieve NFT details](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTM-retrieve-nft-details).
	 * @tags Contracts, Metadata & Assets
	 * @name NftsV0NftsGet
	 * @summary Retrieve all NFTs
	 * @request GET:/v0/nfts
	 * @secure
	 */
	export namespace NftsV0NftsGet {
		export type RequestParams = {};
		export type RequestQuery = {
			chain: NftsRequestSupportedChain;
			page_size?: number;
			continuation?: string;
			include?: GetNftsRequestInclude[];
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = NftsResponse;
	}
	/**
	 * @description Returns details for a given NFT. These include ```metadata_url```, ```metadata``` such as name, description, attributes, etc., ```image_url```, ```cached_image_url``` and ```mint_date```. Ethereum and Polygon are supported. #### Useful for: * For easily getting all the necessary information about a given NFT. #### Related: * To get all NFTs per contract, see [Retrieve contract NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTQ-retrieve-contract-nf-ts). * To get NFTs that a given account owns, see [Retrieve NFTs owned by an account](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzM-retrieve-nf-ts-owned-by-an-account).
	 * @tags Contracts, Metadata & Assets
	 * @name NftDetailsV0NftsContractAddressTokenIdGet
	 * @summary Retrieve NFT details
	 * @request GET:/v0/nfts/{contract_address}/{token_id}
	 * @secure
	 */
	export namespace NftDetailsV0NftsContractAddressTokenIdGet {
		export type RequestParams = { contractAddress: string; tokenId: string };
		export type RequestQuery = { chain: NftsRequestSupportedChain; refresh_metadata?: boolean };
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = NftDetailsResponse;
	}
	/**
	 * @description Returns all NFTs for a given contract address. Can be set to ```include``` the NFT ```metadata``` or ```all``` which returns extra information. Ethereum and Polygon are supported. #### Useful for: * Importing all NFTs from a given contract to your application. #### Related: * To get detailed information on the returned NFTs, see [Retrieve NFT details](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTM-retrieve-nft-details). * To get NFTs that a given account owns, see [Retrieve NFTs owned by an account](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzM-retrieve-nf-ts-owned-by-an-account).
	 * @tags Contracts, Metadata & Assets
	 * @name NftsByContractV0NftsContractAddressGet
	 * @summary Retrieve contract NFTs
	 * @request GET:/v0/nfts/{contract_address}
	 * @secure
	 */
	export namespace NftsByContractV0NftsContractAddressGet {
		export type RequestParams = { contractAddress: string };
		export type RequestQuery = {
			chain: NftsRequestSupportedChain;
			page_number?: number;
			page_size?: number;
			include?: GetContractNftsRequestInclude;
			refresh_metadata?: boolean;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = ContractNftsResponse;
	}
	/**
	 * @description Returns NFTs owned by a given account (i.e. wallet) address. Can also return each NFT metadata with  ```include```  parameter. #### Useful for: * For checking if a user owns a specific NFT and then unlocking specific activity. * Adding NFT portfolio section to your apps. #### Related: * To get all NFTs per contract, see [Retrieve contract NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTQ-retrieve-contract-nf-ts). * To get extra detailed information on the returned NFTs, see [Retrieve NFT details](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTM-retrieve-nft-details).
	 * @tags Ownership
	 * @name AccountNftsV0AccountsAccountAddressGet
	 * @summary Retrieve NFTs owned by an account
	 * @request GET:/v0/accounts/{account_address}
	 * @secure
	 */
	export namespace AccountNftsV0AccountsAccountAddressGet {
		export type RequestParams = { accountAddress: string };
		export type RequestQuery = {
			chain: AccountRequestSupportedChain;
			page_number?: number;
			page_size?: number;
			continuation?: string;
			include?: AccountRequestInclude[];
			exclude?: AccountRequestExclude[];
			contract_address?: string;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = AccountNftsResponse;
	}
	/**
	 * @description Returns NFTs created (i.e. minted) by a given account (i.e. wallet) address. Can also return each NFT metadata with `include` parameter. Ethereum mainnet is supported. #### Useful for: * For displaying NFTs created by an account. * Doing analytics on creator's portfolio. #### Related: * To get NFTs that a given account owns, see [Retrieve NFTs owned by an account](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzM-retrieve-nf-ts-owned-by-an-account). * To get all NFTs per contract, see [Retrieve contract NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTQ-retrieve-contract-nf-ts). * To get extra detailed information on the returned NFTs, see [Retrieve NFT details](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTM-retrieve-nft-details).
	 * @tags Ownership
	 * @name CreatorNftsV0AccountsCreatorsAccountAddressGet
	 * @summary Retrieve NFTs created by an account
	 * @request GET:/v0/accounts/creators/{account_address}
	 * @secure
	 */
	export namespace CreatorNftsV0AccountsCreatorsAccountAddressGet {
		export type RequestParams = { accountAddress: string };
		export type RequestQuery = {
			chain: 'ethereum';
			page_size?: number;
			continuation?: string;
			include?: AccountRequestInclude;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = CreatorNftsResponse;
	}
	/**
	 * @description Returns a list of contracts (i.e. collections) where the given account (wallet) address owns at least one NFT. #### Useful for: * Showing the user a list of contracts in which they own NFTs. * Checking if a user owns an NFT in a specific contract and then unlocking some experience for them (token-gating). #### Related: * To get a list of all NFTs owned by this account, see [Retrieve NFTs owned by account](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzM-retrieve-nf-ts-owned-by-an-account). * To get extra detailed information on the returned NFTs, see [Retrieve NFT details](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTM-retrieve-nft-details).
	 * @tags Ownership
	 * @name AccountContractsV0AccountsContractsAccountAddressGet
	 * @summary Retrieve contracts owned by an account
	 * @request GET:/v0/accounts/contracts/{account_address}
	 * @secure
	 */
	export namespace AccountContractsV0AccountsContractsAccountAddressGet {
		export type RequestParams = { accountAddress: string };
		export type RequestQuery = {
			chain: 'ethereum' | 'rinkeby';
			type: AccountContractsRequestType;
			page_size?: number;
			continuation?: string;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = AccountContractsResponse;
	}
	/**
	 * @description Returns all on-chain transactions for the specified account (i.e. wallet) address. Can be set to `include` transactions such as `mint`, `burn`, `transfer_from`, `transfer_to`, `buy`, `sell`, or `all` which includes all transactions. Ethereum mainnet is supported. #### Useful for: * Tracking all transactions made by an account. * Building analytics and monitoring solutions. #### Related: * To query transactions from a contract, see [Retrieve transactions by contract](https://docs.nftport.xyz/docs/nftport/b3A6MzAxNDQ3NzY-retrieve-transactions-by-contract). * To query transactions for an NFT, see [Retrieve transactions by NFT](https://docs.nftport.xyz/docs/nftport/b3A6MzAxNDQ3NzU-retrieve-transactions-by-nft).
	 * @tags Transactions
	 * @name TransactionsByAccountV0TransactionsAccountsAccountAddressGet
	 * @summary Retrieve transactions by an account
	 * @request GET:/v0/transactions/accounts/{account_address}
	 * @secure
	 */
	export namespace TransactionsByAccountV0TransactionsAccountsAccountAddressGet {
		export type RequestParams = { accountAddress: string };
		export type RequestQuery = {
			chain: 'ethereum';
			page_size?: number;
			type: ('transfer_from' | 'transfer_to' | 'mint' | 'burn' | 'buy' | 'sell' | 'all')[];
			continuation?: string;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = TransactionsByAccountResponse;
	}
	/**
	 * @description Returns all on-chain transactions for the specified NFT token. Can be set to `include` transactions such as `transfer`, `burn`, `mint`, and `sale`, or `all` which includes all transactions. Ethereum mainnet is supported. #### Useful for: * Tracking all transactions of an NFT token. * Building analytics and monitoring solutions. #### Related: * To query transactions from a contract, see [Retrieve transactions by contract](https://docs.nftport.xyz/docs/nftport/b3A6MzAxNDQ3NzY-retrieve-transactions-by-contract). * To query transactions from an account, see [Retrieve transactions by account](https://docs.nftport.xyz/docs/nftport/b3A6MzAxNDQ3NzQ-retrieve-transactions-by-an-account).
	 * @tags Transactions
	 * @name TransactionsByTokenV0TransactionsNftsContractAddressTokenIdGet
	 * @summary Retrieve transactions by NFT
	 * @request GET:/v0/transactions/nfts/{contract_address}/{token_id}
	 * @secure
	 */
	export namespace TransactionsByTokenV0TransactionsNftsContractAddressTokenIdGet {
		export type RequestParams = { contractAddress: string; tokenId: string };
		export type RequestQuery = {
			chain: 'ethereum';
			page_size?: number;
			type: ('transfer' | 'mint' | 'burn' | 'sale' | 'all')[];
			continuation?: string;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = TransactionsByTokenResponse;
	}
	/**
	 * @description Returns all on-chain transactions for the specified contract. Can be set to `include` transactions such as `transfer`, `burn`, `mint`, and `sale`, or `all` which includes all transactions. Ethereum mainnet is supported. #### Useful for: * Tracking all transactions of all NFT tokens in a contract. * Building analytics and monitoring solutions. #### Related: * To query sales statistics of an NFT collection, see [Retrieve contract sales statistics](https://docs.nftport.xyz/docs/nftport/b3A6MzEyODQ1MTc-retrieve-contract-sales-statistics). * To query transactions for an NFT, see [Retrieve transactions by NFT](https://docs.nftport.xyz/docs/nftport/b3A6MzAxNDQ3NzU-retrieve-transactions-by-nft). * To query transactions from an account, see [Retrieve transactions by account](https://docs.nftport.xyz/docs/nftport/b3A6MzAxNDQ3NzQ-retrieve-transactions-by-an-account).
	 * @tags Transactions
	 * @name TransactionsByContractV0TransactionsNftsContractAddressGet
	 * @summary Retrieve transactions by contract
	 * @request GET:/v0/transactions/nfts/{contract_address}
	 * @secure
	 */
	export namespace TransactionsByContractV0TransactionsNftsContractAddressGet {
		export type RequestParams = { contractAddress: string };
		export type RequestQuery = {
			chain: 'ethereum';
			page_size?: number;
			type: ('transfer' | 'mint' | 'burn' | 'sale' | 'all')[];
			continuation?: string;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = TransactionsByContractResponse;
	}
	/**
	 * @description Returns all on-chain transactions for the whole chain. Can be set to `include` transactions such as `transfer`, `mint`, `burn`, `sale` or `all` which includes all transactions. Ethereum mainnet is supported. #### Useful for: * Tracking all transactions on a chain. * Building analytics and monitoring solutions. #### Related: * To query transactions from a contract, see [Retrieve transactions by contract](https://docs.nftport.xyz/docs/nftport/b3A6MzAxNDQ3NzY-retrieve-transactions-by-contract). * To query transactions for an NFT, see [Retrieve transactions by NFT](https://docs.nftport.xyz/docs/nftport/b3A6MzAxNDQ3NzU-retrieve-transactions-by-nft).
	 * @tags Transactions
	 * @name TransactionsV0TransactionsGet
	 * @summary Retrieve all transactions
	 * @request GET:/v0/transactions
	 * @secure
	 */
	export namespace TransactionsV0TransactionsGet {
		export type RequestParams = {};
		export type RequestQuery = {
			chain: 'ethereum';
			from_block?: number;
			to_block?: number;
			page_size?: number;
			type: ('transfer' | 'mint' | 'burn' | 'sale' | 'all')[];
			continuation?: string;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = TransactionsResponse;
	}
	/**
	 * @description Retrieve in-depth sales statistics about a contract from OpenSea. Includes statistics such as floor price, total volume, sales, etc. Updated with 1-hour interval. #### Useful for: * Analysis and ranking of NFT collections. * Tracking NFT collections by sales, etc. #### Related: * To query transactions from a contract, see [Retrieve transactions by contract](https://docs.nftport.xyz/docs/nftport/b3A6MzAxNDQ3NzY-retrieve-transactions-by-contract). * To get all NFTs of a contract, see [Retrieve contract NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTQ-retrieve-contract-nf-ts).
	 * @tags Transactions
	 * @name CollectionStatsV0TransactionsStatsContractAddressGet
	 * @summary Retrieve contract sales statistics
	 * @request GET:/v0/transactions/stats/{contract_address}
	 * @secure
	 */
	export namespace CollectionStatsV0TransactionsStatsContractAddressGet {
		export type RequestParams = { contractAddress: string };
		export type RequestQuery = { chain: 'ethereum' | 'polygon' };
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = CollectionStatsResponse;
	}
	/**
	 * @description Get reports such as: * High-level statistics about URIs linked by NFTs metadata. Currently supported URIs are: metadata, image and animation. Ethereum is supported.
	 * @tags Reports
	 * @name ReportsV0ReportsReportTypeGet
	 * @summary Retrieve reports on NFTs data
	 * @request GET:/v0/reports/{report_type}
	 * @secure
	 */
	export namespace ReportsV0ReportsReportTypeGet {
		export type RequestParams = { reportType: ReportTypes };
		export type RequestQuery = {};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = ReportURIResponse;
	}
	/**
	 * @description Updates a contract which has been previously deployed with [Deploy a contract for NFT products](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzU-deploy-an-nft-contract). You can freeze the metadata of the NFTs minted in the specified contract which means they can not be updated after minting (token URIs are frozen on the contract level). #### Useful for: * Creating dynamic NFTs (NFTs that change after minting based on events) and freezing them afterwards. * Revealing NFTs after a drop and freezing them afterwards. #### Related: * If you wish to list all your previously deployed contracts, see [List all your deployed contracts](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODE-list-all-your-deployed-contracts).
	 * @tags Product contracts
	 * @name UpdateContractV0ContractsPut
	 * @summary Update a deployed contract for NFT products
	 * @request PUT:/v0/contracts
	 * @secure
	 */
	export namespace UpdateContractV0ContractsPut {
		export type RequestParams = {};
		export type RequestQuery = {};
		export type RequestBody = UpdateContractRequest;
		export type RequestHeaders = {};
		export type ResponseBody = UpdateContractResponse;
	}
	/**
	 * @description Deploys an [```ERC-721```](https://github.com/nftport/solidity-contracts/blob/master/contracts/ERC721NftCustom.sol) or [```ERC-1155```](https://github.com/nftport/solidity-contracts/blob/master/contracts/ERC1155NftCustom.sol) smart contract where your can mint your NFTs on-demand. The supply of NFTs is not fixed; more can be minted into this contract at any point in the future. This is a required step if you wish to use [Customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting) as your NFTs will be minted into this contract. As blockchains can take a few seconds up to a few minutes to sync, then after contract deployment, you can use the returned ```transaction_hash``` in [Retrieve a deployed contract](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4OTk-retrieve-a-deployed-contract) to get the ```contract_address```. **You can deploy up to 5 contracts for free per chain. For higher limits, see [pricing](https://www.nftport.xyz/pricing).** #### Useful for: * Deploying your own contracts so you easily can build custom products. #### Related: * To get the deployed contract address, use [Retrieve a deployed contract](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4OTk-retrieve-a-deployed-contract). * If you want to know how to use the customizable minting, see [Customizable Minting Quickstart](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#customizable-minting). * To understand the difference between NFT product contracts and NFT collection contracts, see [Contract comparison](https://docs.nftport.xyz/docs/nftport/ZG9jOjQ2NDA5NTU5-contract-comparison). Read how **royalties** work [here](https://docs.nftport.xyz/docs/nftport/ZG9jOjQ1ODQ4NzQ5-royalties).
	 * @tags Product contracts
	 * @name DeployContractV0ContractsPost
	 * @summary Deploy a contract for NFT products
	 * @request POST:/v0/contracts
	 * @secure
	 */
	export namespace DeployContractV0ContractsPost {
		export type RequestParams = {};
		export type RequestQuery = {};
		export type RequestBody = DeployContractRequestWithAddress;
		export type RequestHeaders = {};
		export type ResponseBody = DeployContractResponse;
	}
	/**
	 * @description Updates a collection contract which has been previously deployed with [Deploy an NFT collection contract](https://docs.nftport.xyz/docs/nftport/b3A6Mzk2MjA1MzQ-deploy-an-nft-collection-contract). You can change the reveal dates, metadata location, presale time and whitelist, or royalty details. You can also freeze the metadata of the NFTs minted in the specified contract so metadata cannot be updated any more (token URIs are frozen on the contract level). **Ethereum contract updates are available only on the Growth tier and you will be charged immediately on request and if the transaction fails for any reason the amount will be refunded. For higher limits, see [pricing](https://www.nftport.xyz/pricing).** #### Useful for: * Revealing NFTs at a specified time and freezing them afterwards. * Allowing a limited group of people to mint NFTs during a presale period. * Changing royalty amount and recipient. #### Related: * If you wish to list all your previously deployed collection contracts, see [List all your deployed collection contracts](https://docs.nftport.xyz/docs/nftport/b3A6NDE1MTQ2MzI-list-all-your-deployed-collection-contracts).
	 * @tags Collection contracts
	 * @name UpdateContractCollectionV0ContractsCollectionsPut
	 * @summary Update a deployed collection contract
	 * @request PUT:/v0/contracts/collections
	 * @secure
	 */
	export namespace UpdateContractCollectionV0ContractsCollectionsPut {
		export type RequestParams = {};
		export type RequestQuery = {};
		export type RequestBody = UpdateContractCollectionsRequest;
		export type RequestHeaders = {};
		export type ResponseBody = UpdateContractCollectionsResponse;
	}
	/**
	 * @description Deploys a [fixed-supply ERC-721 smart contract](https://github.com/nftport/solidity-contracts/blob/master/contracts/collection/templates/NFTCollection.sol), commonly used for launching NFT collections. As blockchains can take a few seconds up to a few minutes to sync, then after contract deployment, you can use the returned ```transaction_hash``` in [Retrieve a deployed contract](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4OTk-retrieve-a-deployed-contract) to get the ```contract_address```. **You can deploy up to 5 contracts for free on each of Polygon and Rinkeby, and ```max_supply``` is limited to less than or equal to 5,000 NFTs for collection contracts deployed on the Free plan. Ethereum contract deployments are available only on the Growth tier and you will be charged immediately on request and if the transaction fails for any reason the amount will be refunded. For details and limits, see [pricing](https://www.nftport.xyz/pricing).** #### Useful for: * Launching an NFT collection (e.g. a 10,000 profile pictures collection) with a minting website. **See our [tutorial](https://docs.nftport.xyz/docs/nftport/ZG9jOjQ0MDgxNDc3-how-to-create-an-nft-collection-contract) to learn how to create an NFT contract collection and make a website to allows users to mint.** #### Related: * To get the deployed contract address, use [Retrieve a deployed contract](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4OTk-retrieve-a-deployed-contract). * If you wish to list all your previously deployed collection contracts, see [List all your deployed collection contracts](https://docs.nftport.xyz/docs/nftport/b3A6NDE1MTQ2MzI-list-all-your-deployed-collection-contracts). * The contract ABI can be fetched using the [Get contract ABI](https://docs.nftport.xyz/docs/nftport/b3A6NjM3MjE5ODE-get-contract-abi) endpoing. Read how **royalties** work [here](https://docs.nftport.xyz/docs/nftport/ZG9jOjQ1ODQ4NzQ5-royalties).
	 * @tags Collection contracts
	 * @name DeployContractCollectionV0ContractsCollectionsPost
	 * @summary Deploy an NFT collection contract
	 * @request POST:/v0/contracts/collections
	 * @secure
	 */
	export namespace DeployContractCollectionV0ContractsCollectionsPost {
		export type RequestParams = {};
		export type RequestQuery = {};
		export type RequestBody = DeployContractCollectionsRequest;
		export type RequestHeaders = {};
		export type ResponseBody = DeployContractCollectionsResponse;
	}
	/**
	 * @description Returns the details of a contract that has previously been deployed with [Deploy a contract for NFT products](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzU-deploy-an-nft-contract) or [Deploy an NFT collection contract](https://docs.nftport.xyz/docs/nftport/b3A6Mzk2MjA1MzQ-deploy-an-nft-collection-contract). Supply the ```transaction_hash``` to check if the contract is on chain and to get the ```contract_address```. For NFT product contracts, you can use the returned ```contract_address``` in [Customizable Minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting). As blockchains can take a few seconds up to a few minutes to sync, this endpoint can be polled until the ```contract_address``` is returned. #### Useful for: * Deploying your own contracts so you can build custom products or collections easily. #### Related: * If you want to get data about NFT contracts which you haven't deployed using NFTPort, see [Retrieve contract NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTQ-retrieve-contract-nf-ts). * If you want to learn how to use the [customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting), see [Customizable Minting Quickstart](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#customizable-minting).
	 * @tags
	 * @name GetDeployedContractV0ContractsTransactionHashGet
	 * @summary Retrieve a deployed contract
	 * @request GET:/v0/contracts/{transaction_hash}
	 * @secure
	 */
	export namespace GetDeployedContractV0ContractsTransactionHashGet {
		export type RequestParams = { transactionHash: string };
		export type RequestQuery = { chain: 'polygon' | 'rinkeby' | 'ethereum' };
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = GetDeployedContractResponse;
	}
	/**
	 * @description Uploads a file to [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/) which makes your NFT storage easy. You can use the returned  ```ipfs_url```  with [Upload metadata to IPFS](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzc-upload-metadata-to-ipfs) to mint your NFT. If you prefer hosting files in your own servers, you can skip this step. Otherwise, we recommend using IPFS because it's an industry standard for decentralized storage and guarantees the immutability of your files. We use [nft.storage](https://nft.storage/) to [pin](https://docs.ipfs.io/how-to/pin-files/) the files with Filecoin, which ensures that your important data is retained in IPFS. **Supports all file types and maximum file size is 20MB. For higher limits, see [pricing](https://www.nftport.xyz/pricing).** #### Useful for: * Storing your NFT files easily and according to the industry standards. #### Related: * To see all your previous IPFS uploads, see [List all your IPFS uploads](https://docs.nftport.xyz/docs/nftport/b3A6NDQ1MDU3MzI-list-all-your-ipfs-uploads). * After uploading files, use [Upload metadata to IPFS](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzc-upload-metadata-to-ipfs) to continue with your NFT minting. * If you want to learn how to use the [customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting), see [Customizable Minting Quickstart](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#customizable-minting). #### Example Requests in cURL, Python & JS <!-- title: "Make sure to replace the parameters with your own values" lineNumbers: true --> ```shell curl --request POST \ --url 'https://api.nftport.xyz/v0/files' \ --header 'Authorization: API Key Here' \ --header 'Content-Type: multipart/form-data' \ --form 'file=@/path/to/file_to_upload.png;type=image/png' ``` ```python import requests file = open("image.png", "rb") response = requests.post( "https://api.nftport.xyz/v0/files", headers={"Authorization": 'API-Key-Here'}, files={"file": file} ) ``` ```javascript const fs = require('fs'); const fetch = require('node-fetch'); const FormData = require('form-data'); const form = new FormData(); const fileStream = fs.createReadStream('image.jpg'); form.append('file', fileStream); const options = { method: 'POST', body: form, headers: { "Authorization": "API-Key-Here", }, }; fetch("https://api.nftport.xyz/v0/files", options) .then(response => { return response.json() }) .then(responseJson => { // Handle the response console.log(responseJson); }) ```
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
	 * @description Uploads NFT metadata to [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/) as a JSON file which is the standard format for  [NFT metadata](https://nftschool.dev/reference/metadata-schemas/#intro-to-json-schemas). You can use the returned ```metadata_ipfs_uri``` in [Customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting) to mint your NFT. If you prefer hosting metadata in your own servers, you can skip this step. Otherwise, we recommend using IPFS because it’s an industry standard for decentralized storage and guarantees the immutability of your metadata. For the ```file_url```, we also recommend using IPFS with [Upload a file to IPFS](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzY-upload-a-file-to-ipfs). We use [nft.storage](https://nft.storage/) to [pin](https://docs.ipfs.io/how-to/pin-files/) the files with Filecoin, which ensures that your important data is retained in IPFS. #### Useful for: * Storing your NFT metadata easily and according to the industry standards. #### Related: * To see all your previous IPFS uploads, see [List all your IPFS uploads](https://docs.nftport.xyz/docs/nftport/b3A6NDQ1MDU3MzI-list-all-your-ipfs-uploads). * After uploading your metadata, use [Customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting) to continue with your NFT minting. * If you are new to NFT metadata, see the [basics on it](https://nftschool.dev/reference/metadata-schemas/).
	 * @tags Storage
	 * @name IpfsUploadMetadataV0MetadataPost
	 * @summary Upload metadata to IPFS
	 * @request POST:/v0/metadata
	 * @secure
	 */
	export namespace IpfsUploadMetadataV0MetadataPost {
		export type RequestParams = {};
		export type RequestQuery = {};
		export type RequestBody = IpfsMetadataUploadRequest;
		export type RequestHeaders = {};
		export type ResponseBody = IpfsMetadataUploadResponse;
	}
	/**
	 * @description Uploads an array of JSON files containing NFT metadata to [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/). The output is an IPFS URI of a directory containing the uploaded JSON files. The IPFS URI of this directory will be used as the `base_uri` in [Collection contract](https://docs.nftport.xyz/docs/nftport/b3A6Mzk2MjA1MzQ-deploy-an-nft-collection-contract). IPFS is an industry standard for decentralized storage and guarantees the immutability of your metadata. For the ```file_url```, we also recommend using IPFS with [Upload a file to IPFS](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzY-upload-a-file-to-ipfs). We use [nft.storage](https://nft.storage/) to [pin](https://docs.ipfs.io/how-to/pin-files/) the files with Filecoin, which ensures that your important data is retained in IPFS. **Supports only files with [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) as application/json.** **Maximum number of files that can be uploaded together is 25,000 and maximum total file size is 50MB** <!-- theme: info --> > ### Note: > * All metadata files must be uploaded at once since IPFS creates a unique immutable hash of all files in the directory. > * To work with [Collection contracts](https://niladri.stoplight.io/docs/test/b3A6Mzk2MjA1MzQ-deploy-an-nft-contract-collection), the filenames should be token IDs starting from 0. > * The file extension will be removed and only the filename will be retained in the IPFS directory (eg: '4521.json' will become '4521' on IPFS). > * All files will be placed at the base of the directory. #### Useful for: * Uploading a directory of metadata files to IPFS. #### Related: * To see all your previous IPFS uploads, see [List all your IPFS uploads](https://docs.nftport.xyz/docs/nftport/b3A6NDQ1MDU3MzI-list-all-your-ipfs-uploads). * If you are new to NFT metadata, see the [basics on it](https://nftschool.dev/reference/metadata-schemas/). ```python title="This script uploads all JSON files in the 'Metadata' directory to IPFS" import requests import os from os import listdir from os.path import join metadata_directory_path = "Metadata" #Replace with your path files = [f for f in listdir(metadata_directory_path) if str(join(metadata_directory_path, f)).endswith('.json')] metadata_files = [] for metadata in files: metadata_files.append( ("metadata_files", open(os.path.join(metadata_directory_path, metadata), "rb"))) response = requests.post( "https://api.nftport.xyz/v0/metadata/directory", headers={"Authorization": "Your-API-Key"}, files=metadata_files ) print(response.json()) ``` ```javascript title="This script uploads all JSON files in the 'Metadata' directory to IPFS" const fs = require('fs'); const path = require('path') const request = require('request'); API_KEY = "YOUR_API_KEY" // Replace with your API key METADATA_DIRECTORY_PATH = "Metadata" // Replace with your path to directory folder containing metadata json files function isJson(filename) { return filename.split('.').pop() === "json" } function getFileStreamForJSONFiles(directory) { const jsonArray = [] fs.readdirSync(directory).forEach(file => { if(!isJson(file)) { return } const fileData = fs.createReadStream(path.join(directory, file)); jsonArray.push(fileData) }); return jsonArray } function sendRequest(metadataFileStreams, apiKey) { const options = { url: 'https://api.nftport.xyz/v0/metadata/directory', headers: { "Authorization": apiKey } } const req = request.post(options, function (err, resp, body) { if (err) { console.error('Error: ' + err); } else { console.log('Response: ' + body); } }); const form = req.form(); metadataFileStreams.forEach(file => { form.append('metadata_files', file); }) } metadataFileStreams = getFileStreamForJSONFiles(METADATA_DIRECTORY_PATH) sendRequest(metadataFileStreams, API_KEY) ```
	 * @tags Storage
	 * @name IpfsUploadMetadataDirectoryV0MetadataDirectoryPost
	 * @summary Upload metadata directory to IPFS
	 * @request POST:/v0/metadata/directory
	 * @secure
	 */
	export namespace IpfsUploadMetadataDirectoryV0MetadataDirectoryPost {
		export type RequestParams = {};
		export type RequestQuery = {};
		export type RequestBody = BodyIpfsUploadMetadataDirectoryV0MetadataDirectoryPost;
		export type RequestHeaders = {};
		export type ResponseBody = IpfsMetadataDirectoryUploadResponse;
	}
	/**
	 * @description Updates an NFT which has been previously minted with [Customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting) or [Batch customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MzIxMzAwOTk-batch-customizable-minting-erc-1155). You can update the metadata URI with a new link or freeze the metadata URI to permanently lock it. The NFT must be minted in your deployed contract and update only works if contract and token are not frozen. 1.  First, you need ```contract_address``` from [Deploy a contract for NFT products](https://nftport.stoplight.io/docs/nftport/b3A6MjE0MDYzNzU-deploy-an-nft-contract) and ```metadata_updatable``` must be set ```true```. 2.  Secondly, you need ```token_id``` from [Customizable minting](https://nftport.stoplight.io/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting) or [Batch customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MzIxMzAwOTk-batch-customizable-minting-erc-1155). 3.  If you only wish to update the metadata URI set a new ```metadata_uri```. If you wish to update metadata URI and freeze both at the same time then set a new ```metadata_uri``` and ```freeze_metadata``` as ```true```. If you only want to freeze existing metadata URI, then set ```freeze_metadata``` as ```true```. #### Useful for: * Creating dynamic NFTs (NFTs that change after minting based on events). * Revealing NFTs after the drop. #### Related: * If you want to learn how to use [customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting), see [Customizable Minting Quickstart](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#customizable-minting). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODI-list-all-your-minted-nf-ts).
	 * @tags Product minting
	 * @name UpdateNftV0MintsCustomizablePut
	 * @summary Update a minted NFT
	 * @request PUT:/v0/mints/customizable
	 * @secure
	 */
	export namespace UpdateNftV0MintsCustomizablePut {
		export type RequestParams = {};
		export type RequestQuery = {};
		export type RequestBody = UpdateNftRequest;
		export type RequestHeaders = {};
		export type ResponseBody = UpdateNftResponse;
	}
	/**
	 * @description Mints an NFT to your previously contract for NFT products. This minting consists of multiple steps and enables you to customize the whole minting flow for your exact needs. 1.  First, you need  ```contract_address```  using [Deploy a contract for NFT products](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzU-deploy-an-nft-contract). 2.  Secondly, you need  ```metadata_uri```  using [Upload metadata to IPFS](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzc-upload-metadata-to-ipfs). After minting, the NFT will appear in the  ```mint_to_address```  wallet. If you minted to your own wallet, you can also see the minted NFT on OpenSea in your profile after a few minutes. **You can mint up to 100 NFTs for free per chain. Maximum supported filesize is 20MB. For higher limits, see [pricing](https://www.nftport.xyz/pricing).** #### Useful for: * Minting to your own product contracts effortlessly. * Creating customizable minting flows which enable to build NFT-based products. #### Related: * If you want to learn how to use [customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting), see [Customizable Minting Quickstart](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#customizable-minting). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODI-list-all-your-minted-nf-ts). * To see all your previous IPFS uploads, see [List all your IPFS uploads](https://docs.nftport.xyz/docs/nftport/b3A6NDQ1MDU3MzI-list-all-your-ipfs-uploads).
	 * @tags Product minting
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
	 * @description Burns an NFT which has been previously minted with [Customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting). Burning an NFT means destroying it by sending it to a null (un-spendable) address. Transactions leading up to the burn will remain on the blockchain. **Note**: Burning is possible only if the token is owned by the contract owner and the token has not been transferred/sold yet. #### Related: * If you want to update a minted NFT, see [Update a minted NFT](https://docs.nftport.xyz/docs/nftport/b3A6MjU2NTIyMTg-update-a-minted-nft). * If you want to burn a batch of NFTs, see [Batch burn minted NFTs]().
	 * @tags Product minting
	 * @name BurnNftV0MintsCustomizableDelete
	 * @summary Burn a minted NFT
	 * @request DELETE:/v0/mints/customizable
	 * @secure
	 */
	export namespace BurnNftV0MintsCustomizableDelete {
		export type RequestParams = {};
		export type RequestQuery = {};
		export type RequestBody = BurnNftRequest;
		export type RequestHeaders = {};
		export type ResponseBody = BurnNftResponse;
	}
	/**
	 * @description Batch mints NFTs to your previously deployed ERC1155 NFT product contract. This minting consists of multiple steps and enables you to customize the whole minting flow for your exact needs. Batch minting allows you to create multiple NFTs with one API call and create more than one of the same token. 1.  First, you need  ```contract_address```  using [Deploy a contract for NFT products](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzU-deploy-an-nft-contract). 2.  Secondly, you need  ```metadata_uri```  using [Upload metadata to IPFS](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzc-upload-metadata-to-ipfs). After minting, the NFTs will appear in the  ```mint_to_address```  wallet. If you minted to your own wallet, you can also see the minted NFTs on OpenSea in your profile after a few minutes. **You can mint up to 100 NFTs for free per chain. Maximum supported filesize is 20MB. For higher limits, see [pricing](https://www.nftport.xyz/pricing).** #### Useful for: * Minting to your own NFT product contracts effortlessly. * Creating customizable minting flows which enable to build NFT-based products. #### Related: * If you want to learn how to use [customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting), see [Customizable Minting Quickstart](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#customizable-minting). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODI-list-all-your-minted-nf-ts). * To see all your previous IPFS uploads, see [List all your IPFS uploads](https://docs.nftport.xyz/docs/nftport/b3A6NDQ1MDU3MzI-list-all-your-ipfs-uploads).
	 * @tags Product batch minting
	 * @name MintBatchNftV0MintsCustomizableBatchPost
	 * @summary Batch customizable minting (ERC1155)
	 * @request POST:/v0/mints/customizable/batch
	 * @secure
	 */
	export namespace MintBatchNftV0MintsCustomizableBatchPost {
		export type RequestParams = {};
		export type RequestQuery = {};
		export type RequestBody = MintBatchNftRequest;
		export type RequestHeaders = {};
		export type ResponseBody = MintBatchResponse;
	}
	/**
	 * @description Burns a batch of NFTs which have been previously minted with [Batch customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MzIxMzAwOTk-batch-customizable-minting-erc-1155). Burning an NFT means destroying it by sending it to a null (un-spendable) address. Transactions leading up to the burn will remain on the blockchain. **Note**: Burning is possible only if the token is owned by the contract owner and the token has not been transferred/sold yet. #### Related: * If you want to update a minted NFT, see [Update a minted NFT](https://docs.nftport.xyz/docs/nftport/b3A6MjU2NTIyMTg-update-a-minted-nft). * If you want to burn a single NFT, see [Burn a minted NFT]().
	 * @tags Product batch minting
	 * @name BurnBatchNftV0MintsCustomizableBatchDelete
	 * @summary Batch burn minted NFTs (ERC1155 only)
	 * @request DELETE:/v0/mints/customizable/batch
	 * @secure
	 */
	export namespace BurnBatchNftV0MintsCustomizableBatchDelete {
		export type RequestParams = {};
		export type RequestQuery = {};
		export type RequestBody = BurnBatchNftRequest;
		export type RequestHeaders = {};
		export type ResponseBody = BurnNftResponse;
	}
	/**
	 * @description Transfers an NFT which has been previously minted with [Customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting) to another wallet address. **Note**: Transferring is possible only if the token is owned by the contract owner and the token has not been transferred/sold yet. #### Related: * If you want to update a minted NFT, see [Update a minted NFT](https://docs.nftport.xyz/docs/nftport/b3A6MjU2NTIyMTg-update-a-minted-nft). * If you want to transfer a batch of NFTs, see [Batch transfer minted NFTs]().
	 * @tags Product minting
	 * @name TransferNftV0MintsTransfersPost
	 * @summary Transfer a minted NFT
	 * @request POST:/v0/mints/transfers
	 * @secure
	 */
	export namespace TransferNftV0MintsTransfersPost {
		export type RequestParams = {};
		export type RequestQuery = {};
		export type RequestBody = TransferNftRequest;
		export type RequestHeaders = {};
		export type ResponseBody = TransferNftResponse;
	}
	/**
	 * @description Transfers a batch of NFTs which have been previously minted with [Batch customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MzIxMzAwOTk-batch-customizable-minting-erc-1155) to other wallet addresses. **Note**: Transferring is possible only if the token is owned by the contract owner and the token has not been transferred/sold yet. #### Related: * If you want to update a minted NFT, see [Update a minted NFT](https://docs.nftport.xyz/docs/nftport/b3A6MjU2NTIyMTg-update-a-minted-nft). * If you want to transfer a single NFTs, see [Transfer a minted NFT]().
	 * @tags Product batch minting
	 * @name TransferBatchNftV0MintsTransfersBatchPost
	 * @summary Batch transfer minted NFTs (ERC1155 only)
	 * @request POST:/v0/mints/transfers/batch
	 * @secure
	 */
	export namespace TransferBatchNftV0MintsTransfersBatchPost {
		export type RequestParams = {};
		export type RequestQuery = {};
		export type RequestBody = TransferBatchNftRequest;
		export type RequestHeaders = {};
		export type ResponseBody = TransferNftResponse;
	}
	/**
	 * @description With Easy mint, you can turn anything into an NFT in less than 5 minutes using one simple API call. If you are new to minting, see  [Easy minting quickstart](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#easy-minting). After minting, the NFT will appear in the  ```mint_to_address```  wallet. If you minted to your own wallet, you can also see the minted NFT on OpenSea in your profile after a few minutes. **You can mint up to 100 NFTs for free per chain. Maximum supported file size is 20MB. For higher limits, see [pricing](https://www.nftport.xyz/pricing).** #### Useful for: * For turning anything into an NFT effortlessly. For all the benefits, see  [Your New Minting Superpowers](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#what-you-can-do-with-your-new-minting-superpowers). #### Related: * If you wish to customize the minting process e.g. use your own contract, see  [Customizable minting](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#advanced-minting-apis). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODI-list-all-your-minted-nf-ts).
	 * @tags Easy minting
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
	 * @description With Easy mint, you can turn anything into an NFT in less than 5 minutes using one simple API call. If you are new to minting, see  [Easy minting quickstart](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#easy-minting). After minting, the NFT will appear in the  ```mint_to_address```  wallet. If you minted to your own wallet, you can also see the minted NFT on OpenSea in your profile after a few minutes. **You can mint up to 100 NFTs for free per chain. Maximum supported file size is 20MB. For higher limits, see [pricing](https://www.nftport.xyz/pricing).** #### Useful for: * For turning anything into an NFT effortlessly. For all the benefits, see  [Your New Minting Superpowers](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#what-you-can-do-with-your-new-minting-superpowers). #### Related: * If you wish to customize the minting process e.g. use your own contract, see  [Customizable minting](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#advanced-minting-apis). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODI-list-all-your-minted-nf-ts). #### Example Requests in cURL, Python & JS <!-- title: "Make sure to replace the parameters with your own values" lineNumbers: true --> ```shell curl --request POST \ --url 'https://api.nftport.xyz/v0/mints/easy/files?chain=polygon&name=NFT_Name&description=NFT_Description&mint_to_address=0x...' \ --header 'Authorization: API Key Here' \ --header 'Content-Type: multipart/form-data' \ --form 'file=@/path/to/file_to_upload.png;type=image/png' ``` ```python import requests file = open("image.png", "rb") query_params = { "chain": "polygon", "name": "NFT_Name", "description": "NFT_Description", "mint_to_address": Wallet_Address } response = requests.post( "https://api.nftport.xyz/v0/mints/easy/files", headers={"Authorization": "API-Key-Here"}, params=query_params, files={"file": file} ) ``` ```javascript const fs = require('fs'); const fetch = require('node-fetch'); const FormData = require('form-data'); const form = new FormData(); const fileStream = fs.createReadStream('/path/to/file_to_upload.png'); form.append('file', fileStream); const options = { method: 'POST', body: form, headers: { "Authorization": "API-Key-Here", }, }; fetch("https://api.nftport.xyz/v0/mints/easy/files?" + new URLSearchParams({ chain: 'polygon', name: "NFT_Name", description: "NFT_Description", mint_to_address: "Wallet_Address", }), options) .then(function(response) { return response.json() }) .then(function(responseJson) { // Handle the response console.log(responseJson); }) ```
	 * @tags Easy minting
	 * @name EasyMintNftWithUploadV0MintsEasyFilesPost
	 * @summary Easy minting w/file upload
	 * @request POST:/v0/mints/easy/files
	 * @secure
	 */
	export namespace EasyMintNftWithUploadV0MintsEasyFilesPost {
		export type RequestParams = {};
		export type RequestQuery = {
			chain: 'polygon' | 'rinkeby';
			name: string;
			description: string;
			mint_to_address: string;
		};
		export type RequestBody = BodyEasyMintNftWithUploadV0MintsEasyFilesPost;
		export type RequestHeaders = {};
		export type ResponseBody = MintNftWithUploadResponse;
	}
	/**
	 * @description Returns the details of a minted NFT. You need to provide  ```transaction_hash```  which is returned from [Easy minting w/URL](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDM-easy-minting-w-url), [Easy minting w/file upload](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDQ-easy-minting-w-file-upload) or [Customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting). Minting is not instantaneous because blockchains take time to verify transactions. Thus, you can poll this endpoint every 5 seconds until you get a response. #### Useful for: * Confirming that NFT minting was successful and the NFT is on chain. #### Related: * For easy minting, see [Easy minting w/URL](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDM-easy-minting-w-url) or [Easy minting w/file upload](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDQ-easy-minting-w-file-upload). * For customizable minting, see [Customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODI-list-all-your-minted-nf-ts). * To see all your previous IPFS uploads, see [List all your IPFS uploads](https://docs.nftport.xyz/docs/nftport/b3A6NDQ1MDU3MzI-list-all-your-ipfs-uploads).
	 * @tags
	 * @name GetMintedNftV0MintsTransactionHashGet
	 * @summary Retrieve a minted NFT
	 * @request GET:/v0/mints/{transaction_hash}
	 * @secure
	 */
	export namespace GetMintedNftV0MintsTransactionHashGet {
		export type RequestParams = { transactionHash: string };
		export type RequestQuery = { chain: 'polygon' | 'rinkeby' };
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = GetMintedNftResponse;
	}
	/**
	 * @description Returns the details of a batch minted NFTs for ERC1155 contracts. You need to provide  ```transaction_hash```  which is returned from [Batch customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MzIxMzAwOTk-batch-customizable-minting-erc-1155). Minting is not instantaneous because blockchains take time to verify transactions. Thus, you can poll this endpoint every 5 seconds until you get a response. #### Useful for: * Confirming that NFT minting was successful and the NFTs are on chain. #### Related: * For batch customizable minting, see [Batch customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MzIxMzAwOTk-batch-customizable-minting-erc-1155).
	 * @tags Product batch minting
	 * @name GetBatchMintedNftV0MintsBatchTransactionHashGet
	 * @summary Retrieve batch minted NFTs
	 * @request GET:/v0/mints/batch/{transaction_hash}
	 * @secure
	 */
	export namespace GetBatchMintedNftV0MintsBatchTransactionHashGet {
		export type RequestParams = { transactionHash: string };
		export type RequestQuery = { chain: 'polygon' | 'rinkeby' };
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = GetBatchMintedNftResponse;
	}
	/**
	 * @description Returns a list of all the contracts you’ve previously deployed with [Deploy a contract for NFT products](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzU-deploy-an-nft-contract). #### Useful for: * Retrieving your contract creation history. #### Related: * To see all the NFTs you've previously minted, see [List all your minted NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODI-list-all-your-minted-nf-ts). * To see all your previous IPFS uploads, see [List all your IPFS uploads](https://docs.nftport.xyz/docs/nftport/b3A6NDQ1MDU3MzI-list-all-your-ipfs-uploads).
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
	 * @description Returns the ABI for a contract you’ve previously deployed with [Deploy a contract for NFT products](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzU-deploy-an-nft-contract) or [Deploy a contract for NFT collections](https://docs.nftport.xyz/docs/nftport/b3A6Mzk2MjA1MzQ-deploy-an-nft-collection-contract). #### Useful for: * Retrieving your contract ABI, for direct on-chain contract calls. #### Related: * To see all the contracts you've previously deployed, see [List all your deployed contracts](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODE-list-all-your-deployed-contracts). * If you want to learn how to use the [customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting), see [Customizable Minting Quickstart](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#customizable-minting).
	 * @tags User
	 * @name GetUserContractsAbisV0MeContractsAbisContractAddressGet
	 * @summary Get contract ABI
	 * @request GET:/v0/me/contracts/abis/{contract_address}
	 * @secure
	 */
	export namespace GetUserContractsAbisV0MeContractsAbisContractAddressGet {
		export type RequestParams = { contractAddress: string };
		export type RequestQuery = { chain: 'polygon' | 'rinkeby' | 'ethereum' };
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = GetUserProfileContractsABIsResponse;
	}
	/**
	 * @description Returns a list of all the collection contracts you’ve previously deployed. It can also return merkle proofs of all the whitelisted addresses with `include` set to `merkle_proofs`. These proofs can be used during presale/whitelisted minting. A Merkle proof is a series of hashes which can be combined with the Merkle tree root and and the node (address) it was generated for, to verify that the node is contained in the Merkle tree without having access to the entire tree. #### Useful for: * Retrieving collection-specific contract details. * Retrieving your collection contract creation history. * Getting merkle proofs of whitelisted addresses.
	 * @tags User
	 * @name GetUserContractsCollectionV0MeContractsCollectionsGet
	 * @summary List all your deployed collection contracts
	 * @request GET:/v0/me/contracts/collections
	 * @secure
	 */
	export namespace GetUserContractsCollectionV0MeContractsCollectionsGet {
		export type RequestParams = {};
		export type RequestQuery = {
			chain: 'polygon' | 'rinkeby' | 'ethereum';
			include?: UserProfileContractsCollectionsInclude[];
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = GetUserProfileContractsCollectionsResponse;
	}
	/**
	 * @description Returns a list of all the NFTs you’ve previously minted with [Easy minting w/URL](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDM-easy-minting-w-url), [Easy minting w/file upload](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDQ-easy-minting-w-file-upload) or [Customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting). For recently minted NFTs, it may take a few minutes until they appear in this response. #### Useful for: * Retrieving your NFT minting history. #### Related: * To see all the contracts you've previously deployed, see [List all your deployed contracts](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODE-list-all-your-deployed-contracts). * To see all your previous IPFS uploads, see [List all your IPFS uploads](https://docs.nftport.xyz/docs/nftport/b3A6NDQ1MDU3MzI-list-all-your-ipfs-uploads).
	 * @tags User
	 * @name GetUserMintedNftsV0MeMintsGet
	 * @summary List all your minted NFTs
	 * @request GET:/v0/me/mints
	 * @secure
	 */
	export namespace GetUserMintedNftsV0MeMintsGet {
		export type RequestParams = {};
		export type RequestQuery = {
			chain?: 'polygon' | 'rinkeby';
			page_number?: number;
			page_size?: number;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = GetUserProfileMintedNftsResponse;
	}
	/**
	 * @description Returns a list of all data uploaded to IPFS by you. This includes files, metadata and directories uploaded to IPFS. **Note: Only lists IPFS uploads created after 2022-03-21T12:10:00 UTC.** #### Useful for: * Retrieving your uploaded data to IPFS. #### Related: * To see all the NFTs you've previously minted, see [List all your minted NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODI-list-all-your-minted-nf-ts).
	 * @tags User
	 * @name GetUserStorageV0MeStorageGet
	 * @summary List all your IPFS uploads
	 * @request GET:/v0/me/storage
	 * @secure
	 */
	export namespace GetUserStorageV0MeStorageGet {
		export type RequestParams = {};
		export type RequestQuery = {
			type: StorageRequestType[];
			page_number?: number;
			page_size?: number;
			start_date?: string;
			end_date?: string;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = GetUserProfileStorageResponse;
	}
	/**
	 * @description Retrieve your NFTPort settings to check your usage and limits. #### Useful for: * Checking your minting and contract deployment usage and limits. * Checking your NFT Data rate limits #### Related: * You can access the same information on your [NFTPort dashboard](https://dashboard.nftport.xyz). * To see your minted NFTs, see [List all your minted NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODI-list-all-your-minted-nf-ts). * To see your deployed contracts, see [List all your deployed contracts](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODE-list-all-your-deployed-contracts).
	 * @tags User
	 * @name GetUserSettingsV0MeSettingsGet
	 * @summary User settings
	 * @request GET:/v0/me/settings
	 * @secure
	 */
	export namespace GetUserSettingsV0MeSettingsGet {
		export type RequestParams = {};
		export type RequestQuery = {};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = GetUserProfileSettingsResponse;
	}
	/**
	 * @description Searches NFTs across multiple chains using a text query, specifically the ```name``` and ```description``` fields from the metadata. You can think of it like performing a search on Google. It's designed to help you find the one or the most closest NFT results you're looking for. Ethereum and Polygon are supported, including multi-chain search. #### Useful for: * Finding NFTs by their name and/or description. * Quickly integrating NFT search to your application. #### Related: * To get NFT recommendations, use [Recommend similar NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4MzI-find-similar-nf-ts-w-url). * To find duplicate NFTs, use [Find duplicate NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODY-find-counterfeit-nf-ts-w-file-upload).
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
			chain?: 'polygon' | 'ethereum' | 'all';
			page_number?: number;
			page_size?: number;
			order_by?: TextSearchRequestOrder;
			sort_order?: TextSearchRequestSortOrder;
			filter_by_contract_address?: string;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = TextSearchResponse;
	}
	/**
	 * @description Returns visually and contextually similar images to the input image passed with ```url```. Uses state of the art computer vision AI to match the input image against all ETH & Polygon NFT images in our database. You can think of it like Google reverse image search. You can see this functionality live with [Fingible](https://fingible.nftport.xyz/). **Maximum supported file size is 20MB.** #### Useful for: * Providing recommendations to your users e.g. like Amazon, Netflix so you can increase revenue. * Building new AI-based products and experiences for your users such as [Google for NFTs](https://fingible.nftport.xyz/). #### Related: * For searching for NFTs with keywords, see [Multi-chain NFT search](https://docs.nftport.xyz/docs/nftport/b3A6MjA0MjY5MjE-multi-chain-nft-search). * For finding duplicates/copies of NFTs, see [Find duplicate NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODY-find-counterfeit-nf-ts-w-file-upload).
	 * @tags Recommendations AI
	 * @name SearchUrlV0RecommendationsSimilarNftsUrlsPost
	 * @summary Find similar NFTs w/URL
	 * @request POST:/v0/recommendations/similar_nfts/urls
	 * @secure
	 */
	export namespace SearchUrlV0RecommendationsSimilarNftsUrlsPost {
		export type RequestParams = {};
		export type RequestQuery = {};
		export type RequestBody = SearchUrlRequest;
		export type RequestHeaders = {};
		export type ResponseBody = SearchResult;
	}
	/**
	 * @description Returns visually and contextually similar images to the uploaded image with  ```file```. Uses state of the art computer vision AI to match the input image against all ETH & Polygon NFT images in our database. You can think of it like Google reverse image search. You can see this functionality live with  [Fingible](https://fingible.nftport.xyz/). **Maximum supported file size is 20MB.** #### Useful for: * Providing recommendations to your users e.g. like Amazon, Netflix so you can increase revenue. * Building new AI-based products and experiences for your users such as  [Google for NFTs](https://fingible.nftport.xyz/). #### Related: * For searching for NFTs with keywords, see [Multi-chain NFT search](https://docs.nftport.xyz/docs/nftport/b3A6MjA0MjY5MjE-multi-chain-nft-search). * For finding duplicates/copies of NFTs, see [Find duplicate NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODY-find-counterfeit-nf-ts-w-file-upload).
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
		export type ResponseBody = SearchResult;
	}
	/**
	 * @description Analyzes the input image passed with ```file``` and returns duplicates (i.e. counterfeits) against it. Uses state of the art computer vision AI to match the input image against all ETH & Polygon NFT images in our database and returns duplicates which pass the ```threshold```. **Supported file formats: JPG, JPEG, PNG, PPM, BMP, PGM, TIF, TIFF, WebP.** #### Useful for: * **Increase customer trust and lower fraud** - enable users to see if an NFT is unique or already minted/sold somewhere else by showing information on existing duplicate NFTs. * **Credit and protect creators** - build processes that defend against IP theft and/or credit the original authors when their work has been used in similar NFTs. * **Enable and attract large IP holders (e.g. Disney)** to upload content as NFTs by ensuring automatic copyright protection (similar to YouTube's Content ID). * **Finding original owner** - find the NFT owner simply with the NFT image. #### Related: * To find similar NFTs which can be used as recommendations, see [Find similar NFTs w/URL](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4MzI-find-similar-nf-ts-w-url) or [Find similar NFTs w/file upload](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4MzM-find-similar-nf-ts-w-file-upload).
	 * @tags Duplicate Detection AI
	 * @name SimilarNftsV0DuplicatesFilesPost
	 * @summary Find counterfeit NFTs w/file upload
	 * @request POST:/v0/duplicates/files
	 * @secure
	 */
	export namespace SimilarNftsV0DuplicatesFilesPost {
		export type RequestParams = {};
		export type RequestQuery = {
			page_number?: number;
			page_size?: number;
			threshold?: number;
			filter_out_contract_address?: string;
		};
		export type RequestBody = BodySimilarNftsV0DuplicatesFilesPost;
		export type RequestHeaders = {};
		export type ResponseBody = ContentIdResponse;
	}
	/**
	 * @description Analyzes the input image passed with ```url``` and returns duplicates (i.e. counterfeits) against it. Uses state of the art computer vision AI to match the input image against all ETH & Polygon NFT images in our database and returns duplicates which pass the ```threshold```. **Supported file formats: JPG, JPEG, PNG, PPM, BMP, PGM, TIF, TIFF, WebP.** #### Useful for: * **Increase customer trust and lower fraud** - enable users to see if an NFT is unique or already minted/sold somewhere else by showing information on existing duplicate NFTs. * **Credit and protect creators** - build processes that defend against IP theft and/or credit the original authors when their work has been used in similar NFTs. * **Enable and attract large IP holders (e.g. Disney)** to upload content as NFTs by ensuring automatic copyright protection (similar to YouTube's Content ID). * **Finding original owner** - find the NFT owner simply with the NFT image. #### Related: * To find similar NFTs which can be used as recommendations, see [Find similar NFTs w/URL](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4MzI-find-similar-nf-ts-w-url) or [Find similar NFTs w/file upload](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4MzM-find-similar-nf-ts-w-file-upload).
	 * @tags Duplicate Detection AI
	 * @name SimilarNftsUrlV0DuplicatesUrlsPost
	 * @summary Find counterfeit NFTs w/url
	 * @request POST:/v0/duplicates/urls
	 * @secure
	 */
	export namespace SimilarNftsUrlV0DuplicatesUrlsPost {
		export type RequestParams = {};
		export type RequestQuery = {};
		export type RequestBody = ContentIdUrlRequest;
		export type RequestHeaders = {};
		export type ResponseBody = ContentIdResponse;
	}
	/**
	 * @description Analyzes the input nft image passed with ```chain```,  ```contract_address``` and  ```token_id```,  and returns duplicates (i.e. counterfeits) against it. Uses state of the art computer vision AI to match the input image against all ETH & Polygon NFT images in our database and returns duplicates which pass the ```threshold```. **Supported file formats: JPG, JPEG, PNG, PPM, BMP, PGM, TIF, TIFF, WebP.** #### Useful for: * **Increase customer trust and lower fraud** - enable users to see if an NFT is unique or already minted/sold somewhere else by showing information on existing duplicate NFTs. * **Credit and protect creators** - build processes that defend against IP theft and/or credit the original authors when their work has been used in similar NFTs. * **Enable and attract large IP holders (e.g. Disney)** to upload content as NFTs by ensuring automatic copyright protection (similar to YouTube's Content ID). * **Finding original owner** - find the NFT owner simply with the NFT image. #### Related: * To find similar NFTs which can be used as recommendations, see [Find similar NFTs w/URL](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4MzI-find-similar-nf-ts-w-url) or [Find similar NFTs w/file upload](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4MzM-find-similar-nf-ts-w-file-upload).
	 * @tags Duplicate Detection AI
	 * @name SimilarNftsAddressV0DuplicatesTokensPost
	 * @summary Find counterfeit NFTs w/token ID
	 * @request POST:/v0/duplicates/tokens
	 * @secure
	 */
	export namespace SimilarNftsAddressV0DuplicatesTokensPost {
		export type RequestParams = {};
		export type RequestQuery = {};
		export type RequestBody = ContentIdNftRequest;
		export type RequestHeaders = {};
		export type ResponseBody = ContentIdResponse;
	}
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
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

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
	baseUrl?: string;
	baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
	securityWorker?: (
		securityData: SecurityDataType | null
	) => Promise<RequestParams | void> | RequestParams | void;
	customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
	data: D;
	error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
	Json = 'application/json',
	FormData = 'multipart/form-data',
	UrlEncoded = 'application/x-www-form-urlencoded'
}

export class HttpClient<SecurityDataType = unknown> {
	public baseUrl: string = 'https://api.nftport.xyz';
	private securityData: SecurityDataType | null = null;
	private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
	private abortControllers = new Map<CancelToken, AbortController>();
	private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

	private baseApiParams: RequestParams = {
		credentials: 'same-origin',
		headers: {},
		redirect: 'follow',
		referrerPolicy: 'no-referrer'
	};

	constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
		Object.assign(this, apiConfig);
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data;
	};

	private encodeQueryParam(key: string, value: any) {
		const encodedKey = encodeURIComponent(key);
		return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
	}

	private addQueryParam(query: QueryParamsType, key: string) {
		return this.encodeQueryParam(key, query[key]);
	}

	private addArrayQueryParam(query: QueryParamsType, key: string) {
		const value = query[key];
		return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
	}

	protected toQueryString(rawQuery?: QueryParamsType): string {
		const query = rawQuery || {};
		const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
		return keys
			.map((key) =>
				Array.isArray(query[key])
					? this.addArrayQueryParam(query, key)
					: this.addQueryParam(query, key)
			)
			.join('&');
	}

	protected addQueryParams(rawQuery?: QueryParamsType): string {
		const queryString = this.toQueryString(rawQuery);
		return queryString ? `?${queryString}` : '';
	}

	private contentFormatters: Record<ContentType, (input: any) => any> = {
		[ContentType.Json]: (input: any) =>
			input !== null && (typeof input === 'object' || typeof input === 'string')
				? JSON.stringify(input)
				: input,
		[ContentType.FormData]: (input: any) =>
			Object.keys(input || {}).reduce((formData, key) => {
				const property = input[key];
				formData.append(
					key,
					property instanceof Blob
						? property
						: typeof property === 'object' && property !== null
						? JSON.stringify(property)
						: `${property}`
				);
				return formData;
			}, new FormData()),
		[ContentType.UrlEncoded]: (input: any) => this.toQueryString(input)
	};

	private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
		return {
			...this.baseApiParams,
			...params1,
			...(params2 || {}),
			headers: {
				...(this.baseApiParams.headers || {}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {})
			}
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
			((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{};
		const requestParams = this.mergeRequestParams(params, secureParams);
		const queryString = query && this.toQueryString(query);
		const payloadFormatter = this.contentFormatters[type || ContentType.Json];
		const responseFormat = format || requestParams.format;

		return this.customFetch(
			`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
			{
				...requestParams,
				headers: {
					...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
					...(requestParams.headers || {})
				},
				signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
				body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body)
			}
		).then(async (response) => {
			const r = response as HttpResponse<T, E>;
			r.data = null as unknown as T;
			r.error = null as unknown as E;

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
 * @title NFTPort API
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

	/**
	 * No description
	 *
	 * @name RootGet
	 * @summary Root
	 * @request GET:/
	 */
	rootGet = (params: RequestParams = {}) =>
		this.http.request<any, any>({
			path: `/`,
			method: 'GET',
			format: 'json',
			...params
		});

	v0 = {
		/**
		 * @description Returns all ERC721 and ERC1155 NFTs that have been minted on a given chain. Can be set to ```include``` the NFT ```metadata```, ```file_information```,  ```contract_infomation``` and ```all``` which includes full details like in [Retrieve NFT details](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTM-retrieve-nft-details). Ethereum and Polygon are supported. **You have access to NFTs no older than 90 days. For full access see [pricing](https://www.nftport.xyz/pricing).** #### Useful for: * Big data analysis or analytics with all the NFTs. * Keeping track of all the created NFTs. * Importing all NFTs to your application. #### Related: * To get all NFTs per contract, see [Retrieve contract NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTQ-retrieve-contract-nf-ts). * To get detailed information on the returned NFTs, see [Retrieve NFT details](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTM-retrieve-nft-details).
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
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Returns details for a given NFT. These include ```metadata_url```, ```metadata``` such as name, description, attributes, etc., ```image_url```, ```cached_image_url``` and ```mint_date```. Ethereum and Polygon are supported. #### Useful for: * For easily getting all the necessary information about a given NFT. #### Related: * To get all NFTs per contract, see [Retrieve contract NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTQ-retrieve-contract-nf-ts). * To get NFTs that a given account owns, see [Retrieve NFTs owned by an account](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzM-retrieve-nf-ts-owned-by-an-account).
		 *
		 * @tags Contracts, Metadata & Assets
		 * @name NftDetailsV0NftsContractAddressTokenIdGet
		 * @summary Retrieve NFT details
		 * @request GET:/v0/nfts/{contract_address}/{token_id}
		 * @secure
		 */
		nftDetailsV0NftsContractAddressTokenIdGet: (
			{ contractAddress, tokenId, ...query }: NftDetailsV0NftsContractAddressTokenIdGetParams,
			params: RequestParams = {}
		) =>
			this.http.request<NftDetailsResponse, HTTPValidationError>({
				path: `/v0/nfts/${contractAddress}/${tokenId}`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Returns all NFTs for a given contract address. Can be set to ```include``` the NFT ```metadata``` or ```all``` which returns extra information. Ethereum and Polygon are supported. #### Useful for: * Importing all NFTs from a given contract to your application. #### Related: * To get detailed information on the returned NFTs, see [Retrieve NFT details](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTM-retrieve-nft-details). * To get NFTs that a given account owns, see [Retrieve NFTs owned by an account](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzM-retrieve-nf-ts-owned-by-an-account).
		 *
		 * @tags Contracts, Metadata & Assets
		 * @name NftsByContractV0NftsContractAddressGet
		 * @summary Retrieve contract NFTs
		 * @request GET:/v0/nfts/{contract_address}
		 * @secure
		 */
		nftsByContractV0NftsContractAddressGet: (
			{ contractAddress, ...query }: NftsByContractV0NftsContractAddressGetParams,
			params: RequestParams = {}
		) =>
			this.http.request<ContractNftsResponse, HTTPValidationError>({
				path: `/v0/nfts/${contractAddress}`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Returns NFTs owned by a given account (i.e. wallet) address. Can also return each NFT metadata with  ```include```  parameter. #### Useful for: * For checking if a user owns a specific NFT and then unlocking specific activity. * Adding NFT portfolio section to your apps. #### Related: * To get all NFTs per contract, see [Retrieve contract NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTQ-retrieve-contract-nf-ts). * To get extra detailed information on the returned NFTs, see [Retrieve NFT details](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTM-retrieve-nft-details).
		 *
		 * @tags Ownership
		 * @name AccountNftsV0AccountsAccountAddressGet
		 * @summary Retrieve NFTs owned by an account
		 * @request GET:/v0/accounts/{account_address}
		 * @secure
		 */
		accountNftsV0AccountsAccountAddressGet: (
			{ accountAddress, ...query }: AccountNftsV0AccountsAccountAddressGetParams,
			params: RequestParams = {}
		) =>
			this.http.request<AccountNftsResponse, HTTPValidationError>({
				path: `/v0/accounts/${accountAddress}`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Returns NFTs created (i.e. minted) by a given account (i.e. wallet) address. Can also return each NFT metadata with `include` parameter. Ethereum mainnet is supported. #### Useful for: * For displaying NFTs created by an account. * Doing analytics on creator's portfolio. #### Related: * To get NFTs that a given account owns, see [Retrieve NFTs owned by an account](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzM-retrieve-nf-ts-owned-by-an-account). * To get all NFTs per contract, see [Retrieve contract NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTQ-retrieve-contract-nf-ts). * To get extra detailed information on the returned NFTs, see [Retrieve NFT details](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTM-retrieve-nft-details).
		 *
		 * @tags Ownership
		 * @name CreatorNftsV0AccountsCreatorsAccountAddressGet
		 * @summary Retrieve NFTs created by an account
		 * @request GET:/v0/accounts/creators/{account_address}
		 * @secure
		 */
		creatorNftsV0AccountsCreatorsAccountAddressGet: (
			{ accountAddress, ...query }: CreatorNftsV0AccountsCreatorsAccountAddressGetParams,
			params: RequestParams = {}
		) =>
			this.http.request<CreatorNftsResponse, HTTPValidationError>({
				path: `/v0/accounts/creators/${accountAddress}`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Returns a list of contracts (i.e. collections) where the given account (wallet) address owns at least one NFT. #### Useful for: * Showing the user a list of contracts in which they own NFTs. * Checking if a user owns an NFT in a specific contract and then unlocking some experience for them (token-gating). #### Related: * To get a list of all NFTs owned by this account, see [Retrieve NFTs owned by account](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzM-retrieve-nf-ts-owned-by-an-account). * To get extra detailed information on the returned NFTs, see [Retrieve NFT details](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTM-retrieve-nft-details).
		 *
		 * @tags Ownership
		 * @name AccountContractsV0AccountsContractsAccountAddressGet
		 * @summary Retrieve contracts owned by an account
		 * @request GET:/v0/accounts/contracts/{account_address}
		 * @secure
		 */
		accountContractsV0AccountsContractsAccountAddressGet: (
			{ accountAddress, ...query }: AccountContractsV0AccountsContractsAccountAddressGetParams,
			params: RequestParams = {}
		) =>
			this.http.request<AccountContractsResponse, HTTPValidationError>({
				path: `/v0/accounts/contracts/${accountAddress}`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Returns all on-chain transactions for the specified account (i.e. wallet) address. Can be set to `include` transactions such as `mint`, `burn`, `transfer_from`, `transfer_to`, `buy`, `sell`, or `all` which includes all transactions. Ethereum mainnet is supported. #### Useful for: * Tracking all transactions made by an account. * Building analytics and monitoring solutions. #### Related: * To query transactions from a contract, see [Retrieve transactions by contract](https://docs.nftport.xyz/docs/nftport/b3A6MzAxNDQ3NzY-retrieve-transactions-by-contract). * To query transactions for an NFT, see [Retrieve transactions by NFT](https://docs.nftport.xyz/docs/nftport/b3A6MzAxNDQ3NzU-retrieve-transactions-by-nft).
		 *
		 * @tags Transactions
		 * @name TransactionsByAccountV0TransactionsAccountsAccountAddressGet
		 * @summary Retrieve transactions by an account
		 * @request GET:/v0/transactions/accounts/{account_address}
		 * @secure
		 */
		transactionsByAccountV0TransactionsAccountsAccountAddressGet: (
			{
				accountAddress,
				...query
			}: TransactionsByAccountV0TransactionsAccountsAccountAddressGetParams,
			params: RequestParams = {}
		) =>
			this.http.request<TransactionsByAccountResponse, HTTPValidationError>({
				path: `/v0/transactions/accounts/${accountAddress}`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Returns all on-chain transactions for the specified NFT token. Can be set to `include` transactions such as `transfer`, `burn`, `mint`, and `sale`, or `all` which includes all transactions. Ethereum mainnet is supported. #### Useful for: * Tracking all transactions of an NFT token. * Building analytics and monitoring solutions. #### Related: * To query transactions from a contract, see [Retrieve transactions by contract](https://docs.nftport.xyz/docs/nftport/b3A6MzAxNDQ3NzY-retrieve-transactions-by-contract). * To query transactions from an account, see [Retrieve transactions by account](https://docs.nftport.xyz/docs/nftport/b3A6MzAxNDQ3NzQ-retrieve-transactions-by-an-account).
		 *
		 * @tags Transactions
		 * @name TransactionsByTokenV0TransactionsNftsContractAddressTokenIdGet
		 * @summary Retrieve transactions by NFT
		 * @request GET:/v0/transactions/nfts/{contract_address}/{token_id}
		 * @secure
		 */
		transactionsByTokenV0TransactionsNftsContractAddressTokenIdGet: (
			{
				contractAddress,
				tokenId,
				...query
			}: TransactionsByTokenV0TransactionsNftsContractAddressTokenIdGetParams,
			params: RequestParams = {}
		) =>
			this.http.request<TransactionsByTokenResponse, HTTPValidationError>({
				path: `/v0/transactions/nfts/${contractAddress}/${tokenId}`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Returns all on-chain transactions for the specified contract. Can be set to `include` transactions such as `transfer`, `burn`, `mint`, and `sale`, or `all` which includes all transactions. Ethereum mainnet is supported. #### Useful for: * Tracking all transactions of all NFT tokens in a contract. * Building analytics and monitoring solutions. #### Related: * To query sales statistics of an NFT collection, see [Retrieve contract sales statistics](https://docs.nftport.xyz/docs/nftport/b3A6MzEyODQ1MTc-retrieve-contract-sales-statistics). * To query transactions for an NFT, see [Retrieve transactions by NFT](https://docs.nftport.xyz/docs/nftport/b3A6MzAxNDQ3NzU-retrieve-transactions-by-nft). * To query transactions from an account, see [Retrieve transactions by account](https://docs.nftport.xyz/docs/nftport/b3A6MzAxNDQ3NzQ-retrieve-transactions-by-an-account).
		 *
		 * @tags Transactions
		 * @name TransactionsByContractV0TransactionsNftsContractAddressGet
		 * @summary Retrieve transactions by contract
		 * @request GET:/v0/transactions/nfts/{contract_address}
		 * @secure
		 */
		transactionsByContractV0TransactionsNftsContractAddressGet: (
			{
				contractAddress,
				...query
			}: TransactionsByContractV0TransactionsNftsContractAddressGetParams,
			params: RequestParams = {}
		) =>
			this.http.request<TransactionsByContractResponse, HTTPValidationError>({
				path: `/v0/transactions/nfts/${contractAddress}`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Returns all on-chain transactions for the whole chain. Can be set to `include` transactions such as `transfer`, `mint`, `burn`, `sale` or `all` which includes all transactions. Ethereum mainnet is supported. #### Useful for: * Tracking all transactions on a chain. * Building analytics and monitoring solutions. #### Related: * To query transactions from a contract, see [Retrieve transactions by contract](https://docs.nftport.xyz/docs/nftport/b3A6MzAxNDQ3NzY-retrieve-transactions-by-contract). * To query transactions for an NFT, see [Retrieve transactions by NFT](https://docs.nftport.xyz/docs/nftport/b3A6MzAxNDQ3NzU-retrieve-transactions-by-nft).
		 *
		 * @tags Transactions
		 * @name TransactionsV0TransactionsGet
		 * @summary Retrieve all transactions
		 * @request GET:/v0/transactions
		 * @secure
		 */
		transactionsV0TransactionsGet: (
			query: TransactionsV0TransactionsGetParams,
			params: RequestParams = {}
		) =>
			this.http.request<TransactionsResponse, HTTPValidationError>({
				path: `/v0/transactions`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Retrieve in-depth sales statistics about a contract from OpenSea. Includes statistics such as floor price, total volume, sales, etc. Updated with 1-hour interval. #### Useful for: * Analysis and ranking of NFT collections. * Tracking NFT collections by sales, etc. #### Related: * To query transactions from a contract, see [Retrieve transactions by contract](https://docs.nftport.xyz/docs/nftport/b3A6MzAxNDQ3NzY-retrieve-transactions-by-contract). * To get all NFTs of a contract, see [Retrieve contract NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTQ-retrieve-contract-nf-ts).
		 *
		 * @tags Transactions
		 * @name CollectionStatsV0TransactionsStatsContractAddressGet
		 * @summary Retrieve contract sales statistics
		 * @request GET:/v0/transactions/stats/{contract_address}
		 * @secure
		 */
		collectionStatsV0TransactionsStatsContractAddressGet: (
			{ contractAddress, ...query }: CollectionStatsV0TransactionsStatsContractAddressGetParams,
			params: RequestParams = {}
		) =>
			this.http.request<CollectionStatsResponse, HTTPValidationError>({
				path: `/v0/transactions/stats/${contractAddress}`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Get reports such as: * High-level statistics about URIs linked by NFTs metadata. Currently supported URIs are: metadata, image and animation. Ethereum is supported.
		 *
		 * @tags Reports
		 * @name ReportsV0ReportsReportTypeGet
		 * @summary Retrieve reports on NFTs data
		 * @request GET:/v0/reports/{report_type}
		 * @secure
		 */
		reportsV0ReportsReportTypeGet: (reportType: ReportTypes, params: RequestParams = {}) =>
			this.http.request<ReportURIResponse, HTTPValidationError>({
				path: `/v0/reports/${reportType}`,
				method: 'GET',
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Updates a contract which has been previously deployed with [Deploy a contract for NFT products](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzU-deploy-an-nft-contract). You can freeze the metadata of the NFTs minted in the specified contract which means they can not be updated after minting (token URIs are frozen on the contract level). #### Useful for: * Creating dynamic NFTs (NFTs that change after minting based on events) and freezing them afterwards. * Revealing NFTs after a drop and freezing them afterwards. #### Related: * If you wish to list all your previously deployed contracts, see [List all your deployed contracts](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODE-list-all-your-deployed-contracts).
		 *
		 * @tags Product contracts
		 * @name UpdateContractV0ContractsPut
		 * @summary Update a deployed contract for NFT products
		 * @request PUT:/v0/contracts
		 * @secure
		 */
		updateContractV0ContractsPut: (data: UpdateContractRequest, params: RequestParams = {}) =>
			this.http.request<UpdateContractResponse, HTTPValidationError>({
				path: `/v0/contracts`,
				method: 'PUT',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * @description Deploys an [```ERC-721```](https://github.com/nftport/solidity-contracts/blob/master/contracts/ERC721NftCustom.sol) or [```ERC-1155```](https://github.com/nftport/solidity-contracts/blob/master/contracts/ERC1155NftCustom.sol) smart contract where your can mint your NFTs on-demand. The supply of NFTs is not fixed; more can be minted into this contract at any point in the future. This is a required step if you wish to use [Customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting) as your NFTs will be minted into this contract. As blockchains can take a few seconds up to a few minutes to sync, then after contract deployment, you can use the returned ```transaction_hash``` in [Retrieve a deployed contract](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4OTk-retrieve-a-deployed-contract) to get the ```contract_address```. **You can deploy up to 5 contracts for free per chain. For higher limits, see [pricing](https://www.nftport.xyz/pricing).** #### Useful for: * Deploying your own contracts so you easily can build custom products. #### Related: * To get the deployed contract address, use [Retrieve a deployed contract](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4OTk-retrieve-a-deployed-contract). * If you want to know how to use the customizable minting, see [Customizable Minting Quickstart](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#customizable-minting). * To understand the difference between NFT product contracts and NFT collection contracts, see [Contract comparison](https://docs.nftport.xyz/docs/nftport/ZG9jOjQ2NDA5NTU5-contract-comparison). Read how **royalties** work [here](https://docs.nftport.xyz/docs/nftport/ZG9jOjQ1ODQ4NzQ5-royalties).
		 *
		 * @tags Product contracts
		 * @name DeployContractV0ContractsPost
		 * @summary Deploy a contract for NFT products
		 * @request POST:/v0/contracts
		 * @secure
		 */
		deployContractV0ContractsPost: (
			data: DeployContractRequestWithAddress,
			params: RequestParams = {}
		) =>
			this.http.request<DeployContractResponse, HTTPValidationError>({
				path: `/v0/contracts`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * @description Updates a collection contract which has been previously deployed with [Deploy an NFT collection contract](https://docs.nftport.xyz/docs/nftport/b3A6Mzk2MjA1MzQ-deploy-an-nft-collection-contract). You can change the reveal dates, metadata location, presale time and whitelist, or royalty details. You can also freeze the metadata of the NFTs minted in the specified contract so metadata cannot be updated any more (token URIs are frozen on the contract level). **Ethereum contract updates are available only on the Growth tier and you will be charged immediately on request and if the transaction fails for any reason the amount will be refunded. For higher limits, see [pricing](https://www.nftport.xyz/pricing).** #### Useful for: * Revealing NFTs at a specified time and freezing them afterwards. * Allowing a limited group of people to mint NFTs during a presale period. * Changing royalty amount and recipient. #### Related: * If you wish to list all your previously deployed collection contracts, see [List all your deployed collection contracts](https://docs.nftport.xyz/docs/nftport/b3A6NDE1MTQ2MzI-list-all-your-deployed-collection-contracts).
		 *
		 * @tags Collection contracts
		 * @name UpdateContractCollectionV0ContractsCollectionsPut
		 * @summary Update a deployed collection contract
		 * @request PUT:/v0/contracts/collections
		 * @secure
		 */
		updateContractCollectionV0ContractsCollectionsPut: (
			data: UpdateContractCollectionsRequest,
			params: RequestParams = {}
		) =>
			this.http.request<UpdateContractCollectionsResponse, HTTPValidationError>({
				path: `/v0/contracts/collections`,
				method: 'PUT',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * @description Deploys a [fixed-supply ERC-721 smart contract](https://github.com/nftport/solidity-contracts/blob/master/contracts/collection/templates/NFTCollection.sol), commonly used for launching NFT collections. As blockchains can take a few seconds up to a few minutes to sync, then after contract deployment, you can use the returned ```transaction_hash``` in [Retrieve a deployed contract](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4OTk-retrieve-a-deployed-contract) to get the ```contract_address```. **You can deploy up to 5 contracts for free on each of Polygon and Rinkeby, and ```max_supply``` is limited to less than or equal to 5,000 NFTs for collection contracts deployed on the Free plan. Ethereum contract deployments are available only on the Growth tier and you will be charged immediately on request and if the transaction fails for any reason the amount will be refunded. For details and limits, see [pricing](https://www.nftport.xyz/pricing).** #### Useful for: * Launching an NFT collection (e.g. a 10,000 profile pictures collection) with a minting website. **See our [tutorial](https://docs.nftport.xyz/docs/nftport/ZG9jOjQ0MDgxNDc3-how-to-create-an-nft-collection-contract) to learn how to create an NFT contract collection and make a website to allows users to mint.** #### Related: * To get the deployed contract address, use [Retrieve a deployed contract](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4OTk-retrieve-a-deployed-contract). * If you wish to list all your previously deployed collection contracts, see [List all your deployed collection contracts](https://docs.nftport.xyz/docs/nftport/b3A6NDE1MTQ2MzI-list-all-your-deployed-collection-contracts). * The contract ABI can be fetched using the [Get contract ABI](https://docs.nftport.xyz/docs/nftport/b3A6NjM3MjE5ODE-get-contract-abi) endpoing. Read how **royalties** work [here](https://docs.nftport.xyz/docs/nftport/ZG9jOjQ1ODQ4NzQ5-royalties).
		 *
		 * @tags Collection contracts
		 * @name DeployContractCollectionV0ContractsCollectionsPost
		 * @summary Deploy an NFT collection contract
		 * @request POST:/v0/contracts/collections
		 * @secure
		 */
		deployContractCollectionV0ContractsCollectionsPost: (
			data: DeployContractCollectionsRequest,
			params: RequestParams = {}
		) =>
			this.http.request<DeployContractCollectionsResponse, HTTPValidationError>({
				path: `/v0/contracts/collections`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * @description Returns the details of a contract that has previously been deployed with [Deploy a contract for NFT products](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzU-deploy-an-nft-contract) or [Deploy an NFT collection contract](https://docs.nftport.xyz/docs/nftport/b3A6Mzk2MjA1MzQ-deploy-an-nft-collection-contract). Supply the ```transaction_hash``` to check if the contract is on chain and to get the ```contract_address```. For NFT product contracts, you can use the returned ```contract_address``` in [Customizable Minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting). As blockchains can take a few seconds up to a few minutes to sync, this endpoint can be polled until the ```contract_address``` is returned. #### Useful for: * Deploying your own contracts so you can build custom products or collections easily. #### Related: * If you want to get data about NFT contracts which you haven't deployed using NFTPort, see [Retrieve contract NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjAzNDUzNTQ-retrieve-contract-nf-ts). * If you want to learn how to use the [customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting), see [Customizable Minting Quickstart](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#customizable-minting).
		 *
		 * @tags
		 * @name GetDeployedContractV0ContractsTransactionHashGet
		 * @summary Retrieve a deployed contract
		 * @request GET:/v0/contracts/{transaction_hash}
		 * @secure
		 */
		getDeployedContractV0ContractsTransactionHashGet: (
			{ transactionHash, ...query }: GetDeployedContractV0ContractsTransactionHashGetParams,
			params: RequestParams = {}
		) =>
			this.http.request<GetDeployedContractResponse, HTTPValidationError>({
				path: `/v0/contracts/${transactionHash}`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Uploads a file to [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/) which makes your NFT storage easy. You can use the returned  ```ipfs_url```  with [Upload metadata to IPFS](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzc-upload-metadata-to-ipfs) to mint your NFT. If you prefer hosting files in your own servers, you can skip this step. Otherwise, we recommend using IPFS because it's an industry standard for decentralized storage and guarantees the immutability of your files. We use [nft.storage](https://nft.storage/) to [pin](https://docs.ipfs.io/how-to/pin-files/) the files with Filecoin, which ensures that your important data is retained in IPFS. **Supports all file types and maximum file size is 20MB. For higher limits, see [pricing](https://www.nftport.xyz/pricing).** #### Useful for: * Storing your NFT files easily and according to the industry standards. #### Related: * To see all your previous IPFS uploads, see [List all your IPFS uploads](https://docs.nftport.xyz/docs/nftport/b3A6NDQ1MDU3MzI-list-all-your-ipfs-uploads). * After uploading files, use [Upload metadata to IPFS](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzc-upload-metadata-to-ipfs) to continue with your NFT minting. * If you want to learn how to use the [customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting), see [Customizable Minting Quickstart](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#customizable-minting). #### Example Requests in cURL, Python & JS <!-- title: "Make sure to replace the parameters with your own values" lineNumbers: true --> ```shell curl --request POST \ --url 'https://api.nftport.xyz/v0/files' \ --header 'Authorization: API Key Here' \ --header 'Content-Type: multipart/form-data' \ --form 'file=@/path/to/file_to_upload.png;type=image/png' ``` ```python import requests file = open("image.png", "rb") response = requests.post( "https://api.nftport.xyz/v0/files", headers={"Authorization": 'API-Key-Here'}, files={"file": file} ) ``` ```javascript const fs = require('fs'); const fetch = require('node-fetch'); const FormData = require('form-data'); const form = new FormData(); const fileStream = fs.createReadStream('image.jpg'); form.append('file', fileStream); const options = { method: 'POST', body: form, headers: { "Authorization": "API-Key-Here", }, }; fetch("https://api.nftport.xyz/v0/files", options) .then(response => { return response.json() }) .then(responseJson => { // Handle the response console.log(responseJson); }) ```
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
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.FormData,
				format: 'json',
				...params
			}),

		/**
		 * @description Uploads NFT metadata to [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/) as a JSON file which is the standard format for  [NFT metadata](https://nftschool.dev/reference/metadata-schemas/#intro-to-json-schemas). You can use the returned ```metadata_ipfs_uri``` in [Customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting) to mint your NFT. If you prefer hosting metadata in your own servers, you can skip this step. Otherwise, we recommend using IPFS because it’s an industry standard for decentralized storage and guarantees the immutability of your metadata. For the ```file_url```, we also recommend using IPFS with [Upload a file to IPFS](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzY-upload-a-file-to-ipfs). We use [nft.storage](https://nft.storage/) to [pin](https://docs.ipfs.io/how-to/pin-files/) the files with Filecoin, which ensures that your important data is retained in IPFS. #### Useful for: * Storing your NFT metadata easily and according to the industry standards. #### Related: * To see all your previous IPFS uploads, see [List all your IPFS uploads](https://docs.nftport.xyz/docs/nftport/b3A6NDQ1MDU3MzI-list-all-your-ipfs-uploads). * After uploading your metadata, use [Customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting) to continue with your NFT minting. * If you are new to NFT metadata, see the [basics on it](https://nftschool.dev/reference/metadata-schemas/).
		 *
		 * @tags Storage
		 * @name IpfsUploadMetadataV0MetadataPost
		 * @summary Upload metadata to IPFS
		 * @request POST:/v0/metadata
		 * @secure
		 */
		ipfsUploadMetadataV0MetadataPost: (
			data: IpfsMetadataUploadRequest,
			params: RequestParams = {}
		) =>
			this.http.request<IpfsMetadataUploadResponse, HTTPValidationError>({
				path: `/v0/metadata`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * @description Uploads an array of JSON files containing NFT metadata to [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/). The output is an IPFS URI of a directory containing the uploaded JSON files. The IPFS URI of this directory will be used as the `base_uri` in [Collection contract](https://docs.nftport.xyz/docs/nftport/b3A6Mzk2MjA1MzQ-deploy-an-nft-collection-contract). IPFS is an industry standard for decentralized storage and guarantees the immutability of your metadata. For the ```file_url```, we also recommend using IPFS with [Upload a file to IPFS](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzY-upload-a-file-to-ipfs). We use [nft.storage](https://nft.storage/) to [pin](https://docs.ipfs.io/how-to/pin-files/) the files with Filecoin, which ensures that your important data is retained in IPFS. **Supports only files with [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) as application/json.** **Maximum number of files that can be uploaded together is 25,000 and maximum total file size is 50MB** <!-- theme: info --> > ### Note: > * All metadata files must be uploaded at once since IPFS creates a unique immutable hash of all files in the directory. > * To work with [Collection contracts](https://niladri.stoplight.io/docs/test/b3A6Mzk2MjA1MzQ-deploy-an-nft-contract-collection), the filenames should be token IDs starting from 0. > * The file extension will be removed and only the filename will be retained in the IPFS directory (eg: '4521.json' will become '4521' on IPFS). > * All files will be placed at the base of the directory. #### Useful for: * Uploading a directory of metadata files to IPFS. #### Related: * To see all your previous IPFS uploads, see [List all your IPFS uploads](https://docs.nftport.xyz/docs/nftport/b3A6NDQ1MDU3MzI-list-all-your-ipfs-uploads). * If you are new to NFT metadata, see the [basics on it](https://nftschool.dev/reference/metadata-schemas/). ```python title="This script uploads all JSON files in the 'Metadata' directory to IPFS" import requests import os from os import listdir from os.path import join metadata_directory_path = "Metadata" #Replace with your path files = [f for f in listdir(metadata_directory_path) if str(join(metadata_directory_path, f)).endswith('.json')] metadata_files = [] for metadata in files: metadata_files.append( ("metadata_files", open(os.path.join(metadata_directory_path, metadata), "rb"))) response = requests.post( "https://api.nftport.xyz/v0/metadata/directory", headers={"Authorization": "Your-API-Key"}, files=metadata_files ) print(response.json()) ``` ```javascript title="This script uploads all JSON files in the 'Metadata' directory to IPFS" const fs = require('fs'); const path = require('path') const request = require('request'); API_KEY = "YOUR_API_KEY" // Replace with your API key METADATA_DIRECTORY_PATH = "Metadata" // Replace with your path to directory folder containing metadata json files function isJson(filename) { return filename.split('.').pop() === "json" } function getFileStreamForJSONFiles(directory) { const jsonArray = [] fs.readdirSync(directory).forEach(file => { if(!isJson(file)) { return } const fileData = fs.createReadStream(path.join(directory, file)); jsonArray.push(fileData) }); return jsonArray } function sendRequest(metadataFileStreams, apiKey) { const options = { url: 'https://api.nftport.xyz/v0/metadata/directory', headers: { "Authorization": apiKey } } const req = request.post(options, function (err, resp, body) { if (err) { console.error('Error: ' + err); } else { console.log('Response: ' + body); } }); const form = req.form(); metadataFileStreams.forEach(file => { form.append('metadata_files', file); }) } metadataFileStreams = getFileStreamForJSONFiles(METADATA_DIRECTORY_PATH) sendRequest(metadataFileStreams, API_KEY) ```
		 *
		 * @tags Storage
		 * @name IpfsUploadMetadataDirectoryV0MetadataDirectoryPost
		 * @summary Upload metadata directory to IPFS
		 * @request POST:/v0/metadata/directory
		 * @secure
		 */
		ipfsUploadMetadataDirectoryV0MetadataDirectoryPost: (
			data: BodyIpfsUploadMetadataDirectoryV0MetadataDirectoryPost,
			params: RequestParams = {}
		) =>
			this.http.request<IpfsMetadataDirectoryUploadResponse, HTTPValidationError>({
				path: `/v0/metadata/directory`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.FormData,
				format: 'json',
				...params
			}),

		/**
		 * @description Updates an NFT which has been previously minted with [Customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting) or [Batch customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MzIxMzAwOTk-batch-customizable-minting-erc-1155). You can update the metadata URI with a new link or freeze the metadata URI to permanently lock it. The NFT must be minted in your deployed contract and update only works if contract and token are not frozen. 1.  First, you need ```contract_address``` from [Deploy a contract for NFT products](https://nftport.stoplight.io/docs/nftport/b3A6MjE0MDYzNzU-deploy-an-nft-contract) and ```metadata_updatable``` must be set ```true```. 2.  Secondly, you need ```token_id``` from [Customizable minting](https://nftport.stoplight.io/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting) or [Batch customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MzIxMzAwOTk-batch-customizable-minting-erc-1155). 3.  If you only wish to update the metadata URI set a new ```metadata_uri```. If you wish to update metadata URI and freeze both at the same time then set a new ```metadata_uri``` and ```freeze_metadata``` as ```true```. If you only want to freeze existing metadata URI, then set ```freeze_metadata``` as ```true```. #### Useful for: * Creating dynamic NFTs (NFTs that change after minting based on events). * Revealing NFTs after the drop. #### Related: * If you want to learn how to use [customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting), see [Customizable Minting Quickstart](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#customizable-minting). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODI-list-all-your-minted-nf-ts).
		 *
		 * @tags Product minting
		 * @name UpdateNftV0MintsCustomizablePut
		 * @summary Update a minted NFT
		 * @request PUT:/v0/mints/customizable
		 * @secure
		 */
		updateNftV0MintsCustomizablePut: (data: UpdateNftRequest, params: RequestParams = {}) =>
			this.http.request<UpdateNftResponse, HTTPValidationError>({
				path: `/v0/mints/customizable`,
				method: 'PUT',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * @description Mints an NFT to your previously contract for NFT products. This minting consists of multiple steps and enables you to customize the whole minting flow for your exact needs. 1.  First, you need  ```contract_address```  using [Deploy a contract for NFT products](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzU-deploy-an-nft-contract). 2.  Secondly, you need  ```metadata_uri```  using [Upload metadata to IPFS](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzc-upload-metadata-to-ipfs). After minting, the NFT will appear in the  ```mint_to_address```  wallet. If you minted to your own wallet, you can also see the minted NFT on OpenSea in your profile after a few minutes. **You can mint up to 100 NFTs for free per chain. Maximum supported filesize is 20MB. For higher limits, see [pricing](https://www.nftport.xyz/pricing).** #### Useful for: * Minting to your own product contracts effortlessly. * Creating customizable minting flows which enable to build NFT-based products. #### Related: * If you want to learn how to use [customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting), see [Customizable Minting Quickstart](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#customizable-minting). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODI-list-all-your-minted-nf-ts). * To see all your previous IPFS uploads, see [List all your IPFS uploads](https://docs.nftport.xyz/docs/nftport/b3A6NDQ1MDU3MzI-list-all-your-ipfs-uploads).
		 *
		 * @tags Product minting
		 * @name MintNftV0MintsCustomizablePost
		 * @summary Customizable minting
		 * @request POST:/v0/mints/customizable
		 * @secure
		 */
		mintNftV0MintsCustomizablePost: (data: MintNftRequest, params: RequestParams = {}) =>
			this.http.request<MintNftResponse, HTTPValidationError>({
				path: `/v0/mints/customizable`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * @description Burns an NFT which has been previously minted with [Customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting). Burning an NFT means destroying it by sending it to a null (un-spendable) address. Transactions leading up to the burn will remain on the blockchain. **Note**: Burning is possible only if the token is owned by the contract owner and the token has not been transferred/sold yet. #### Related: * If you want to update a minted NFT, see [Update a minted NFT](https://docs.nftport.xyz/docs/nftport/b3A6MjU2NTIyMTg-update-a-minted-nft). * If you want to burn a batch of NFTs, see [Batch burn minted NFTs]().
		 *
		 * @tags Product minting
		 * @name BurnNftV0MintsCustomizableDelete
		 * @summary Burn a minted NFT
		 * @request DELETE:/v0/mints/customizable
		 * @secure
		 */
		burnNftV0MintsCustomizableDelete: (data: BurnNftRequest, params: RequestParams = {}) =>
			this.http.request<BurnNftResponse, HTTPValidationError>({
				path: `/v0/mints/customizable`,
				method: 'DELETE',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * @description Batch mints NFTs to your previously deployed ERC1155 NFT product contract. This minting consists of multiple steps and enables you to customize the whole minting flow for your exact needs. Batch minting allows you to create multiple NFTs with one API call and create more than one of the same token. 1.  First, you need  ```contract_address```  using [Deploy a contract for NFT products](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzU-deploy-an-nft-contract). 2.  Secondly, you need  ```metadata_uri```  using [Upload metadata to IPFS](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzc-upload-metadata-to-ipfs). After minting, the NFTs will appear in the  ```mint_to_address```  wallet. If you minted to your own wallet, you can also see the minted NFTs on OpenSea in your profile after a few minutes. **You can mint up to 100 NFTs for free per chain. Maximum supported filesize is 20MB. For higher limits, see [pricing](https://www.nftport.xyz/pricing).** #### Useful for: * Minting to your own NFT product contracts effortlessly. * Creating customizable minting flows which enable to build NFT-based products. #### Related: * If you want to learn how to use [customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting), see [Customizable Minting Quickstart](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#customizable-minting). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODI-list-all-your-minted-nf-ts). * To see all your previous IPFS uploads, see [List all your IPFS uploads](https://docs.nftport.xyz/docs/nftport/b3A6NDQ1MDU3MzI-list-all-your-ipfs-uploads).
		 *
		 * @tags Product batch minting
		 * @name MintBatchNftV0MintsCustomizableBatchPost
		 * @summary Batch customizable minting (ERC1155)
		 * @request POST:/v0/mints/customizable/batch
		 * @secure
		 */
		mintBatchNftV0MintsCustomizableBatchPost: (
			data: MintBatchNftRequest,
			params: RequestParams = {}
		) =>
			this.http.request<MintBatchResponse, HTTPValidationError>({
				path: `/v0/mints/customizable/batch`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * @description Burns a batch of NFTs which have been previously minted with [Batch customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MzIxMzAwOTk-batch-customizable-minting-erc-1155). Burning an NFT means destroying it by sending it to a null (un-spendable) address. Transactions leading up to the burn will remain on the blockchain. **Note**: Burning is possible only if the token is owned by the contract owner and the token has not been transferred/sold yet. #### Related: * If you want to update a minted NFT, see [Update a minted NFT](https://docs.nftport.xyz/docs/nftport/b3A6MjU2NTIyMTg-update-a-minted-nft). * If you want to burn a single NFT, see [Burn a minted NFT]().
		 *
		 * @tags Product batch minting
		 * @name BurnBatchNftV0MintsCustomizableBatchDelete
		 * @summary Batch burn minted NFTs (ERC1155 only)
		 * @request DELETE:/v0/mints/customizable/batch
		 * @secure
		 */
		burnBatchNftV0MintsCustomizableBatchDelete: (
			data: BurnBatchNftRequest,
			params: RequestParams = {}
		) =>
			this.http.request<BurnNftResponse, HTTPValidationError>({
				path: `/v0/mints/customizable/batch`,
				method: 'DELETE',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * @description Transfers an NFT which has been previously minted with [Customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting) to another wallet address. **Note**: Transferring is possible only if the token is owned by the contract owner and the token has not been transferred/sold yet. #### Related: * If you want to update a minted NFT, see [Update a minted NFT](https://docs.nftport.xyz/docs/nftport/b3A6MjU2NTIyMTg-update-a-minted-nft). * If you want to transfer a batch of NFTs, see [Batch transfer minted NFTs]().
		 *
		 * @tags Product minting
		 * @name TransferNftV0MintsTransfersPost
		 * @summary Transfer a minted NFT
		 * @request POST:/v0/mints/transfers
		 * @secure
		 */
		transferNftV0MintsTransfersPost: (data: TransferNftRequest, params: RequestParams = {}) =>
			this.http.request<TransferNftResponse, HTTPValidationError>({
				path: `/v0/mints/transfers`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * @description Transfers a batch of NFTs which have been previously minted with [Batch customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MzIxMzAwOTk-batch-customizable-minting-erc-1155) to other wallet addresses. **Note**: Transferring is possible only if the token is owned by the contract owner and the token has not been transferred/sold yet. #### Related: * If you want to update a minted NFT, see [Update a minted NFT](https://docs.nftport.xyz/docs/nftport/b3A6MjU2NTIyMTg-update-a-minted-nft). * If you want to transfer a single NFTs, see [Transfer a minted NFT]().
		 *
		 * @tags Product batch minting
		 * @name TransferBatchNftV0MintsTransfersBatchPost
		 * @summary Batch transfer minted NFTs (ERC1155 only)
		 * @request POST:/v0/mints/transfers/batch
		 * @secure
		 */
		transferBatchNftV0MintsTransfersBatchPost: (
			data: TransferBatchNftRequest,
			params: RequestParams = {}
		) =>
			this.http.request<TransferNftResponse, HTTPValidationError>({
				path: `/v0/mints/transfers/batch`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * @description With Easy mint, you can turn anything into an NFT in less than 5 minutes using one simple API call. If you are new to minting, see  [Easy minting quickstart](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#easy-minting). After minting, the NFT will appear in the  ```mint_to_address```  wallet. If you minted to your own wallet, you can also see the minted NFT on OpenSea in your profile after a few minutes. **You can mint up to 100 NFTs for free per chain. Maximum supported file size is 20MB. For higher limits, see [pricing](https://www.nftport.xyz/pricing).** #### Useful for: * For turning anything into an NFT effortlessly. For all the benefits, see  [Your New Minting Superpowers](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#what-you-can-do-with-your-new-minting-superpowers). #### Related: * If you wish to customize the minting process e.g. use your own contract, see  [Customizable minting](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#advanced-minting-apis). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODI-list-all-your-minted-nf-ts).
		 *
		 * @tags Easy minting
		 * @name EasyMintNftV0MintsEasyUrlsPost
		 * @summary Easy minting w/URL
		 * @request POST:/v0/mints/easy/urls
		 * @secure
		 */
		easyMintNftV0MintsEasyUrlsPost: (data: EasyMintNftRequest, params: RequestParams = {}) =>
			this.http.request<MintNftWithUploadResponse, HTTPValidationError>({
				path: `/v0/mints/easy/urls`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * @description With Easy mint, you can turn anything into an NFT in less than 5 minutes using one simple API call. If you are new to minting, see  [Easy minting quickstart](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#easy-minting). After minting, the NFT will appear in the  ```mint_to_address```  wallet. If you minted to your own wallet, you can also see the minted NFT on OpenSea in your profile after a few minutes. **You can mint up to 100 NFTs for free per chain. Maximum supported file size is 20MB. For higher limits, see [pricing](https://www.nftport.xyz/pricing).** #### Useful for: * For turning anything into an NFT effortlessly. For all the benefits, see  [Your New Minting Superpowers](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#what-you-can-do-with-your-new-minting-superpowers). #### Related: * If you wish to customize the minting process e.g. use your own contract, see  [Customizable minting](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#advanced-minting-apis). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODI-list-all-your-minted-nf-ts). #### Example Requests in cURL, Python & JS <!-- title: "Make sure to replace the parameters with your own values" lineNumbers: true --> ```shell curl --request POST \ --url 'https://api.nftport.xyz/v0/mints/easy/files?chain=polygon&name=NFT_Name&description=NFT_Description&mint_to_address=0x...' \ --header 'Authorization: API Key Here' \ --header 'Content-Type: multipart/form-data' \ --form 'file=@/path/to/file_to_upload.png;type=image/png' ``` ```python import requests file = open("image.png", "rb") query_params = { "chain": "polygon", "name": "NFT_Name", "description": "NFT_Description", "mint_to_address": Wallet_Address } response = requests.post( "https://api.nftport.xyz/v0/mints/easy/files", headers={"Authorization": "API-Key-Here"}, params=query_params, files={"file": file} ) ``` ```javascript const fs = require('fs'); const fetch = require('node-fetch'); const FormData = require('form-data'); const form = new FormData(); const fileStream = fs.createReadStream('/path/to/file_to_upload.png'); form.append('file', fileStream); const options = { method: 'POST', body: form, headers: { "Authorization": "API-Key-Here", }, }; fetch("https://api.nftport.xyz/v0/mints/easy/files?" + new URLSearchParams({ chain: 'polygon', name: "NFT_Name", description: "NFT_Description", mint_to_address: "Wallet_Address", }), options) .then(function(response) { return response.json() }) .then(function(responseJson) { // Handle the response console.log(responseJson); }) ```
		 *
		 * @tags Easy minting
		 * @name EasyMintNftWithUploadV0MintsEasyFilesPost
		 * @summary Easy minting w/file upload
		 * @request POST:/v0/mints/easy/files
		 * @secure
		 */
		easyMintNftWithUploadV0MintsEasyFilesPost: (
			query: EasyMintNftWithUploadV0MintsEasyFilesPostParams,
			data: BodyEasyMintNftWithUploadV0MintsEasyFilesPost,
			params: RequestParams = {}
		) =>
			this.http.request<MintNftWithUploadResponse, HTTPValidationError>({
				path: `/v0/mints/easy/files`,
				method: 'POST',
				query: query,
				body: data,
				secure: true,
				type: ContentType.FormData,
				format: 'json',
				...params
			}),

		/**
		 * @description Returns the details of a minted NFT. You need to provide  ```transaction_hash```  which is returned from [Easy minting w/URL](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDM-easy-minting-w-url), [Easy minting w/file upload](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDQ-easy-minting-w-file-upload) or [Customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting). Minting is not instantaneous because blockchains take time to verify transactions. Thus, you can poll this endpoint every 5 seconds until you get a response. #### Useful for: * Confirming that NFT minting was successful and the NFT is on chain. #### Related: * For easy minting, see [Easy minting w/URL](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDM-easy-minting-w-url) or [Easy minting w/file upload](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDQ-easy-minting-w-file-upload). * For customizable minting, see [Customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting). * If you wish to list all your previously minted NFTs, see [List all your minted NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODI-list-all-your-minted-nf-ts). * To see all your previous IPFS uploads, see [List all your IPFS uploads](https://docs.nftport.xyz/docs/nftport/b3A6NDQ1MDU3MzI-list-all-your-ipfs-uploads).
		 *
		 * @tags
		 * @name GetMintedNftV0MintsTransactionHashGet
		 * @summary Retrieve a minted NFT
		 * @request GET:/v0/mints/{transaction_hash}
		 * @secure
		 */
		getMintedNftV0MintsTransactionHashGet: (
			{ transactionHash, ...query }: GetMintedNftV0MintsTransactionHashGetParams,
			params: RequestParams = {}
		) =>
			this.http.request<GetMintedNftResponse, HTTPValidationError>({
				path: `/v0/mints/${transactionHash}`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Returns the details of a batch minted NFTs for ERC1155 contracts. You need to provide  ```transaction_hash```  which is returned from [Batch customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MzIxMzAwOTk-batch-customizable-minting-erc-1155). Minting is not instantaneous because blockchains take time to verify transactions. Thus, you can poll this endpoint every 5 seconds until you get a response. #### Useful for: * Confirming that NFT minting was successful and the NFTs are on chain. #### Related: * For batch customizable minting, see [Batch customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MzIxMzAwOTk-batch-customizable-minting-erc-1155).
		 *
		 * @tags Product batch minting
		 * @name GetBatchMintedNftV0MintsBatchTransactionHashGet
		 * @summary Retrieve batch minted NFTs
		 * @request GET:/v0/mints/batch/{transaction_hash}
		 * @secure
		 */
		getBatchMintedNftV0MintsBatchTransactionHashGet: (
			{ transactionHash, ...query }: GetBatchMintedNftV0MintsBatchTransactionHashGetParams,
			params: RequestParams = {}
		) =>
			this.http.request<GetBatchMintedNftResponse, HTTPValidationError>({
				path: `/v0/mints/batch/${transactionHash}`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Returns a list of all the contracts you’ve previously deployed with [Deploy a contract for NFT products](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzU-deploy-an-nft-contract). #### Useful for: * Retrieving your contract creation history. #### Related: * To see all the NFTs you've previously minted, see [List all your minted NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODI-list-all-your-minted-nf-ts). * To see all your previous IPFS uploads, see [List all your IPFS uploads](https://docs.nftport.xyz/docs/nftport/b3A6NDQ1MDU3MzI-list-all-your-ipfs-uploads).
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
				method: 'GET',
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Returns the ABI for a contract you’ve previously deployed with [Deploy a contract for NFT products](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzU-deploy-an-nft-contract) or [Deploy a contract for NFT collections](https://docs.nftport.xyz/docs/nftport/b3A6Mzk2MjA1MzQ-deploy-an-nft-collection-contract). #### Useful for: * Retrieving your contract ABI, for direct on-chain contract calls. #### Related: * To see all the contracts you've previously deployed, see [List all your deployed contracts](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODE-list-all-your-deployed-contracts). * If you want to learn how to use the [customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting), see [Customizable Minting Quickstart](https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#customizable-minting).
		 *
		 * @tags User
		 * @name GetUserContractsAbisV0MeContractsAbisContractAddressGet
		 * @summary Get contract ABI
		 * @request GET:/v0/me/contracts/abis/{contract_address}
		 * @secure
		 */
		getUserContractsAbisV0MeContractsAbisContractAddressGet: (
			{ contractAddress, ...query }: GetUserContractsAbisV0MeContractsAbisContractAddressGetParams,
			params: RequestParams = {}
		) =>
			this.http.request<GetUserProfileContractsABIsResponse, HTTPValidationError>({
				path: `/v0/me/contracts/abis/${contractAddress}`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Returns a list of all the collection contracts you’ve previously deployed. It can also return merkle proofs of all the whitelisted addresses with `include` set to `merkle_proofs`. These proofs can be used during presale/whitelisted minting. A Merkle proof is a series of hashes which can be combined with the Merkle tree root and and the node (address) it was generated for, to verify that the node is contained in the Merkle tree without having access to the entire tree. #### Useful for: * Retrieving collection-specific contract details. * Retrieving your collection contract creation history. * Getting merkle proofs of whitelisted addresses.
		 *
		 * @tags User
		 * @name GetUserContractsCollectionV0MeContractsCollectionsGet
		 * @summary List all your deployed collection contracts
		 * @request GET:/v0/me/contracts/collections
		 * @secure
		 */
		getUserContractsCollectionV0MeContractsCollectionsGet: (
			query: GetUserContractsCollectionV0MeContractsCollectionsGetParams,
			params: RequestParams = {}
		) =>
			this.http.request<GetUserProfileContractsCollectionsResponse, HTTPValidationError>({
				path: `/v0/me/contracts/collections`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Returns a list of all the NFTs you’ve previously minted with [Easy minting w/URL](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDM-easy-minting-w-url), [Easy minting w/file upload](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDQ-easy-minting-w-file-upload) or [Customizable minting](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting). For recently minted NFTs, it may take a few minutes until they appear in this response. #### Useful for: * Retrieving your NFT minting history. #### Related: * To see all the contracts you've previously deployed, see [List all your deployed contracts](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODE-list-all-your-deployed-contracts). * To see all your previous IPFS uploads, see [List all your IPFS uploads](https://docs.nftport.xyz/docs/nftport/b3A6NDQ1MDU3MzI-list-all-your-ipfs-uploads).
		 *
		 * @tags User
		 * @name GetUserMintedNftsV0MeMintsGet
		 * @summary List all your minted NFTs
		 * @request GET:/v0/me/mints
		 * @secure
		 */
		getUserMintedNftsV0MeMintsGet: (
			query: GetUserMintedNftsV0MeMintsGetParams,
			params: RequestParams = {}
		) =>
			this.http.request<GetUserProfileMintedNftsResponse, HTTPValidationError>({
				path: `/v0/me/mints`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Returns a list of all data uploaded to IPFS by you. This includes files, metadata and directories uploaded to IPFS. **Note: Only lists IPFS uploads created after 2022-03-21T12:10:00 UTC.** #### Useful for: * Retrieving your uploaded data to IPFS. #### Related: * To see all the NFTs you've previously minted, see [List all your minted NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODI-list-all-your-minted-nf-ts).
		 *
		 * @tags User
		 * @name GetUserStorageV0MeStorageGet
		 * @summary List all your IPFS uploads
		 * @request GET:/v0/me/storage
		 * @secure
		 */
		getUserStorageV0MeStorageGet: (
			query: GetUserStorageV0MeStorageGetParams,
			params: RequestParams = {}
		) =>
			this.http.request<GetUserProfileStorageResponse, HTTPValidationError>({
				path: `/v0/me/storage`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Retrieve your NFTPort settings to check your usage and limits. #### Useful for: * Checking your minting and contract deployment usage and limits. * Checking your NFT Data rate limits #### Related: * You can access the same information on your [NFTPort dashboard](https://dashboard.nftport.xyz). * To see your minted NFTs, see [List all your minted NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODI-list-all-your-minted-nf-ts). * To see your deployed contracts, see [List all your deployed contracts](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODE-list-all-your-deployed-contracts).
		 *
		 * @tags User
		 * @name GetUserSettingsV0MeSettingsGet
		 * @summary User settings
		 * @request GET:/v0/me/settings
		 * @secure
		 */
		getUserSettingsV0MeSettingsGet: (params: RequestParams = {}) =>
			this.http.request<GetUserProfileSettingsResponse, any>({
				path: `/v0/me/settings`,
				method: 'GET',
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Searches NFTs across multiple chains using a text query, specifically the ```name``` and ```description``` fields from the metadata. You can think of it like performing a search on Google. It's designed to help you find the one or the most closest NFT results you're looking for. Ethereum and Polygon are supported, including multi-chain search. #### Useful for: * Finding NFTs by their name and/or description. * Quickly integrating NFT search to your application. #### Related: * To get NFT recommendations, use [Recommend similar NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4MzI-find-similar-nf-ts-w-url). * To find duplicate NFTs, use [Find duplicate NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODY-find-counterfeit-nf-ts-w-file-upload).
		 *
		 * @tags Search
		 * @name TextSearchV0SearchGet
		 * @summary Multi-chain NFT search
		 * @request GET:/v0/search
		 * @secure
		 */
		textSearchV0SearchGet: (query: TextSearchV0SearchGetParams, params: RequestParams = {}) =>
			this.http.request<TextSearchResponse, HTTPValidationError>({
				path: `/v0/search`,
				method: 'GET',
				query: query,
				secure: true,
				format: 'json',
				...params
			}),

		/**
		 * @description Returns visually and contextually similar images to the input image passed with ```url```. Uses state of the art computer vision AI to match the input image against all ETH & Polygon NFT images in our database. You can think of it like Google reverse image search. You can see this functionality live with [Fingible](https://fingible.nftport.xyz/). **Maximum supported file size is 20MB.** #### Useful for: * Providing recommendations to your users e.g. like Amazon, Netflix so you can increase revenue. * Building new AI-based products and experiences for your users such as [Google for NFTs](https://fingible.nftport.xyz/). #### Related: * For searching for NFTs with keywords, see [Multi-chain NFT search](https://docs.nftport.xyz/docs/nftport/b3A6MjA0MjY5MjE-multi-chain-nft-search). * For finding duplicates/copies of NFTs, see [Find duplicate NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODY-find-counterfeit-nf-ts-w-file-upload).
		 *
		 * @tags Recommendations AI
		 * @name SearchUrlV0RecommendationsSimilarNftsUrlsPost
		 * @summary Find similar NFTs w/URL
		 * @request POST:/v0/recommendations/similar_nfts/urls
		 * @secure
		 */
		searchUrlV0RecommendationsSimilarNftsUrlsPost: (
			data: SearchUrlRequest,
			params: RequestParams = {}
		) =>
			this.http.request<SearchResult, HTTPValidationError>({
				path: `/v0/recommendations/similar_nfts/urls`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * @description Returns visually and contextually similar images to the uploaded image with  ```file```. Uses state of the art computer vision AI to match the input image against all ETH & Polygon NFT images in our database. You can think of it like Google reverse image search. You can see this functionality live with  [Fingible](https://fingible.nftport.xyz/). **Maximum supported file size is 20MB.** #### Useful for: * Providing recommendations to your users e.g. like Amazon, Netflix so you can increase revenue. * Building new AI-based products and experiences for your users such as  [Google for NFTs](https://fingible.nftport.xyz/). #### Related: * For searching for NFTs with keywords, see [Multi-chain NFT search](https://docs.nftport.xyz/docs/nftport/b3A6MjA0MjY5MjE-multi-chain-nft-search). * For finding duplicates/copies of NFTs, see [Find duplicate NFTs](https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzODY-find-counterfeit-nf-ts-w-file-upload).
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
			params: RequestParams = {}
		) =>
			this.http.request<SearchResult, HTTPValidationError>({
				path: `/v0/recommendations/similar_nfts/files`,
				method: 'POST',
				query: query,
				body: data,
				secure: true,
				type: ContentType.FormData,
				format: 'json',
				...params
			}),

		/**
		 * @description Analyzes the input image passed with ```file``` and returns duplicates (i.e. counterfeits) against it. Uses state of the art computer vision AI to match the input image against all ETH & Polygon NFT images in our database and returns duplicates which pass the ```threshold```. **Supported file formats: JPG, JPEG, PNG, PPM, BMP, PGM, TIF, TIFF, WebP.** #### Useful for: * **Increase customer trust and lower fraud** - enable users to see if an NFT is unique or already minted/sold somewhere else by showing information on existing duplicate NFTs. * **Credit and protect creators** - build processes that defend against IP theft and/or credit the original authors when their work has been used in similar NFTs. * **Enable and attract large IP holders (e.g. Disney)** to upload content as NFTs by ensuring automatic copyright protection (similar to YouTube's Content ID). * **Finding original owner** - find the NFT owner simply with the NFT image. #### Related: * To find similar NFTs which can be used as recommendations, see [Find similar NFTs w/URL](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4MzI-find-similar-nf-ts-w-url) or [Find similar NFTs w/file upload](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4MzM-find-similar-nf-ts-w-file-upload).
		 *
		 * @tags Duplicate Detection AI
		 * @name SimilarNftsV0DuplicatesFilesPost
		 * @summary Find counterfeit NFTs w/file upload
		 * @request POST:/v0/duplicates/files
		 * @secure
		 */
		similarNftsV0DuplicatesFilesPost: (
			query: SimilarNftsV0DuplicatesFilesPostParams,
			data: BodySimilarNftsV0DuplicatesFilesPost,
			params: RequestParams = {}
		) =>
			this.http.request<ContentIdResponse, HTTPValidationError>({
				path: `/v0/duplicates/files`,
				method: 'POST',
				query: query,
				body: data,
				secure: true,
				type: ContentType.FormData,
				format: 'json',
				...params
			}),

		/**
		 * @description Analyzes the input image passed with ```url``` and returns duplicates (i.e. counterfeits) against it. Uses state of the art computer vision AI to match the input image against all ETH & Polygon NFT images in our database and returns duplicates which pass the ```threshold```. **Supported file formats: JPG, JPEG, PNG, PPM, BMP, PGM, TIF, TIFF, WebP.** #### Useful for: * **Increase customer trust and lower fraud** - enable users to see if an NFT is unique or already minted/sold somewhere else by showing information on existing duplicate NFTs. * **Credit and protect creators** - build processes that defend against IP theft and/or credit the original authors when their work has been used in similar NFTs. * **Enable and attract large IP holders (e.g. Disney)** to upload content as NFTs by ensuring automatic copyright protection (similar to YouTube's Content ID). * **Finding original owner** - find the NFT owner simply with the NFT image. #### Related: * To find similar NFTs which can be used as recommendations, see [Find similar NFTs w/URL](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4MzI-find-similar-nf-ts-w-url) or [Find similar NFTs w/file upload](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4MzM-find-similar-nf-ts-w-file-upload).
		 *
		 * @tags Duplicate Detection AI
		 * @name SimilarNftsUrlV0DuplicatesUrlsPost
		 * @summary Find counterfeit NFTs w/url
		 * @request POST:/v0/duplicates/urls
		 * @secure
		 */
		similarNftsUrlV0DuplicatesUrlsPost: (data: ContentIdUrlRequest, params: RequestParams = {}) =>
			this.http.request<ContentIdResponse, HTTPValidationError>({
				path: `/v0/duplicates/urls`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * @description Analyzes the input nft image passed with ```chain```,  ```contract_address``` and  ```token_id```,  and returns duplicates (i.e. counterfeits) against it. Uses state of the art computer vision AI to match the input image against all ETH & Polygon NFT images in our database and returns duplicates which pass the ```threshold```. **Supported file formats: JPG, JPEG, PNG, PPM, BMP, PGM, TIF, TIFF, WebP.** #### Useful for: * **Increase customer trust and lower fraud** - enable users to see if an NFT is unique or already minted/sold somewhere else by showing information on existing duplicate NFTs. * **Credit and protect creators** - build processes that defend against IP theft and/or credit the original authors when their work has been used in similar NFTs. * **Enable and attract large IP holders (e.g. Disney)** to upload content as NFTs by ensuring automatic copyright protection (similar to YouTube's Content ID). * **Finding original owner** - find the NFT owner simply with the NFT image. #### Related: * To find similar NFTs which can be used as recommendations, see [Find similar NFTs w/URL](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4MzI-find-similar-nf-ts-w-url) or [Find similar NFTs w/file upload](https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM4MzM-find-similar-nf-ts-w-file-upload).
		 *
		 * @tags Duplicate Detection AI
		 * @name SimilarNftsAddressV0DuplicatesTokensPost
		 * @summary Find counterfeit NFTs w/token ID
		 * @request POST:/v0/duplicates/tokens
		 * @secure
		 */
		similarNftsAddressV0DuplicatesTokensPost: (
			data: ContentIdNftRequest,
			params: RequestParams = {}
		) =>
			this.http.request<ContentIdResponse, HTTPValidationError>({
				path: `/v0/duplicates/tokens`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params
			})
	};
}
