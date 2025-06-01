import { createPublicClient, http } from 'viem'
import * as chains from 'viem/chains'
import type { ChainId } from '$/entities/network'

export const chainMapping = {
	1: chains.mainnet,
	137: chains.polygon,
	42161: chains.arbitrum,
	10: chains.optimism,
	56: chains.bsc,
	250: chains.fantom,
	43114: chains.avalanche,
	100: chains.gnosis,
	8453: chains.base,
	59144: chains.linea,
} as const

export const getViemClient = (chainId: ChainId) => {
	const chain = chainMapping[chainId as keyof typeof chainMapping]
	if (!chain) throw new Error(`Chain ${chainId} not supported by viem`)
	
	return createPublicClient({
		chain,
		transport: http(),
	})
}

// Common ABIs
export const erc20Abi = [
	{
		constant: true,
		inputs: [],
		name: 'name',
		outputs: [{ name: '', type: 'string' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'symbol',
		outputs: [{ name: '', type: 'string' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'decimals',
		outputs: [{ name: '', type: 'uint8' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'totalSupply',
		outputs: [{ name: '', type: 'uint256' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [{ name: 'owner', type: 'address' }],
		name: 'balanceOf',
		outputs: [{ name: '', type: 'uint256' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [
			{ name: 'owner', type: 'address' },
			{ name: 'spender', type: 'address' },
		],
		name: 'allowance',
		outputs: [{ name: '', type: 'uint256' }],
		type: 'function',
	},
	{
		inputs: [
			{ name: 'spender', type: 'address' },
			{ name: 'amount', type: 'uint256' },
		],
		name: 'approve',
		outputs: [{ name: '', type: 'bool' }],
		type: 'function',
	},
	{
		inputs: [
			{ name: 'to', type: 'address' },
			{ name: 'amount', type: 'uint256' },
		],
		name: 'transfer',
		outputs: [{ name: '', type: 'bool' }],
		type: 'function',
	},
	{
		inputs: [
			{ name: 'from', type: 'address' },
			{ name: 'to', type: 'address' },
			{ name: 'amount', type: 'uint256' },
		],
		name: 'transferFrom',
		outputs: [{ name: '', type: 'bool' }],
		type: 'function',
	},
] as const

export const erc721Abi = [
	{
		constant: true,
		inputs: [],
		name: 'name',
		outputs: [{ name: '', type: 'string' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'symbol',
		outputs: [{ name: '', type: 'string' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [{ name: 'tokenId', type: 'uint256' }],
		name: 'ownerOf',
		outputs: [{ name: '', type: 'address' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [{ name: 'owner', type: 'address' }],
		name: 'balanceOf',
		outputs: [{ name: '', type: 'uint256' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [{ name: 'tokenId', type: 'uint256' }],
		name: 'tokenURI',
		outputs: [{ name: '', type: 'string' }],
		type: 'function',
	},
] as const

export const erc1155Abi = [
	{
		constant: true,
		inputs: [
			{ name: 'account', type: 'address' },
			{ name: 'id', type: 'uint256' },
		],
		name: 'balanceOf',
		outputs: [{ name: '', type: 'uint256' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [
			{ name: 'accounts', type: 'address[]' },
			{ name: 'ids', type: 'uint256[]' },
		],
		name: 'balanceOfBatch',
		outputs: [{ name: '', type: 'uint256[]' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [{ name: 'id', type: 'uint256' }],
		name: 'uri',
		outputs: [{ name: '', type: 'string' }],
		type: 'function',
	},
] as const
