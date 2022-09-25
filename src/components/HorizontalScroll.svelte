<style>
	.horizontal-scroll {
		--scroll-fade: calc(var(--padding-outer) / 2);

		display: inline-grid;
		grid-auto-flow: column;
		overflow-x: auto;

		margin: 0 calc(-1 * var(--scroll-fade));
	}
	.horizontal-scroll::-webkit-scrollbar {
		display: none;
	}

	.horizontal-scroll > * {
		display: flex;
		width: fit-content;
		padding: 0 calc(-1 * var(--scroll-fade));
		mask-image: linear-gradient(
			to right,
			transparent,
			white var(--scroll-fade),
			white calc(-100% * var(--scroll-fade)),
			transparent
		);
	}
</style>


<span class="horizontal-scroll">
	<span>
		<slot />
	</span>
</span>