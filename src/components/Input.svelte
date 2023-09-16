<script lang="ts">
	// External state
	export let value: string = ''

	export let suggestedValues: Datalist<typeof value>['$$prop_def']['list'] | undefined

	
	// Internal state
	let datalistId: Datalist<typeof value>['$$prop_def']['datalistId']


	// Components
	import Datalist from './Datalist.svelte'
</script>


<input
	bind:value
	list={datalistId}
	on:input
	on:change
	{...$$restProps}
/>

<Datalist
	bind:datalistId
	list={suggestedValues}
/>
