<script lang="ts">
	// Context
	import { localStorageWritable } from '../utils/localStorageWritable'

	const userId = localStorageWritable<ReturnType<typeof crypto.randomUUID>>('fireblocks:user', crypto.randomUUID())

	const deviceId = localStorageWritable<ReturnType<typeof crypto.randomUUID> | undefined>('fireblocks:device', undefined)


	// Inputs
	export let user: { sub: string }
	export let isSandbox = true


	// Actions
	import { createInfiniteQuery } from '@tanstack/svelte-query'


	// Components
	import Loader from './Loader.svelte'
	import FireblocksAccount from './FireblocksAccount.svelte'
	import { FireblocksIcon } from '../assets/walletIcons'
</script>


<Loader
	loadingIcon={FireblocksIcon}
	loadingMessage="Loading Fireblocks accounts..."
	errorMessage="Couldn't load Fireblocks accounts."
	fromInfiniteQuery={createInfiniteQuery({
		queryKey: ['FireblocksAccounts', {
			user,
			isSandbox,
		}],
		queryFn: async ({ pageParam }) => {
			const { getFireblocksClient } = await import('../api/fireblocks/sdk')

			console.log({getFireblocksClient})

			const client = getFireblocksClient({
				isSandbox,
			})

			console.log({client})

			const result = await client.getVaultAccountsWithPageInfo({
				before: pageParam?.before,
				after: pageParam?.after,
			})

			console.log({result})
			return result
		},
		getPreviousPageParam: (firstPage, allPages) => firstPage.paging,
		getNextPageParam: (lastPage, allPages) => lastPage.paging,
	})}
	let:result={accounts}
>
	<!-- <button on:click={createAccount} data-before="+">Create Account</button> -->

	{#each accounts as account (account.id)}
		<FireblocksAccount
			{isSandbox}
			{account}
		/>
	{/each}
</Loader>
