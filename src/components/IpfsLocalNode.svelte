<script lang="ts">
	// Types
	import { type IpfsGatewayConfig, IpfsGatewayProvider } from '../data/ipfsGateways'


	// External state
	export let ipfsGateway: IpfsGatewayConfig


	// Internal state
	let contentType: 'text' | 'file' = 'text'
	let text = ''
	let files: FileList


	// (Computed)
	$: content =
		contentType === "text" ?
			text
		: contentType === 'file' ?
			files
		:
			''


	// Components
	import Collapsible from './Collapsible.svelte'
	import IpfsContentIdDetails from './IpfsContentIdDetails.svelte'
	import IpfsLocalContentEncoder from './IpfsLocalContentEncoder.svelte'
	import SizeContainer from './SizeContainer.svelte'
	import { HeliaIcon } from '../assets/icons'
	// import { cardStyle } from '../utils/card-background'
</script>


<article
	class="card"
>
<!-- style={cardStyle(ipfsGateway.colors)} -->
	<img class="card-background" src={HeliaIcon} />

	<header class="bar wrap">
		<h3>Local IPFS Node</h3>

		<span class="card-annotation"><a href="https://github.com/ipfs/helia" target="_blank">Helia</a></span>
	</header>

	<hr>

	<form class="card">
		<header class="bar wrap">
			<h4>Add content</h4>

			<hr>

			<div role="toolbar" class="row wrap">
				<label>
					<span>Content Type</span>
					<select bind:value={contentType}>
						<option value="text">Text</option>
						<option value="file">File(s)</option>
					</select>
				</label>
			</div>
		</header>

		<SizeContainer class="column">
			{#if contentType === 'file'}
				<input type="file" multiple class="medium" bind:files />
			{:else}
				<textarea bind:value={text} placeholder="Enter text..." rows={4} />
			{/if}
		</SizeContainer>

		<hr>
	
		<!-- <section class="card"> -->
		<section class="column">
			<Collapsible type="label">
				<h4 slot="title">Preview</h4>
	
				<!-- <hr> -->
		
				{#if ipfsGateway.gatewayProvider === IpfsGatewayProvider.Helia}
					<IpfsLocalContentEncoder
						{ipfsGateway}
						{content}
						let:cid
					>
						<!-- <article>
							<div class="bar wrap">
								<IpfsContentId ipfsContentId={cid?.toV1?.().toString()} />
			
								<span class="card-annotation">IPFS CID</span>
							</div>
						</article> -->

						<IpfsContentIdDetails
							{ipfsGateway}
							ipfsContentId={cid?.toV1?.().toString()}
							headingLevel={4}
						/>
					</IpfsLocalContentEncoder>
				{:else}
					<div class="card align-center">
						Switch to a local IPFS Gateway to add content to IPFS.
					</div>
				{/if}
			</Collapsible>
		</section>
	</form>
</article>


<style>
	article {
		position: relative;
		overflow: clip;
	}
</style>
