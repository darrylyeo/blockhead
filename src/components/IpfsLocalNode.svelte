<script lang="ts">
	// Types
	import { type IpfsGatewayConfig, IpfsGatewayProvider } from '../data/ipfsGateways'


	// External state
	export let ipfsGateway: IpfsGatewayConfig


	// Internal state
	let contentType: 'text' | 'file' | 'folder' = 'file'
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
	import BlockTransition from './BlockTransition.svelte'
	import Collapsible from './Collapsible.svelte'
	import FileList from './FileList.svelte'
	import FileDirectory from './FileDirectory.svelte'
	import IpfsContentIdDetails from './IpfsContentIdDetails.svelte'
	import IpfsLocalContentEncoder from './IpfsLocalContentEncoder.svelte'
	import SizeContainer from './SizeContainer.svelte'
	import { HeliaIcon } from '../assets/icons'
	import { fade } from 'svelte/transition'
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

	<section>
		<header class="bar wrap">
			<h4>Add Content To IPFS</h4>

			<div role="toolbar" class="row wrap">
				<label>
					<span>Format</span>
					<select bind:value={contentType}>
						<option value="text">Text</option>
						<option value="file">File(s)</option>
						<option value="folder">Folder</option>
					</select>
				</label>
			</div>
		</header>

		<form class="card">
			<header class="bar wrap">
				<h4>Stage Content</h4>

				<div class="column align-end">
					<button type="reset" class="small destructive">Reset</button>
				</div>
			</header>

			<!-- <BlockTransition key={contentType}Z> -->
			<SizeContainer class="column">
				{#if contentType === 'file'}
					<input
						type="file"
						class="medium"
						multiple
						required
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
						required
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
					<textarea
						bind:value={text}
						placeholder="Enter text..."
						rows={4}
						required
					/>
				{/if}
			</SizeContainer>
			<!-- </BlockTransition> -->

			<hr>
		
			<section class="column">
				<Collapsible type="label">
					<h4 slot="title">Add Content</h4>

					<svelte:fragment slot="trigger-text" let:isOpen>
						{!isOpen ? 'Start' : 'Stop'}
					</svelte:fragment>
			
					<!-- {#if ipfsGateway.gatewayProvider === IpfsGatewayProvider.Helia} -->
					<BlockTransition key={content} transition={fade} transitionParams={{ duration: 100 }}>
						<IpfsLocalContentEncoder
							{ipfsGateway}
							{content}
							let:cid
							let:addedFiles
						>
							{#if cid}
								<IpfsContentIdDetails
									{ipfsGateway}
									ipfsContentId={cid.toV1().toString()}
									headingLevel={4}
								/>

							{:else if addedFiles}
								{#each addedFiles as file}
									<IpfsContentIdDetails
										{ipfsGateway}
										ipfsContentId={file.cid.toV1().toString()}
										headingLevel={4}
									/>
								{/each}
							{/if}
						</IpfsLocalContentEncoder>
					</BlockTransition>
					<!-- {:else}
						<div class="card align-center">
							Switch to a local IPFS Gateway to add content to IPFS.
						</div>
					{/if} -->
				</Collapsible>
			</section>
		</form>
	</section>
</article>


<style>
	article {
		position: relative;
		overflow: clip;
	}

	form:invalid [type="reset"] {
		scale: 0;
	}
</style>
