<script lang="ts">
	// Types
	type Value = $$Generic<Any>


	// Inputs
	export let list: {
		value: Value,
		label: string,
	}[] | undefined


	// Exports
	export const datalistId = crypto.randomUUID()
</script>


{#if list?.length}
	<datalist id={datalistId}>
		{#each list as {value, label}}
			<option
				{value}
				{label}
			/>
		{/each}
	</datalist>
{/if}
