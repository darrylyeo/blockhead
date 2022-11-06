<script lang="ts">
	// Formatting
	import { BigNumber, utils } from 'ethers'

	const { formatUnits, parseUnits } = utils

	const truncate = (n: string, decimals: number) =>
		n.match(new RegExp(`^\\d*(?:\.\\d{0,${decimals}})?`))[0]

	const format = (n: BigNumber | undefined, decimals: number): string =>
		n ? truncate(formatUnits(n, decimals), decimals) : ''

	const parse = (n: string | number, decimals: number): BigNumber | undefined => {
		try {
			return parseUnits(truncate(String(n), decimals), decimals)
		}catch(e) {
			return undefined
		}
	}


	// External state
	export let value: BigNumber | undefined

	export let min: BigNumber | undefined
	export let max: BigNumber | undefined
	export let decimals = 0

	export let required = false


	// Internal state
	let inputValue: string = format(value, decimals)


	// Methods/hooks/lifecycle
	const onInput = () => {
		inputValue = inputValue.replace(/[^\d.]/g, '').replace(/(.*[.].*)[.]/g, '$1')
	}

	const onChange = () => {
		// inputValue = value ? format(value) : ''
		console.log(inputValue)
		value = parse(inputValue, decimals)

		if(max && value?.gt(max))
			value = max
		else if(min && value?.lt(min))
			value = min

		inputValue = format(value, decimals)
	}

	const setMax = () => {
		if(max) value = max
		inputValue = format(value, decimals)
	}
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
		placeholder={min && max ? `${min} to ${max}` : '0'}
	/>

	{#if max}
		<button
			type="button"
			class="max small"
			on:click={setMax}
			disabled={parse(inputValue, decimals)?.eq(max)}
		>max</button>
	{/if}
</div>
