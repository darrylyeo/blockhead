import type { Address } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Contract } from '$/entities/contract'
import { ContractStandard, ContractCategory } from '$/entities/contract'

export const fetch = async (chainId: ChainId, address: Address) => {
	const { getViemClient } = await import('$/api/viem/index')
	const client	 = getViemClient(chainId)

	try {
		const bytecode = await client.getBytecode({ address: address as `0x${string}` })

		if (!bytecode || bytecode === '0x') {
			throw new Error(`Address ${address} is not a contract on chain ${chainId}`)
		}

		return { bytecode }
	} catch (error) {
		throw new Error(`Viem error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

export const normalize = (data: any, chainId: ChainId, address: Address) => {
	return {
		address,
		chainId,
		standards: [ContractStandard.Custom],
		categories: [ContractCategory.Utility],
		bytecode: data.bytecode,
		verification: {
			isVerified: false,
		},
	}
}
