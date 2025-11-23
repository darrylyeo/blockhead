<script lang="ts">
	// Types/constants
	import type { Snippet } from 'svelte'
	import type { SelectOption } from '$/components/Select.svelte'


	// Props
	let {
		title,
		bucketOptions,
		bucketLength = $bindable(),
		height = 350,
		marginLeft = 60,
		marginBottom = 70,
		marginTop = 40,
		children,
	}: {
		title: string
		bucketOptions?: SelectOption[]
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
