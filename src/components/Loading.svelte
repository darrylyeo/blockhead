<script>
	import { fly, scale } from 'svelte/transition'
</script>

<style>
	.loading {
		background-color: var(--card-background-color);
		border-radius: var(--card-border-radius);
		padding: var(--padding-outer);
		animation: /*ScaleIn 0.2s,*/ Hover 1.5s infinite;

		display: flex;
		justify-content: center;
		align-items: center;
		gap: var(--padding-inner);
	}
	.spinner {
		display: inline-flex;
		place-items: center;
		font-size: 1.5em;

		animation: Spin 1s linear infinite;
	}

	/* @keyframes ScaleIn {
		from { transform: scale(0); }
	} */

	@keyframes Spin {
		from { transform: rotate(0); }
		to { transform: rotate(360deg); }
	}

	@keyframes Hover {
		from, to { transform: perspective(1000px) translateZ(-4px); }
		50% { transform: perspective(1000px) translateZ(4px); }
	}
</style>

<div class="loading" transition:scale><!-- in:fly={{x: -100}} out:fly={{x: 100}} -->
	<span class="spinner">
		<slot name="spinner">🧭</slot>
	</span>
	<slot></slot>
</div>