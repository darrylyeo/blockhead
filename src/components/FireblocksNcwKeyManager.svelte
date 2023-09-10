<!-- <script lang="ts">
	// Context
	import { page } from '$app/stores'

	import { localStorageWritable } from '../utils/localStorageWritable'
	
	const _deviceId = localStorageWritable<ReturnType<typeof crypto.randomUUID> | undefined>('fireblocks:device', undefined)
		$: deviceId = $_deviceId


	// Inputs
	export let user: { sub: string }
	export let isSandbox = true


	// Actions
	import { createQuery } from '@tanstack/svelte-query'


	// Components
	import Loader from './Loader.svelte'
	import { FireblocksIcon } from '../assets/walletIcons'
	import { trpc } from '../api/fireblocks-ncw/trpc';
</script>

 -->
