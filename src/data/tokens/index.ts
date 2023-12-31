import type { QuoteCurrency } from '../currencies'
import type { Ethereum } from '../networks/types'

export type TokenWithBalance = {
	token: Ethereum.NativeCurrency | Ethereum.ERC20Token,
	balance?: bigint,
	conversion?: {
		currency: QuoteCurrency,
		value: number,
		rate?: number,
	},
}


// https://tokens.coingecko.com/uniswap/all.json
import coingeckoTokens from './coingecko-all-tokens.json'

export const erc20Tokens = coingeckoTokens.tokens.map(({ logoURI, ...token }) => ({ icon: logoURI, ...token } as Ethereum.ERC20Token))

export const erc20TokensByContractAddress = Object.fromEntries(
	erc20Tokens.map(token => [token.address, token])
) satisfies Record<Ethereum.ContractAddress, Ethereum.ERC20Token>

export const erc20TokensBySymbol = Object.fromEntries(
	erc20Tokens.map(token => [token.symbol, token])
) satisfies Record<Ethereum.ContractAddress, Ethereum.ERC20Token>

export const usdStablecoinTokens = ['DAI', 'USDC', 'USDT'/*, 'BUSD', 'GUSD'*/].map(symbol => erc20TokensBySymbol[symbol])
