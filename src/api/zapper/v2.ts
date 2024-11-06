/**
 * Zapper API
 * 2.0
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "@oazapfts/runtime";
import * as QS from "@oazapfts/runtime/query";
export const defaults: Oazapfts.Defaults<Oazapfts.CustomHeaders> = {
    headers: {},
    baseUrl: "https://api.zapper.xyz",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
    server1: "https://api.zapper.xyz"
};
export type GasPricesResponse = {
    /** Standard gas price (gwei) */
    standard: object;
    /** Fast gas price (gwei) */
    fast: object;
    /** Instant gas price (gwei) */
    instant: object;
    /** Is gas price according to EIP1559 */
    eip1559: boolean;
};
/**
 * Application Positions
 */
export function appContractPositionLegacyControllerGetContractPositions(appSlug: string, network: "ethereum" | "polygon" | "optimism" | "gnosis" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum" | "celo" | "harmony" | "moonriver" | "bitcoin" | "cronos" | "aurora" | "evmos" | "base" | "blast" | "solana" | "degen" | "mode" | "zksync" | "mantle" | "scroll" | "moonbeam" | "linea" | "zora" | "metis" | "worldchain" | "shape" | "opbnb" | "apechain" | "morph" | "bob", groupId: string, { limit, skip }: {
    limit?: any;
    skip?: any;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/apps/${encodeURIComponent(appSlug)}/positions${QS.query(QS.explode({
        network,
        groupId,
        limit,
        skip
    }))}`, {
        ...opts
    }));
}
export function appControllerGetApps(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/v2/apps", {
        ...opts
    }));
}
export function appControllerGetApp(appSlug: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/apps/${encodeURIComponent(appSlug)}`, {
        ...opts
    }));
}
/**
 * Application Tokens
 */
export function appTokenControllerGetAppTokens(appSlug: string, network: "ethereum" | "polygon" | "optimism" | "gnosis" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum" | "celo" | "harmony" | "moonriver" | "bitcoin" | "cronos" | "aurora" | "evmos" | "base" | "blast" | "solana" | "degen" | "mode" | "zksync" | "mantle" | "scroll" | "moonbeam" | "linea" | "zora" | "metis" | "worldchain" | "shape" | "opbnb" | "apechain" | "morph" | "bob", groupId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/apps/${encodeURIComponent(appSlug)}/tokens${QS.query(QS.explode({
        network,
        groupId
    }))}`, {
        ...opts
    }));
}
export function nftBalanceControllerGetNetWorth(addresses: string[], { withOverrides }: {
    withOverrides?: boolean;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/nft/balances/net-worth${QS.query(QS.explode({
        "addresses[]": addresses,
        withOverrides
    }))}`, {
        ...opts
    }));
}
export function nftBalanceControllerGetBalanceCollections(addresses: string[], { minCollectionValueUsd, search, collectionAddresses, collectionLookUpParams, network, limit, cursor }: {
    minCollectionValueUsd?: string;
    search?: string;
    collectionAddresses?: string[];
    collectionLookUpParams?: string[];
    network?: "ethereum" | "polygon" | "optimism" | "gnosis" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum" | "celo" | "harmony" | "moonriver" | "bitcoin" | "cronos" | "aurora" | "evmos" | "base" | "blast" | "solana" | "degen" | "mode" | "zksync" | "mantle" | "scroll" | "moonbeam" | "linea" | "zora" | "metis" | "worldchain" | "shape" | "opbnb" | "apechain" | "morph" | "bob";
    limit?: string;
    cursor?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/nft/balances/collections${QS.query(QS.explode({
        "addresses[]": addresses,
        minCollectionValueUsd,
        search,
        "collectionAddresses[]": collectionAddresses,
        "collectionLookUpParams[]": collectionLookUpParams,
        network,
        limit,
        cursor
    }))}`, {
        ...opts
    }));
}
export function nftBalanceControllerGetBalanceCollectionsTotals(addresses: string[], { minCollectionValueUsd, search, collectionAddresses, collectionLookUpParams, network }: {
    minCollectionValueUsd?: string;
    search?: string;
    collectionAddresses?: string[];
    collectionLookUpParams?: string[];
    network?: "ethereum" | "polygon" | "optimism" | "gnosis" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum" | "celo" | "harmony" | "moonriver" | "bitcoin" | "cronos" | "aurora" | "evmos" | "base" | "blast" | "solana" | "degen" | "mode" | "zksync" | "mantle" | "scroll" | "moonbeam" | "linea" | "zora" | "metis" | "worldchain" | "shape" | "opbnb" | "apechain" | "morph" | "bob";
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/nft/balances/collections-totals${QS.query(QS.explode({
        "addresses[]": addresses,
        minCollectionValueUsd,
        search,
        "collectionAddresses[]": collectionAddresses,
        "collectionLookUpParams[]": collectionLookUpParams,
        network
    }))}`, {
        ...opts
    }));
}
export function nftBalanceControllerGetUserTokens(userAddress: string, { network, limit, cursor }: {
    network?: "ethereum" | "polygon" | "optimism" | "gnosis" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum" | "celo" | "harmony" | "moonriver" | "bitcoin" | "cronos" | "aurora" | "evmos" | "base" | "blast" | "solana" | "degen" | "mode" | "zksync" | "mantle" | "scroll" | "moonbeam" | "linea" | "zora" | "metis" | "worldchain" | "shape" | "opbnb" | "apechain" | "morph" | "bob";
    limit?: string;
    cursor?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/nft/user/tokens${QS.query(QS.explode({
        userAddress,
        network,
        limit,
        cursor
    }))}`, {
        ...opts
    }));
}
export function nftBalanceControllerGetBalanceTokens(addresses: string[], { minEstimatedValueUsd, search, collectionAddresses, collectionLookUpParams, network, limit, cursor }: {
    minEstimatedValueUsd?: string;
    search?: string;
    collectionAddresses?: string[];
    collectionLookUpParams?: string[];
    network?: "ethereum" | "polygon" | "optimism" | "gnosis" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum" | "celo" | "harmony" | "moonriver" | "bitcoin" | "cronos" | "aurora" | "evmos" | "base" | "blast" | "solana" | "degen" | "mode" | "zksync" | "mantle" | "scroll" | "moonbeam" | "linea" | "zora" | "metis" | "worldchain" | "shape" | "opbnb" | "apechain" | "morph" | "bob";
    limit?: string;
    cursor?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/nft/balances/tokens${QS.query(QS.explode({
        "addresses[]": addresses,
        minEstimatedValueUsd,
        search,
        "collectionAddresses[]": collectionAddresses,
        "collectionLookUpParams[]": collectionLookUpParams,
        network,
        limit,
        cursor
    }))}`, {
        ...opts
    }));
}
export function nftBalanceControllerGetBalanceTokensTotals(addresses: string[], { minEstimatedValueUsd, search, collectionAddresses, collectionLookUpParams, network }: {
    minEstimatedValueUsd?: string;
    search?: string;
    collectionAddresses?: string[];
    collectionLookUpParams?: string[];
    network?: "ethereum" | "polygon" | "optimism" | "gnosis" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum" | "celo" | "harmony" | "moonriver" | "bitcoin" | "cronos" | "aurora" | "evmos" | "base" | "blast" | "solana" | "degen" | "mode" | "zksync" | "mantle" | "scroll" | "moonbeam" | "linea" | "zora" | "metis" | "worldchain" | "shape" | "opbnb" | "apechain" | "morph" | "bob";
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/nft/balances/tokens-totals${QS.query(QS.explode({
        "addresses[]": addresses,
        minEstimatedValueUsd,
        search,
        "collectionAddresses[]": collectionAddresses,
        "collectionLookUpParams[]": collectionLookUpParams,
        network
    }))}`, {
        ...opts
    }));
}
export function nftCollectionControllerGetCollection(address: string, network: any, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/nft/collection/${encodeURIComponent(network)}/${encodeURIComponent(address)}`, {
        ...opts
    }));
}
export function nftCollectionControllerGetCollectionToken(address: string, network: any, tokenId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/nft/collection/${encodeURIComponent(network)}/${encodeURIComponent(address)}/${encodeURIComponent(tokenId)}`, {
        ...opts
    }));
}
export function nftCollectionControllerGetCollectionTokens(collectionAddress: string, network: "ethereum" | "polygon" | "optimism" | "gnosis" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum" | "celo" | "harmony" | "moonriver" | "bitcoin" | "cronos" | "aurora" | "evmos" | "base" | "blast" | "solana" | "degen" | "mode" | "zksync" | "mantle" | "scroll" | "moonbeam" | "linea" | "zora" | "metis" | "worldchain" | "shape" | "opbnb" | "apechain" | "morph" | "bob", { limit, cursor, tokenIds }: {
    limit?: any;
    cursor?: string;
    tokenIds?: string[];
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/nft/collection/tokens${QS.query(QS.explode({
        collectionAddress,
        network,
        limit,
        cursor,
        "tokenIds[]": tokenIds
    }))}`, {
        ...opts
    }));
}
/**
 * API Client Points
 */
export function apiClientControllerPoints(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/v2/api-clients/points", {
        ...opts
    }));
}
/**
 * Token Prices
 */
export function pricesControllerListPricesV3({ network }: {
    network?: "ethereum" | "polygon" | "optimism" | "gnosis" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum" | "celo" | "harmony" | "moonriver" | "bitcoin" | "cronos" | "aurora" | "evmos" | "base" | "blast" | "solana" | "degen" | "mode" | "zksync" | "mantle" | "scroll" | "moonbeam" | "linea" | "zora" | "metis" | "worldchain" | "shape" | "opbnb" | "apechain" | "morph" | "bob";
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/prices${QS.query(QS.explode({
        network
    }))}`, {
        ...opts
    }));
}
/**
 * Gas Price
 */
export function gasPriceControllerGetGasPrice(eip1559: boolean, { network }: {
    network?: "ethereum" | "polygon" | "optimism" | "gnosis" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum" | "celo" | "harmony" | "moonriver" | "bitcoin" | "cronos" | "aurora" | "evmos" | "base" | "blast" | "solana" | "degen" | "mode" | "zksync" | "mantle" | "scroll" | "moonbeam" | "linea" | "zora" | "metis" | "worldchain" | "shape" | "opbnb" | "apechain" | "morph" | "bob";
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: GasPricesResponse;
    }>(`/v2/gas-prices${QS.query(QS.explode({
        network,
        eip1559
    }))}`, {
        ...opts
    }));
}
/**
 * Balances
 */
export function appBalanceControllerGetAppBalances(addresses: string[], { networks }: {
    networks?: ("ethereum" | "polygon" | "optimism" | "gnosis" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum" | "celo" | "harmony" | "moonriver" | "bitcoin" | "cronos" | "aurora" | "evmos" | "base" | "blast" | "solana" | "degen" | "mode" | "zksync" | "mantle" | "scroll" | "moonbeam" | "linea" | "zora" | "metis" | "worldchain" | "shape" | "opbnb" | "apechain" | "morph" | "bob")[];
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/balances/apps${QS.query(QS.explode({
        "addresses[]": addresses,
        "networks[]": networks
    }))}`, {
        ...opts
    }));
}
/**
 * Balances
 */
export function appBalanceControllerPostAppBalances(addresses: string[], { networks }: {
    networks?: ("ethereum" | "polygon" | "optimism" | "gnosis" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum" | "celo" | "harmony" | "moonriver" | "bitcoin" | "cronos" | "aurora" | "evmos" | "base" | "blast" | "solana" | "degen" | "mode" | "zksync" | "mantle" | "scroll" | "moonbeam" | "linea" | "zora" | "metis" | "worldchain" | "shape" | "opbnb" | "apechain" | "morph" | "bob")[];
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/balances/apps${QS.query(QS.explode({
        "addresses[]": addresses,
        "networks[]": networks
    }))}`, {
        ...opts,
        method: "POST"
    }));
}
/**
 * Balances
 */
export function appBalanceControllerGetBalanceJobStatus(jobId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/balances/job-status${QS.query(QS.explode({
        jobId
    }))}`, {
        ...opts
    }));
}
/**
 * Balances
 */
export function tokenBalanceControllerGetTokenBalances(addresses: string[], { networks }: {
    networks?: ("ethereum" | "polygon" | "optimism" | "gnosis" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum" | "celo" | "harmony" | "moonriver" | "bitcoin" | "cronos" | "aurora" | "evmos" | "base" | "blast" | "solana" | "degen" | "mode" | "zksync" | "mantle" | "scroll" | "moonbeam" | "linea" | "zora" | "metis" | "worldchain" | "shape" | "opbnb" | "apechain" | "morph" | "bob")[];
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/balances/tokens${QS.query(QS.explode({
        "addresses[]": addresses,
        "networks[]": networks
    }))}`, {
        ...opts
    }));
}
/**
 * Balances
 */
export function tokenBalanceControllerPostTokenBalances(addresses: string[], { networks }: {
    networks?: ("ethereum" | "polygon" | "optimism" | "gnosis" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum" | "celo" | "harmony" | "moonriver" | "bitcoin" | "cronos" | "aurora" | "evmos" | "base" | "blast" | "solana" | "degen" | "mode" | "zksync" | "mantle" | "scroll" | "moonbeam" | "linea" | "zora" | "metis" | "worldchain" | "shape" | "opbnb" | "apechain" | "morph" | "bob")[];
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/balances/tokens${QS.query(QS.explode({
        "addresses[]": addresses,
        "networks[]": networks
    }))}`, {
        ...opts,
        method: "POST"
    }));
}
/**
 * Get Channels
 */
export function chatChannelControllerGetChannels({ first, after }: {
    first?: number;
    after?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/channels${QS.query(QS.explode({
        first,
        after
    }))}`, {
        ...opts
    }));
}
/**
 * Get Channel
 */
export function chatChannelControllerGetChannel(id: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/channel${QS.query(QS.explode({
        id
    }))}`, {
        ...opts
    }));
}
/**
 * Exchange Price
 */
export function exchangeControllerGetExchangePrice(sellTokenAddress: string, buyTokenAddress: string, { gasPrice, maxFeePerGas, maxPriorityFeePerGas, sellAmount, buyAmount, ownerAddress, slippagePercentage, network, feeRecipient, feeAsFraction }: {
    gasPrice?: string;
    maxFeePerGas?: string;
    maxPriorityFeePerGas?: string;
    sellAmount?: string;
    buyAmount?: string;
    ownerAddress?: string;
    slippagePercentage?: number;
    network?: "ethereum" | "polygon" | "optimism" | "gnosis" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum" | "celo" | "harmony" | "moonriver" | "bitcoin" | "cronos" | "aurora" | "evmos" | "base" | "blast" | "solana" | "degen" | "mode" | "zksync" | "mantle" | "scroll" | "moonbeam" | "linea" | "zora" | "metis" | "worldchain" | "shape" | "opbnb" | "apechain" | "morph" | "bob";
    feeRecipient?: string;
    feeAsFraction?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/exchange/price${QS.query(QS.explode({
        gasPrice,
        maxFeePerGas,
        maxPriorityFeePerGas,
        sellTokenAddress,
        buyTokenAddress,
        sellAmount,
        buyAmount,
        ownerAddress,
        slippagePercentage,
        network,
        feeRecipient,
        feeAsFraction
    }))}`, {
        ...opts
    }));
}
/**
 * Exchange Quote
 */
export function exchangeControllerGetExchangeQuote(sellTokenAddress: string, buyTokenAddress: string, ownerAddress: string, slippagePercentage: number, { gasPrice, maxFeePerGas, maxPriorityFeePerGas, sellAmount, buyAmount, network, feeRecipient, feeAsFraction }: {
    gasPrice?: string;
    maxFeePerGas?: string;
    maxPriorityFeePerGas?: string;
    sellAmount?: string;
    buyAmount?: string;
    network?: "ethereum" | "polygon" | "optimism" | "gnosis" | "binance-smart-chain" | "fantom" | "avalanche" | "arbitrum" | "celo" | "harmony" | "moonriver" | "bitcoin" | "cronos" | "aurora" | "evmos" | "base" | "blast" | "solana" | "degen" | "mode" | "zksync" | "mantle" | "scroll" | "moonbeam" | "linea" | "zora" | "metis" | "worldchain" | "shape" | "opbnb" | "apechain" | "morph" | "bob";
    feeRecipient?: string;
    feeAsFraction?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/v2/exchange/quote${QS.query(QS.explode({
        gasPrice,
        maxFeePerGas,
        maxPriorityFeePerGas,
        sellTokenAddress,
        buyTokenAddress,
        sellAmount,
        buyAmount,
        ownerAddress,
        slippagePercentage,
        network,
        feeRecipient,
        feeAsFraction
    }))}`, {
        ...opts
    }));
}
/**
 * Supported exchanges
 */
export function exchangeControllerGetSupportedExchanges(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/v2/exchange/supported", {
        ...opts
    }));
}
