<script lang="ts">
	// Constants/types
	import type { TokenList } from '@uniswap/token-lists'


	// Inputs
	export let uri = 'tokens.uniswap.org'


	// Outputs
	export let tokenlist: TokenList

	type SharedSlotProps = IpfsLoader['$$slot_def'] & {
		tokenlist: typeof tokenlist
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	// Functions
	const parseTokenList = (text: string) => (
		JSON.parse(text) as TokenList
	)


	// Components
	import IpfsLoader from './IpfsLoader.svelte'
</script>


<IpfsLoader
	ipnsName={uri}
	{...$$restProps}
	whenLoaded={(result) => {
		tokenlist = parseTokenList(result.text)
	}}
>
	<slot name="header" {tokenlist} />
	<slot {tokenlist} />
</IpfsLoader>
