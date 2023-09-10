<script lang="ts">
	// Context
	import { page } from '$app/stores'

	import { localStorageWritable } from '../utils/localStorageWritable'
	
	const _deviceId = localStorageWritable<ReturnType<typeof crypto.randomUUID>>('fireblocks:device', crypto.randomUUID())
	$: deviceId = $_deviceId


	// Inputs
	export let user: { sub: string }
	export let isSandbox = true


	// Actions
	import { createQuery } from '@tanstack/svelte-query'
	import { trpc } from '../api/fireblocks-ncw/trpc'


	// Components
	import Loader from './Loader.svelte'
	import { FireblocksIcon } from '../assets/walletIcons'
</script>


<Loader
	loadingIcon={FireblocksIcon}
	loadingMessage="Assigning a wallet to your device... ({deviceId})"
	errorMessage="Couldn't assign a wallet with your device."
	fromQuery={createQuery({
		queryKey: ['FireblocksAssignWalletToDevice', {
			user,
			isSandbox,
			deviceId,
		}],
		queryFn: async () => {
			await trpc($page).assignWalletToDevice.mutate({
				isSandbox,
				deviceId,
			})
		},
	})}
	let:result
>
	<slot device={result.device} wallet={result.wallet} />
</Loader>
