import { setup } from '@liquality/wallet-sdk'
import { env } from '../env'

setup({
	alchemyApiKey: env.ALCHEMY_API_KEY_1,
	etherscanApiKey: env.ETHERSCAN_API_KEY_1,
	infuraProjectId: env.INFURA_API_KEY,
	pocketNetworkApplicationID: env.POCKET_NETWORK_PORTAL_ID,
	quorum: 1,
	slowGasPriceMultiplier: 1,
	averageGasPriceMultiplier: 1.5,
	fastGasPriceMultiplier: 2,
	gasLimitMargin: 2000,
})


import type { Ethereum } from '../data/networks/types'

export const liqualitySupportedNetworks = [
	1,
	137,
	10,
	42161,
] as const satisfies Ethereum.ChainID[]
