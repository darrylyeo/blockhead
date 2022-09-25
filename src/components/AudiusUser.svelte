<script lang="ts">
	import type { Audius } from '../data/audius/audius'


	export let user: Audius.User


	export let layout: 'full' | 'summary' = 'full'
</script>


<style>
	.card {
		overflow: hidden;
		position: relative;
		transition: filter 0.3s;
	}

	.columns {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: start;
		--padding-inner: 1em;
		gap: var(--padding-inner);
	}
	.column {
		--padding-inner: 0.3em;
	}

	img {
		border-radius: 0.25em;
	}

	.profile-picture {
		width: 5em;
		height: 5em;
	}
	.layout-summary .profile-picture {
		width: 3em;
		height: 3em;
	}

	.name {
		gap: 0.5em;
	}

	/*.layout-full*/ .verified {
		font-size: 0.65em;
	}

	.handle-and-location {
		gap: 0.75em;
	}

	.handle {
		font-size: 0.85em;
		opacity: 0.66;
	}

	.metadata {
		font-size: 0.85em;
		opacity: 0.8;
		gap: 0.75em;
	}
	/* .location {
		font-size: 1.05em;
		font-weight: 500;
		opacity: 0.9;
	} */
	.location {
		font-size: 0.8em;
		opacity: 0.6;
		gap: 0.75em;
		font-weight: bold;
	}

	.bio {
		font-size: 0.85em;
		opacity: 0.75;
		white-space: pre-line;
		line-height: 1.2;
	}
	.card:not(:hover) .bio {
		line-clamp: 2;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>


{#if user}
	<div class="audius-user card layout-{layout}">
		{#if user.cover_photo}
			<img class="cover-image card-background" srcset={Object.entries(user.cover_photo).map(([size, src]) => `${src} ${size}`).join(', ')} alt="{user.name} - Cover Photo" />
		{/if}
		<div class="columns">
			{#if user.profile_picture}
				<img class="profile-picture" srcset={
					user.handle === 'Audius'
						? 'https://content-node.audius.co/ipfs/QmbQ8HbsuPMaWu1TK1KB5B5JWMvxE65Rdb87hTwQFwvi6W/150x150.jpg, https://content-node.audius.co/ipfs/QmbQ8HbsuPMaWu1TK1KB5B5JWMvxE65Rdb87hTwQFwvi6W/480x480.jpg, https://content-node.audius.co/ipfs/QmbQ8HbsuPMaWu1TK1KB5B5JWMvxE65Rdb87hTwQFwvi6W/1000x1000.jpg'
						: Object.entries(user.profile_picture).map(([size, src]) => `${src}`).join(', ')
				} alt="{user.name} - Profile Picture" />
			{:else}
				<span class="profile-picture" />
			{/if}
			<div class="column">
				<div class="bar">
					<!-- <a href="/apps/audius/user/{user.id}" class="name row">
						<h3>{user.name}</h3>
						<span class="tag">
							<span class="handle">@{user.handle}</span>
							{#if user.is_verified}
								<span class="verified" title="Verified">✔</span>
							{/if}
						</span>
					</a> -->

					<h3 class="name row">
						<a href="/apps/audius/user/{user.id}">{user.name}</a>
						{#if user.is_verified}
							<span class="verified" title="Verified">✔</span>
						{/if}
					</h3>

					<!-- <p class="card-annotation">Audius User</p> -->
					<!-- <h3>
						<a href="/apps/audius/user/{user.id}">
							{user.name}
						</a>
						{#if user.is_verified}
							✔
						{/if}
					</h3> -->
					<!-- <span class="card-annotation">
						@{user.handle}
					</span> -->
					<p class="card-annotation">
						Audius {
							user.track_count || user.album_count ? `${user.is_verified ? 'Verified ' : ''}Artist` :
							user.playlist_count ? 'Curator' :
							user.repost_count ? 'Influencer' :
							'User'
						}
						<!-- {#if user.location}
							<span class="location">{user.location}</span>
						{/if} -->
					</p>
				</div>
				<p class="handle-and-location row">
					<span class="handle">@{user.handle}</span>
					<!-- {#if user.is_verified}
						<span class="verified" title="Verified">✔</span>
					{/if} -->

					{#if user.location}
						<span class="location">{user.location}</span>
					{/if}
				</p>
				<div class="metadata row">
					<!-- {#if user.location}
						<span class="location">{user.location}</span>
					{/if} -->
					{#if user.track_count}
						<span class="tracks">
							<b>{user.track_count}</b> track{user.track_count === 1 ? '' : 's'}
						</span>
					{/if}
					{#if user.album_count}
						<span class="albums">
							<b>{user.album_count}</b> album{user.album_count === 1 ? '' : 's'}
						</span>
					{/if}
					{#if user.playlist_count}
						<span class="albums">
							<b>{user.playlist_count}</b> playlist{user.playlist_count === 1 ? '' : 's'}
						</span>
					{/if}
					{#if user.repost_count}
						<span class="reposts">
							<b>{user.repost_count}</b> repost{user.repost_count === 1 ? '' : 's'}
						</span>
					{/if}
					{#if user.follower_count}
						<span class="followers">
							<b>{user.follower_count}</b> follower{user.follower_count === 1 ? '' : 's'}
						</span>
					{/if}
					{#if user.followee_count}
						<span class="following">
							<b>{user.followee_count}</b> following
						</span>
					{/if}
				</div>
				<!-- {#if user.location}
					<span class="location">{user.location}</span>
				{/if} -->
			</div>
		</div>
		{#if layout === 'full' && user.bio}
			<p class="bio">{user.bio}</p>
		{/if}
	</div>
{/if}