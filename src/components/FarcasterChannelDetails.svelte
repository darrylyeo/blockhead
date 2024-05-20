<script lang="ts">
	// Types
	import type { FarcasterChannel as _FarcasterChannel } from '$/api/farcaster'
	

	// Inputs
	export let channel: _FarcasterChannel

	// (View options)
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 2


	// Components
	import Collapsible from './Collapsible.svelte'
	import FarcasterChannel from './FarcasterChannel.svelte'
	import FarcasterText from './FarcasterText.svelte'
	import FarcasterUser from './FarcasterUser.svelte'
	import FarcasterUserProfileLoader from './FarcasterUserProfileLoader.svelte'
</script>


<Collapsible
	containerClass="card"
	class="column"
	isOpen
>
	<svelte:fragment slot="title">
		<svelte:element this={`h${headingLevel}`} class="row">
			<FarcasterChannel
				{channel}
				showId
			/>
		</svelte:element>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<span class="card-annotation">
			Warpcast Channel
		</span>
	</svelte:fragment>

	<div class="content column">
		{#if channel.description}
			<FarcasterText
				text={channel.description}
			/>
		{/if}

		{#if channel.summary || channel.leads}
			<footer
				role="toolbar"
				class="row wrap"
			>
				<div class="column">
					<dl class="bar wrap">
						{#if channel.summary}
							{#if channel.summary.followerCount}		
								<div>
									<dt data-before="👉">Followers</dt>
									<dd>{channel.summary.followerCount}</dd>
								</div>
							{/if}
						{/if}

						{#if channel.leads?.length}
							<div class="row wrap">
								<dt data-before="👥">{channel.leads.length === 1 ? 'Host' : 'Hosts'}</dt>

								<dd class="row wrap align-start">
									{#each channel.leads as userId}
										<FarcasterUserProfileLoader
											{userId}
											viewOptions={{
												layout: 'passive',
												contentClass: 'inline',
											}}
											let:user
										>
											{#if user}
												<FarcasterUser
													{user}
													showDisplayName={false}
												/>
											{/if}
										</FarcasterUserProfileLoader>
									{/each}
								</dd>
							</div>
						{/if}
					</dl>
				</div>
			</footer>
		{/if}
	</div>
</Collapsible>


<style>
	dl {
		gap: 1.25rem;
		margin: 0;
	}
	dl > div {
		grid-template-columns: auto auto;
		gap: 0.75ch;
	}
	dl > div > dt {
		display: flex;
		gap: 0.75ch;
	}
</style>
