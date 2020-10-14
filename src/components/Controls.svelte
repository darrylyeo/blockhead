<style>
	.controls {
        display: flex;
        align-items: center;
		flex-wrap: wrap;
		gap: var(--padding-inner);
	}
    .controls > :global(h1:first-child),
    .controls > :global(h2:first-child),
    .controls > :global(h3:first-child) {
		margin-right: auto;
	}
	.controls > :global(*) {
		flex: 0 auto;
	}
</style>

<div class="controls">
    <slot />
</div>