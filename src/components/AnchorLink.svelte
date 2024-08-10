<script lang="ts">
	// Inputs
	export let base: `/${string}` | '' = ''
	export let link: `/${string}`
	export let isEnabled: boolean = true


	// Internal state
	let isFocused = false
</script>


<svelte:window
	on:hashchange={() => {
		isFocused = globalThis.location.hash === `#${link}`
	}}
/>


{#if isEnabled}
	<a
		id={link}
		data-focused={isFocused ? '' : undefined}
		href={isFocused ? `${base}${link}` : `#${link}`}
		{...$$restProps}
		class={$$props.class ?? 'card scroll-snap-item'}
	>
		<slot />
	</a>
{:else}
	<span
		class={$$props.class ?? 'card'}
	>
		<slot />
	</span>
{/if}


<style>
	a {
		&:not([data-focused]) {
			cursor: inherit;
		}
	}
</style>
