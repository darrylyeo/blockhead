import type { QuoteCurrency } from '../currencies'
import type { Ethereum } from '../networks/types'

export type TokenWithBalance = {
	token: Ethereum.NativeCurrency | Ethereum.ERC20Token,
	balance: bigint,
	conversion?: {
		currency: QuoteCurrency,
		value: number,
		rate?: number,
	},
}


// https://tokens.coingecko.com/uniswap/all.json
import coingeckoTokens from './coingecko-all-tokens.json'

export const erc20Tokens: Ethereum.ERC20Token[] = coingeckoTokens.tokens.map(({logoURI, ...token}) => ({icon: logoURI, ...token}))

export const erc20TokensByContractAddress: Record<Ethereum.ContractAddress, Ethereum.ERC20Token> = Object.fromEntries(
	erc20Tokens.map(token => [token.address, token])
)

export const erc20TokensBySymbol: Record<Ethereum.ContractAddress, Ethereum.ERC20Token> = Object.fromEntries(
	erc20Tokens.map(token => [token.symbol, token])
)

export const usdStablecoinTokens = ['DAI', 'USDC', 'USDT'/*, 'BUSD', 'GUSD'*/].map(symbol => erc20TokensBySymbol[symbol])
