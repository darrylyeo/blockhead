<script lang="ts">
	import type { ENS } from '../api/ens'
	import type { Ethereum } from '../data/networks/types'


	export let network: Ethereum.Network
	export let resolver: ENS.Resolver


	import Address from './Address.svelte'
	import EthereumContractExplorer from './EthereumContractExplorer.svelte'
</script>


<div class="resolver card">
	<div class="bar">
		<h3>
			<Address {network} address={resolver.address} />
		</h3>
		<span class="card-annotation">
			<abbr title={`A resolver is a contract that maps from name to resource (e.g., cryptocurrency addresses, content hash, etc). Resolvers are pointed to by the resolver field of the registry.\n\nSource: https://docs.ens.domains/terminology`}>ENS Resolver</abbr>
		</span>
	</div>

	<hr>

	<EthereumContractExplorer
		{network}
		contractAddress={resolver.address}
	>
		<h4 slot="title" let:address>
			<Address {network} {address}>Contract Code</Address>
		</h4>
	</EthereumContractExplorer>
</div>
