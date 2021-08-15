<script lang="ts">
	import type { Audius } from '../data/audius/audius'


	export let user: Audius.User
</script>


<style>
	.row {
		display: inline-flex;
		--padding-inner: 0.5em;
	}

	img {
		border-radius: 0.25em;
	}
	.profile-picture {
		width: 1.5em;
		height: 1.5em;
	}

	.handle {
		opacity: 0.66;
	}
</style>


{#if user}
	<a href="/apps/audius/user/{user.id}" class="audius-user row">
		{#if user.profile_picture}
			<img class="profile-picture" srcset={Object.entries(user.profile_picture).map(([size, src]) => `${src}`).join(', ')} alt="{user.name} - Profile Picture" />
		{/if}
		<h3>{user.name}</h3>
		<!-- <span class="handle">
			@{user.handle}
		</span> -->
		{#if user.is_verified}
			<span class="verified" title="Verified">✔</span>
		{/if}
	</a>
{/if}