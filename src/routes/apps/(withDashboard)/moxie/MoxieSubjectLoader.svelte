<script lang="ts">
	// Types/constants
	import type { FarcasterUserId, FarcasterChannelId } from '$/api/farcaster'
	import { type MoxieSubject, type MoxieSubjectToken,MoxieNetwork, moxieNetworks } from '$/api/moxie'


	// Inputs
	export let token: MoxieSubjectToken


	// Components
	import FarcasterUserProfileLoader from '$/components/FarcasterUserProfileLoader.svelte'
	import FarcasterChannelLoader from '$/components/FarcasterChannelLoader.svelte'


	// Functions
	import { moxieSubjectIdRegex } from '$/api/moxie'


	// Outputs
	export let subjectSelector: {
		networkId?: MoxieNetwork,
		farcasterUserId?: FarcasterUserId,
		farcasterChannelId?: FarcasterChannelId,
	}

	$: subjectSelector = (
		token
			.symbol
			?.match(moxieSubjectIdRegex)
			?.groups
		?? {}
	)

	export let subject: MoxieSubject = {
		network: undefined,
		farcasterUser: undefined,
		farcasterChannel: undefined,
	}

	export let subjectToken: MoxieSubjectToken

	$: subjectToken = {
		...token,
		...(
			subject.network ?
				{
					icon: subject.network.icon,
					name: subject.network.name,
				}

			: subject.farcasterUser ?
				{
					icon: subject.farcasterUser.avatar?.url,
					...subject.farcasterUser.name && {
						name: subject.farcasterUser.name,
					},
				}

			: subject.farcasterChannel
				? {
					icon: subject.farcasterChannel.image,
					...subject.farcasterChannel.name && {
						name: subject.farcasterChannel.name,
					},
				}
			:
				undefined
		)
	}

	type SharedSlotProps = {
		subjectToken: typeof subjectToken,
		subjectSelector: typeof subjectSelector,
		subject: typeof subject,
	}

	type $$Slots = {
		default: SharedSlotProps,
	}


	// Actions
	$: if(subjectSelector.networkId)
		subject.network = (
			moxieNetworks[subjectSelector.networkId]
			?? {
				id: subjectSelector.networkId,
			}
		)
</script>


{#if subjectSelector.farcasterUserId}
	<FarcasterUserProfileLoader
		viewOptions={{
			layout: 'passive',
		}}
		userId={subjectSelector.farcasterUserId}
		bind:user={subject.farcasterUser}
	/>

{:else if subjectSelector.farcasterChannelId}
	<FarcasterChannelLoader
		viewOptions={{
			layout: 'passive',
		}}
		query={{
			channelId: subjectSelector.farcasterChannelId,
		}}
		bind:channel={subject.farcasterChannel}
	/>
{/if}

<slot
	{subjectToken}
	{subjectSelector}
	{subject}
/>
