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
	const { createClient, graphql, networks } = await import('$/api/blockscout/graphql/index')

	// Check if chain is supported
	if (!(chainId in networks)) {
		throw new Error(`Chain ${chainId} is not supported by Blockscout. Supported chains: ${Object.keys(networks).join(', ')}`)
	}

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
			if (error.message === 'Address not found') {
				throw new Error(`Address ${address} has no activity on chain ${chainId}. This address may not exist on this network, or hasn't been used yet.`)
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
	
	const actor: any = {
		type: isContract ? ActorType.Contract : ActorType.Eoa,
		address: result.hash as Address,
		chainId,
	}

	// Add common optional fields
	if (result.fetchedCoinBalance) {
		actor.balance = BigInt(result.fetchedCoinBalance)
	}
	
	if (result.transactionsCount) {
		actor.transactionCount = result.transactionsCount
	}
	
	if (result.fetchedCoinBalanceBlockNumber) {
		actor.firstSeenAt = result.fetchedCoinBalanceBlockNumber
		actor.lastActiveAt = result.fetchedCoinBalanceBlockNumber
	}

	// Add contract-specific fields
	if (isContract) {
		if (result.contractCode) {
			actor.bytecode = result.contractCode
			actor.bytecodeSize = (result.contractCode.length - 2) / 2
		}
		
		if (result.smartContract?.name) {
			actor.name = result.smartContract.name
			actor.isVerified = Boolean(result.smartContract.verifiedViaSourcify || result.smartContract.verifiedViaEthBytecodeDb)
			
			if (result.smartContract.name.toLowerCase().includes('proxy')) {
				actor.isUpgradable = true
			}
			
			const tags = [
				...(result.smartContract.name.toLowerCase().includes('token') ? [ContractTag.Token] : []),
				...(result.smartContract.name.toLowerCase().includes('multisig') ? [ContractTag.Multisig] : []),
				...(result.smartContract.name.toLowerCase().includes('factory') ? [ContractTag.Factory] : []),
				...(result.smartContract.name.toLowerCase().includes('proxy') ? [ContractTag.Proxy] : []),
				...(result.smartContract.name.toLowerCase().includes('router') ? [ContractTag.Router] : []),
				...(result.smartContract.name.toLowerCase().includes('vault') ? [ContractTag.Vault] : []),
			].filter((tag): tag is ContractTag => tag !== undefined)
			
			if (tags.length > 0) {
				actor.tags = tags
			}
		}
	} else {
		// Add EOA-specific fields
		if (result.nonce !== undefined) {
			actor.nonce = result.nonce
		}
	}

	return actor as Actor
}
