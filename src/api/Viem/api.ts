import type { EvmNetwork } from '../../schema/EvmNetwork.ts'
import { createPublicClient, http, fallback } from 'viem'
import { mainnet } from 'viem/chains'

const RPC_ENDPOINTS = [
	'https://eth.llamarpc.com',
	'https://mainnet.rpc.buidlguidl.com'
]

export const getViemClient = (network: EvmNetwork['$id']) => {
	// TODO: Map network.chainId to viem chain
	const chainId = 'chainId' in network ? network.chainId : 1
	const chain = chainId === 1 ? mainnet : mainnet
	return createPublicClient({
		chain,
		transport: fallback(
			RPC_ENDPOINTS.map(url => http(url)),
			{ rank: false } // Round-robin load balancing instead of ranking
		)
	})
}

