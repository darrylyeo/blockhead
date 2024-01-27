<script lang="ts">
	import type { Audius } from '$/api/audius'


	export let playlist: Audius.Playlist


	import AudiusUserSummary from './AudiusUserSummary.svelte'
	import HeightContainer from './HeightContainer.svelte'
</script>


<style>
	.card {
		overflow: hidden;
		position: relative;
	}

	.columns {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: start;
		--padding-inner: 1em;
		gap: var(--padding-inner);
	}
	.column {
		--padding-inner: 0.5em;
	}

	img {
		border-radius: 0.25em;
	}
	.playlist-artwork {
		width: 5em;
		height: 5em;
	}

	.user {
		font-size: 0.75em;
		opacity: 0.8;
		gap: 0.5em;
	}
	.metadata {
		font-size: 0.85em;
		opacity: 0.8;
		gap: 0.75em;
	}

	.description {
		font-size: 0.75em;
		opacity: 0.75;
		white-space: pre-line;
		line-height: 1.2;
	}
	.card:not(:hover) .description {
		line-clamp: 2;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>


{#if playlist}
	<div class="audius-playlist card">
		<div class="columns">
			{#if playlist.artwork}
				<img class="playlist-artwork" srcset={Object.entries(playlist.artwork).map(([size, src]) => `${src}`).join(', ')} alt="{playlist.playlist_name} - Playlist Artiwork" />
			{:else}
				<span />
			{/if}
			<div class="column">
				<div class="bar wrap">
					<div class="row-inline">
						<h3>
							<a href="/apps/audius/playlist/{playlist.id}">{playlist.playlist_name}</a>
						</h3>
						<span class="user row">by <AudiusUserSummary user={playlist.user} /></span>
					</div>
					<p class="card-annotation">{playlist.is_album ? 'Album' : 'Playlist'}</p>
				</div>
				<div class="metadata row wrap">
					{#if playlist.tracks?.length}
						<span class="tracks">
							<b>{playlist.tracks.length}</b> track{playlist.tracks.length === 1 ? '' : 's'}
						</span>
					{/if}
					{#if playlist.repost_count}
						<span class="reposts">
							<b>{playlist.repost_count}</b> repost{playlist.repost_count === 1 ? '' : 's'}
						</span>
					{/if}
					{#if playlist.favorite_count}
						<span class="favorites">
							<b>{playlist.favorite_count}</b> like{playlist.favorite_count === 1 ? '' : 's'}
						</span>
					{/if}
					{#if playlist.total_play_count}
						<span class="plays">
							<b>{playlist.total_play_count}</b> play{playlist.total_play_count === 1 ? '' : 's'}
						</span>
					{/if}
				</div>
				{#if playlist.description}
					<HeightContainer>
						<p class="description">{playlist.description}</p>
					</HeightContainer>
				{/if}
			</div>
		</div>
	</div>
{/if}