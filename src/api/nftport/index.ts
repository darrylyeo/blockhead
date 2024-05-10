import * as publicEnv from '$env/static/public'
import { HttpClient, Api } from './api/Api'

export const NftportApi = new Api(new HttpClient({
	baseApiParams: {
		headers: {
			'Authorization': publicEnv.PUBLIC_NFTPORT_API_KEY
		}
	}
}))


import type { Ethereum } from '$/data/networks/types'
import type { AccountRequestSupportedChain } from './api/Api'

export const networkSlugToNftportChain: Record<Ethereum.NetworkName, AccountRequestSupportedChain> = {
	'ethereum': 'ethereum',
	'ethereum-rinkeby': 'rinkeby',
	// 'polygon': 'polygon',
}
