import type { Ethereum } from '$/data/networks/types'
import { readable } from 'svelte/store'

declare global {
	interface WindowEventMap {
		'eip6963:announceProvider': CustomEvent
	}
}

export type Eip6963Rdns = `${string}.${string}`

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

type Eip6963Providers = Record<ReturnType<typeof crypto.randomUUID>, Eip6963ProviderDetail>

export const eip6963Providers = readable<Eip6963Providers>(
	{},
	set => {
		const eip6963Providers = {} as Eip6963Providers

		globalThis.window?.addEventListener(
			'eip6963:announceProvider',
			(event: CustomEvent<Eip6963ProviderDetail>) => {
				const { info, provider } = event.detail
			
				eip6963Providers[info.uuid] = { info, provider }
				set(eip6963Providers)
			},
		)

		globalThis.window?.dispatchEvent(
			new CustomEvent('eip6963:requestProvider')
		)
	}
)

export const findEip6963Provider = ({
	eip6963Providers,
	rdns,
}: {
	eip6963Providers: Eip6963Providers,
	rdns?: Eip6963Rdns,
}) => (
	rdns ?
		Object.values(eip6963Providers)
			.find(({ info }) => (
				info.rdns === rdns
			))
	:
		Object.values(eip6963Providers)
			[0]
)
