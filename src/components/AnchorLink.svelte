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
