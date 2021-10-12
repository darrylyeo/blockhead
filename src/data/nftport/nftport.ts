import { NFTPORT_API_KEY } from '../../config-secrets'
import { HttpClient, Api } from './api/Api'

export const NftPortApi = new Api(new HttpClient({
	baseApiParams: {
		headers: {
			'x-api-key': NFTPORT_API_KEY
		}
	}
}))
