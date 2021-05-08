export const tokenColors = {}

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
	'binance-gold': ['BSC', 'Binance Smart Chain', 'bsc', 'BNB', 'bnb'],
	'avalanche-red': ['avalanche', 'Avalanche', 'AVAX'],
	'xdai-teal': ['xdai', 'xDAI']
}))
	for(const tokenName of tokenNames)
		tokenColors[tokenName] = color