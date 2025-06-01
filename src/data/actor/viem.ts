import type { Address } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Actor } from '$/entities/actor'
import { ActorType } from '$/entities/actor'

export const fetch = async (chainId: ChainId, address: Address) => {
	const { getViemClient } = await import('$/api/viem/index')
	const client = getViemClient(chainId)
	
	try {
		const [balance, bytecode, transactionCount] = await Promise.all([
			client.getBalance({ address: address as `0x${string}` }),
			client.getBytecode({ address: address as `0x${string}` }),
			client.getTransactionCount({ address: address as `0x${string}` }),
		])
		
		const ensData = chainId === 1 ? await Promise.allSettled([
			client.getEnsName({ address: address as `0x${string}` }),
		]).then(([ensName]) => ({
			ensName: ensName.status === 'fulfilled' ? ensName.value : undefined,
		})) : {}
		
		return {
			address,
			balance: balance.toString(),
			bytecode,
			transactionCount,
			...ensData,
		}
	} catch (error) {
		throw new Error(`Viem error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

export const normalize = (data: Awaited<ReturnType<typeof fetch>>, chainId: ChainId, address: Address): Actor => {
	const isContract = data.bytecode && data.bytecode !== '0x'
	
	return {
		type: isContract ? ActorType.Contract : ActorType.Eoa,
		address,
		chainId,
		balance: BigInt(data.balance || '0'),
		...data.transactionCount && { transactionCount: data.transactionCount },
		...isContract && {
			bytecode: data.bytecode,
			bytecodeSize: (data.bytecode.length - 2) / 2,
		},
		...data.ensName && { ensName: data.ensName },
		...data.transactionCount && !isContract && { nonce: data.transactionCount },
	}
}
