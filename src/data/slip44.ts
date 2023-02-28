import slip44Constants from 'bip44-constants'

export const chainsBySlip44 = Object.fromEntries(
	slip44Constants.map(([slip44, symbol, name]) =>
		[slip44 - slip44Constants[0][0], {symbol, name}]
	)
)
