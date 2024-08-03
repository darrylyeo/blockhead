<script lang="ts">
	// Params/Context
	import {
		explorerParams,
	} from '../../../../_explorerParams'

	import {
		explorerNetwork,
	} from '../../../../_explorerContext'


	// Components
	import FilecoinAccount from '$/components/FilecoinAccount.svelte'
	import FilecoinAccountLoader from '$/components/FilecoinAccountLoader.svelte'
</script>


<FilecoinAccountLoader
	network={$explorerNetwork}
	address={$explorerParams.address}
	let:account
>
	<FilecoinAccount
		network={$explorerNetwork}
		{account}
		headingLevel={2}
	/>
</FilecoinAccountLoader>
