<script lang="ts">
	// Inputs
	export let link: `/${string}`
	export let isEnabled: boolean = true
</script>


{#if isEnabled}
	<a
		id={link}
		href={`#${link}`}
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
