<script lang="ts">
	export let type: 'label' | 'details' = 'details'

	export let title = ''

	export let isOpen = false

	export let renderOnlyWhenOpen = true

	export let showTriggerText = true

	export let canToggle = true


	type SharedSlotProps = {
		isOpen: boolean,
		toggle: () => boolean,
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
		'title': SharedSlotProps,
		'toolbar': SharedSlotProps,
		'toolbar-items': SharedSlotProps,
		'header-right': SharedSlotProps,
		'trigger-text': SharedSlotProps,
		'footer': SharedSlotProps,
	}


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
	details.container {
		display: block;
	}
	details.container[open],
	.container[data-state="open"] {
		grid-template-rows: max-content 1fr;
	}
	details.container:not([open]),
	.container[data-state="closed"] {
		grid-template-rows: max-content 0fr;
		gap: 0;
	}

	label, summary {
		margin: calc(-1 * var(--padding-inner));
		padding: var(--padding-inner);
	}
	:is(label, summary):hover {
		filter: brightness(1.1);
	}
	:is(label, summary):active {
		scale: 0.992;
		opacity: 0.75;
		transition-duration: 0.15s;
	}
	.container[data-state="open"] label,
	details[open] summary {
		cursor: zoom-out;
	}
	.container[data-state="closed"] label,
	details:not([open]) summary {
		cursor: zoom-in;
	}

	.collapsible {
		min-height: 0;
		overflow: clip;
		overflow-clip-margin: var(--padding-outer);
		transform-origin: top;
		align-content: start;
	}
	.container:is([data-state="closed"],
	details:not([open])) > .collapsible {
		margin-bottom: calc(-1 * var(--padding-inner));

		/* transform: rotateX(-20deg); */
		translate: 0 0 -100px;

		opacity: 0;
		filter: blur(1rem);

		visibility: hidden;
		pointer-events: none;
	}

	::-webkit-details-marker {
		display: none;
	}
</style>


<svelte:element
	this={{
		'label': 'div',
		'details': 'details'
	}[type]}
	class="container {$$props.containerClass ?? ''}"
	class:column-block={type === 'details'}
	{...{
		'label': {
			'data-state': isOpen ? 'open' : 'closed',
		},
		'details': {
			open: isOpen,
		},
	}[type]}
	on:toggle={e => isOpen = e.target.open}
>
<!-- bind:open={isOpen} -->
	<slot name="header" {isOpen} {toggle}>
		<svelte:element
			this={
				canToggle
					? {
						'label': 'label',
						'details': 'summary'
					}[type]
					: 'div'
			}
			class="bar wrap"
		>
			<slot name="title" {isOpen} {toggle}>
				<h4>{title}</h4>
			</slot>

			<div class="row wrap">
				<slot name="toolbar" {isOpen} {toggle}>
					{#if $$slots['toolbar-items']}
						<div role="toolbar">
							<slot name="toolbar-items" {isOpen} {toggle} />
						</div>
					{/if}
				</slot>

				<slot name="header-right" {isOpen} {toggle} />

				{#if canToggle}
					<button
						class="small"
						data-after={showTriggerText ? isOpen ? '⏶' : '⏷' : isOpen ? '▲' : '▼'}
						{...type === 'label' ? {
							'aria-controls': ariaId,
							'aria-expanded': isOpen ? 'true' : 'false',
						} : {}}
						on:click={toggle}
					>{#if showTriggerText}<slot name="trigger-text" {isOpen} {toggle}>{isOpen ? 'Hide' : 'Show'}</slot>{/if}</button>
					<!-- <button
						class="small"
						data-after={isOpen ? '▲' : '▼'}
						aria-controls={ariaId}
						aria-expanded={isOpen ? 'true' : 'false'}
						on:click={toggle}
					/> -->
				{/if}
			</div>
		</svelte:element>
	</slot>

	<div
		class="collapsible {$$props.class ?? ''}"
		{...type === 'label' ? {
			id: ariaId,
		} : {}}
	>
		{#if renderOnlyWhenOpen ? isOpen : true}
			<slot {isOpen} {toggle} />
		{/if}
	</div>

	<slot name="footer" {isOpen} {toggle} />
</svelte:element>
