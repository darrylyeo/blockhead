import type { Ethereum } from '../networks/types'

export const alchemyProviderConfigs: {
	label: string,
	subdomain: string,
	networkSlug: Ethereum.NetworkSlug,
}[] = [
    {
        label: 'mainnet',
        subdomain: 'eth-mainnet',
        networkSlug: 'ethereum',
    },
    {
        label: 'rinkeby',
        subdomain: 'eth-rinkeby',
        networkSlug: 'ethereum-rinkeby',
    },
    {
        label: 'goerli',
        subdomain: 'eth-goerli',
        networkSlug: 'ethereum-goerli',
    },
    {
        label: 'sepolia',
        subdomain: 'eth-sepolia',
        networkSlug: 'ethereum-sepolia',
    },
    {
        label: 'arbitrum',
        subdomain: 'arb-mainnet',
        networkSlug: 'arbitrum-one',
    },
    {
        label: 'arbitrum-goerli',
        subdomain: 'arb-goerli',
        networkSlug: 'arbitrum-goerli',
    },
    {
        label: 'matic',
        subdomain: 'polygon-mainnet',
        networkSlug: 'polygon',
    },
    {
        label: 'matic-mumbai',
        subdomain: 'polygon-mumbai',
        networkSlug: 'polygon-mumbai',
    },
    {
        label: 'optimism',
        subdomain: 'opt-mainnet',
        networkSlug: 'optimism',
    },
    {
        label: 'optimism-goerli',
        subdomain: 'opt-goerli',
        networkSlug: 'optimistic-goerli',
    },
]
