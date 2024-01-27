<script lang="ts">
	// Constants/types
	import type { IpfsGatewayConfig } from '$/data/ipfsGateways'
	import type { IpfsCid } from '$/api/ipfs/contentId'


	// External state
	export let ipfsGateway: IpfsGatewayConfig
	export let ipfsContentId: IpfsCid
	export let ipfsContentPath: string


	// Internal state
	let showEncodings: 'common' | 'no-formatting-variants' | 'all' = 'common'


	// Functions
	import { decodeIpfsCid, getAllIpfsCidEncodings, checkIpfsCidIsValidSubdomain } from '$/api/ipfs/contentId'
	import { toString as uint8ArrayToString } from 'uint8arrays/to-string'

	/**
	 * Converts number to format of 'code' column at
	 * https://github.com/multiformats/multicodec/blob/master/table.csv
	 */
	const paddedCodeHex = (code: number | null) => {
		if (code === null) return code

		const hex = code.toString(16)
		return `0x${hex.padStart(hex.length + hex.length % 2, '0')}`
	}


	// View Options
	export let headingLevel: 1 | 2 | 3 | 4 = 2


	// Components
	import BlockTransition from './BlockTransition.svelte'
	import Collapsible from './Collapsible.svelte'
	import InlineTransition from './InlineTransition.svelte'
	import IpfsContentDetails from './IpfsContentDetails.svelte'
	import IpfsContentId from './IpfsContentId.svelte'
	import Loader from './Loader.svelte'
	import SizeContainer from './SizeContainer.svelte'
	import { IpfsIcon } from '$/assets/icons'


	// Transitions
	import { scale } from 'svelte/transition'
	import { flip } from 'svelte/animate'
</script>


<article class="card">
	<Loader
		fromPromise={async () => (
			decodeIpfsCid(ipfsContentId)
		)}
		loadingIcon={IpfsIcon}
		loadingMessage="Decoding IPFS Content ID..."
		errorMessage={`Couldn't parse CID "${ipfsContentId}".`}
		let:result
	>
		{@const digestBase16 = uint8ArrayToString(result?.multihash.digest, 'base16')}

		<svelte:fragment slot="header">
			<header class="bar wrap">
				<svelte:element this={`h${headingLevel}`}><InlineTransition key={ipfsContentId}><IpfsContentId {ipfsContentId} {ipfsContentPath} linkedParts /></InlineTransition></svelte:element>

				<!-- <span class="card-annotation"><a href="https://github.com/multiformats/cid" target="_blank">IPFS Content ID (v{cid.version})</a></span> -->
				<span class="card-annotation">IPFS Content</span>
			</header>
		</svelte:fragment>

		<hr>
		
		<Collapsible type="label" isOpen canToggle={false}>
			<svelte:element this={`h${headingLevel + 1}`} slot="title">Content</svelte:element>

			<span slot="header-right" class="card-annotation"><a href="https://{ipfsGateway.gatewayDomain}" target="_blank">{ipfsGateway.name}</a></span>

			<BlockTransition
				key={[ipfsGateway, ipfsContentId]}
				transition={scale}
			>
				<IpfsContentDetails
					{ipfsGateway}
					{ipfsContentId}
					{ipfsContentPath}
				/>
			</BlockTransition>
		</Collapsible>

		<hr>

		<!-- <svelte:element this={`h${headingLevel + 2}`}>Decoded (<a href="https://github.com/multiformats/cid#human-readable-cids" target="_blank">Human Readable CID</a>)</svelte:element> -->
		<Collapsible type="label" class="column">
			<svelte:element slot="title" this={`h${headingLevel + 1}`}><a href="https://github.com/multiformats/cid#human-readable-cids" target="_blank">Decoded Content ID</a></svelte:element>

			<span slot="header-right" class="card-annotation"><a href="https://github.com/multiformats/cid" target="_blank">IPFS CIDv{result?.cid.version}</a></span>

			<div class="card">
				<output class="decoded-cid row-inline wrap"><span title="Multibase"><InlineTransition align="center" value={result?.multibase.name} /></span> - <span title="Version"><InlineTransition align="center" value="cidv{result?.cid.version}" /></span> - <span title="Multicodec"><InlineTransition align="center" value={result?.multicodec.name} transition={scale} /></span> - <span class="row-inline" title="Multihash">(<span title="Multicodec"><InlineTransition value={result?.multihash.multicodec.name} /></span> : <span title="Size (bits)"><InlineTransition value={result?.multihash.size * 8} /></span> : <span title="Digest (base16)"><BlockTransition align="center" value={digestBase16} /></span>)</span></output>
				<!-- <p>multibase - version - multicodec - multihash (name : size : digest)</p> -->
			</div>

			<div class="columns">
				<section class="card">
					<!-- <svelte:element this={`h${headingLevel + 2}`}><a href="https://github.com/multiformats/multibase" target="_blank">Multibase</a></svelte:element> -->
					<header class="bar wrap">
						<svelte:element this={`h${headingLevel + 2}`}><abbr title="Multibase"><output>{result?.multibase.name}</output></abbr></svelte:element>

						<span class="card-annotation"><a href="https://github.com/multiformats/multibase" target="_blank">multibase</a></span>
					</header>

					<hr>

					<dl>
						{#each Object.entries({
							// 'Name': multibase.name,
							'Prefix': result?.cid.version === 0 ? null : result?.multibase.prefix,
						}) as [key, value]}
							<dt>{key}</dt>
							<dd><InlineTransition value={value} let:value>{#if key === 'Prefix' && value === null}<span class="faded">[implicit]</span>{:else}<output>{value}</output>{/if}</InlineTransition></dd>
						{/each}
					</dl>
				</section>

				<section class="card">
					<!-- <svelte:element this={`h${headingLevel + 2}`}><a href="https://github.com/multiformats/multicodec" target="_blank">Multicodec</a></svelte:element> -->
					<header class="bar wrap">
						<svelte:element this={`h${headingLevel + 2}`}><abbr title="Multicodec"><output>{result?.multicodec.name}</output></abbr></svelte:element>

						<span class="card-annotation"><a href="https://github.com/multiformats/multicodec/blob/master/table.csv" target="_blank">multicodec</a></span>
					</header>

					<hr>

					<dl>
						{#each Object.entries({
							// 'Name': { value: multicodec.name },
							'Multicodec Code': { value: paddedCodeHex(result?.multicodec.code) },
							'Description': { type: 'text', value: result?.multicodec.description },
						}) as [key, {type, value}]}
							<dt>{key}</dt>
							<dd><InlineTransition value={value} let:value><output data-type={type}>{value}</output></InlineTransition></dd>
						{/each}
					</dl>
				</section>

				<section class="card">
					<!-- <svelte:element this={`h${headingLevel + 2}`}><a href="https://github.com/multiformats/multihash" target="_blank">Multihash</a></svelte:element> -->
					<header class="bar wrap">
						<svelte:element this={`h${headingLevel + 2}`}><abbr title="Multihash › Multicodec"><output>{result?.multihash.multicodec.name}</output></abbr></svelte:element>

						<span class="card-annotation"><a href="https://github.com/multiformats/multihash" target="_blank">multihash</a></span>
					</header>

					<hr>
		
					<dl>
						{#each Object.entries({
							'Multicodec Code': paddedCodeHex(result?.multihash.multicodec.code),
							// 'Multicodec Name': multihash.multicodec.name,
							// 'Multicodec Description': multihash.multicodec.description,
							// 'Size': `${multihash.size * 8} bits`,
							'Size (bits)': result?.multihash.size * 8,
							...result?.multibase.name !== 'base16' && {
								[`Digest (${result?.multibase.name})`]: result?.multibase.encode(result?.multihash.bytes),
							},
							'Digest (base16)': digestBase16,
						}) as [key, value]}
							<dt><InlineTransition align="end" value={key} /></dt>
							<!-- <dd><BlockTransition element="output" value={value} /></dd> -->
							<dd><output><BlockTransition value={value} transition={scale} /></output></dd>
						{/each}
					</dl>
				</section>
			</div>

			<!-- <h3>Other Versions</h3> -->
			<!-- <h3>Equivalent CIDs</h3> -->
			<!-- <h3>CID Conversions</h3> -->
			<section class="card">
				<header class="bar wrap">
					<svelte:element this={`h${headingLevel + 2}`}>Alternate Encodings</svelte:element>

					<div role="toolbar">
						<label>
							<span>Show</span>
							<select bind:value={showEncodings}>
								<option value="common">Common</option>
								<option value="no-formatting-variants">All Bases</option>
								<option value="all">All Bases + Formatting Variants</option>
							</select>
						</label>
					</div>
				</header>

				<hr>

				<SizeContainer>
					<dl>
						{#each
							getAllIpfsCidEncodings(result?.cid)
								.filter(({ version, base }) =>
									(version === result?.cid.version && base.name === result?.multibase.name) || (
										showEncodings === 'common' ?
											version === 0
											|| ['base32', 'base36'].includes(base.name)
										: showEncodings === 'no-formatting-variants' ?
											!base.name.match(/(?:upper|pad)$/)
										:
											true
									)
								)
							as { version, base, ipfsCid }, i
							(`${version}-${base.name}`)
						}
							<!-- {@const isCurrentFormat = version === cid.version && base.name === multibase.name} -->
							<!-- {@const isValidSubdomain = checkIpfsCidIsValidSubdomain({ base, ipfsCid })} -->

							<div in:scale={{duration: 300, delay: i * 20}} animate:flip|local={{ duration: 300 }}>
								<!-- <dt class:mark={isCurrentFormat}> -->
								<dt>
									CIDv{version} <small>({base.name})</small>
								</dt>
								<!-- <dd class:mark={isCurrentFormat}> -->
								<dd>
									<output><IpfsContentId ipfsContentId={ipfsCid} {ipfsContentPath} linked={base.name !== 'identity'} /></output>

									<!-- {#if isValidSubdomain !== undefined}
										<!-- <span class="card-annotation">{isValidSubdomain ? 'subdomain gateway compatible' : 'subdomain gateway incompatible (DNS label too long)'}</span> -- >
										<a class="faded" href="https://docs.ipfs.tech/how-to/address-ipfs-on-web/#subdomain-gateway" target="_blank">
											{#if isValidSubdomain}
												<abbr title="Subdomain gateway compatible">✔</abbr>
											{:else}
												<abbr title="Subdomain gateway ineligible (DNS label too long)">✘</abbr>
											{/if}
										</a>
									{/if} -->
								</dd>
							</div>
							<!-- {#each [1] as _, i (i)}<dt animate:flip={{ duration: 300 }}>CIDv{version} ({base.name})</dt>{/each}
							{#each [1] as _, i (i)}<dd animate:flip={{ duration: 300 }}><IpfsContentId ipfsContentId={ipfsCid} {ipfsContentPath} /></dd>{/each} -->
						{/each}
					</dl>
				</SizeContainer>
			</section>

			<!--
			<section class="card">
				<svelte:element this={`h${headingLevel + 2}`}>CID Byte Length</svelte:element>

				<hr>

				<dl>
					{#each Object.entries({
						[`${multibase.name} string`]: `${new Blob([ipfsContentId.trim()]).size} bytes`,
						...(multibase.name !== 'base32' ? {
							'base32 string': `${new Blob([cid.toString()]).size} bytes`,
						} : undefined),
						'binary': `${cid.byteLength} bytes`,
					}) as [key, value]}
						<dt>{key}</dt>
						<dd><InlineTransition value={value} /></dd>
					{/each}
				</dl>
			</section> -->
		</Collapsible>
	</Loader>
</article>


<style>
	.decoded-cid {
		justify-content: center;
		gap: 0;

		font-size: 0.89em;
		text-align: center;

		padding: 0.5rem;
		margin: calc(-1 * var(--padding-inner)) 0;
	}
	.decoded-cid span {
		display: inline-block;
		position: relative;
		gap: 0;
		max-width: 100%;
	}
	.decoded-cid > span {
		padding-top: 1rem;
		margin-top: var(--padding-inner);
	}
	.decoded-cid > span > span {
		padding-bottom: 1rem;
		margin-bottom: var(--padding-inner);
		text-wrap: balance;
	}
	.decoded-cid > span:before,
	.decoded-cid > span > span:after {
		content: attr(title);

		font-family: var(--base-fonts);
		text-transform: uppercase;
		letter-spacing: 0.2ch;
		opacity: 0.66;
		opacity: 0.5;

		position: absolute;
		white-space: nowrap;
		/* inset: calc(50% - 1.5rem / 2) 0em; */
		inset: 1rem 0em;
		height: 0;
		display: flex;
		justify-content: center;
		line-height: 2.5;
		border-image: url('/src/assets/braces.svg') 50% 33% / 1rem / 0.25rem stretch;
	}
	.decoded-cid > span:before {
		font-size: 0.7em;
		align-items: end;
		bottom: auto;
		border-image-width: 0.5rem 0.5rem 0 0.5rem;
	}
	.decoded-cid > span > span:after {
		font-size: 0.6em;
		align-items: start;
		top: auto;
		border-image-width: 0 0.5rem 0.5rem 0.5rem;
	}

	.columns {
		display: flex;
		flex-wrap: wrap;
	}
	.columns > :nth-child(1) {
		flex: 3 auto;
	}
	.columns > :nth-child(2) {
		flex: 4 auto;
	}
	.columns > :nth-child(3) {
		flex: 6 29rem;
	}

	dl {
		grid-template-columns: minmax(min-content, auto) 1fr;
	}
	dl > div {
		/* display: contents; */
		width: 100%;
		grid-template-columns: clamp(6.5rem, 30%, 12rem) 1fr;
	}

	.faded {
		opacity: 0.6;
	}
</style>
