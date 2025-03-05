export const tokenColors: Record<string, string> = {}

for(const [color, tokenNames] of Object.entries({
	'usd-green': ['USD'],
	'gbp-purple': ['GBP'],

	'bitcoin-gold': ['bitcoin', 'Bitcoin', 'BTC'],
	'ethereum-blue': ['ethereum', 'Ethereum', 'ETH'],
	'dai-yellow': ['DAI'],
	'usdc-blue': ['usdc', 'USD Coin', 'USDC'],
	'tether-teal': ['tether', 'Tether', 'USDT'],
	'ripple-black': ['ripple', 'Ripple', 'XRP'],

	'polygon-purple': ['matic', 'Matic', 'MATIC', 'polygon', 'Polygon'],
	'optimism-red': ['optimism', 'Optimism', 'OP', 'OETH', 'oeth', 'op'],
	'binance-gold': ['BSC', 'BNB Smart Chain', 'bsc', 'BNB', 'bnb'],
	'avalanche-red': ['avalanche', 'Avalanche', 'AVAX'],
	'gnosis-teal': ['gnosis', 'GNO', 'xdai', 'xDAI'],
	'fantom-blue': ['fantom', 'ftm', 'FTM'],
	'arbitrum-blue': ['arbitrum-one', 'arbitrum-xdai', 'aETH'],
	'metis-blue': ['metis', 'METIS'],
	'skale-black': ['skale', 'skale-testnet', 'skETH'],
	'celo-gold': ['celo', 'CELO'],
	'aurora-green': ['aurora'],
	'cronos-blue': ['cronos'],
	'evmos-orange': ['evmos'],
	'rootstock-orange': ['rootstock', 'Rootstock', 'rsk', 'RBTC', 'tRBTC'],
}))
	for(const tokenName of tokenNames)
		tokenColors[tokenName] = color
