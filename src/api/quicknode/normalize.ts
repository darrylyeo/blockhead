// Types
import type { Ethereum } from '$/data/networks/types'
import type { TokenWithBalance } from '$/data/tokens'
import type { getWalletTokenBalance } from './index'


// Functions
export const normalizeTokenBalance = (
	asset: NonNullable<Awaited<ReturnType<typeof getWalletTokenBalance>>>['assets'][number],
	chainId: Ethereum.ChainID,
): TokenWithBalance => ({
	token: {
		chainId,
		address: asset.address,
		name: asset.name,
		symbol: asset.symbol,
		decimals: asset.decimals,
		icon: asset.logoURI,
	},
	balance: BigInt(asset.amount),
})
