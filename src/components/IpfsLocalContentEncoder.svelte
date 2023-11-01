<script lang="ts">
	// External state
	export let content: string | Blob | File | FileList


	// Components
	import Loader from './Loader.svelte'
	import { IpfsIcon } from '../assets/icons'
</script>


{#if content instanceof FileList}
	<Loader
		fromPromise={async () => {
			const { encodeFiles } = await import('../api/ipfs/helia')
			return await encodeFiles(content)
		}}
		loadingIcon={IpfsIcon}
		loadingIconName='IPFS'
		loadingMessage={`Encoding ${content.length} files using local IPFS node...`}
		errorMessage={`Couldn't encode files using local IPFS node.`}
		{...$$restProps}
		let:result={addedFiles}
	>
		<slot slot='header' name='header' {addedFiles} />
		<slot {addedFiles} />
	</Loader>

{:else if content instanceof File}
	<Loader
		fromPromise={async () => {
			const { encodeFile } = await import('../api/ipfs/helia')
			return await encodeFile(content)
		}}
		loadingIcon={IpfsIcon}
		loadingIconName='IPFS'
		loadingMessage={`Encoding file using local IPFS node...`}
		errorMessage={`Couldn't encode file using local IPFS node.`}
		{...$$restProps}
		let:result={cid}
	>
		<slot slot='header' name='header' {cid} />
		<slot {cid} />
	</Loader>

{:else}
	<Loader
		fromPromise={async () => {
			const { encodeBytes } = await import('../api/ipfs/helia')
			return await encodeBytes(content)
		}}
		loadingIcon={IpfsIcon}
		loadingIconName='IPFS'
		loadingMessage={`Encoding content using local IPFS node...`}
		errorMessage={`Couldn't encode content using local IPFS node.`}
		{...$$restProps}
		let:result={cid}
	>
		<slot slot='header' name='header' {cid} />
		<slot {cid} />
	</Loader>
{/if}
