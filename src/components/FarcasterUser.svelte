<script lang="ts">
	// Types/constants
	import type { User } from '../api/neynar/v2'


	// Functions
	import { resolvePath } from '@sveltejs/kit'


	// Inputs
	export let user: User
</script>


<div class="cast-author row">
	{#if user.pfp_url}
		<img
			class="avatar"
			src={user.pfp_url}
			width="24"
			height="24"
		/>
	{/if}

	<span>
		<a
			href={
				user.username
					? resolvePath(`/apps/farcaster/account/[farcasterUserName]`, { farcasterUserName: user.username })
					: resolvePath(`/apps/farcaster/account/[farcasterUserId]`, { farcasterUserId: String(user.fid) })
			}
		>
			<address>
				<span>{user.display_name}</span>
				<small class="faded">
					{#if user.username}
						@{user.username}
					{:else if user.fid}
						#{user.fid}
					{/if}
				</small>
			</address>
		</a>

		<!-- {#if user.active_status}
			<span class="active" title="Active">✔</span>
		{/if} -->
	</span>
</div>


<style>
	.cast-author {
		gap: 1ch;
	}

	.avatar {
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
