<style>
	.controls {
        display: flex;
        align-items: center;
		flex-wrap: wrap;
		gap: var(--padding-inner);
	}
    .controls > :global(:first-child) {
		margin-right: auto;
	}
	.controls > :global(*) {
		flex: 0 auto;
	}
</style>

<div class="controls">
    <slot />
</div>