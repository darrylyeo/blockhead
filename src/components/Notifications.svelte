<script lang="ts">
	import type { Ethereum } from '$/data/networks/types'
	import { networksByChainID } from '$/data/networks'
	import type { NotificationsProvider } from '$/data/notificationsProvider';
	import { type NotificationRawPayload, pushChainIdForBlockchainName } from '$/api/push'


	export let network: Ethereum.Network
	export let address: Ethereum.Address
	export let notificationsProvider: NotificationsProvider
	export let feedLayout: 'byChannel' | 'chronological' = 'byChannel'

	// (View options)
	export let loaderViewOptions: Partial<Loader<any, any, any, any, any>['viewOptions']> | undefined


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
	} | undefined

	$: summary = {
		notificationsCount: notifications.length,
		channelsCount: Object.keys(notificationsByChannel).length,
	}


	// Components
	import Collapsible from './Collapsible.svelte'
	import Date from './Date.svelte'
	import NotificationsLoader from './NotificationsLoader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
	import SizeContainer from './SizeContainer.svelte'
	import TweenedNumber from './TweenedNumber.svelte'
</script>



<style>
	img {
		border-radius: 0.33rem;
		object-fit: contain;
	}

	.count {
		opacity: 0.4;
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
	loaderViewOptions={loaderViewOptions}
	{network}
	{address}
	{notificationsProvider}
	bind:notifications
>
	<svelte:fragment slot="header"
		let:status
		let:loadingMessage
		let:errorMessage
	>
		<slot name="header" {summary} {status} {loadingMessage} {errorMessage} />
	</svelte:fragment>

	{#if feedLayout === 'byChannel'}
		{#each Object.entries(notificationsByChannel) as [channelName, notifications]}<!-- (`${notification.blockchain}-${notification.sid}`) -->
			<Collapsible
				type="label"
				containerClass="card"
				class="column-block"
				showTriggerText={false}
			>
				<h5 slot="title" class="row">
					<img
						src={notifications[0].payload.data.icon} 
						height="20"
						style="width: fit-content"
						on:error={e => e.target.hidden = true}
					/>
					<a href={notifications[0].payload.data.url} target="_blank" rel="noreferrer">{channelName}</a>
				</h5>

				<svelte:fragment slot="toolbar-items">
					<span class="count"><TweenedNumber value={notifications.length} /></span>
				</svelte:fragment>

				<hr>

				<!-- raw: false -->
				<!-- {#each notifications as notification}<!-- (`${notification.blockchain}-${notification.sid}`) -- >
					{@const network = networksByChainID[pushChainIdForBlockchainName[notification.blockchain] ?? 1]} -->
				<!-- raw: true -->
				{#each notifications.slice(0, 100) as {source, sender, payload, payload_id} (payload_id)}
					<!-- {@const network = networksByChainID[pushChainIdForBlockchainName[source]]} -->

					<article class="card" title="{payload.notification.title}">
						<header class="bar">
							<h6 class="row">
								{#if payload.data.aimg}
									<img
										src={payload.data.aimg} 
										height="20"
										style="width: fit-content"
										on:error={e => e.target.hidden = true}
									/>
								{/if}
								<!-- <NetworkIcon {network} /> -->

								{#if payload.data.acta}
									<!-- <a href={notification.data.acta} target="_blank" rel="noreferrer">{notification.data.asub}</a> -->
									<a href={payload.data.acta} target="_blank" rel="noreferrer">{payload.notification.body}</a>
								{:else}
									<!-- <span>{notification.data.asub}</span> -->
									<span>{payload.notification.body}</span>
								{/if}
							</h6>

							<!-- {#if notification.data.acta}
								<a href={notification.data.acta} target="_blank" rel="noreferrer"><button class="small">Go ›</button></a>
							{/if} -->
						</header>

						{#if payload.data.amsg !== payload.notification.body}
							<SizeContainer>
								<p class="message">{payload.data.amsg}</p>
							</SizeContainer>
						{/if}

						<footer class="bar">
							<div class="row-inline">
								<!-- <span>{notification.notification.title}</span> -->
							</div>

							{#if payload.data.epoch}
								<Date date={Number(payload.data.epoch) * 1000} format="relative" />
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
		{#each notifications.slice(0, 100) as {source, sender, payload, payload_id} (payload_id)}
			<!-- {@const network = networksByChainID[pushChainIdForBlockchainName[source] ?? 1]} -->

			<article class="card" title="{payload.notification.title}">
				<header class="bar">
					<h5 class="row">
						{#if payload.data.aimg}
							<img
								src={payload.data.aimg} 
								height="24"
								style="width: fit-content"
								on:error={e => e.target.hidden = true}
							/>
						{/if}
						<!-- <NetworkIcon {network} /> -->

						{#if payload.data.acta}
							<a href={payload.data.acta} target="_blank" rel="noreferrer">{payload.data.asub}</a>
						{:else}
							<span>{payload.data.asub}</span>
						{/if}
					</h5>

					<!-- {#if notification.data.acta}
						<a href={notification.data.acta} target="_blank" rel="noreferrer"><button class="small">Go ›</button></a>
					{/if} -->
				</header>

				<SizeContainer>
					<p class="message">
						{#if payload.data.amsg !== payload.notification.body}
							<strong>{payload.notification.body}</strong>
						{/if}
						{payload.data.amsg}
					</p>
				</SizeContainer>

				<footer class="bar">
					<div class="row-inline">
						<img
							src={payload.icon} 
							height="16"
							style="width: fit-content"
							on:error={e => e.target.hidden = true}
						/>

						<!-- <span>{notification.notification.title}</span> -->

						<span class="card-annotation">
							<a href={payload.data.url} target="_blank" rel="noreferrer">{payload.data.app}</a>
						</span>
					</div>

					{#if payload.data.epoch}
						<Date date={Number(payload.data.epoch) * 1000} format="relative" />
					{/if}
				</footer>
			</article>
		{/each}
	{/if}
</NotificationsLoader>
