<script lang="ts">
	// Constants/types
	import { type LensInstance, lensInstances, type LensProfile } from '$/api/lens'
	import { networksByChainID } from '$/data/networks'
	import { ipfsGatewaysByProvider } from '$/data/ipfsGateways'


	// Context
	import { preferences } from '$/state/preferences'
	
	
	// External state
	export let instance: LensInstance
	export let profile: LensProfile

	// (View options)
	export let showContracts = false
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 3


	// Internal state

	// (Computed)
	$: network = networksByChainID[lensInstances[instance].chainId]

	$: picture = resolveUri({
		src: profile.picture?.uri || profile.picture?.original?.url,
		ipfsGatewayDomain: ipfsGatewaysByProvider[$preferences.ipfsGateway].gatewayDomain,
		arweaveGatewayDomain: $preferences.arweaveGateway,
	})
	$: coverPicture = resolveUri({
		src: profile.coverPicture?.uri || profile.coverPicture?.original?.url,
		ipfsGatewayDomain: ipfsGatewaysByProvider[$preferences.ipfsGateway].gatewayDomain,
		arweaveGatewayDomain: $preferences.arweaveGateway,
	})


	// Functions
	import { resolveUri } from '$/utils/resolveUri'


	// Components
	import Address from './Address.svelte'
	import Collapsible from './Collapsible.svelte'
	import EthereumAccountOrContract from './EthereumAccountOrContract.svelte'
	import LensName from './LensName.svelte'
</script>


<article class="card column">
	{#if coverPicture}
		<img
			class="cover-image"
			src={coverPicture}
			alt="{profile.handle} - Cover Image"
			on:error={e => e.target.hidden = true}
		/>
	{/if}

	<header class="bar wrap">
		<div class="row">
			{#if profile.picture?.uri || profile.picture?.original?.url}
				{#if profile.picture.contractAddress}
					<Address
						network={networksByChainID[1]}
						address={profile.picture.contractAddress}
					>
						<img src={picture} width="24" />
					</Address>
				{:else}
					<img src={picture} width="24" />
				{/if}
			{/if}

			<span class="row inline">
				<svelte:element this={`h${headingLevel}`}>
					<LensName {instance} lensName={profile.handle} />
				</svelte:element>

				<small class="muted">
					<Address {network} address={profile.ownedBy} />
				</small>
			</span>

			{#if profile.isDefault}
				<span class="default" title="Default Profile">✔</span>
			{/if}
		</div>

		<span class="card-annotation">
			{#if profile.isDefault}Default {/if}Lens Profile
		</span>
	</header>


	<div class="metadata row wrap">
		{#each [
			{
				key: 'totalFollowers',
				nameSingular: 'follower',
				namePlural: 'followers',
			},
			{
				key: 'totalFollowing',
				nameSingular: 'following',
				namePlural: 'following',
			},
			{
				key: 'totalCollects',
				nameSingular: 'collect',
				namePlural: 'collects',
			},
			{
				key: 'totalPublications',
				nameSingular: 'publication',
				namePlural: 'publications',
			},
			{
				key: 'totalPosts',
				nameSingular: 'post',
				namePlural: 'posts',
			},
			{
				key: 'totalComments',
				nameSingular: 'comment',
				namePlural: 'comments',
			},
			{
				key: 'totalMirrors',
				nameSingular: 'mirror',
				namePlural: 'mirrors',
			},
		] as { key, nameSingular, namePlural } (key)}
			{#if profile.stats[key]}
				<span data-item={key}>
					{#if key === 'totalFollowing' && profile.followNftAddress}
						<Address {network} address={profile.followNftAddress}><b>{profile.stats[key]}</b> {profile.stats[key] === 1 ? nameSingular : namePlural}</Address>
					{:else}
						<b>{profile.stats[key]}</b> {profile.stats[key] === 1 ? nameSingular : namePlural}
					{/if}
				</span>
			{/if}
		{/each}
	</div>

	{#if profile.bio}
		<p class="bio">{profile.bio}</p>
	{/if}

	{#if showContracts}
		<div class="columns">
			{#each [
				{
					key: 'followNftAddress',
					name: 'Follow NFT',
					address: profile.followNftAddress,
				},
				{
					key: 'disptcher',
					name: 'Dispatcher',
					address: profile.dispatcher?.address,
				},
			] as { key, name, address } (key)}
				<Collapsible>
					<svelte:fragment slot="title">
						<svelte:element this={`h${headingLevel + 1}`}>{name}</svelte:element>
					</svelte:fragment>

					<EthereumAccountOrContract {network} {address}>
						<svelte:fragment slot="title">
							<svelte:element this={`h${headingLevel + 1}`}>{name}</svelte:element>
						</svelte:fragment>
					</EthereumAccountOrContract>
				</Collapsible>
			{/each}
		</div>
	{/if}
</article>	


<style>
	.card {
		position: relative;
	}

	.metadata {
		font-size: 0.85em;
		opacity: 0.8;
		gap: 0.75em;
	}

	.bio {
		font-size: 0.85em;
		opacity: 0.75;
		white-space: pre-line;
		line-height: 1.2;
	}

	.columns {
		display: grid;
		gap: var(--padding-inner);
		grid-template-columns: repeat(auto-fit, minmax(min(20rem, 100%), 1fr));
	}

	.muted {
		opacity: 0.85;
	}

	small {
		font-size: 0.75em;
	}
</style>
