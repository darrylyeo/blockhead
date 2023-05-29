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
	import type { Ethereum } from '../data/networks/types'
	import type { AccountConnectionState } from '../state/account'
	import type { UnsignedTransaction, Contract, ContractReceipt, Signer, Transaction } from 'ethers'

	import { walletsByType } from '../data/wallets'
	

	// External state
	export let network: Ethereum.Network
	export let accountConnectionState: AccountConnectionState

	export let getContract: (params: {
		network: Ethereum.Network,
		signer: Signer
	}) => Contract

	export let contractMethod: string
	export let contractArgs: any[]

	export let onTransactionSuccess


	// Internal state

	let currentStep = Steps.Idle

	let formElement: HTMLFormElement

	$: contract = accountConnectionState && getContract({
		network,
		signer: accountConnectionState.signer
	})

	$: walletConfig = walletsByType[accountConnectionState?.walletConnection?.walletType]
	$: walletName = walletConfig?.name ?? ''
	$: walletIcon = walletConfig?.icon ?? ''

	let unsignedTx: UnsignedTransaction
	let tx: Transaction
	let txReceipt: ContractReceipt
	let errorMessage: string

	
	// Methods/hooks/lifecycle

	import { simulateTransaction } from '../api/tenderly'

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

	$: contractMethod, actions.cancel()

	// $: if(account && currentStep === Steps.TransactionSigning)(async () => {
	// 	const { address, signer } = account

	// 	try {
			

	// 		// tx = unsignedTx.sign()
	// 	}catch(e){
	// 	}
	// // })()

	// // $: if(tx)(async () => {
	// if(tx){
	// 	console.log('tx', tx)

	// 	currentStep = Steps.TransactionPending

	// 	try {
	// 		txReceipt = await tx.wait?.(1)
	// 		console.log('txReceipt', txReceipt)
	// 	}catch(e){
	// 		errorMessage = e.message
	// 		currentStep = Steps.TransactionReverted
	// 		return
	// 	}

	// 	currentStep = Steps.TransactionSuccess

	// 	onTransactionSuccess?.(tx, txReceipt)
	// 	// if(onTransactionSuccess)
	// 	// 	try {
	// 	// 		await onTransactionSuccess(tx)
	// 	// 	}catch(e){
	// 	// 		errorMessage = e.message
	// 	// 		currentStep = Steps.TransactionFailed
	// 	// 		return
	// 	// 	}
	// }
	// })()

	// $: if(errorMessage)
	// 	console.error(errorMessage)

	const isValid = () => formElement?.checkValidity()


	// Formatting
	import { formatAddress } from '../utils/formatAddress'


	// Components
	import EthereumSimulatedTransactionTenderly from './EthereumSimulatedTransactionTenderly.svelte'
	import Loader from './Loader.svelte'
	import { TenderlyIcon } from '../assets/icons'


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
			class="card column"
			transition:fly={{ x: 50 * Math.sign(steps[0] - steps[1]), duration: 300 }}
		>
			<header class="bar">
				<h4>Confirm Transaction</h4>
				<span class="card-annotation">{network.name} Smart Contract Call</span>
			</header>

			<slot
				name="confirming"
				{actions}
				{walletName}
				{walletIcon}
			/>
		</form>
	{:else if currentStep === Steps.TransactionSimulating}
		<section
			class="card column"
			transition:fly={{ x: 50 * Math.sign(steps[0] - steps[1]), duration: 300 }}
		>
			<Loader
				loadingIcon={TenderlyIcon}
				loadingMessage="Simulating transaction on Tenderly..."
				errorMessage="The transaction failed to be simulated."
				fromPromise={async () => {
					const populatedTx = await contract.populateTransaction[contractMethod](...contractArgs)
					// const estimatedGas = await contract.estimateGas[contractMethod](...contractArgs)
					// console.log({estimatedGas})

					return await simulateTransaction({
						network_id: network.chainId,
						from: accountConnectionState.account?.address,
						to: contract.address,
						input: populatedTx.data,
						gas: 21204,
						gas_price: 1,
						value: 0,
						save_if_fails: true,
					})
				}}
				let:result
			>
				<header slot="header" class="bar">
					<h4>Transaction Simulator</h4>
					<span class="card-annotation">Tenderly</span>
				</header>

				{#if result}
					<section class="card">
						{#if result.simulation?.status}
							<p>The simulated transaction executed successfully!</p>
						{:else}
							<p>The simulated transaction failed to execute and was reverted.</p>
						{/if}

						<hr>

						<EthereumSimulatedTransactionTenderly
							{network}
							contextualAddress={accountConnectionState.account?.address}
							data={result}
						/>
					</section>
				{/if}
			</Loader>

			<slot
				name="simulating-actions"
				{actions}
			/>
		</section>
	{:else if currentStep === Steps.TransactionSigning}
		<section
			class="card column"
			transition:fly={{ x: 50 * Math.sign(steps[0] - steps[1]), duration: 300 }}
		>
			<Loader
				fromPromise={async () => {
					const estimatedGas = await contract.estimateGas[contractMethod](...contractArgs)
					console.log({estimatedGas})
					try {
						return await contract[contractMethod](...contractArgs)
					}catch(e){
						errorMessage = e.message
						currentStep = Steps.TransactionFailed
					}
				}}
				loadingIcon={walletIcon}
				loadingMessage="Sign the transaction with {walletName} ({formatAddress(accountConnectionState.account?.address)})."
				let:result={tx}
			>
				<header slot="header" class="bar">
					<h4>Sign Transaction</h4>
					<span class="card-annotation">{walletName}</span>
				</header>
			</Loader>

			<hr>

			<footer class="row">
				<button type="button" class="medium cancel" on:click={actions.back}>‹ Back</button>
			</footer>
		</section>
	{:else if currentStep === Steps.TransactionPending}
		<div
			class="card column"
			in:fly={{ x: 50 * Math.sign(steps[0] - steps[1]), duration: 300 }}
			out:scale
		>
			<slot
				name="pending"
				{actions}
			>
				<h4>Waiting...</h4>

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
			class="card column"
			transition:scale
		>
			<h4>Transaction Failed</h4>

			<output>{errorMessage}</output>

			{#if tx?.hash}
				<a class="address" href="{network.explorers?.[0]?.url}/tx/{tx.hash}" target="_blank">
					<button>View Transaction</button>
				</a>
			{/if}

			
			<div class="row spaced">
				<button class="medium" on:click={actions.retry}>Try Again</button>
				<button class="medium cancel" on:click={actions.cancel}>Cancel</button>
			</div>
		</div>
	{:else if currentStep === Steps.TransactionSuccess}
		<div
			class="card column"
			transition:scale
			>
			<slot
				name="success"
				{actions}
				{network}
				{tx}
			>
				<h4>Success!</h4>

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
