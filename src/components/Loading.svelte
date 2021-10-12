<script lang="ts">
	import { fly, scale } from 'svelte/transition'

	export let iconAnimation: 'spin' | 'hover' = 'spin'
</script>

<style>
	.loading {
		animation: /*ScaleIn 0.2s,*/ Hover 1.5s infinite;

		display: flex;
		justify-content: center;
		align-items: center;
		gap: var(--padding-inner);

		--hover-intensity: 4px;

		cursor: progress;
	}
	.loading :global(*) {
		cursor: inherit !important;
	}

	.icon {
		display: inline-flex;
		place-items: center;
		font-size: 1.5em;

		align-items: center;
	}
	.spin {
		animation: Spin 1s linear infinite;
	}
	.hover {
		animation: Hover 1s linear infinite;
		--hover-intensity: 100px;
	}

	/* @keyframes ScaleIn {
		from { transform: scale(0); }
	} */

	@keyframes Spin {
		from { transform: rotate(0); }
		to { transform: rotate(360deg); }
	}

	@keyframes Hover {
		from, to { transform: perspective(1000px) translateZ(calc(-1 * var(--hover-intensity))); }
		50% { transform: perspective(1000px) translateZ(var(--hover-intensity)); }
	}
</style>

<div class="loading card" transition:scale><!-- in:fly={{x: -100}} out:fly={{x: 100}} -->
	<span class="icon {iconAnimation}">
		<slot name="icon">🧭</slot>
	</span>
	<slot></slot>
</div>