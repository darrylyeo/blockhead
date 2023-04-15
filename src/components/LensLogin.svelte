<script lang="ts">
	// Constants/types
	import type { AccountConnectionState } from '../state/account'
	
	
	// External state
	export let accountConnection: AccountConnectionState


	// Actions
	import { authenticate, challenge } from '../api/lens'

	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()


	// Components
	import Loader from './Loader.svelte'
	import { LensIcon } from '../assets/icons'
</script>


<Loader
	{...$$restProps}
	startImmediately={false}
	fromPromise={accountConnection && (async () => {
		const { signer, address, chainId } = accountConnection

		if(!signer || !address){
			throw new Error(`Connect an account first.`)
		}

		const challengeInfo = await challenge({ address })

		// ask the user to sign a message with the challenge info returned from the server
		const signature = await signer.signMessage(challengeInfo.data.challenge.text)

		// authenticate the user
		const authData = await authenticate({
			address,
			signature,
		})

		// if user authentication is successful, you will receive an accessToken and refreshToken
		const { data: { authenticate: { accessToken }}} = authData

		return accessToken
	})}
	loadingIcon={LensIcon}
	loadingMessage={`Signing in with Lens...`}
	errorMessage={`Couldn't sign-in with Lens.`}
	whenCanceled={async () => dispatch('cancel')}
	debug
	let:result={token}
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

						<button
							type="submit"
							class="lens"
						>
							<img src={LensIcon} width="20" />
							Sign in
						</button>
					</div>
				</header>
			</slot>
		</form>
	</svelte:fragment>
</Loader>


<style>
	.lens {
		--primary-color: #abfe2c;
		color: #00501e;
	}
</style>
