<script lang="ts">
	export let title: string

	export let isOpen = false

	const ariaId = crypto.randomUUID()


	const toggle = () => isOpen = !isOpen
</script>


<style>
	.collapsible-container[data-state="closed"] {
		gap: 0;
	}

	.collapsible {
		display: grid;

		overflow: clip;
		overflow-clip-margin: 1rem;

		perspective: 1000px;

		transition: grid-template-rows 0.3s ease-out;
	}
	.collapsible[data-state="open"] {
		grid-template-rows: 1fr;
	}
	.collapsible[data-state="closed"] {
		grid-template-rows: 0fr;
	}

	.collapsible > div {
		min-height: 0;
	}
	.collapsible[data-state="closed"] > div {
		opacity: 0;
		filter: blur(20px);
		translate: 0 0 -100px;
		pointer-events: none;
		/* rotate: 2turn; */
	}

	label[data-state="open"] {
		cursor: zoom-out;
	}
	label[data-state="closed"] {
		cursor: zoom-in;
	}
	label:active {
		scale: 0.992;
		opacity: 0.75;
		transition-duration: 0.1s;
	}
</style>


<div
	class="collapsible-container column {$$props.class}"
	data-state={isOpen ? 'open' : 'closed'}
>

	<div
		class="collapsible"
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
				aria-controls={ariaId}
				aria-expanded={isOpen ? 'true' : 'false'}
				on:click={toggle}
			>{isOpen ? 'Hide' : 'Show'}</button>
		</label>
	</slot>
		<div>
			<slot {isOpen} {toggle} />
		</div>
	</div>
</div>
