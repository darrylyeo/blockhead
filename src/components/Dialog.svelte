<script lang="ts">
	// Inputs
	export let id: string = crypto.randomUUID()
	export let isOpen: boolean = false

	export let renderOnlyWhenOpen = true
</script>


<button
	popovertarget={id}
	class="small"
>
	<slot />
</button>

<div
	popover
	on:toggle={e => {
		isOpen = e.newState === 'open'
	}}
	{id}
>
	{#if renderOnlyWhenOpen ? isOpen : true}
		<slot name="content" />
	{/if}
</div>


<style>
	[popover] {
		position: fixed;
		border: none;
		background: none;
		width: 40rem;
		max-width: 100%;
		margin: auto;
		opacity: 0;
		pointer-events: none;
		transition: 0.4s var(--ease-out-expo);
	}
	[popover]:popover-open {
		opacity: 1;
		pointer-events: all;
	}

	::backdrop {
		background-color: rgba(0, 0, 0, 0.25);
		animation: Blur 0.2s forwards;
		animation-timing-function: var(--ease-out-expo);
	}
	@keyframes Blur {
		to {
			backdrop-filter: blur(16px);
		}
	}

	/* Firefox Only */
	@supports (-moz-appearance: none) {
		button {
			display: none;
		}
	}
</style>
