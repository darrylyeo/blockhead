import type { Address, NativeCurrencyAmount, Hash } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Actor } from '$/entities/actor'
import { ActorType, ContractTag } from '$/entities/actor'

export const fetch = async ({
	chainId,
	address,
	transactionLimit = 10,
	transactionOffset = 0
}: {
	chainId: ChainId
	address: Address
	transactionLimit?: number
	transactionOffset?: number
}) => {
	const { createClient, graphql } = await import('$/api/blockscout/graphql/index')

	try {
		return (
			await createClient(chainId)
				.query(
					graphql(`
						query GetAddress($hash: AddressHash!) {
							address(hash: $hash) {
								hash
								fetchedCoinBalance
								fetchedCoinBalanceBlockNumber
								nonce
								contractCode
								transactionsCount
								smartContract {
									name
									addressHash
									verifiedViaSourcify
									verifiedViaEthBytecodeDb
									partiallyVerified
								}
							}
						}
					`),
					{
						hash: address
					}
				)
				.toPromise()
				.then(({ data, error }) => {
					if (error)
						throw error

					if(!data?.address)
						throw new Error('Address not found')

					return data.address
				})
		)
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes('404')) {
				throw new Error(`Address ${address} not found on chain ${chainId}`)
			}
		}
		throw new Error(`Blockscout API error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

export const normalize = (
	result: Awaited<ReturnType<typeof fetch>>,
	{
		chainId,
		address
	}: {
		chainId: ChainId
		address: Address
	}
): Actor => {
	const isContract = Boolean(result.contractCode && result.contractCode !== '0x')
	
	return {
		type: isContract ? ActorType.Contract : ActorType.Eoa,
		address: result.hash as Address,
		chainId,
		...result.fetchedCoinBalance && { balance: BigInt(result.fetchedCoinBalance) },
		...result.transactionsCount && { transactionCount: result.transactionsCount },
		...result.fetchedCoinBalanceBlockNumber && { 
			firstSeenAt: result.fetchedCoinBalanceBlockNumber,
			lastActiveAt: result.fetchedCoinBalanceBlockNumber 
		},
		...isContract && {
			...result.contractCode && { 
				bytecode: result.contractCode,
				bytecodeSize: (result.contractCode.length - 2) / 2 
			},
			...result.smartContract?.name && { 
				name: result.smartContract.name,
				isVerified: Boolean(result.smartContract.verifiedViaSourcify || result.smartContract.verifiedViaEthBytecodeDb),
			},
			...result.smartContract?.name?.toLowerCase().includes('proxy') && {
				isUpgradable: true,
			},
			...result.smartContract?.name && {
				tags: [
					...(result.smartContract.name.toLowerCase().includes('token') ? [ContractTag.Token] : []),
					...(result.smartContract.name.toLowerCase().includes('multisig') ? [ContractTag.Multisig] : []),
					...(result.smartContract.name.toLowerCase().includes('factory') ? [ContractTag.Factory] : []),
					...(result.smartContract.name.toLowerCase().includes('proxy') ? [ContractTag.Proxy] : []),
					...(result.smartContract.name.toLowerCase().includes('router') ? [ContractTag.Router] : []),
					...(result.smartContract.name.toLowerCase().includes('vault') ? [ContractTag.Vault] : []),
				].filter(Boolean)
			},
		},
		...result.nonce !== undefined && !isContract && { nonce: result.nonce },
	}
}
