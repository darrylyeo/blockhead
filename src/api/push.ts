import type { Ethereum } from '../data/networks/types'


import * as PushAPI from '@pushprotocol/restapi'
import { ENV } from '@pushprotocol/restapi/src/lib/constants'


export const getNotifications = async ({
	network,
	address,
}: {
	network: Ethereum.Network,
	address: Ethereum.Address,
}) => {
	const notifications = await PushAPI.user.getFeeds({
		user: `eip155:${network.chainId}:${address}`, // user address in CAIP-10
		env: ENV.PROD,
	});

	console.log('Notifications', notifications)

	return notifications
}
