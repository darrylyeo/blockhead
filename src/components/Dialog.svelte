<script lang="ts">
	// Inputs
	export let id: string = crypto.randomUUID()
</script>


<button
	popovertarget={id}
	class="small"
>
	<slot />
</button>

<div
	popover
	{id}
>
	<slot name="content" />
</div>


<style>
	[popover] {
		border: none;
		background: none;
		width: 40rem;
		max-width: 100%;
		margin: auto;
		opacity: 0;
		transition: 0.4s var(--ease-out-expo);
	}
	[popover]:popover-open {
		opacity: 1;
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
</style>
