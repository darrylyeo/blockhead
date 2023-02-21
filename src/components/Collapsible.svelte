<script lang="ts">
	export let title: string

	export let isOpen = false

	const ariaId = crypto.randomUUID()


	const toggle = () => isOpen = !isOpen
</script>


<style>
	.collapsible {
		display: grid;

		perspective: 1000px;

		transition: 0.5s var(--ease-out-expo);
		/* transition-property: grid-template-rows, gap; */
	}
	.collapsible[data-state="open"] {
		grid-template-rows: max-content 1fr;
	}
	.collapsible[data-state="closed"] {
		grid-template-rows: max-content 0fr;
		gap: 0;
	}

	.collapsible > div {
		min-height: 0;
		overflow: clip;
		overflow-clip-margin: var(--padding-outer);
		transform-origin: top;
	}
	.collapsible[data-state="closed"] > div {
		/* transform: rotateX(-20deg); */
		translate: 0 var(--padding-inner) -100px;

		opacity: 0;
		filter: blur(1rem);

		visibility: hidden;
		pointer-events: none;
	}

	label {
		margin: calc(-1 * var(--padding-inner));
		padding: var(--padding-inner);
	}
	label[data-state="open"] {
		cursor: zoom-out;
	}
	label[data-state="closed"] {
		cursor: zoom-in;
	}
	label:hover {
		filter: brightness(1.1);
	}
	label:active {
		scale: 0.992;
		opacity: 0.75;
		transition-duration: 0.15s;
	}
</style>


<div
	class="collapsible {$$props.class}"
	id={ariaId}
	data-state={isOpen ? 'open' : 'closed'}
	aria-labelledby="collapsible-header"
	role="region"
>
	<slot name="header" {isOpen} {toggle}>
		<label class="bar" data-state={isOpen ? 'open' : 'closed'}>
			<slot name="title">
				<h4>{title}</h4>
			</slot>

			<button
				class="small"
				data-after={isOpen ? '⏶' : '⏷'}
				aria-controls={ariaId}
				aria-expanded={isOpen ? 'true' : 'false'}
				on:click={toggle}
			>{isOpen ? 'Hide' : 'Show'}</button>
			<!-- <button
				class="small"
				data-after={isOpen ? '▲' : '▼'}
				aria-controls={ariaId}
				aria-expanded={isOpen ? 'true' : 'false'}
				on:click={toggle}
			/> -->
		</label>
	</slot>

	<div>
		<slot {isOpen} {toggle} />
	</div>

	<slot name="footer" {isOpen} {toggle} />
</div>
