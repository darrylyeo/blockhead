import { setup } from '@liquality/wallet-sdk'
import * as publicEnv from '$env/static/public'

setup({
	alchemyApiKey: publicEnv.PUBLIC_ALCHEMY_API_KEY_1,
	etherscanApiKey: publicEnv.PUBLIC_ETHERSCAN_API_KEY_1,
	infuraProjectId: publicEnv.PUBLIC_INFURA_API_KEY,
	pocketNetworkApplicationID: publicEnv.PUBLIC_POCKET_NETWORK_PORTAL_ID,
	quorum: 1,
	slowGasPriceMultiplier: 1,
	averageGasPriceMultiplier: 1.5,
	fastGasPriceMultiplier: 2,
	gasLimitMargin: 2000,
})


import type { Ethereum } from '$/data/networks/types'

export const liqualitySupportedNetworks = [
	1,
	137,
	10,
	42161,
] as const satisfies Ethereum.ChainID[]
