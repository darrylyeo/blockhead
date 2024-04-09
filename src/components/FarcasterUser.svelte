<script lang="ts">
	// Types/constants
	import type { FarcasterUser } from '$/api/farcaster'


	// Functions
	import { resolveRoute } from '$app/paths'


	// Inputs
	export let user: FarcasterUser
</script>


<a
	class="cast-author"
	href={
		user.name
			? resolveRoute(`/apps/farcaster/account/[farcasterUserName]`, { farcasterUserName: user.name })
			: resolveRoute(`/apps/farcaster/account/[farcasterUserId]`, { farcasterUserId: String(user.id) })
	}
>
	{#if user.avatar?.url}
		<img
			class="avatar"
			src={user.avatar.url}
			width="24"
			height="24"
		/>
	{/if}

	<!-- <span> -->
		<address>
			<span>{user.displayName}</span>
			<small class="faded">
				{#if user.name}
					@{user.name}
				{:else if user.id}
					#{user.id}
				{/if}
			</small>
		</address>

		<!-- {#if user.isActive}
			<span class="active" title="Active">✔</span>
		{/if}
	</span> -->
</a>


<style>
	.avatar {
		vertical-align: middle;
		float: left;
		margin-right: 1ch;

		border-radius: 4px;
		object-fit: cover;
	}

	address {
		font-size: 1.05em;
		font-style: normal;
		font-weight: bold;
		display: inline;
	}

	.faded {
		opacity: 0.6;
	}
</style>
