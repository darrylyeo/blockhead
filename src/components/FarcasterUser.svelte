<script lang="ts">
	// Types/constants
	import type { FarcasterUser } from '$/api/farcaster'
	import { FarcasterProvider } from '$/data/farcasterProviders'


	// Functions
	import { resolveRoute } from '$app/paths'


	// Inputs
	export let user: FarcasterUser
	export let farcasterProvider: FarcasterProvider

	// (View options)
	export let showDisplayName = true


	// Internal state
	// (Computed)
	$: linkType = {
		[FarcasterProvider.Airstack]: 'name',
		[FarcasterProvider.Hub]: 'id',
		[FarcasterProvider.Neynar]: 'name',
		[FarcasterProvider.Pinata]: 'id',
	}[farcasterProvider]


	// Components
	import Icon from './Icon.svelte'
</script>


<a
	class="farcaster-user row"
	class:with-float={user.avatar?.url}
	class:inline={!user.avatar?.url}
	href={
		user.name && linkType === 'name'
			? resolveRoute(`/apps/farcaster/account/[farcasterUserName]`, { farcasterUserName: user.name })
			: resolveRoute(`/apps/farcaster/account/[farcasterUserId]`, { farcasterUserId: String(user.id) })
	}
>
	{#if user.avatar?.url}
		<Icon
			imageSources={[user.avatar.url]}
			layout="cover"
		/>
	{/if}

	<!-- <span> -->
		<address>
			{#if showDisplayName}
				<span class="display-name">{user.displayName}</span>
			{/if}

			<span class="username-or-id">
				{#if user.name}
					@{user.name}
				{:else if user.id}
					#{user.id}
				{/if}
			</span>
		</address>

		<!-- {#if user.isActive}
			<span class="active" title="Active">✔</span>
		{/if}
	</span> -->
</a>


<style>
	.farcaster-user {
		min-width: min-content;
		gap: 0.85ch;
		align-items: center;
		line-height: 1.66;

		--icon-size: 1.66em;
		--icon-borderRadius: 0.33em;
	}

	.avatar {
		border-radius: 4px;
		object-fit: cover;
	}

	address {
		font-style: normal;
		font-weight: bold;
		display: inline;
	}

	.display-name + .username-or-id {
		font-size: smaller;
		opacity: 0.6;
	}
</style>
