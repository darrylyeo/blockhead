<script context="module" lang="ts">
	export enum Steps {
		Idle,
		Confirming,
		Querying,
		TransactionSimulating,
		TransactionSigning,
		TransactionPending,
		TransactionFailed,
		TransactionReverted,
		TransactionSuccess
	}
</script>


<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/ethereum/types'
	import type { ConnectedAccount } from '../state/account'
	import type { Transaction, ContractReceipt, Signer } from 'ethers'

	import { walletsByType } from '../data/ethereum/wallets'
	

	// External state
	export let network: Ethereum.Network
	export let account: ConnectedAccount

	export let createTransaction: (params: {
		network: Ethereum.Network,
		address: Ethereum.Address,
		signer: Signer
	}) => Promise<Transaction>

	export let onTransactionSuccess


	// Internal state

	let currentStep = Steps.Idle

	let formElement: HTMLFormElement

	const isValid = () => formElement?.checkValidity()

	let tx: Transaction
	let txReceipt: ContractReceipt
	let errorMessage: string

	
	// Methods/hooks/lifecycle

	const actions = {
		back: () => currentStep--,
		next: () => currentStep++,
		confirm: () => currentStep = Steps.Confirming,
		query: () => currentStep = Steps.Querying,
		simulate: () => currentStep = Steps.TransactionSimulating,
		sign: () => currentStep = Steps.TransactionSigning,
		retry: () => currentStep = Steps.Confirming,
		cancel: () => currentStep = Steps.Idle
	}

	$: if(account && currentStep === Steps.TransactionSigning)(async () => {
		const { address, signer } = account

		console.log('signer', signer)

		try {
			tx = await createTransaction({
				network,
				address,
				signer
			})
		}catch(e){
			errorMessage = e.message
			currentStep = Steps.TransactionFailed
		}
	// })()

	// $: if(tx)(async () => {
	if(tx){
		console.log('tx', tx)

		currentStep = Steps.TransactionPending

		try {
			txReceipt = await tx.wait?.(1)
			console.log('txReceipt', txReceipt)
		}catch(e){
			errorMessage = e.message
			currentStep = Steps.TransactionReverted
			return
		}

		currentStep = Steps.TransactionSuccess

		onTransactionSuccess?.(tx, txReceipt)
		// if(onTransactionSuccess)
		// 	try {
		// 		await onTransactionSuccess(tx)
		// 	}catch(e){
		// 		errorMessage = e.message
		// 		currentStep = Steps.TransactionFailed
		// 		return
		// 	}
	}
	})()

	$: if(errorMessage)
		console.error(errorMessage)


	// Formatting
	import { formatAddress } from '../utils/formatAddress'


	// Styles/animation
	import { fly, scale } from 'svelte/transition'
	let steps: Steps[] = [0]
	$: steps.unshift(currentStep)
</script>


<slot name="header" {currentStep} />

<div class="stack align-top">
	{#if currentStep === Steps.Idle}
		<form
			bind:this={formElement}
			class="card column"
			on:submit|preventDefault={actions.confirm}
			disabled={currentStep !== Steps.Idle}
			transition:fly={{ x: 50 * Math.sign(steps[0] - steps[1]), duration: 300 }}
			on:invalid={e => console.warn('invalid', e)}
		>
			<slot
				name="idle"
				{actions}
				{isValid}
			/>
		</form>
	{:else if currentStep === Steps.Confirming}
		<form
			class="card column centered"
			transition:fly={{ x: 50 * Math.sign(steps[0] - steps[1]), duration: 300 }}
		>
			<slot
				name="confirming"
				{actions}
			>
				<header class="bar">
					<h3 class="row">
						<img src={walletsByType[account.walletConnection.walletType].icon} width="25" />

						<slot name="confirming-message" {network}>
							Confirm Transaction
						</slot>
					</h3>
				</header>

				<hr>

				<slot name="confirming-body" {network} />

				<hr>

				<div class="row spaced">
					<button type="button" class="medium cancel" on:click={actions.back}>‹ Edit</button>

					<div class="stack">
						<button type="button" class="medium" on:click={actions.sign}>
							Sign & Broadcast Transaction
						</button>
					</div>
				</div>
			</slot>
		</form>
	{:else if currentStep === Steps.TransactionSigning}
		<div
			class="card column centered"
			transition:fly={{ x: 50 * Math.sign(steps[0] - steps[1]), duration: 300 }}
		>
			<slot
				name="signing"
				{actions}
			>
				<h3><img src={walletsByType[account.walletConnection.walletType].icon} width="25" /> Sign Transaction</h3>

				<p>Sign the transaction with {walletsByType[account.walletConnection.walletType].name} ({formatAddress(account.address)}).</p>
			</slot>

			<button type="button" class="medium" on:click={actions.back}>Go Back</button>
		</div>
	{:else if currentStep === Steps.TransactionPending}
		<div
			class="card column centered"
			in:fly={{ x: 50 * Math.sign(steps[0] - steps[1]), duration: 300 }}
			out:scale
		>
			<slot
				name="pending"
				{actions}
			>
				<h3>Waiting...</h3>

				<p><slot name="pending-message" {network} /></p>

				{#if tx?.hash}
					<a class="address" href="{network.explorers?.[0]?.url}/tx/{tx.hash}" target="_blank">
						<button>View Transaction</button>
					</a>
				{/if}
			</slot>
		</div>
	{:else if currentStep === Steps.TransactionFailed || currentStep === Steps.TransactionReverted}
		<div
			class="card column centered"
			transition:scale
		>
			<h3>Transaction Failed</h3>

			<output>{errorMessage}</output>

			{#if tx?.hash}
				<a class="address" href="{network.explorers?.[0]?.url}/tx/{tx.hash}" target="_blank">
					<button>View Transaction</button>
				</a>
			{/if}

			
			<div class="row spaced centered">
				<button class="medium" on:click={actions.retry}>Try Again</button>
				<button class="medium cancel" on:click={actions.cancel}>Cancel</button>
			</div>
		</div>
	{:else if currentStep === Steps.TransactionSuccess}
		<div
			class="card column centered"
			transition:scale
			>
			<slot
				name="success"
				{actions}
				{network}
				{tx}
			>
				<h3>Success!</h3>

				<p><slot name="success-message" {network} {tx} /></p>

				{#if tx?.hash}
					<a class="address" href="{network.explorers?.[0]?.url}/tx/{tx.hash}" target="_blank">
						<button class="medium">View Transaction</button>
					</a>
				{/if}
			</slot>
		</div>
	{/if}
</div>


<style>
	form {
		scroll-snap-align: center;
	}
	form > :global(section) {
		width: 100%;

		--grid-gap: 1rem;
	}
</style>
