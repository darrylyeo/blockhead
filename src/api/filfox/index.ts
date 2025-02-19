// Types
import type { paths } from './api.d.ts'
import type { Overview, AddressInfo, AddressBalanceStats, AddressMessages, AddressTransfers, AddressMessageTransfers, AddressTokenTransfers, Tipset, Block, BlockMessages, Message, Events, MessageEvents } from './types'
import type { DeepMerge } from '$/utils/DeepMerge'

type GetJsonResponse<T> = {
	get: {
		responses: {
			200: {
				content: {
					'application/json': T
				}
			}
		}
	}
}

type allPaths = DeepMerge<[
	paths,
	{
		'/overview': GetJsonResponse<Overview>

		'/address/{address}': GetJsonResponse<AddressInfo>

		'/address/{address}/balance-stats': GetJsonResponse<AddressBalanceStats>

		'/address/{address}/messages': GetJsonResponse<AddressMessages>

		'/address/{address}/pending-messages': GetJsonResponse<AddressMessages>

		'/address/{address}/transfers': GetJsonResponse<AddressTransfers>

		'/address/{address}/message-transfers': GetJsonResponse<AddressMessageTransfers>

		'/address/{address}/token-transfers': GetJsonResponse<AddressTokenTransfers>

		'/address/{address}/events': GetJsonResponse<Events>

		'/tipset/{height}': GetJsonResponse<Tipset>

		'/tipset/{height}/events': GetJsonResponse<Events>

		'/block/{cid}': GetJsonResponse<Block>

		'/block/{cid}/messages': GetJsonResponse<BlockMessages>

		'/message/{cid}': GetJsonResponse<Message>

		'/message/{cid}/events': GetJsonResponse<MessageEvents>
	}
]>


// Methods
import { Fetcher, type FetchReturnType } from 'openapi-typescript-fetch'

const fetcher = Fetcher.for<allPaths>()

fetcher.configure({
	baseUrl: 'https://filfox.info/api/v1',
	use: [
		async (url, init, next) => {
			const response = await next(url, init)

			if(!response.ok)
				throw new Error(`Error ${response.status}: ${response.statusText}`)

			return response.data as FetchReturnType<typeof next>
		},
	],
})

export const getOverview = fetcher.path('/overview').method('get').create()

export const getAddress = fetcher.path('/address/{address}').method('get').create()

export const getAddressBalanceStats = fetcher.path('/address/{address}/balance-stats').method('get').create()

export const getAddressMessages = fetcher.path('/address/{address}/messages').method('get').create()

export const getAddressPendingMessages = fetcher.path('/address/{address}/pending-messages').method('get').create()

export const getAddressTransfers = fetcher.path('/address/{address}/transfers').method('get').create()

export const getAddressMessageTransfers = fetcher.path('/address/{address}/message-transfers').method('get').create()

export const getAddressTokenTransfers = fetcher.path('/address/{address}/token-transfers').method('get').create()

export const getAddressEvents = fetcher.path('/address/{address}/events').method('get').create()

export const getTipset = fetcher.path('/tipset/{height}').method('get').create()

export const getTipsetEvents = fetcher.path('/tipset/{height}/events').method('get').create()

export const getBlock = fetcher.path('/block/{cid}').method('get').create()

export const getBlockMessages = fetcher.path('/block/{cid}/messages').method('get').create()

export const getMessage = fetcher.path('/message/{cid}').method('get').create()

export const getMessageEvents = fetcher.path('/message/{cid}/events').method('get').create()
