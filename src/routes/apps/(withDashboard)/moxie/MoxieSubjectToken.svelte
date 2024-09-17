<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { MoxieSubject } from '$/api/moxie'


	// Inputs
	export let network: Ethereum.Network
	export let subjectToken: Ethereum.Erc20Token
	export let subject: MoxieSubject


	// Components
	import EthereumErc20Token from '$/components/EthereumErc20Token.svelte'
</script>


<EthereumErc20Token
	{network}
	token={subjectToken}
/>
