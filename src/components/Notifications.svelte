<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import { networksBySlug } from '../data/networks'
	import type { NotificationsProvider } from '../data/notificationsProvider'
	import { type Notification, pushSupportedChainIds } from '../api/push'


	export let network: Ethereum.Network
	export let address: Ethereum.Address
	export let notificationsProvider: NotificationsProvider


	let notifications: Notification[] = []


	// Computed Values

	let notificationsByChannel: Record<string, Notification[]>
	$: {
		notificationsByChannel = {}
		for(const notification of notifications ?? [])
			(notificationsByChannel[notification.app] ??= []).push(notification)
	}
	$: notifications

	export let summary: {
		notificationsCount: number,
		subscriptionsCount: number,
	}

	$: summary = {
		notificationsCount: notifications?.length,
		subscriptionsCount: Object.keys(notificationsByChannel).length,
	}


	// Components
	import NotificationsLoader from './NotificationsLoader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
</script>



<style>
	footer {
		font-size: 0.85em;
		opacity: 0.8;
	}
</style>


<NotificationsLoader
	{network}
	{address}
	{notificationsProvider}
	let:notifications
>
	<slot slot="header" name="header" let:status let:loadingMessage let:errorMessage {summary} {status} {loadingMessage} {errorMessage} />

	{#each console.log({notifications})||notifications as notification}<!-- (`${notification.blockchain}-${notification.sid}`) -->
		{@const network = networksBySlug[pushSupportedChainIds[notification.blockchain] ?? 1]}

		<article class="card">
			<header class="bar">
				<h4 class="row">
					<img
						src={notification.icon} 
						height="24"
						style="width: fit-content"
					/>
					<NetworkIcon {network} />
					<span>{notification.title}</span>
				</h4>

				<span class="card-annotation">
					<a href={notification.url} target="_blank" rel="noreferrer">{notification.app}</a>
				</span>
			</header>

			<hr>

			{#if notification.image}
				<img
					src={notification.image} 
					height="24"
					style="width: fit-content"
				/>
			{/if}

			<p>{notification.notification.body}</p>

			{#if notification.message !== notification.notification.body}
				<p><small>{notification.message}</small></p>
			{/if}

			<hr>

			<footer>
				<span>{notification.notification.title}</span>

				{#if notification.cta}
					<a href={notification.cta} target="_blank" rel="noreferrer"><button class="small">Go ›</button></a>
				{/if}
			</footer>
		</article>
	{/each}
</NotificationsLoader>
