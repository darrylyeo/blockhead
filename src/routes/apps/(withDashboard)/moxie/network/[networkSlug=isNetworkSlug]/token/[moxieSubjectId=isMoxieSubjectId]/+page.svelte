<script lang="ts">
	// Types/constants
	import { MoxieProvider } from '$/api/moxie/provider'


	// Context
	import {
		network,
	} from '$/routes/apps/_appsContext'

	import {
		moxieSubjectId,
	} from '$/routes/apps/_appsParams'

	import { preferences } from '$/state/preferences'

	$: moxieProvider = $preferences.moxieProvider ?? MoxieProvider.TheGraph


	// Components
	import MoxieSubjectLoader from '../../../../MoxieSubjectLoader.svelte'
	import MoxieSubjectToken from '../../../../MoxieSubjectToken.svelte'
</script>


<MoxieSubjectLoader
	{moxieProvider}
	{network}
	token={{
		symbol: $moxieSubjectId,
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
