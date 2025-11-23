<script lang="ts">
	// Types/constants
	import type { Snippet } from 'svelte'
	import type { SelectOption } from '$/components/Select.svelte'


	// Constants
	const bucketOptions: SelectOption[] = [
		{ value: 1 * 60 * 1000, label: '1 min' },
		{ value: 5 * 60 * 1000, label: '5 min' },
		{ value: 10 * 60 * 1000, label: '10 min' },
		{ value: 30 * 60 * 1000, label: '30 min' },
		{ value: 1 * 60 * 60 * 1000, label: '1 hour' },
		{ value: 3 * 60 * 60 * 1000, label: '3 hours' },
		{ value: 6 * 60 * 60 * 1000, label: '6 hours' },
		{ value: 12 * 60 * 60 * 1000, label: '12 hours' },
		{ value: 24 * 60 * 60 * 1000, label: '1 day' },
		{ value: 3 * 24 * 60 * 60 * 1000, label: '3 days' },
		{ value: 7 * 24 * 60 * 60 * 1000, label: '1 week' },
		{ value: 14 * 24 * 60 * 60 * 1000, label: '2 weeks' },
		{ value: 30 * 24 * 60 * 60 * 1000, label: '1 month' },
	]


	// Props
	let {
		title,
		bucketLength = $bindable(),
		height = 350,
		marginLeft = 60,
		marginBottom = 70,
		marginTop = 40,
		children,
	}: {
		title: string
		bucketLength?: number
		height?: number
		marginLeft?: number
		marginBottom?: number
		marginTop?: number
		children: Snippet<[]>
	} = $props()


	// Components
	import { Plot } from 'svelteplot'
	import Select from '$/components/Select.svelte'
</script>


<details
	open
	data-card="secondary"
>
	<summary data-row="wrap">
		<h3>{title}</h3>

		{#if bucketOptions && bucketLength !== undefined}
			<Select
				bind:value={bucketLength}
				options={bucketOptions}
			/>
		{/if}
	</summary>

	<div>
		<Plot
			{height}
			{marginLeft}
			{marginBottom}
			{marginTop}
		>
			{@render children()}
		</Plot>
	</div>
</details>
