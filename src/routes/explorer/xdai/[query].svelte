<script lang="ts">
	import type { Ethereum } from '../../../data/ethereum/types'

	import { getContext } from 'svelte'

	const explorerNetwork: SvelteStore<Ethereum.Network> = getContext('explorerNetwork')
	const explorerProvider: SvelteStore<Ethereum.Provider> = getContext('explorerProvider')


	import { preferences } from '../../../data/ethereum/preferences'
	$: transactionProvider = $preferences.transactionProvider


	import type { Writable } from 'svelte/store'

	export let query = getContext<Writable<string>>('query')


	const isAddress = query => /^0x[0-9a-f]{40}$/i.test(query)
	const isTransaction = query => /^0x[0-9a-f]{64}$/i.test(query)
	const isBlockNumber = query => /^[0-9]+$/i.test(query)

	import EthereumAccount from '../../../components/EthereumAccount.svelte'
	import EthereumBlock from '../../../components/EthereumBlock.svelte'
	import EthereumTransactionLoader from '../../../components/EthereumTransactionLoader.svelte'
</script>


{#if $query && $explorerProvider}
	{#if isTransaction($query)}
		<EthereumTransactionLoader
			network={$explorerNetwork}
			transactionID={$query}
			provider={$explorerProvider}

			detailLevel="exhaustive"
			showValues="both"
			showFees={true}

			layout="standalone"
		/>
	{:else if isBlockNumber($query)}
		<EthereumBlock network={$explorerNetwork} blockNumber={$query} provider={$explorerProvider} {transactionProvider}/>
	{:else}
		<EthereumAccount network={$explorerNetwork} addressOrENSName={$query} provider={$explorerProvider}/>
	{/if}
{/if}