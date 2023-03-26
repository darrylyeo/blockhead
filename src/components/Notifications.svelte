<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import { networksBySlug } from '../data/networks'
	import type { NotificationsProvider } from '../data/notificationsProvider'
	import { type Notification, pushSupportedChainIds } from '../api/push'


	export let network: Ethereum.Network
	export let address: Ethereum.Address
	export let notificationsProvider: NotificationsProvider
	export let feedLayout: 'byChannel' | 'chronological' = 'byChannel'


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
		channelsCount: number,
	}

	$: summary = {
		notificationsCount: notifications?.length,
		channelsCount: Object.keys(notificationsByChannel).length,
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
	{...$$restProps}
>
	<slot slot="header" name="header" let:status let:loadingMessage let:errorMessage {summary} {status} {loadingMessage} {errorMessage} />

	{#if feedLayout === 'byChannel'}
		{#each Object.entries(notificationsByChannel) as [channelName, notifications]}<!-- (`${notification.blockchain}-${notification.sid}`) -->
			<article class="card">
				<header class="bar">
					<h4 class="row">
						<img
							src={notifications[0].icon} 
							height="20"
							style="width: fit-content"
							on:error={e => e.target.hidden = true}
						/>
						<a href={notifications[0].url} target="_blank" rel="noreferrer">{channelName}</a>
					</h4>

					<span class="card-annotation">
						{notifications.length}
					</span>
				</header>

				<hr>

				{#each notifications as notification}<!-- (`${notification.blockchain}-${notification.sid}`) -->
					{@const network = networksBySlug[pushSupportedChainIds[notification.blockchain] ?? 1]}

					<article class="card">
						<header class="bar">
							<h5 class="row">
								{#if notification.image}
									<img
										src={notification.image} 
										height="20"
										style="width: fit-content"
										on:error={e => e.target.hidden = true}
									/>
								{/if}
								<!-- <NetworkIcon {network} /> -->

								<!-- <span>{notification.title}</span> -->
								<span>{notification.notification.body}</span>
							</h5>

							{#if notification.cta}
								<a href={notification.cta} target="_blank" rel="noreferrer"><button class="small">Go ›</button></a>
							{/if}
						</header>

						{#if notification.message !== notification.notification.body}
							<p class="message">{notification.message}</p>
						{/if}

						<footer class="bar">
							<div class="row-inline">
								<span>{notification.notification.title}</span>
							</div>
						</footer>
					</article>
				{/each}
			</article>
		{/each}
	{:else if feedLayout === 'chronological'}
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
	{/if}
</NotificationsLoader>
