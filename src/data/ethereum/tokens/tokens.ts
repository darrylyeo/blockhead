import type { Ethereum } from '../types'

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