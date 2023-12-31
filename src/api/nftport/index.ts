import { env } from '../../env'
import { HttpClient, Api } from './api/Api'

export const NftportApi = new Api(new HttpClient({
	baseApiParams: {
		headers: {
			'Authorization': env.NFTPORT_API_KEY
		}
	}
}))


import type { Ethereum } from '../../data/networks/types'
import type { AccountRequestSupportedChain } from './api/Api'

export const networkSlugToNftportChain: Record<Ethereum.NetworkName, AccountRequestSupportedChain> = {
	'ethereum': 'ethereum',
	'ethereum-rinkeby': 'rinkeby',
	// 'polygon': 'polygon',
}
