<script lang="ts">
	// Types
	import { type IpfsGatewayConfig, IpfsGatewayProvider } from '../data/ipfsGateways'


	// External state
	export let ipfsGateway: IpfsGatewayConfig


	// Internal state
	let contentType: 'text' | 'file' | 'folder' = 'text'
	let text = ''
	let fileList: FileList
	let folderFileList: FileList


	// (Computed)
	$: content =
		contentType === 'text' ?
			text
		: contentType === 'file' ?
			fileList?.[0]
		: contentType === 'folder' ?
			folderFileList
		:
			''


	// Components
	import Collapsible from './Collapsible.svelte'
	import FileList from './FileList.svelte'
	import FileDirectory from './FileDirectory.svelte'
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
						<option value="folder">Folder</option>
					</select>
				</label>
			</div>
		</header>

		<SizeContainer class="column">
			{#if contentType === 'file'}
				<input
					type="file"
					class="medium"
					multiple
					bind:files={fileList}
				/>

				{#if fileList}
					<div class="column">
						<FileList fileList={fileList} />
					</div>
				{/if}
			{:else if contentType === 'folder'}
				<input
					type="file"
					class="medium"
					multiple
					webkitdirectory
					bind:files={folderFileList}
				/>

				{#if folderFileList?.[0]?.webkitRelativePath}
					<FileDirectory fileList={folderFileList} />
				{:else if folderFileList}
					<div class="column">
						<FileList fileList={folderFileList} />
					</div>
				{/if}
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
