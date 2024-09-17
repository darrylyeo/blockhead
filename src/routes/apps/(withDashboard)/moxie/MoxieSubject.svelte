<script lang="ts">
	// Types/constants
	import type { MoxieSubject } from '$/api/moxie'
	import type { MoxieSubjectToken } from '$/api/moxie/index'


	// Inputs
	export let subject: MoxieSubject
	export let subjectToken: MoxieSubjectToken

	// (View options)
	export let showFormattedTokenSymbols = true


	// Components
	import FarcasterChannelComponent from '$/components/FarcasterChannel.svelte'
	import FarcasterUserComponent from '$/components/FarcasterUser.svelte'
	import Icon from '$/components/Icon.svelte'
	import TokenName from '$/components/TokenName.svelte'
</script>


{#if subject.network}
	<span class="row with-float">
		<Icon
			imageSources={[subject.network.icon]}
		/>
		{subject.network.name}
	</span>

{:else if subject.farcasterUser}
	<span class="row inline">
		<FarcasterUserComponent
			user={subject.farcasterUser}
			showDisplayName={false}
		/>
	</span>

{:else if subject.farcasterChannel}
	<FarcasterChannelComponent
		channel={subject.farcasterChannel}
	/>

{:else}
	<TokenName
		token={subjectToken}
		layout={showFormattedTokenSymbols ? 'name-or-symbol' : 'symbol'}
	/>
{/if}
