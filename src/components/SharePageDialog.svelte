<script lang="ts">
	// Inputs
	export let title: string
	export let imageUrl: string


	// Components
	import Dialog from './Dialog.svelte'
	import FileDetails from './FileDetails.svelte'
</script>


<Dialog>
	Share

	<svelte:fragment slot="content">
		<FileDetails
			isOpen={true}
			fileName={title}
			contentType={'image/png'}
			src={imageUrl}
		/>
	</svelte:fragment>
</Dialog>
