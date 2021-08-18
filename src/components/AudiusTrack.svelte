<script lang="ts">
	import type { Audius } from '../data/audius/audius'


	export let track: Audius.Track


	let isPlaying = false


	import AudiusTrackLoader from './AudiusTrackLoader.svelte'
	import AudiusTrackPlayer from './AudiusTrackPlayer.svelte'
	import AudiusUserSummary from './AudiusUserSummary.svelte'
	import Date from './Date.svelte'
	import HeightContainer from './HeightContainer.svelte'
</script>


<style>
	.card {
		overflow: hidden;
		position: relative;
		cursor: pointer;
		transition: 0.3s;
	}
	.card.is-playing {
		animation: Glow 1.5s infinite;
		filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.3));
	}
	@keyframes Glow {
		from, to { box-shadow: 0 0 1px 2px rgba(255, 255, 255, 0.3) inset; }
		50% { box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.4) inset; }
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

	.track-artwork {
		width: 5em;
		height: 5em;
	}
	.card.is-playing .track-artwork {
		animation: Hover 1.5s infinite;
		--hover-intensity: 15px;
		box-shadow: 0 2px 5px rgba(255, 255, 255, 0.15);
	}
	@keyframes Hover {
		from, to { transform: perspective(1000px) translateZ(calc(-1 * var(--hover-intensity))); }
		50% { transform: perspective(1000px) translateZ(var(--hover-intensity)); }
	}

	.user, .released {
		font-size: 0.75em;
		opacity: 0.75;
		gap: 0.5em;
	}
	.metadata {
		font-size: 0.85em;
		opacity: 0.8;
		gap: 0.75em;
	}
	.duration {
		font-size: 1.05em;
		font-weight: 500;
		opacity: 0.9;
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

	.player {
		display: flex;
		margin: calc(-1 * var(--padding-outer));
		margin-top: calc(var(--padding-outer) - var(--padding-inner));
		height: min-content;
	}
</style>


{#if track}
	<div
		class="audius-track card"
		class:is-playing={isPlaying}
		on:click={() => isPlaying = !isPlaying}
		title={
			[
				[
					track.title,
					track.user?.name && `by ${track.user.name}${track.user?.handle && ` (@${track.user?.handle})`}`
				],
				[
					track.description
				],
				[
					track.release_date && `Released: ${track.release_date}`,
					track.duration && `Duration: ${track.duration} seconds`,
					track.genre && `Genre: ${track.genre}`,
					track.mood && `Mood: ${track.mood}`,
				],
				[
					track.play_count && `Play count: ${track.play_count}`,
					track.favorite_count && `Favorite count: ${track.favorite_count}`,
					track.repost_count && `Reposts: ${track.repost_count}`,
				]
			].map(section => section.filter(Boolean).join('\n')).filter(Boolean).join('\n\n')
		}
	>
		<div class="columns">
			{#if track.artwork}
				<img class="track-artwork" srcset={Object.entries(track.artwork).map(([size, src]) => `${src}`).join(', ')} alt="{track.title} - Artwork" />
			{:else}
				<span />
			{/if}
			<div class="column">
				<div class="bar">
					<div class="row-inline">
						<h3>
							<a href="/apps/audius/track/{track.id}">{track.title}</a>
						</h3>
						<span class="row">
							<span class="user row">by <AudiusUserSummary user={track.user} /></span>
							{#if track.release_date}
								<span class="released">
									<Date
										date={track.release_date}
										layout="horizontal"
										showTime={false}
									/>
								</span>
							{/if}
							</span>
					</div>
					<!-- <p class="card-annotation">Audius Track</p> -->
					<span class="card-annotation">
						{#if track.mood && track.mood !== 'Other'}
							<span class="mood">{track.mood}</span><!--{#if track.mood && track.genre}, {/if}-->
						{/if}
						{#if track.genre}
							{track.genre}
						{/if}
					</span>
				</div>
				<div class="metadata row-inline">
					{#if track.duration}
						<span class="duration">
							{Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
						</span>
					{/if}
					{#if track.play_count}
						<span class="plays">
							<b>{track.play_count}</b> play{track.play_count === 1 ? '' : 's'}
						</span>
					{/if}
					{#if track.favorite_count}
						<span class="favorites">
							<b>{track.favorite_count}</b> like{track.favorite_count === 1 ? '' : 's'}
						</span>
					{/if}
					{#if track.repost_count}
						<span class="reposts">
							<b>{track.repost_count}</b> repost{track.repost_count === 1 ? '' : 's'}
						</span>
					{/if}
				</div>
				{#if track.description}
					<HeightContainer>
						<p class="description">{track.description}</p>
					</HeightContainer>
				{/if}
			</div>
		</div>

		<div class="player">
			<AudiusTrackPlayer
				trackId={track.id}
				isDownloadable={track.downloadable}
				bind:isPlaying
			/>
		</div>

		{#if track.remix_of?.tracks?.length}
			<hr>

			<h4>Remix of</h4>
			<div class="column">
				{#each track.remix_of?.tracks as remixedTrack}
					<AudiusTrackLoader trackId={remixedTrack.parent_track_id} />
				{/each}
			</div>
		{/if}
	</div>
{/if}