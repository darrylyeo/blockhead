<style>
	.controls {
        /* display: flex;
        align-items: center;
		flex-wrap: wrap;
		gap: var(--padding-inner); */

		display: grid;
		grid-auto-flow: column;
		grid-template-columns: 1fr;
		grid-auto-columns: auto;
		gap: var(--padding-inner);
		align-items: center;
	}
    .controls > :global(:first-child) {
		/* flex: 1; */
		/* margin-right: auto; */
	}
	.controls > :global(*) {
		flex: 0 auto;
	}
</style>

<div class="controls">
    <slot />
</div>