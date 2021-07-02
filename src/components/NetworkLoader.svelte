<script lang="ts">
	import type { Ethereum } from '../../../data/ethereum/types'


	export let network: Ethereum.Network
	export let providerName: string
	export let providerPromise: Promise<Ethereum.Provider>


	import Loader from './Loader.svelte'
	import TokenIcon from './TokenIcon.svelte'
</script>


<Loader
	loadingMessage="Connecting to the {network ? `${network.name} ` : ''} blockchain via {providerName}..."
	fromPromise={providerPromise}
	let:then={provider}
>
	<TokenIcon slot="loadingIcon" token={network.nativeCurrency.symbol} />

	<slot {provider} />
</Loader>