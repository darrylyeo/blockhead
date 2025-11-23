<script module lang="ts">
	export type SelectValue = string | number | undefined

	export type SelectOption = {
		value: SelectValue
		label: string
		icon?: string
	}
</script>


<script lang="ts" generics="
	_SelectValue extends SelectValue = SelectValue,
	_SelectOption extends SelectOption = SelectOption
">
	// Types/constants
	import type { SvelteHTMLElements } from 'svelte/elements'
	import type { Snippet } from 'svelte'


	// Props
	let {
		id,
		defaultValue,
		value = $bindable(),
		options,
		optionContent,
		selectedOption = $bindable(),
		...restProps
	}: Omit<SvelteHTMLElements['select'], 'value'> & {
		id?: string
		defaultValue?: _SelectValue
		value?: _SelectValue
		options: _SelectOption[]
		optionContent?: Snippet<[_SelectOption]>
		selectedOption?: _SelectOption
	} = $props()


	// State
	// (Derived)
	$effect(() => {
		selectedOption = options.find(option => option.value === value) || options[0]
	})
</script>


<select
	{id}
	bind:value
	{...restProps}
>
	{@render selectedContent()}
	{#snippet selectedContent()}
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button
			type="button"
			onclick={e => {
				e.stopPropagation()
			}}
		>
			<selectedcontent></selectedcontent>
		</button>
	{/snippet}

	{#each options as option}
		<option
			value={option.value}
			selected={option.value === defaultValue}
			onclick={e => {
				e.preventDefault()
			}}
		>
			{#if optionContent}
				{@render optionContent(option)}
			{:else}
				{@render defaultOptionContent()}
				{#snippet defaultOptionContent()}
					<span aria-hidden="true">
						{#if option.icon}
							{#if option.icon?.includes('<svg')}
								{@html option.icon}
							{:else}
								<img
									alt={option.label}
									src={option.icon}
								/>
							{/if}
						{/if}
					</span>
					{option.label}
				{/snippet}
			{/if}
		</option>
	{/each}
</select>


<style>
	@supports (appearance: base-select) {
		select {
			appearance: base-select;

			min-width: max-content;

			cursor: pointer;
			transition: border-color 0.2s ease;

			&:hover {
				border-color: var(--accent);
			}

			&:focus {
				box-shadow: 0 0 0 3px var(--accent-backgroundColor);
			}

			&::picker-icon {
				content: '';
				width: 0.75em;
				height: 0.75em;
				background-color: currentColor;
				mask: var(--icon-chevron) no-repeat;
				opacity: 0.66;
				transform: perspective(100px) rotateX(0deg);
				transition: transform 0.2s ease;
			}
			&:open::picker-icon {
				transform: perspective(100px) rotateX(180deg);
			}

			> button {
				display: contents;
				font: inherit;

				> selectedcontent {
					display: contents;
				}
			}

			option,
			selectedcontent {
				display: flex;
				align-items: center;
				gap: 0.5rem;

				color: var(--text-primary);

				transition-property: background-color, font-weight, color;

				&:hover {
					background-color: var(--background-secondary);
				}

				&:checked {
					background-color: var(--accent-backgroundColor);
					font-weight: 600;
				}

				&::checkmark {
					content: "✓";
					order: 1;
					color: var(--accent);
					font-weight: bold;
				}

				img, svg {
					height: 1em;
					vertical-align: middle;
				}
			}
		}

		::picker(select) {
			appearance: base-select;

			margin-block: 0.25em;
			position-area: block-end span-inline-end;
			position-try-order: most-block-size;
			position-try-fallbacks: block-start span-inline-end, block-end span-inline-start, block-start span-inline-start;
			position-visibility: anchors-visible;
			min-width: anchor-size(width);

			background: var(--background-primary);
			border: 1px solid var(--border-color);
			border-radius: 0.5rem;
			box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);

			transition-property: display, opacity, font-size;

			@starting-style {
				opacity: 0;
				font-size: 0;
			}
		}

		select:not(:open)::picker(select) {
			opacity: 0;
			font-size: 0;
		}
	}

	@supports not (appearance: base-select) {
		select {
			appearance: none;
			padding-right: 2.5em;
			background: right 0.75rem center / 0.625rem no-repeat var(--icon-chevron);
		}
	}
</style>
