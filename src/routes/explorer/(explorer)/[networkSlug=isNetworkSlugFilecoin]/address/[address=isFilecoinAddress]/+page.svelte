<script lang="ts">
	// Params/Context
	import { explorerParams } from '../../../../_explorerParams.svelte'

	import { explorerContext } from '../../../../_explorerContext.svelte'


	// Components
	import FilecoinAccount from '$/components/FilecoinAccount.svelte'
	import FilecoinAccountLoader from '$/components/FilecoinAccountLoader.svelte'
</script>


<FilecoinAccountLoader
	network={explorerContext.network}
	address={explorerParams.address}
	let:account
>
	<FilecoinAccount
		network={explorerContext.network}
		{account}
		headingLevel={2}
	/>
</FilecoinAccountLoader>
