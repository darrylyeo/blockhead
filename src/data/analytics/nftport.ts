import { env } from '../../env'
import { HttpClient, Api } from './nftport/api/Api'

export const NftportApi = new Api(new HttpClient({
	baseApiParams: {
		headers: {
			'Authorization': env.NFTPORT_API_KEY
		}
	}
}))
