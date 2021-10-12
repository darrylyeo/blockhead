<script lang="ts">
	import type { ENS } from '../data/ens'
	import type { Ethereum } from '../data/ethereum/types'


	export let network: Ethereum.Network
	export let resolver: ENS.Resolver
	export let ensName: string


	import { networksBySlip44 } from '../data/ethereum/networks'
	import { chainsBySlip44 } from '../data/slip44'


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


	import Address from './Address.svelte'
	import EnsRecordLoader from './EnsRecordLoader.svelte'
	import TokenIcon from './TokenIcon.svelte'
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
		grid-template-columns: min(7.5em, 50%) 1fr;
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
		content: '[not set]';
		opacity: 0.6;
	}
</style>


<div class="resolver card">
	<div class="bar">
		<h3>
			<Address {network} address={resolver.address} />
		</h3>
		<span class="card-annotation">
			<abbr title={`A resolver is a contract that maps from name to resource (e.g., cryptocurrency addresses, content hash, etc). Resolvers are pointed to by the resolver field of the registry.\n\nSource: https://docs.ens.domains/terminology`}>ENS Resolver</abbr>
		</span>
	</div>

	<!-- {#if resolver.domain}
		<p>Domain: <EnsDomain {network} domain={resolver.domain}/></p>
	{/if} -->

	<EnsRecordLoader
		{network}
		{ensName}
		resolverTextRecordKeys={resolver.texts}
		resolverCoinTypes={resolver.coinTypes}
		let:contentHash
		let:textRecords
		let:cryptoAddressRecords
	>
		<svelte:fragment slot="header">
			<hr>

			<!-- <div class="bar">
				<h4>Records</h4>
			</div> -->
		</svelte:fragment>

		<div class="records">
			{#if Object.entries(textRecords).length}
				<div class="card column">
					<h3>Text Records</h3>

					<hr>

					{#each [
						...orderedTextRecordKeys
							.filter(key => key in textRecords)
							.map(key => [key, textRecords[key]]),
						...Object.entries(textRecords)
							.filter(([key]) => !orderedTextRecordKeys.includes(key))
							.sort((a, b) => a[0].localeCompare(b[0]))
					].sort((a, b) => a[1] === null ? 1 : b[1] === null ? -1 : 0)
					as
					[key, value]}
						<dl class="text-record">
							<dt>
								{#if descriptions[key]}
									<abbr title={descriptions[key]}>{key}</abbr>
								{:else}
									{key}
								{/if}
							</dt>
							<dd>
								{#if key === 'name'}
									<h3>{value}</h3>
								{:else if key === 'description' || key === 'notice' || key === 'metaverse'}
									<p>{value}</p>
								{:else if key === 'email'}
									<output><a href="mailto:{value}" target="_blank">{value}</a></output>
								{:else if key === 'keywords'}
									<div class="keywords row">
										{#each value.split(', ') as value}
											<span class="keyword">{value}</span>
										{/each}
									</div>
								{:else if key === 'url' || key === 'website'}
									<output><a href="{value}" target="_blank" referrerpolicy="norefferer">{value}</a></output>
								{:else if key === 'com.discord'}
									<output>{value}</output>
								{:else if key === 'com.github'}
									<output><a href="https://github.com/{value}" target="_blank">{value}</a></output>
								{:else if key === 'com.linkedin'}
									<output><a href="https://www.linkedin.com/in/{value}" target="_blank">{value}</a></output>
								{:else if key === 'com.reddit'}
									<output><a href="https://reddit.com/u/{value}" target="_blank">{value}</a></output>
								{:else if key === 'org.telegram'}
									<output><a href="https://t.me/{value}" target="_blank">{value}</a></output>
								{:else if key === 'com.twitter'}
									<output><a href="https://twitter.com/{value}" target="_blank">{value}</a></output>
								{:else if (/^com\./).test(key)}
									{value}
								{:else if value === null}
									<span class="not-set" />
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
				</div>
			{/if}

			{#if contentHash}
				<div class="card column">
					<h3>Content Records</h3>

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

			{#if Object.entries(cryptoAddressRecords).length}
				<div class="card column">
					<h3>Blockchain Addresses</h3>

					<hr>

					{#each Object.entries(cryptoAddressRecords).sort((a, b) => a[1] === null ? 1 : b[1] === null ? -1 : 0) as [key, address]}
						<dl class="text-record">
							<dt>
								<TokenIcon symbol={networksBySlip44[key]?.symbol || chainsBySlip44[key]?.symbol} />
								<abbr title="{networksBySlip44[key]?.name || chainsBySlip44[key]?.name || ''}">{networksBySlip44[key]?.symbol || chainsBySlip44[key]?.symbol}</abbr>
							</dt>
							<dd>
								{#if address === null}
									<span class="not-set" />
								{:else}
									<Address network={networksBySlip44[key]} {address} />
								{/if}
							</dd>
						</dl>
					{/each}
					<!-- {#each resolver.coinTypes as coinType}
						<span class="crypto-address">
							<span>{coinType}</span>
							<Address network={networksBySlug['ethereum']} address={records[coinType]} />
						</span>
					{/each} -->
				</div>
			{/if}
		</div>

		<!-- {#if records.avatar}
			<img src={records.avatar} />
		{/if} -->
	</EnsRecordLoader>

	<!-- <hr>

	<div class="footer">
		{#if resolver.addr}
			<p>For address: {resolver.addr.id}</p>
		{/if}
	</div> -->
</div>