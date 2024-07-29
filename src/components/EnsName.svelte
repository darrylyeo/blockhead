<script lang="ts">
	import type { Ethereum } from '$/data/networks/types'
	import type { ENS } from '$/api/ens'
	import { ethereumMainnet } from '$/data/networks'


	export let network: Ethereum.Network = ethereumMainnet
	export let ensName: string = ''

	export let linked = true

	export let showAvatar = false
	export let showName = false


	let textRecords: Map<string, string>


	$: formattedENSName = textRecords?.get('display') ?? ensName.trim().toLowerCase()

	$: link = `/apps/ens/account/${formattedENSName}`


	const onDragStart = (e: DragEvent) => {
		e.dataTransfer.setData('text/plain', formattedENSName)
		if(linked) e.dataTransfer.setData('text/uri-list', link)
	}


	import EnsRecordsLoader from './EnsRecordsLoader.svelte'
	import Icon from './Icon.svelte'
	// import InlineContainer from './InlineContainer.svelte'

	// import { scale } from 'svelte/transition'
	import { scaleFont } from '$/transitions/scale-font'
</script>


<style>
	.ens-name {
		font-family: var(--monospace-fonts), var(--base-fonts);
		font-size: 0.95em;
	}

	.ens-name-container :global(.ens-text-record-name ~ .ens-name) {
		font-size: 0.6em;
	}
</style>


<EnsRecordsLoader
	layout="passive"
	{ensName}
	resolveTextRecordKeys={[showAvatar && 'avatar', showName && 'name'].filter(Boolean)}
	let:textRecords
>
	{@const title = `${formattedENSName}${textRecords ? [...textRecords.entries()].map(([key, value]) => `${key} ${value}`).join('\n') : ''}`}

	<span class="ens-name-container row inline {$$props.class}">
		{#if textRecords?.get('avatar')}
			{@const avatarUri = textRecords.get('avatar')}
			{#if avatarUri?.match(/^https?:\/\//)}
				<Icon
					key="ENSName/avatar/{ensName}"
					imageSources={[avatarUri]}
					title={textRecords.get('name') ?? formattedENSName}
					placeholder=""
					transition={scaleFont}
					transitionConfig={{ duration: 300 }}
				/>
				<!-- transition={scale}
				transitionConfig={{ start: 0.8, duration: 200 }} -->
			{/if}
		{/if}

		<!-- <InlineContainer isOpen={textRecords?.get('avatar')}>
			{@const avatarUri = textRecords?.get('avatar')}
			{#if avatarUri?.match(/^https?:\/\//)}
				<Icon
					key="ENSName/avatar/{ensName}"
					imageSources={[avatarUri]}
					title={textRecords.get('name') ?? formattedENSName}
					placeholder=""
				/>
			{/if}
		</InlineContainer> -->

		{#if textRecords?.get('name')}
			<h4 class="ens-text-record-name" transition:scaleFont={{ duration: 400 }}>{textRecords.get('name')}</h4>
		{/if}

		<!-- <InlineContainer containerProps={{ class: 'ens-text-record-name' }} isOpen={!!textRecords?.get('name')} clip>
			<h4>{textRecords?.get('name')}</h4>
		</InlineContainer> -->

		<svelte:element
			this={linked ? 'a' : 'span'}
			class="ens-name"
			{title}
			{...linked ? {
				href: link
			} : {}}
			draggable={true}
			on:dragstart={onDragStart}
		>
			{formattedENSName}
		</svelte:element>
	</span>
</EnsRecordsLoader>
