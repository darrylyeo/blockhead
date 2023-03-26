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
	img {
		border-radius: 0.33rem;
		object-fit: contain;
	}

	/* .message {
		font-size: 0.66em;
	} */
	.message {
		font-size: 0.85em;
		opacity: 0.75;
		white-space: pre-line;
		line-height: 1.2;
	}
	.card:not(:hover) .message {
		line-clamp: 2;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	footer {
		font-size: 0.66em;
		opacity: 0.8;
	}
</style>


<NotificationsLoader
	{network}
	{address}
	{notificationsProvider}
	bind:notifications
	let:notifications
	{...$$restProps}
>
	<slot slot="header" name="header" let:status let:loadingMessage let:errorMessage {summary} {status} {loadingMessage} {errorMessage} />

	{#each notifications as notification}<!-- (`${notification.blockchain}-${notification.sid}`) -->
		{@const network = networksBySlug[pushSupportedChainIds[notification.blockchain] ?? 1]}

		<article class="card">
			<header class="bar">
				<h4 class="row">
					{#if notification.image}
						<img
							src={notification.image} 
							height="24"
							style="width: fit-content"
							on:error={e => e.target.hidden = true}
						/>
					{/if}
					<!-- <NetworkIcon {network} /> -->

					<span>{notification.title}</span>
				</h4>

				{#if notification.cta}
					<a href={notification.cta} target="_blank" rel="noreferrer"><button class="small">Go ›</button></a>
				{/if}
			</header>

			<hr>

			<p>{notification.notification.body}</p>

			{#if notification.message !== notification.notification.body}
				<p class="message">{notification.message}</p>
			{/if}

			<hr>

			<footer class="bar">
				<div class="row-inline">
					<img
						src={notification.icon} 
						height="16"
						style="width: fit-content"
						on:error={e => e.target.hidden = true}
					/>
					<span>{notification.notification.title}</span>
				</div>

				<span class="card-annotation">
					<a href={notification.url} target="_blank" rel="noreferrer">{notification.app}</a>
				</span>
			</footer>
		</article>
	{/each}
</NotificationsLoader>
