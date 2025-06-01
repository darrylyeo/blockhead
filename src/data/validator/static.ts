import type { Address } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'

export type Validator = {
	address: Address
	chainId: ChainId
	name?: string
	status: 'active' | 'inactive' | 'jailed' | 'unbonding'
	stakedAmount: string
	delegatedAmount: string
	commission: number // Percentage
	uptime: number // Percentage
	blocks: number
	slashes: number
	firstActiveAt: number
	lastActiveAt: number
}

// Mock validator data - would come from chain-specific APIs in production
const VALIDATORS: Record<ChainId, Record<Address, Validator>> = {
	// Ethereum 2.0 validators (mock data)
	1: {
		'0x1234567890123456789012345678901234567890': {
			address: '0x1234567890123456789012345678901234567890',
			chainId: 1,
			name: 'Ethereum Foundation',
			status: 'active',
			stakedAmount: '32000000000000000000', // 32 ETH
			delegatedAmount: '0',
			commission: 0,
			uptime: 99.8,
			blocks: 1250,
			slashes: 0,
			firstActiveAt: 1606824023, // Beacon chain genesis
			lastActiveAt: Math.floor(Date.now() / 1000),
		},
	},
	// Polygon validators (mock data)
	137: {
		'0xabcdefabcdefabcdefabcdefabcdefabcdefabcd': {
			address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
			chainId: 137,
			name: 'Polygon Validator 1',
			status: 'active',
			stakedAmount: '1000000000000000000000000', // 1M MATIC
			delegatedAmount: '5000000000000000000000000', // 5M MATIC
			commission: 5.0,
			uptime: 99.5,
			blocks: 5430,
			slashes: 0,
			firstActiveAt: 1590595200, // Polygon mainnet launch
			lastActiveAt: Math.floor(Date.now() / 1000),
		},
	},
}

export const fetch = async (chainId: ChainId, validatorAddress?: Address) => {
	const validators = VALIDATORS[chainId] || {}
	
	if (validatorAddress) {
		const validator = validators[validatorAddress]
		if (!validator) {
			throw new Error(`Validator ${validatorAddress} not found on chain ${chainId}`)
		}
		
		return {
			validator,
			fetchedAt: Math.floor(Date.now() / 1000),
		}
	} else {
		// Return all validators for the chain
		return {
			validators: Object.values(validators),
			chainId,
			totalValidators: Object.keys(validators).length,
			activeValidators: Object.values(validators).filter(v => v.status === 'active').length,
			totalStaked: Object.values(validators)
				.reduce((sum, v) => sum + BigInt(v.stakedAmount), 0n)
				.toString(),
			fetchedAt: Math.floor(Date.now() / 1000),
		}
	}
}

export const normalize = (data: any, chainId: ChainId, validatorAddress?: Address) => {
	if (validatorAddress) {
		// Single validator
		return data.validator
	} else {
		// Validator set
		return {
			chainId: data.chainId,
			validators: data.validators,
			totalValidators: data.totalValidators,
			activeValidators: data.activeValidators,
			totalStaked: data.totalStaked,
			averageUptime: data.validators.length > 0 ? 
				data.validators.reduce((sum: number, v: Validator) => sum + v.uptime, 0) / data.validators.length :
				0,
			averageCommission: data.validators.length > 0 ?
				data.validators.reduce((sum: number, v: Validator) => sum + v.commission, 0) / data.validators.length :
				0,
			fetchedAt: data.fetchedAt,
		}
	}
}

// Get top validators by stake
export const fetchTopValidators = async (chainId: ChainId, limit: number = 10) => {
	const data = await fetch(chainId)
	const { validators } = data as any
	
	const topValidators = validators
		.sort((a: Validator, b: Validator) => {
			const aStake = BigInt(a.stakedAmount) + BigInt(a.delegatedAmount)
			const bStake = BigInt(b.stakedAmount) + BigInt(b.delegatedAmount)
			return Number(bStake - aStake)
		})
		.slice(0, limit)
	
	return {
		validators: topValidators,
		chainId,
		limit,
		fetchedAt: Math.floor(Date.now() / 1000),
	}
}

// Get validator performance metrics
export const fetchValidatorMetrics = async (chainId: ChainId, validatorAddress: Address) => {
	const data = await fetch(chainId, validatorAddress)
	const { validator } = data as any
	
	// Calculate some basic metrics
	const totalStake = BigInt(validator.stakedAmount) + BigInt(validator.delegatedAmount)
	const daysActive = Math.floor((Date.now() / 1000 - validator.firstActiveAt) / 86400)
	const blocksPerDay = daysActive > 0 ? validator.blocks / daysActive : 0
	
	return {
		validator,
		metrics: {
			totalStake: totalStake.toString(),
			daysActive,
			blocksPerDay: Math.round(blocksPerDay * 100) / 100,
			slashRate: validator.blocks > 0 ? (validator.slashes / validator.blocks) * 100 : 0,
			performance: validator.uptime * (1 - (validator.slashes / Math.max(validator.blocks, 1))),
		},
		fetchedAt: Math.floor(Date.now() / 1000),
	}
}
