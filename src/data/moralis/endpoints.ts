import type { Ethereum } from '../ethereum/types'

const endpointForNetwork: Record<Ethereum.ChainID, string> = {
	1: 'eth/mainnet',
	3: 'eth/ropsten',
	5: 'eth/goerli',
	4: 'eth/rinkeby',
	42: 'eth/kovan',
	56: 'bsc/mainnet',
	97: 'bsc/testnet',
	137: 'polygon/mainnet',
	80001: 'polygon/mumbai',
	42161: 'arbitrum/mainnet',
	421611: 'arbitrum/testnet',
	43114: 'avalanche/testnet',
} as const


import { MORALIS_GATEWAY_ID } from '../../config-secrets'

export const getMoralisJSONRPCEndpoint = ({
	network,
	protocol = 'https',
	endpointID = MORALIS_GATEWAY_ID,
	region = 'nyc',
	isArchiveNode = true,
}: {
	network: Ethereum.Network,
	protocol?: 'https' | 'wss',
	endpointID?: string,
	region?: 'nyc',
	isArchiveNode?: boolean
}) => {
	if(endpointForNetwork[network.chainId])
		return `${protocol}://speedy-nodes-${region}.moralis.io/${endpointID}/${endpointForNetwork[network.chainId]}${isArchiveNode ? `/archive` : '' as const}${protocol === 'wss' ? `/ws` : '' as const}` as const

	throw new Error(`The Moralis Speedy Node network does not yet support the ${network.name} network.`)	
}
