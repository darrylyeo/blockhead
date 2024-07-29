<script lang="ts">
	import type { ENS } from '$/api/ens'
	import type { Ethereum } from '$/data/networks/types'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import { ethereumMainnet, networkBySlip44 } from '$/data/networks'
	import { chainsBySlip44 } from '$/data/slip44'
	import { getViemPublicClient } from '$/data/networkProviders'
	import { preferences } from '$/state/preferences'


	export let network = ethereumMainnet
	export let networkProvider: NetworkProvider
	export let resolver: ENS.Resolver
	export let ensName: string

	export let isOpen: boolean

	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork

	let publicClient: Ethereum.PublicClient | undefined
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider: networkProvider,
	})


	// https://eips.ethereum.org/EIPS/eip-634

	const eip634GlobalKeys = {
		'avatar': `a URL to an image used as an avatar or logo`,
		'description': `A description of the name`,
		'display': `a canonical display name for the ENS name; this MUST match the ENS name when its case is folded, and clients should ignore this value if it does not (e.g. "ricmoo.eth" could set this to "RicMoo.eth")`,
		'email': `an e-mail address`,
		'keywords': `A list of comma-separated keywords, ordered by most significant first; clients that interpresent this field may choose a threshold beyond which to ignore`,
		'mail': `A physical mailing address`,
		'notice': `A notice regarding this name`,
		'location': `A generic location (e.g. "Toronto, Canada")`,
		'phone': `A phone number as an E.164 string`,
		'url': `a website`,
	}
	const eip634ServiceKeys = {
		'com.discord': 'Discord',
		'com.github': 'GitHub',
		'io.keybase': 'Keybase',
		'com.linkedin': 'LinkedIn',
		'com.peepeth': 'Peepeth',
		'com.reddit': 'Reddit',
		'org.telegram': 'Telegram',
		'com.twitter': 'Twitter',
	}

	const descriptions = Object.fromEntries([
		['contentHash', `contenthash is used to store hashes for IPFS, Skynet, and Swarm, and Tor .onion addresses, which permit resolving ENS addresses to distributed content (eg, websites) hosted on these distributed networks.\n\nSource: https://docs.ens.domains/dapp-developer-guide/resolving-names#looking-up-other-resources`],
		...Object.entries(eip634GlobalKeys).map(([k, v]) => [k, `${v}\n\nSource: https://eips.ethereum.org/EIPS/eip-634#global-keys`]),
		...Object.entries(eip634ServiceKeys).map(([k, v]) => [k, `${v}\n\nService Keys must be made up of a reverse dot notation for a namespace which the service owns, for example, DNS names (e.g. .com, .io, etc) or ENS name (i.e. .eth). Service Keys must contain at least one dot.\n\nThis allows new services to start using their own keys without worrying about colliding with existing services.\n\nSource: https://eips.ethereum.org/EIPS/eip-634#service-keys`]),
	])

	const orderedTextRecordKeys = [
		'name',
		'display',
		'avatar',
		'description',
		'location',
		'keywords',
		'notice',
		'url',
		'email',
		'mail',
		'phone',
		...Object.keys(eip634ServiceKeys)
	]


	type $$Slots = {
		header: {
			networkProvider: NetworkProvider
		}
	}


	import Address from './Address.svelte'
	import EnsRecordsLoader from './EnsRecordsLoader.svelte'
	import TokenIcon from './TokenIcon.svelte'

	import { flip } from 'svelte/animate'
	import { fade } from 'svelte/transition'
</script>


<style>
	.records {
		display: flex;
		flex-wrap: wrap;

		font-size: 0.8em;
	}
	.records > * {
		flex: 1 20rem;
		flex: 1 auto;
		--padding-inner: 0.85em;
	}
	/* @media (min-width: 40rem) {
		.records {
			display: block;
			columns: 2;
		}
		.records > * + * {
			margin-top: var(--padding-inner);
		}
	} */

	dl {
		grid-template-columns: min(8em, 50%) 1fr;
		margin: 0;
	}
	dt {
		justify-self: end;
		text-align: end;

		display: inline-grid;
		grid-auto-flow: column;
		align-items: center;
		gap: 0.66ch;
	}

	.keywords {
		gap: 0.5ch
	}
	.keyword {
		background-color: var(--card-background-color);
		padding: 0.15em 0.5em;
		border-radius: 0.4em;
		white-space: nowrap;
		font-size: 0.9em;
	}

	.not-set:after {
		content: '—';
		opacity: 0.3;
	}
</style>


<EnsRecordsLoader
	{network}
	{networkProvider}
	{ensName}
	resolveContentHash
	resolveTextRecordKeys={resolver.texts}
	resolveCoinTypes={resolver.coinTypes?.map(Number)}
	{isOpen}
	let:contentHash
	let:textRecords
	let:cryptoAddressRecords
>
	<svelte:fragment slot="header" let:networkProvider>
		<slot name="header" {networkProvider} />
	</svelte:fragment>

	<div class="records">
		{#if textRecords?.size}
			<section class="card column">
				<header class="bar">
					<h3>Text Records</h3>

					<span class="card-annotation">
						<a href="https://docs.ens.domains/ens-improvement-proposals/ensip-5-text-records" target="_blank" rel="noreferrer"><abbr title="ENSIP-5: Text Records">ENSIP-5</abbr></a>
						/
						<a href="https://eips.ethereum.org/EIPS/eip-634" target="_blank" rel="noreferrer"><abbr title="EIP-634: Storage of text records in ENS">EIP-634</abbr></a>
					</span>
				</header>

				<hr>

				{#each
					[
						...orderedTextRecordKeys
							.filter(key => textRecords.has(key))
							.map(key => [key, textRecords.get(key)]),
						...[...textRecords.entries()]
							.filter(([key]) => !orderedTextRecordKeys.includes(key))
							.sort((a, b) => a[0].localeCompare(b[0]))
					].sort((a, b) => a[1] === null ? 1 : b[1] === null ? -1 : 0)
					as [key, value], i (key)
				}
					<dl transition:fade><!-- animate:flip|local={{duration: 300, delay: i * 10}} -->
						<dt>
							{#if descriptions[key]}
								<abbr title={descriptions[key]}>{key}</abbr>
							{:else}
								{key}
							{/if}
						</dt>
						<dd>
							{#if !value}
								<span class="not-set" />
							{:else if key === 'name'}
								<h3>{value}</h3>
							{:else if key === 'description' || key === 'notice' || key === 'metaverse'}
								<p>{value}</p>
							{:else if key === 'email'}
								<output><a href="mailto:{value}" target="_blank">{value}</a></output>
							{:else if key === 'keywords'}
								<div class="keywords row">
									{#each value.split(', ') as keyword}
										<span class="keyword">{keyword}</span>
									{/each}
								</div>
							{:else if key === 'url' || key === 'website'}
								<output><a href="{value}" target="_blank" rel="noreferrer" referrerpolicy="no-referrer">{value}</a></output>
							{:else if key === 'com.discord'}
								<output>{value}</output>
							{:else if key === 'com.github'}
								<output><a href="https://github.com/{value}" rel="noreferrer" target="_blank">{value}</a></output>
							{:else if key === 'com.linkedin'}
								<output><a href="https://www.linkedin.com/in/{value}" rel="noreferrer" target="_blank">{value}</a></output>
							{:else if key === 'com.reddit'}
								<output><a href="https://reddit.com/u/{value}" rel="noreferrer" target="_blank">{value}</a></output>
							{:else if key === 'org.telegram'}
								<output><a href="https://t.me/{value}" rel="noreferrer" target="_blank">{value}</a></output>
							{:else if key === 'com.twitter'}
								<output><a href="https://twitter.com/{value}" rel="noreferrer" target="_blank">{value}</a></output>
							{:else if (/^com\./).test(key)}
								{value}
							{:else}
								<output>{value}</output>
							{/if}
						</dd>
					</dl>
				{/each}
				<!-- {#each resolver.texts as textRecordKey}
					<span class="text-record">
						<span>{textRecordKey}</span>
						<span>{records[textRecordKey]}</span>
					</span>
				{/each} -->
			</section>
		{/if}

		{#if contentHash}
			<div class="card column">
				<header class="bar">
					<h3>Content</h3>

					<span class="card-annotation">
						<a href="https://docs.ens.domains/ens-improvement-proposals/ensip-7-contenthash-field" target="_blank" rel="noreferrer"><abbr title="ENSIP-7: Contenthash field">ENSIP-7</abbr></a>
						/
						<a href="https://eips.ethereum.org/EIPS/eip-634" target="_blank" rel="noreferrer"><abbr title="EIP-1577: contenthash field for ENS">EIP-1577</abbr></a>
					</span>
				</header>
			
				<hr>

				<dl class="content-hash">
					<dt><abbr title={descriptions['contentHash']}>Content Hash</abbr></dt>
					<dd>
						<output>
							{#if contentHash.startsWith('ipfs://')}
								<a href="{contentHash}" target="_blank" referrerpolicy="norefferer">{contentHash}</a>
							{:else}
								{contentHash}
							{/if}
						</output>
					</dd>
				</dl>
			</div>
		{/if}

		{#if cryptoAddressRecords?.size}
			<div class="card column">
				<header class="bar">
					<h3>Blockchain Addresses</h3>

					<span class="card-annotation">
						<a href="https://docs.ens.domains/ens-improvement-proposals/ensip-9-multichain-address-resolution" target="_blank" rel="noreferrer"><abbr title="ENSIP-9: Multichain Address Resolution">ENSIP-9</abbr></a>
						/
						<a href="https://eips.ethereum.org/EIPS/eip-2304" target="_blank" rel="noreferrer"><abbr title="EIP-2304: Multichain address resolution for ENS">EIP-2304</abbr></a>
					</span>
				</header>

				<hr>

				{#each
					[...cryptoAddressRecords.entries()]
						.sort((a, b) => a[1] === null ? 1 : b[1] === null ? -1 : 0)
					as [key, address], i (key)
				}
					<dl transition:fade><!-- animate:flip|local={{duration: 300, delay: i * 10}} -->
						<dt>
							<TokenIcon
								token={{
									chainId: networkBySlip44.get(key)?.chainId,
									symbol: networkBySlip44.get(key)?.symbol || chainsBySlip44[key]?.symbol,
								}}
							/>
							<abbr title="{networkBySlip44.get(key)?.name || chainsBySlip44[key]?.name || ''}">{networkBySlip44.get(key)?.symbol || chainsBySlip44[key]?.symbol}</abbr>
						</dt>
						<dd>
							{#if address === null}
								<span class="not-set" />
							{:else}
								<Address network={networkBySlip44.get(key)} {address} />
							{/if}
						</dd>
					</dl>
				{/each}
				<!-- {#each resolver.coinTypes as coinType}
					<span class="crypto-address">
						<span>{coinType}</span>
						<Address network={ethereumMainnet} address={records[coinType]} />
					</span>
				{/each} -->
			</div>
		{/if}
	</div>

	<!-- {#if records.avatar}
		<img src={records.avatar} />
	{/if} -->
</EnsRecordsLoader>
