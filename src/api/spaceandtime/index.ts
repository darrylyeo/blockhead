// Types/constants
import type { Ethereum } from '$/data/networks/types'
import type { Web3AppSlug } from '$/data/web3Apps'

export const supportedNetworks = {
	1: {
		schemaId: 'ETHEREUM',
		name: 'Ethereum',
		appSchemas: [
			{ 
				schemaId: 'AAVE_V2_ETHEREUM', 
				slug: 'aave', 
			},
			{ 
				schemaId: 'AAVE_V3_ETHEREUM', 
				slug: 'aave', 
			},
			{ 
				schemaId: 'BALANCER_ETHEREUM', 
				slug: 'balancer', 
			},
			{ 
				schemaId: 'CHAINLINK_ETHEREUM', 
				slug: 'chainlink', 
			},
			{ 
				schemaId: 'COMPOUND_V2_ETHEREUM', 
				slug: 'compound', 
			},
			{ 
				schemaId: 'COMPOUND_V3_ETHEREUM', 
				slug: 'compound', 
			},
			{ 
				schemaId: 'CONVEX_ETHEREUM', 
				slug: 'convex', 
			},
			{ 
				schemaId: 'CRYSTALCLEARTOKEN_ETHEREUM', 
				slug: 'crystal-clear-token', 
			},
			{ 
				schemaId: 'DYDX_ETHEREUM', 
				slug: 'dydx', 
			},
			{ 
				schemaId: 'EIGENLAYER_ETHEREUM', 
				slug: 'eigenlayer', 
			},
			{ 
				schemaId: 'ETHENA_ETHEREUM', 
				slug: 'ethena', 
			},
			{ 
				schemaId: 'ETHERFI_ETHEREUM', 
				slug: 'ether-fi', 
			},
			{ 
				schemaId: 'KARAK_ETHEREUM', 
				slug: 'karak', 
			},
			{ 
				schemaId: 'LIDO_ETHEREUM', 
				slug: 'lido', 
			},
			{ 
				schemaId: 'OPYN_ETHEREUM', 
				slug: 'opyn', 
			},
			{ 
				schemaId: 'RIBBON_ETHEREUM', 
				slug: 'ribbon', 
			},
			{ 
				schemaId: 'ROCKET_POOL_ETHEREUM', 
				slug: 'rocket-pool', 
			},
			{ 
				schemaId: 'SYMBIOTIC_ETHEREUM', 
				slug: 'symbiotic', 
			},
			{ 
				schemaId: 'UNISWAP_V2_ETHEREUM', 
				slug: 'uniswap',
			},
			{ 
				schemaId: 'UNISWAP_V3_ETHEREUM', 
				slug: 'uniswap', 
			},
		],
	},
	137: {
		schemaId: 'POLYGON',
		name: 'Polygon',
		appSchemas: [
			{ schemaId: 'QUICKSWAP_POLYGON', slug: 'quickswap' },
			{ schemaId: 'UNISWAP_V3_POLYGON', slug: 'uniswap' },
		],
	},
	324: {
		schemaId: 'ZKSYNCERA',
		name: 'ZKsync',
	},
	42161: {
		schemaId: 'ARBITRUM',
		name: 'Arbitrum',
	},
	43114: {
		schemaId: 'AVALANCHE',
		name: 'Avalanche',
	},
	17000: {
		schemaId: 'HOLESKY',
		name: 'Holesky (testnet)',
	},
	11155111: {
		schemaId: 'SEPOLIA',
		name: 'Sepolia (testnet)',
	},
	[-1]: {
		schemaId: 'BITCOIN',
		name: 'Bitcoin',
	},
} as const satisfies Record<Ethereum.ChainId | number, {
	schemaId: string
	name: string
	appSchemas?: {
		schemaId: string
		slug: Web3AppSlug
	}[]
}>
