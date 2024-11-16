// Types
import type { Ethereum } from '$/data/networks/types'


// Functions
export const normalizeSpotPrice = (
	spotPrices: Record<Ethereum.ContractAddress, `${number}`>,
	quoteCurrency: string,
) => ({
	quoteCurrency,
	price: (
		quoteCurrency === 'ETH' ?
			// Convert from wei
			Number(Object.values(spotPrices)[0]) / 10 ** 18
		:
		Number(Object.values(spotPrices)[0])
	),
})
