<script lang="ts">
	// Types
	import type { FarcasterUser as _FarcasterUser } from '../api/farcaster'
	

	// Inputs
	export let user: _FarcasterUser


	// Components
	import Collapsible from './Collapsible.svelte'
	import FarcasterUser from './FarcasterUser.svelte'
</script>


<Collapsible
	containerClass="card"
	class="column"
	isOpen
>
	<svelte:fragment slot="title">
		<div class="row">
			<FarcasterUser
				{user}
			/>

			{#if user.isActive}
				<abbr class="active-status row-inline" data-before="★" title="Active" />
			{/if}
		</div>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<span class="card-annotation">
			Farcaster User
		</span>
	</svelte:fragment>

	<div class="content column">
		{@html user.bio.text}

		<footer
			role="toolbar"
			class="row spaced wrap"
		>
			<div class="column">
				<dl class="row">
					{#if user.summary.followingCount}
						<div>
							<dt data-before="👀">Following</dt>
							<dd>{user.summary.followingCount}</dd>
						</div>
					{/if}

					{#if user.summary}
						{#if user.summary.followerCount}		
							<div>
								<dt data-before="👉">Followers</dt>
								<dd>{user.summary.followerCount}</dd>
							</div>
						{/if}
					{/if}
				</dl>
			</div>
		</footer>
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

	.active-status {
		font-size: 0.85em;
	}
</style>
