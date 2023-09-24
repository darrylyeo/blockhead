<script lang="ts">
	// Constants/types
	import type { SvelteComponent } from 'svelte'

	type Value = $$Generic<NonNullable<any>>
	type Icon = $$Generic<'string' | SvelteComponent>

	type Item = {
		value: Value,
		icon?: Icon,
		name: string,
		disabled?: boolean,
	}


	// Inputs
	export let items: Item[]
	export let label = ''
	export let placeholder = ''
	export let required = false
	// (Derived)
	$: valuesMap = new Map(items.map(item => [item.value, item]))


	// Shared state
	export let selectedValue: Value | undefined


	// Internal state
	// (Derived)
	$: selectedItem = selectedValue && valuesMap.get(selectedValue)


	// Outputs
	type $$Slots = {
		label: {
			label: typeof label,
		},
		icon: {
			icon: Icon | undefined,
		},
		item: {
			item: Item,
		},
		placeholder: {

		},
	}
</script>


<label class="row">
	<slot name="label" {label}>{#if label}<span>{label}</span>{/if}</slot>

	<div class="stack">
		<select
			bind:value={selectedValue}
			{required}
		>
			{#if placeholder}
				<option value={undefined}>{placeholder}</option>
			{/if}

			{#each items as item (item.value)}
				<option
					value={item.value}
					selected={item.value === selectedValue}
					disabled={item.disabled}
				>
					{item.name}
				</option>
			{/each}
		</select>

		<div
			class="item row"
			data-after="⏷"
		>
			{#if selectedItem}
				<slot name="item" item={selectedItem}>
					<slot name="icon" icon={selectedItem.icon}>
						{#if typeof selectedItem.icon === 'string'}
							<img src={selectedItem.icon} />
						{:else if selectedItem.icon}
							<svelte:component this={selectedItem.icon} />
						{/if}
					</slot>

					{selectedItem.name}
				</slot>
			{:else}
				<slot name="placeholder">
					<span class="placeholder">{placeholder}</span>
				</slot>
			{/if}
		</div>
	</div>
</label>


<style>
	label {
		flex: 1 0 auto;
	}

	select {
		opacity: 0;
	}

	.item {
		pointer-events: none;

		padding: 0.125rem 0.5rem;
		gap: 0.75ch;
		background-color: white;
		color: black;

		border-radius: 0.5em;
	}
	.item:after {
		width: 0.75em;
		text-align: center;
		margin-left: auto;
	}
</style>
