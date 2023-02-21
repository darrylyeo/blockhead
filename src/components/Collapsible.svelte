<script lang="ts">
	export let type: 'label' | 'details' = 'label'

	export let title: string

	export let isOpen = false


	const ariaId = crypto.randomUUID()


	const toggle = () => isOpen = !isOpen
</script>


<style>
	.container {
		display: grid;

		perspective: 1000px;

		transition: 0.5s var(--ease-out-expo);
		/* transition-property: grid-template-rows, gap; */
	}
	.container:is(details) {
		display: contents;
	}
	.container[data-state="open"] {
		grid-template-rows: max-content 1fr;
	}
	.container[data-state="closed"] {
		grid-template-rows: max-content 0fr;
		gap: 0;
	}

	.collapsible {
		min-height: 0;
		overflow: clip;
		overflow-clip-margin: var(--padding-outer);
		transform-origin: top;
	}
	.container[data-state="closed"] > .collapsible {
		/* transform: rotateX(-20deg); */
		translate: 0 var(--padding-inner) -100px;

		opacity: 0;
		filter: blur(1rem);

		visibility: hidden;
		pointer-events: none;
	}

	label, summary {
		margin: calc(-1 * var(--padding-inner));
		padding: var(--padding-inner);
	}
	label[data-state="open"],
	details[open] summary {
		cursor: zoom-out;
	}
	label[data-state="closed"],
	details:not([open]) summary {
		cursor: zoom-in;
	}
	:is(label, summary):hover {
		filter: brightness(1.1);
	}
	:is(label, summary):active {
		scale: 0.992;
		opacity: 0.75;
		transition-duration: 0.15s;
	}
</style>


{#if type === 'label'}
	<div
		class="container {$$props.class}"
		id={ariaId}
		data-state={isOpen ? 'open' : 'closed'}
	>
		<slot name="header" {isOpen} {toggle}>
			<label class="bar" data-state={isOpen ? 'open' : 'closed'}>
				<slot name="title">
					<h4>{title}</h4>
				</slot>

				<div class="row">
					<slot name="toolbar" {isOpen} {toggle}>
						{#if $$slots['toolbar-items']}
							<div role="toolbar">
								<slot name="toolbar-items" {isOpen} {toggle} />
							</div>
						{/if}
					</slot>

					<slot name="header-right" {isOpen} {toggle} />

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
				</div>
			</label>
		</slot>

		<div class="collapsible">
			<slot {isOpen} {toggle} />
		</div>

		<slot name="footer" {isOpen} {toggle} />
	</div>

{:else if type === 'details'}
	<details
		class="container {$$props.class}"
		bind:open={isOpen}
	>
		<slot name="header" {isOpen} {toggle}>
			<summary class="bar" data-state={isOpen ? 'open' : 'closed'} >
				<slot name="title">
					<h4>{title}</h4>
				</slot>

				<div class="row">
					<slot name="toolbar" {isOpen} {toggle}>
						{#if $$slots['toolbar-items']}
							<div role="toolbar">
								<slot name="toolbar-items" {isOpen} {toggle} />
							</div>
						{/if}
					</slot>

					<slot name="header-right" {isOpen} {toggle} />

					<button
						class="small"
						data-after={isOpen ? '⏶' : '⏷'}
						on:click={toggle}
					>{isOpen ? 'Hide' : 'Show'}</button>
					<!-- <button
						class="small"
						data-after={isOpen ? '▲' : '▼'}
						aria-controls={ariaId}
						aria-expanded={isOpen ? 'true' : 'false'}
						on:click={toggle}
					/> -->
				</div>
			</summary>
		</slot>

		<div class="collapsible">
			<slot {isOpen} {toggle} />
		</div>

		<slot name="footer" {isOpen} {toggle} />
	</details>
{/if}
