import * as publicEnv from '$env/static/public'
import { HttpClient, Api, type ChainList } from '../api/Api'

export const MoralisWeb3Api = new Api(new HttpClient({
	baseApiParams: {
		headers: {
			'x-api-key': publicEnv.PUBLIC_MORALIS_WEB3_API_KEY
		}
	}
}))


import type { Ethereum } from '$/data/networks/types'

export const chainCodeFromNetwork = (network: Ethereum.Network) =>
	`0x${network.chainId.toString(16)}` as ChainList

// export const moralisChainIDs = [
// 	'eth',
// 	'0x1',
// 	'ropsten',
// 	'0x3',
// 	'rinkeby',
// 	'0x4',
// 	'goerli',
// 	'0x5',
// 	'kovan',
// 	'0x2a',
// 	'polygon',
// 	'0x89',
// 	'mumbai',
// 	'0x13881',
// 	'bsc',
// 	'0x38',
// 	'bsc',
// 	'0x61',
// 	'avalanche',
// 	'0xa86a',
// ]

// export const networkToMoralisChainID = (network: Ethereum.Network) =>
// 	moralisChainIDs[network.chainId]
