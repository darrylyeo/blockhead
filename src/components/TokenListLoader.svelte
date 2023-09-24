<script lang="ts">
	// Constants/types
	import type { TokenList } from '@uniswap/token-lists'
	import uniswapLabsDefaultTokenList from '../data/tokens/tokens.uniswap.org.tokenlist.json'


	// Inputs
	export let uri = 'tokens.uniswap.org'


	// Outputs
	export let tokenlist: TokenList = uniswapLabsDefaultTokenList

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


<!-- <IpfsLoader
	ipnsName={uri}
	{...$$restProps}
	whenLoaded={(result) => {
		tokenlist = parseTokenList(result.text)
	}}
	contentDescription="token list"
> -->
	<!-- <svelte:fragment slot="header"> -->
		<slot name="header" {tokenlist} />
	<!-- </svelte:fragment> -->

	<slot {tokenlist} />
<!-- </IpfsLoader> -->
