// Types
import type { Ethereum } from '$/data/networks/types'

import type { QuoteCurrency } from '$/data/currencies'
import type { TokenWithBalance } from '$/data/tokens'

import type { FragmentOf } from 'gql.tada'

import type { WalletTokenBalanceToken, TokenBalance } from '.'


// Functions
import { getChainId } from '.'

export const normalizeToken = (
	token: FragmentOf<typeof WalletTokenBalanceToken>,
): Ethereum.Erc20Token => ({
	chainId: getChainId(token.network),
	address: token.address as Ethereum.ContractAddress,

	name: token.name,
	symbol: token.symbol,
	decimals: token.decimals,
	icon: token.imgUrl,
})

export const normalizeTokenBalance = (
	tokenBalance: FragmentOf<typeof TokenBalance>,
	quoteCurrency: QuoteCurrency
): TokenWithBalance => ({
	token: normalizeToken(tokenBalance.token.baseToken),

	balance: BigInt(tokenBalance.token.balance * 10 ** tokenBalance.token.baseToken.decimals),

	conversion: {
		currency: quoteCurrency,
		value: tokenBalance.token.balanceUSD,
		rate: tokenBalance.token.baseToken.onchainMarketData?.price ?? null,
	},
})
