<script lang="ts">
	let isSandbox = true


	// Components
	import FireblocksAuthenticationLoader from '../../../components/FireblocksAuthenticationLoader.svelte'
	import FireblocksAssignWalletToDeviceLoader from '../../../components/FireblocksAssignNcwToDeviceLoader.svelte'
	import FireblocksNcwManager from '../../../components/FireblocksNcwKeyManager.svelte'
	import FireblocksAccountManager from '../../../components/FireblocksAccountManager.svelte'
</script>


<FireblocksAuthenticationLoader {isSandbox} let:user>
	<FireblocksAssignWalletToDeviceLoader {isSandbox} {user} let:device let:wallet>
		<FireblocksNcwManager {isSandbox} {user} {device} {wallet} />
	</FireblocksAssignWalletToDeviceLoader>

	<hr>

	<FireblocksAccountManager {user} />
</FireblocksAuthenticationLoader>
