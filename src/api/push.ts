import type { Ethereum } from '$/data/networks/types'

export type AppName = string

export type BlockchainName = 'ETH_MAINNET' | 'POLYGON_MAINNET' | string

export type Notification = {
	cta: string;
	title: string;
	message: string;
	icon: string;
	url: string;
	sid: string;
	app: AppName;
	image: string;
	blockchain: BlockchainName;
	notification: {
		body: string;
		title: string;
	};
	secret: string;
}

export type NotificationRawPayload = {
	payload_id: number;
	sender: Ethereum.Address;
	epoch: Date;
	payload: {
		data: {
			app: AppName;
			sid?: string;
			url: string;
			acta: string;
			aimg: string;
			amsg: string;
			asub: string;
			icon: string;
			type: number | string;
			epoch?: string;
			etime?: null;
			hidden: string;
			sectype?: null;
			additionalMeta?: null;
			appbot?: string;
			secret?: string;
		};
		recipients?: Record<Ethereum.Address | `eip155:${Ethereum.Address}`, object | null>;
		notification: {
			body: string;
			title: string;
		};
		verificationProof: string;
	};
	source: BlockchainName;
	etime: null;
}


import Constants, { ENV } from '@pushprotocol/restapi/src/lib/constants'

// export const pushSupportedChainIds = [...Constants.ETH_CHAINS, ...Constants.NON_ETH_CHAINS] as Ethereum.ChainId[]
export const pushSupportedChainIds = [1, 5, 137, 80001, 56, 97, 10, 420] as Ethereum.ChainId[]

export const pushBlockchainNames: Record<typeof pushSupportedChainIds[number], BlockchainName> = {
	1: 'ETH_MAINNET',
	5: '',
	137: 'POLYGON_MAINNET',
	80001: '',
	56: '',
	97: '',
	10: '',
	420: '',
} as const

export const pushChainIdForBlockchainName: Record<BlockchainName, typeof pushSupportedChainIds[number]> = Object.fromEntries(Object.entries(pushBlockchainNames).map(([chainId, name]) => [name, chainId]))


import * as PushAPI from '@pushprotocol/restapi'
import { memoizedAsync } from '$/utils/memoized'

const getFeeds = memoizedAsync(PushAPI.user.getFeeds)

export const getNotifications = async <IsRaw extends boolean>({
	network,
	address,
	raw = false,
	page = 1,
	limit = 100,
}: {
	network: Ethereum.Network,
	address: Ethereum.Address,
	raw?: IsRaw,
	page?: number,
	limit?: number,
}) => {
	if (!pushSupportedChainIds.includes(network.chainId))
		throw new Error(`Push does not yet support ${network.name}.`)

	const notifications = await getFeeds({
		// user: `eip155:${network.chainId}:${address}`,
		user: `eip155:1:${address}`, // currently returns notifications from all networks regardless of chainId specified in CAIP10 address
		env: ENV.PROD,
		spam: true,
		page,
		limit,
		raw,
	}) as IsRaw extends true ? NotificationRawPayload[] : Notification[]

	// Filter manually by specified network
	return notifications.filter(notification => (raw ? notification.source : notification.blockchain) === pushBlockchainNames[network.chainId])
}


import { createSocketConnection, EVENTS } from '@pushprotocol/socket'
import { readable } from 'svelte/store'

export const getNotificationsStore = ({
	network,
	address,
}: {
	network: Ethereum.Network,
	address: Ethereum.Address,
}) => readable({
	loading: true,
}, set => {
	const state = {
		loading: true,
		data: {
			isConnected: false,
			notifications: [],
			toggle: undefined,
		},
		error: undefined,
	}

	const socket = createSocketConnection({
		user: `eip155:${network.chainId}:${address}`,
		env: ENV.PROD,
		socketOptions: { autoConnect: true }
	})

	socket?.on(EVENTS.CONNECT, () => {
		state.data.isConnnected = true
		set(state)
	})

	socket?.on(EVENTS.DISCONNECT, () => {
		state.data.isConnnected = false
		set(state)
	})

	socket?.on(EVENTS.USER_FEEDS, (feedItem) => {
		state.data.notifications.push(feedItem)
		state.loading = false
		set(state)
	})

	const toggle = () => {
		if (socket?.connected) {
			socket?.disconnect();
		} else {
			socket?.connect();
		}
	}

	state.data.toggle = toggle
	set(state)

	toggle()

	return () => {
		socket?.off(EVENTS.CONNECT);
		socket?.off(EVENTS.DISCONNECT);
	}
})



// import type { Action } from 'svelte/action'
// import { readable } from 'svelte/store';

// export const pushAction: Action = () => {


// 	return {
// 		destroy() {

// 		}
// 	}
// }