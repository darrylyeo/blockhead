// Types
import type { Ethereum } from '$/data/networks/types'

declare global {
	interface WindowEventMap {
		'eip6963:announceProvider': CustomEvent
	}
}

export type Eip6963Rdns = string

type Eip6963ProviderInfo = {
	uuid: ReturnType<typeof crypto.randomUUID>,
	name: string,
	icon: string,
	rdns: Eip6963Rdns,
}

type Eip6963ProviderDetail = {
	info: Eip6963ProviderInfo,
	provider: Ethereum.Provider,
}


// State
import { SvelteMap } from 'svelte/reactivity'

export class Wallets {
	eip6963Providers = $state(
		new SvelteMap<ReturnType<typeof crypto.randomUUID>, Eip6963ProviderDetail>()
	)

	constructor(){
		$effect(() => {
			const controller = new AbortController()

			globalThis.addEventListener(
				'eip6963:announceProvider',
				(event: CustomEvent<Eip6963ProviderDetail>) => {
					const { info, provider } = event.detail
					
					this.eip6963Providers.set(info.uuid, { info, provider })
				},
				{
					signal: controller.signal,
				}
			)

			globalThis.dispatchEvent(
				new CustomEvent('eip6963:requestProvider')
			)

			return () => {
				controller.abort()
			}
		})
	}

	findEip6963Provider({
		rdns,
	}: {
		rdns?: Eip6963Rdns,
	} = {}){
		return (
			rdns ?
				[...this.eip6963Providers.values()]
					.find(({ info }) => (
						info.rdns === rdns
					))
			:
				[...this.eip6963Providers.values()]
					[0]
		)
	}
}


// Context
const key = Symbol('wallets')

import { getContext, setContext } from 'svelte'

export const setWalletsContext = () => (
	setContext(key, new Wallets())
)

export const getWalletsContext = () => (
	getContext<Wallets>(key)
)
