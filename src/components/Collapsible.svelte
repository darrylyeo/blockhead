<script lang="ts">
	export let type: 'label' | 'details' = 'details'

	export let title = ''

	export let isOpen = false

	export let renderOnlyWhenOpen = true

	export let showTriggerText = true

	export let canToggle = true

	export let showContentsOnly = false

	export let clip = true


	type SharedSlotProps = {
		isOpen: typeof isOpen,
		toggle: typeof toggle,
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


	const buttonId = crypto.randomUUID()
	const ariaId = crypto.randomUUID()


	const toggle = () => isOpen = !isOpen
</script>


<style>
	[data-collapsible-container] {
		--collapsible-size: 1fr;
		--collapsible-container-gap: var(--padding-inner);
		--collapsible-trigger-cursor: zoom-out;

		&:is(
			div[data-state="closed"],
			details:not([open])
		) {
			--collapsible-size: 0fr;
			--collapsible-container-gap: 0;
			--collapsible-trigger-cursor: zoom-in;
		}

		&:has(> .collapsible:empty) {
			--collapsible-container-gap: 0;
		}

		display: grid;
		grid-template-rows: max-content var(--collapsible-size);
		gap: var(--collapsible-container-gap);

		perspective: 1000px;
		transition-duration: 0.5s;
		transition-timing-function: var(--ease-out-expo);
		transition-property:
			grid-template-rows,
			gap
		;

		&:is(details) {
			display: block;
		}

		[data-collapsible-trigger] {
			margin: calc(-1 * var(--padding-inner));
			padding: var(--padding-inner);

			cursor: var(--collapsible-trigger-cursor);

			transition-property:
				filter,
				opacity,
				scale,
				translate
			;

			&:hover {
				filter: brightness(1.1);
			}

			&:active {
				scale: 0.992;
				opacity: 0.75;
				transition-duration: 0.15s;
			}
		}

		[data-collapsible-content] {
			min-height: 0;
			transform-origin: top;
			align-content: start;

			transition-property:
				filter,
				margin-bottom,
				opacity,
				translate,
				transform-origin
			;

			&:empty {
				display: none;
			}

			&.clip {
				overflow: clip;
				overflow-clip-margin: var(--padding-outer);
			}

			.container:is(
				div[data-state="closed"],
				details:not([open])
			) > & {
				margin-bottom: calc(-1 * var(--padding-inner));
				translate: 0 0 -100px;
				opacity: 0;
				filter: blur(1rem);
				visibility: hidden;
				pointer-events: none;
			}
		}
	}

	::-webkit-details-marker {
		display: none;
	}
</style>


{#if !showContentsOnly}
	<svelte:element
		this={
			canToggle
				? {
					'label': 'div',
					'details': 'details'
				}[type]
				: 'div'
		}
		{...$$restProps}
		data-collapsible-container
		class="container {$$props.containerClass ?? ''}"
		class:column-block={canToggle && type === 'details'}
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
				data-collapsible-trigger
				class={$$props.contentClass ?? `bar wrap`}
				{...{
					'label': {
						'for': buttonId,
					},
				}[type]}
			>
				<slot name="title" {isOpen} {toggle}>
					<h4>{title}</h4>
				</slot>

				<div class={$$props.contentRightClass ?? 'row wrap'}>
					<slot name="toolbar" {isOpen} {toggle}>
						{#if $$slots['toolbar-items']}
							<div role="toolbar" class="row">
								<slot name="toolbar-items" {isOpen} {toggle} />
							</div>
						{/if}
					</slot>

					<slot name="header-right" {isOpen} {toggle} />

					{#if canToggle}
						<button
							class="small"
							data-after={showTriggerText ? isOpen ? '⏶' : '⏷' : isOpen ? '▲' : '▼'}
							{...{
								'label': {
									'id': buttonId,
									'aria-controls': ariaId,
									'aria-expanded': isOpen ? 'true' : 'false',
								},
							}[type]}
							on:click|preventDefault={toggle}
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
			data-collapsible-content
			class="collapsible {$$props.class ?? ''}"
			class:clip
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
{:else}
	<!-- <div
		class="container {$$props.containerClass ?? ''}"
	>
		<div
			class="collapsible {$$props.class ?? ''}"
			{...type === 'label' ? {
				id: ariaId,
			} : {}}
		>
			{#if renderOnlyWhenOpen ? isOpen : true} -->
				<slot {isOpen} {toggle} />
			<!-- {/if}
		</div>

		<slot name="footer" {isOpen} {toggle} />
	</div> -->
{/if}
