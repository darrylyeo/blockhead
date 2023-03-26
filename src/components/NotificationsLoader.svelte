<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import { NotificationsProvider, notificationsProviderIcons } from '../data/notificationsProvider'
	import { preferences } from '../state/preferences'


	export let network: Ethereum.Network
	export let address: Ethereum.Address
	export let notificationsProvider: NotificationsProvider
	
	$: notificationsProvider = $preferences.notificationsProvider || NotificationsProvider.Push


	import { useQuery } from '@sveltestack/svelte-query'

	import { getNotifications } from '../api/push'


	import Loader from './Loader.svelte'
</script>


{#if notificationsProvider === NotificationsProvider.Push}
	<Loader
		layout="collapsible"
		collapsibleType="label"
		loadingIcon={notificationsProviderIcons[notificationsProvider]}
		loadingIconName={notificationsProvider}
		loadingMessage="Loading {network.name} notifications from {notificationsProvider}..."
		errorMessage="Error loading {network.name} notifications from {notificationsProvider}."
		fromUseQuery={
			useQuery({
				queryKey: ['Notifications', {
					notificationsProvider,
					address,
					chainId: network.chainId,
				}],
				queryFn: async ({ pageParam: pageNumber }) => (
					await getNotifications({
						network,
						address,
						page: pageNumber ?? 1,
						limit: 100000,
					})
				),
				// getPreviousPageParam: (firstPage, allPages) => firstPage.length ? allPages.length - 1 : undefined
				getNextPageParam: (lastPage, allPages) => lastPage.length ? allPages.length + 1 : undefined
			})
		}
		{...$$restProps}
		let:status
		let:result={notifications}
	>
		<slot name="header" slot="header" let:loadingMessage let:errorMessage {notifications} {status} {loadingMessage} {errorMessage} />

		<slot {notifications} />
	</Loader>
{/if}
