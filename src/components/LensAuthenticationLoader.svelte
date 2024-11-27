<script lang="ts">
	// Constants/types
	import type { AccountConnection } from '$/state/account'
	
	
	// External state
	export let accountConnection: AccountConnection


	// Actions
	import { createQuery } from '@tanstack/svelte-query'


	// Components
	import Loader from './Loader.svelte'
	import { LensIcon } from '$/assets/icons'
</script>


<Loader
	viewOptions={{
		clip: false,
	}}
	startImmediately={false}
	fromQuery={accountConnection?.state?.signer && createQuery({
		queryKey: ['LensAccessToken', {
			address: accountConnection.state.account?.address,
		}],
		queryFn: async () => {
			const { authenticate, generateChallenge } = await import('$/api/lens')

			const { signer, account, chainId } = accountConnection.state

			if(!signer || !account?.address) throw new Error(`Connect an account first.`)

			const { address } = account

			const challengeInfo = await generateChallenge({ address })

			// ask the user to sign a message with the challenge info returned from the server
			const signature = await signer.signMessage(challengeInfo.data.challenge.text)

			// authenticate the user
			const { data, error } = await authenticate({
				address,
				signature,
			})

			if(error) throw new Error(error.message) // `${error.message}\n${error.stack}`

			// if user authentication is successful, you will receive an accessToken and refreshToken
			const { authenticate: { accessToken, refreshToken }} = data

			return { accessToken, refreshToken }
		},
		staleTime: Infinity,
	})}
	loadingIcon={LensIcon}
	loadingMessage={`Signing in with Lens...`}
	errorMessage={`Couldn't sign-in with Lens.`}
	debug
	let:status
	let:result
>
	<svelte:fragment slot="idle" let:load>
		<form
			class="column"
			on:submit|preventDefault={load}
		>
			<slot name="header">
				<header class="bar wrap">
					<slot name="title" />

					<div role="toolbar" class="row wrap">
						<slot name="toolbar" />
					</div>
				</header>
			</slot>

			<hr>

			<div class="bar">
				<span />

				<button
					type="submit"
					class="lens medium"
				>
					<img src={LensIcon} width="20" />
					Sign in ›
				</button>
			</div>
		</form>
	</svelte:fragment>

	<!-- <slot name="header" slot="header">
		{#if status === 'resolved'}
			<header class="bar wrap">
				<slot name="title" />

				<div role="toolbar" class="row wrap">
					<slot name="toolbar" />
				</div>
			</header>
		{/if}
	</slot> -->

	<slot accessToken={result?.accessToken} refreshToken={result?.refreshToken} />
</Loader>


<style>
	.lens {
		--primary-color: #abfe2c;
		color: #00501e;
	}
</style>
