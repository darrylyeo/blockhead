<script lang="ts">
	export let trackId: string
	export let isDownloadable = false


	export let isPlaying = false


	import { getTrackStreamURL } from '../api/audius'

	let src
	$: if(trackId)
		getTrackStreamURL({trackId}).then(_ => src = _)

	
	let audioElement
	$: isPlaying ? audioElement?.play() : audioElement?.pause()
</script>


<style>
	audio {
		width: 100%;
		height: 2em;
	}
	/* Firefox Only */
	@supports (-moz-appearance: none) {
		audio {
			filter: var(--invert-when-dark);
		}
	}
	/* Chromium Only */
	@supports (contain: paint) and (not (-moz-appearance: none)) {
		audio {
			filter: var(--invert-when-light);
		}
	}

	::-webkit-media-controls {
		/* color: white; */
		color: inherit;
		font: inherit;
	}

	::-webkit-media-controls-enclosure {
		background-color: rgba(240, 240, 240, 0.5);
		border-radius: 0.5em;
		border-radius: 0;
	}

	::-webkit-media-controls-panel {
		padding: 0;
	}

	::-webkit-media-controls-play-button, ::-internal-media-controls-button-hover-background {
		border-radius: 0.5em;
		color: inherit;
	}

	::-webkit-media-controls-current-time-display, ::-webkit-media-controls-time-remaining-display {
		/* color: inherit; */
		font: inherit;
		text-shadow: none;
	}
</style>


{#if src}
	<audio controls bind:this={audioElement} on:play={() => isPlaying = true} on:pause={() => isPlaying = false} download={isDownloadable}>
		<source {src} />
	</audio>
{/if}