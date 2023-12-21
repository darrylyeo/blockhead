<script lang="ts">
	// Formatting
	import { formatUnits, parseUnits } from 'ethers'

	const truncate = (n: string, decimals: number) =>
		n.match(new RegExp(`^\\d*(?:\.\\d{0,${decimals}})?`))[0]

	const format = (n: BigInt | undefined, decimals: number): string =>
		n ? truncate(formatUnits(n, decimals), decimals) : ''

	const parse = (n: string | number, decimals: number): BigInt | undefined => {
		try {
			return parseUnits(truncate(String(n), decimals), decimals)
		}catch(e) {
			return undefined
		}
	}


	// External state
	export let value: bigint | undefined

	export let min: bigint | undefined
	export let max: bigint | undefined
	export let decimals = 0

	export let required = false

	export let suggestedValues: (NonNullable<Datalist<typeof value>['$$prop_def']['list']>[number] | 'min' | 'max' | 'zero')[]

	
	// Internal state
	let inputValue: string = format(value, decimals)

	let datalistId: Datalist<typeof value>['$$prop_def']['datalistId']


	// Methods/hooks/lifecycle
	const onInput = () => {
		inputValue = inputValue.replace(/[^\d.]/g, '').replace(/(.*[.].*)[.]/g, '$1')

		value = parse(inputValue, decimals)
	}

	const onChange = () => {
		value = parse(inputValue, decimals)

		if(max && value && value > max)
			value = max
		else if(min && value && value > min)
			value = min

		inputValue = format(value, decimals)
	}

	const setMax = () => {
		if(max) value = max
		inputValue = format(value, decimals)
	}


	// Components
	import Datalist from './Datalist.svelte'
</script>


<style>
	input {
		text-align: end;
		font-family: var(--monospace-fonts);
	}

	input:nth-last-child(2) {
		padding-right: 3.25em;
	}

	.max {
		justify-self: end;
		align-self: center;
		margin-right: .5rem;
	}
</style>


<div class="stack">
	<input
		type="text"
		bind:value={inputValue}
		{required}
		on:input={onInput}
		on:change={onChange}
		placeholder={max ? max > 2n ** 16n ? '0' : max.toString() : undefined}
		list={datalistId}
	/>
	<!-- placeholder={min && max ? `${min} to ${max}` : '0'} -->

	{#if max}
		<button
			type="button"
			class="max small"
			on:click={setMax}
			disabled={parse(inputValue, decimals) === max}
		>max</button>
	{/if}
</div>

<Datalist
	bind:datalistId
	list={suggestedValues?.map(value => (
		value === 'min' ?
			{
				value: min,
				label: 'Min'
			}
		: value === 'max' ?
			{
				value: max,
				label: 'Max'
			}
		: value === 'zero' ?
			{
				value: 0n,
				label: 'Zero'
			}
		:
			value
	))}
/>
