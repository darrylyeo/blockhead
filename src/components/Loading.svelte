<script lang="ts">
	import { fly, scale } from 'svelte/transition'

	export let layout: 'card' | 'icon' = 'card'

	export let title: string

	export let icon: {
		src: string,
		name?: string,
		width?: number,
	} | undefined

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
	.loading[data-layout="icon"] {
		animation: HoverIcon 1.5s infinite;
	}
	.loading :global(*) {
		cursor: inherit !important;
	}

	.icon {
		display: inline-flex;
		place-items: center;
		font-size: 1.5em;

		align-items: center;

		filter: drop-shadow(var(--card-shadow));
	}
	.spin {
		animation: Spin 1s linear infinite;
	}
	.hover {
		transform-style: flat;
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
		from, to {
			transform: perspective(1000px) translateZ(calc(-1 * var(--hover-intensity)));
		}
		50% {
			transform: perspective(1000px) translateZ(var(--hover-intensity));
		}
	}

	@keyframes HoverIcon {
		from, to {
			transform: perspective(1000px) translateZ(calc(-1 * var(--hover-intensity)));
			opacity: 1;
		}
		50% {
			transform: perspective(1000px) translateZ(var(--hover-intensity));
			opacity: 0.5;
		}
	}
</style>


<div
	class="loading"
	class:card={layout === 'card'}
	data-layout={layout}
	{title}
	transition:scale|global
><!-- in:fly|global={{x: -100}} out:fly|global={{x: 100}} -->
	<span class="icon {iconAnimation}">
		<slot name="icon">
			{#if icon}
				<img
					src={icon.src}
					alt={icon.name ?? ''}
					width={icon.width ?? 25}
				/>
			{:else}
				🧭
			{/if}
		</slot>
	</span>

	<slot />
</div>
