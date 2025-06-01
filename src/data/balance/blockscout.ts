import type { Address } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Balance } from '$/entities/balance'
import { BalanceType, BalanceCategory } from '$/entities/balance'
import { TokenStandard } from '$/entities/token'
import { getChainNativeCurrency } from '$/data/networks'

export const fetch = async ({ chainId, address, tokenAddress }: {
	chainId: ChainId
	address: Address
	tokenAddress?: Address
}) => {
	const { createClient, graphql } = await import('$/api/blockscout/graphql/index')

	try {
		return (
			await createClient(chainId)
				.query(
					graphql(`
						query GetBalance($addressHash: AddressHash!) {
							address(hash: $addressHash) {
								hash
								fetchedCoinBalance
								fetchedCoinBalanceBlockNumber
							}
						}
					`),
					{
						addressHash: address
					}
				)
				.toPromise()
				.then(({ data, error }) => {
					if (error)
						throw error

					if (!data?.address)
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

export const normalize = (data: Awaited<ReturnType<typeof fetch>>, { chainId, address, tokenAddress }: { chainId: ChainId, address: Address, tokenAddress?: Address }): Balance => {
	const nativeCurrency = getChainNativeCurrency(chainId)
	const assetIdentifier = tokenAddress || 'native'
	const balanceAmount = data.fetchedCoinBalance || '0'
	
	return {
		id: `${chainId}-${address.toLowerCase()}-${assetIdentifier.toLowerCase()}`,
		chainId,
		standard: tokenAddress ? TokenStandard.Erc20 : TokenStandard.Native,
		types: [BalanceType.Available],
		category: BalanceCategory.Wallet,
		balance: BigInt(balanceAmount),
		...data.fetchedCoinBalanceBlockNumber && { blockNumber: BigInt(data.fetchedCoinBalanceBlockNumber) },
		timestamp: Math.floor(Date.now() / 1000),
		isActive: Boolean(data.fetchedCoinBalance && Number(data.fetchedCoinBalance) > 0),
		...tokenAddress && {
			erc20Data: {
				name: 'Unknown Token',
				symbol: 'UNKNOWN',
				decimals: 18,
				liquidityAvailable: true,
			}
		},
		...!tokenAddress && {
			nativeData: {
				symbol: nativeCurrency.symbol,
				decimals: nativeCurrency.decimals,
				networkName: nativeCurrency.networkName,
				availableForGas: BigInt(balanceAmount),
			}
		},
	}
}
