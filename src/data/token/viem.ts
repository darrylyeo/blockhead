import type { Address } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Token, TokenMetadata } from '$/entities/token'
import { TokenStandard, TokenType } from '$/entities/token'

// Enhanced ERC20 ABI with additional standard functions
const erc20Abi = [
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
		inputs: [{ name: '_owner', type: 'address' }],
		name: 'balanceOf',
		outputs: [{ name: 'balance', type: 'uint256' }],
		type: 'function',
	},
] as const

// ERC721 interface detection
const erc721Abi = [
	{
		constant: true,
		inputs: [{ name: 'interfaceId', type: 'bytes4' }],
		name: 'supportsInterface',
		outputs: [{ name: '', type: 'bool' }],
		type: 'function',
	},
] as const

// Common interface IDs
const INTERFACE_IDS = {
	ERC165: '0x01ffc9a7',
	ERC20: '0x36372b07',
	ERC721: '0x80ac58cd',
	ERC721_METADATA: '0x5b5e139f',
	ERC1155: '0xd9b67a26',
	ERC4626: '0x6b7037b3',
} as const

// Detect token standard based on interface support
const detectTokenStandard = async (client: any, address: `0x${string}`) => {
	try {
		// Check ERC165 support first
		const supportsERC165 = await client.readContract({
			address,
			abi: erc721Abi,
			functionName: 'supportsInterface',
			args: [INTERFACE_IDS.ERC165],
		}).catch(() => false)

		if (supportsERC165) {
			// Check for ERC721
			const isERC721 = await client.readContract({
				address,
				abi: erc721Abi,
				functionName: 'supportsInterface',
				args: [INTERFACE_IDS.ERC721],
			}).catch(() => false)

			if (isERC721) return TokenStandard.Erc721

			// Check for ERC1155
			const isERC1155 = await client.readContract({
				address,
				abi: erc721Abi,
				functionName: 'supportsInterface',
				args: [INTERFACE_IDS.ERC1155],
			}).catch(() => false)

			if (isERC1155) return TokenStandard.Erc1155

			// Check for ERC4626
			const isERC4626 = await client.readContract({
				address,
				abi: erc721Abi,
				functionName: 'supportsInterface',
				args: [INTERFACE_IDS.ERC4626],
			}).catch(() => false)

			if (isERC4626) return TokenStandard.Erc4626
		}
		
		// Fallback to ERC20 if we can read basic ERC20 functions
		return TokenStandard.Erc20
	} catch {
		return TokenStandard.Erc20 // Default assumption
	}
}

// Determine token type based on name, symbol, and metadata
const determineTokenType = (name: string, symbol: string, totalSupply?: string): TokenType => {
	const nameL = name.toLowerCase()
	const symbolL = symbol.toLowerCase()
	
	// Stablecoin detection
	if (symbolL.includes('usd') || symbolL.includes('dai') || 
		nameL.includes('stable') || nameL.includes('dollar') ||
		['usdc', 'usdt', 'busd', 'dai', 'frax', 'fei'].includes(symbolL)) {
		return TokenType.Stablecoin
	}
	
	// Governance token detection
	if (nameL.includes('governance') || nameL.includes('vote') ||
		symbolL.includes('gov') || nameL.includes('governor')) {
		return TokenType.Governance
	}
	
	// Wrapped token detection
	if (nameL.includes('wrapped') || symbolL.startsWith('w') ||
		['weth', 'wbtc', 'wmatic', 'wavax'].includes(symbolL)) {
		return TokenType.Wrapped
	}
	
	// LP token detection
	if (nameL.includes('liquidity') || nameL.includes('pool') ||
		symbolL.includes('lp') || nameL.includes('-')) {
		return TokenType.Lp
	}
	
	// Yield bearing token detection
	if (nameL.includes('yield') || nameL.includes('vault') ||
		nameL.includes('staked') || symbolL.includes('st')) {
		return TokenType.Yield
	}
	
	// Default to utility
	return TokenType.Utility
}

export const fetch = async (chainId: ChainId, address: Address) => {
	const { getViemClient } = await import('$/api/viem/index')
	
	try {
		const client = getViemClient(chainId)
		
		// First check if address is a contract
		const bytecode = await client.getBytecode({ address: address as `0x${string}` })
		
		if (!bytecode || bytecode === '0x') {
			throw new Error(`Address ${address} is not a contract on chain ${chainId}`)
		}
		
		// Detect token standard
		const standard = await detectTokenStandard(client, address as `0x${string}`)
		
		// Fetch basic ERC20 metadata using allSettled for better error handling
		const [nameResult, symbolResult, decimalsResult, totalSupplyResult] = await Promise.allSettled([
			client.readContract({
				address: address as `0x${string}`,
				abi: erc20Abi,
				functionName: 'name',
			}) as Promise<string>,
			client.readContract({
				address: address as `0x${string}`,
				abi: erc20Abi,
				functionName: 'symbol',
			}) as Promise<string>,
			client.readContract({
				address: address as `0x${string}`,
				abi: erc20Abi,
				functionName: 'decimals',
			}) as Promise<number>,
			client.readContract({
				address: address as `0x${string}`,
				abi: erc20Abi,
				functionName: 'totalSupply',
			}) as Promise<bigint>,
		])
		
		// Extract results with fallbacks
		const name = nameResult.status === 'fulfilled' ? nameResult.value : 'Unknown Token'
		const symbol = symbolResult.status === 'fulfilled' ? symbolResult.value : 'UNKNOWN'
		const decimals = decimalsResult.status === 'fulfilled' ? decimalsResult.value : 18
		const totalSupply = totalSupplyResult.status === 'fulfilled' ? totalSupplyResult.value : undefined
		
		// Check if basic token functions are available
		const hasBasicInterface = nameResult.status === 'fulfilled' || 
								symbolResult.status === 'fulfilled' || 
								decimalsResult.status === 'fulfilled'
		
		if (!hasBasicInterface) {
			throw new Error(`Address ${address} does not implement basic token interface`)
		}
		
		return {
			address,
			standard,
			name,
			symbol,
			decimals,
			totalSupply: totalSupply?.toString(),
			bytecode,
			bytecodeSize: (bytecode.length - 2) / 2,
			chainId,
			fetchedAt: Math.floor(Date.now() / 1000),
		}
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes('Chain not supported')) {
				throw new Error(`Chain ${chainId} not supported by viem`)
			}
			if (error.message.includes('execution reverted')) {
				throw new Error(`Contract calls reverted. Address ${address} may not be a valid token contract`)
			}
			if (error.message.includes('not a contract')) {
				throw error
			}
			if (error.message.includes('not implement basic token interface')) {
				throw error
			}
		}
		throw new Error(`Viem error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

export const normalize = (data: any, chainId: ChainId, address: Address) => {
	// Create metadata object
	const metadata: TokenMetadata = {
		address,
		chainId,
		name: data.name,
		symbol: data.symbol,
		decimals: data.decimals,
		tags: [],
	}
	
	// Determine token type based on metadata
	const tokenType = determineTokenType(data.name, data.symbol, data.totalSupply)
	
	// Create comprehensive token object
	const tokenData: any = {
		address,
		chainId,
		standard: data.standard,
		types: [tokenType],
		metadata,
		decimals: data.decimals,
		verification: {
			isVerified: false, // Cannot determine from viem alone
			riskLevel: 'medium' as const,
			riskFactors: [] as string[],
			lastUpdated: data.fetchedAt,
		},
	}
	
	// Only add total supply if we have it
	if (data.totalSupply) {
		tokenData.totalSupply = data.totalSupply
		
		// Add supply metrics if we have total supply
		const supplyFloat = Number(data.totalSupply) / Math.pow(10, data.decimals)
		tokenData.supplyData = {
			totalSupply: data.totalSupply,
			totalSupplyFormatted: supplyFloat.toLocaleString(),
			supplyType: supplyFloat > 1e15 ? 'inflationary' : 'fixed',
		}
	}
	
	// Add contract data if we have bytecode info
	if (data.bytecode) {
		tokenData.contractData = {
			bytecode: data.bytecode,
			bytecodeSize: data.bytecodeSize,
			isProxy: data.bytecode.includes('363d3d373d3d3d363d73'),
		}
		
		// Add basic risk assessment based on contract
		tokenData.risk = {
			contractSize: data.bytecodeSize,
			hasProxyPattern: data.bytecode.includes('363d3d373d3d3d363d73'),
		}
	}
	
	// Add standard-specific data if we detected the standard properly
	if (data.standard === TokenStandard.Erc20) {
		tokenData.erc20Data = {
			name: data.name,
			symbol: data.symbol,
			features: {
				upgradeable: data.bytecode?.includes('363d3d373d3d3d363d73') || false,
			},
		}
	} else if (data.standard === TokenStandard.Erc721) {
		tokenData.nftData = {
			name: data.name,
			symbol: data.symbol,
			features: {
				upgradeable: data.bytecode?.includes('363d3d373d3d3d363d73') || false,
			},
		}
	}
	
	return tokenData as any
}
