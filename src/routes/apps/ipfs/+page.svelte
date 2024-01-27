<script lang="ts">
	// Context
	import { ipfsGateway } from './_context'


	// Components
	import IpfsLocalNode from '$/components/IpfsLocalNode.svelte'
</script>


<IpfsLocalNode
	ipfsGateway={$ipfsGateway}
/>
