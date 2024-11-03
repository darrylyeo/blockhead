<script lang="ts">
	// Types/constants
	import { MoxieProvider } from '$/api/moxie/provider'


	// Context
	import { appsContext } from '$/routes/apps/_appsContext.svelte'

	import { appsParams } from '$/routes/apps/_appsParams.svelte'

	import { preferences } from '$/state/preferences'

	$: moxieProvider = $preferences.moxieProvider ?? MoxieProvider.TheGraph


	// Components
	import MoxieSubjectLoader from '../../../../MoxieSubjectLoader.svelte'
	import MoxieSubjectToken from '../../../../MoxieSubjectToken.svelte'
</script>


<MoxieSubjectLoader
	{moxieProvider}
	network={appsContext.network}
	token={{
		symbol: appsParams.moxieSubjectId,
	}}
	let:subjectToken
	let:subject
>
	{#if subjectToken}
		<MoxieSubjectToken
			{subjectToken}
			{subject}
		/>
	{/if}
</MoxieSubjectLoader>
