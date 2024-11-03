/**
 * Token Pricing API
 * by Odos
 * 
 * {@link https://docs.odos.xyz/product/pricing/quicknode-pricing}
 */

import type { Ethereum } from '$/data/networks/types'
import { getQuickNodePublicClient } from '..'

export const getTokenPrice = async ({
	network,
	contractAddresses,
}: {
	network: Ethereum.Network
	contractAddresses: Ethereum.ContractAddress[]
}) => (
	await getQuickNodePublicClient({ network })
		.request<{
			Parameters: [
				{
					tokenAddrs: Ethereum.ContractAddress[]
				}
			]
			ReturnType: {
				[key: Ethereum.ContractAddress]: number
			}
		}>({
			method: 'odos_tokenPrices',
			params: [
				{
					tokenAddrs: contractAddresses,
				},
			],
		})
)
