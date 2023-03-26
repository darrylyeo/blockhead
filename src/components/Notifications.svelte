<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import { networksByChainID } from '../data/networks'
	import type { NotificationsProvider } from '../data/notificationsProvider';
	import { type NotificationRawPayload, pushChainIdForBlockchainName } from '../api/push'


	export let network: Ethereum.Network
	export let address: Ethereum.Address
	export let notificationsProvider: NotificationsProvider
	export let feedLayout: 'byChannel' | 'chronological' = 'byChannel'


	let notifications: NotificationRawPayload[] = []


	// Computed Values

	let notificationsByChannel: Record<string, NotificationRawPayload[]>
	$: {
		notificationsByChannel = {}
		for(const notification of notifications ?? [])
			(notificationsByChannel[notification.payload.data.app] ??= []).push(notification)
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
	import Collapsible from './Collapsible.svelte'
	import Date from './Date.svelte'
	import NotificationsLoader from './NotificationsLoader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
	import SizeContainer from './SizeContainer.svelte'
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
			<Collapsible
				type="label"
				containerClass="card"
				class="column-block"
				showTriggerText={false}
			>
				<h4 slot="title" class="row">
					<img
						src={notifications[0].payload.data.icon} 
						height="20"
						style="width: fit-content"
						on:error={e => e.target.hidden = true}
					/>
					<a href={notifications[0].payload.data.url} target="_blank" rel="noreferrer">{channelName}</a>
				</h4>

				<svelte:fragment slot="toolbar-items">
					<span class="card-annotation">
						{notifications.length}
					</span>
				</svelte:fragment>

				<hr>

				<!-- raw: false -->
				<!-- {#each notifications as notification}<!-- (`${notification.blockchain}-${notification.sid}`) -- >
					{@const network = networksByChainID[pushChainIdForBlockchainName[notification.blockchain] ?? 1]} -->
				<!-- raw: true -->
				{#each notifications as {source, sender, payload: notification, payload_id} (payload_id)}
					{@const network = networksByChainID[pushChainIdForBlockchainName[source]]}

					<article class="card">
						<header class="bar">
							<h5 class="row">
								{#if notification.data.aimg}
									<img
										src={notification.data.aimg} 
										height="20"
										style="width: fit-content"
										on:error={e => e.target.hidden = true}
									/>
								{/if}
								<!-- <NetworkIcon {network} /> -->

								<!-- <span>{notification.data.asub}</span> -->
								<span>{notification.notification.body}</span>
							</h5>

							{#if notification.data.acta}
								<a href={notification.data.acta} target="_blank" rel="noreferrer"><button class="small">Go ›</button></a>
							{/if}
						</header>

						{#if notification.data.amsg !== notification.notification.body}
							<SizeContainer>
								<p class="message">{notification.data.amsg}</p>
							</SizeContainer>
						{/if}

						<footer class="bar">
							<div class="row-inline">
								<!-- <span>{notification.notification.title}</span> -->
							</div>

							{#if notification.data.epoch}
								<Date date={notification.data.epoch * 1000} format="relative" />
							{/if}
						</footer>
					</article>
				{/each}
			</Collapsible>
		{/each}
	{:else if feedLayout === 'chronological'}
		<!-- raw: false -->
		<!-- {#each notifications as notification}<!-- (`${notification.blockchain}-${notification.sid}`) -- >
			{@const network = networksByChainID[pushChainIdForBlockchainName[notification.blockchain] ?? 1]} -->
		<!-- raw: true -->
		{#each notifications as {source, sender, payload: notification, payload_id} (payload_id)}
			{@const network = networksByChainID[pushChainIdForBlockchainName[source] ?? 1]}

			<article class="card">
				<header class="bar">
					<h4 class="row">
						{#if notification.data.aimg}
							<img
								src={notification.data.aimg} 
								height="24"
								style="width: fit-content"
								on:error={e => e.target.hidden = true}
							/>
						{/if}
						<!-- <NetworkIcon {network} /> -->

						<span>{notification.data.asub}</span>
					</h4>

					{#if notification.data.acta}
						<a href={notification.data.acta} target="_blank" rel="noreferrer"><button class="small">Go ›</button></a>
					{/if}
				</header>

				<hr>

				<p>{notification.notification.body}</p>

				{#if notification.data.amsg !== notification.notification.body}
					<SizeContainer>
						<p class="message">{notification.data.amsg}</p>
					</SizeContainer>
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
						<a href={notification.data.url} target="_blank" rel="noreferrer">{notification.data.app}</a>
					</span>

					{#if notification.data.epoch}
						<Date date={notification.data.epoch * 1000} format="relative" />
					{/if}
				</footer>
			</article>
		{/each}
	{/if}
</NotificationsLoader>
