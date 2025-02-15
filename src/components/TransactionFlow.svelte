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
	import type { Ethereum } from '$/data/networks/types'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import { networkProviderConfigByProvider } from '$/data/networkProviders'
	import type { AccountConnection } from '$/state/account'

	type Abi = $$Generic<Ethereum.Abi>
	type AbiMethod = Ethereum.AbiMethod<Abi>
	type AbiMethodArgs = Ethereum.AbiMethodArgs<Abi, AbiMethod['name']>


	// Context
	import { accountConnectionToInfo } from '$/state/account'


	// Functions
	import { stringify, parse } from 'devalue'
	import { isReadable, isReadableWithoutInputs, isWritable } from '$/utils/abi'

	import { normalizeSimulationOutput as normalizeSimulationOutputTenderly } from '$/api/tenderly/normalize'


	// External state
	export let network: Ethereum.Network
	export let networkProvider: NetworkProvider

	export let accountConnection: AccountConnection
	export let transactionRelay: NetworkProvider | 'Wallet'

	export let payableAmount: AbiMethod extends Ethereum.AbiMethod<Abi, 'payable'> ? bigint : undefined

	export let contractAddress: Ethereum.ContractAddress
	export let contractAbi: Abi
	export let contractMethodName: AbiMethod['name']
	export let contractMethodArgs: AbiMethodArgs

	export let onTransactionSuccess


	// Internal state
	let currentStep = Steps.Idle

	let formElement: HTMLFormElement

	let estimatedGas: Ethereum.GasAmount
	let signedTransaction: `0x${string}`
	let transactionId: Ethereum.TransactionId
	let errorMessage: string

	let isEip1559 = false
	let accessList: Ethereum.AccessList = []

	// (Computed)
	$: networkProviderConfig = networkProviderConfigByProvider[networkProvider]
	$: networkProviderName = networkProviderConfig?.name ?? ''
	$: networkProviderIcon = networkProviderConfig?.icon ?? ''

	$: accountConnectionInfo = $accountConnectionToInfo.get(accountConnection)


	$: fromAddress = accountConnection?.state?.account?.address

	$: isContractCall = contractAddress && contractAbi && contractMethodName && contractMethodArgs

	$: abiPart = contractAbi.find(method => method.type === 'function' && method.name === contractMethodName)
	$: isMethodReadable = abiPart && isReadable(abiPart)
	$: isMethodReadableWithoutInputs = abiPart && isReadableWithoutInputs(abiPart)
	$: isMethodWritable = abiPart && isWritable(abiPart)

	let params: Partial<Ethereum.TransactionContractCallParameters>
	$: params = {
		contractAddress,
		contractAbi,
		contractMethodName,
		contractMethodArgs,

		fromAddress,
		// nonce,
		payableAmount,

		// gasAmount: estimatedGas,
		isEip1559,
		...isEip1559 ? {
			maxFeePerGas: 100000000n,
			maxPriorityFeePerGas: 100000000n,
		} : {
			gasPrice: 100000000n,
		},

		accessList,
	}


	// Actions
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

	$: contractAddress, contractAbi, contractMethodName, contractMethodArgs, payableAmount,
		isMethodReadableWithoutInputs
			? actions.query()
			: actions.cancel()

	const isValid = () => formElement?.checkValidity()


	// Methods
	import { createQuery } from '@tanstack/svelte-query'


	// Formatting
	import { formatAddress } from '$/utils/formatAddress'


	// Components
	import BlockNumber from './BlockNumber.svelte'
	import EthereumTransaction from './EthereumTransaction.svelte'
	import Loader from './Loader.svelte'
	import { TenderlyIcon } from '$/assets/icons'


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
				{accountConnectionInfo}
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
				{accountConnectionInfo}
			/>
		</form>
	
	{:else if currentStep === Steps.Querying}
		<section
			class="card column"
			transition:fly={{ x: 50 * Math.sign(steps[0] - steps[1]), duration: 300 }}
		>
			<Loader
				loadingIcon={networkProviderIcon}
				loadingIconName={networkProviderName}
				loadingMessage="Querying smart contract via {networkProviderName}..."
				errorMessage="The smart contract failed to be queried."
				fromQuery={createQuery({
					queryKey: ['QueryContract', {
						networkProvider,
						chainId: network.chainId,
						params: {
							contractAddress,
							contractAbi,
							contractMethodName,
							contractMethodArgs: stringify(contractMethodArgs),
						},
					}],
					queryFn: async ({
						queryKey: [_, {
							networkProvider,
							chainId,
							params,
						}],
					}) => {
						const { getViemPublicClient } = await import('$/data/networkProviders')
						const { readContract } = await import('viem/actions')

						const publicClient = getViemPublicClient({
							network,
							networkProvider,
						})

						return await readContract(
							publicClient,
							{
								address: params.contractAddress,
								abi: params.contractAbi,
								functionName: params.contractMethodName,
								args: parse(params.contractMethodArgs),
							}
						)
					},
				})}
				let:result
			>
				<header slot="header" class="bar">
					<h4>Query Contract</h4>
					<span class="card-annotation">{networkProviderName}</span>
				</header>

				<slot
					name="query-result"
					{actions}
					{result}
				>
					{result}
				</slot>
			</Loader>

			{#if !isMethodReadableWithoutInputs}
				<hr>

				<footer class="row">
					<span />
					<button type="button" class="medium" on:click={actions.cancel} data-before="↻">Query Again</button>
				</footer>
			{/if}
		</section>

	{:else if currentStep === Steps.TransactionSimulating}
		<section
			class="card column"
			transition:fly={{ x: 50 * Math.sign(steps[0] - steps[1]), duration: 300 }}
		>
			<Loader
				loadingIcon={TenderlyIcon}
				loadingIconName={'Tenderly'}
				loadingMessage="Simulating transaction on Tenderly..."
				errorMessage="The transaction failed to be simulated."
				fromQuery={createQuery({
					queryKey: ['TransactionSimulation', {
						transactionSimulationProvider: 'Tenderly',
						chainId: network.chainId,
						params: stringify(params),
						blockNumber: undefined,
					}],
					queryFn: async ({
						queryKey: [_, {
							chainId,
							params,
							blockNumber,
						}],
					}) => {
						const { simulateTransaction } = await import('$/api/tenderly')

						return await simulateTransaction({
							chainId,
							params: parse(params),
							blockNumber,
						})
					},
					select: output => (
						normalizeSimulationOutputTenderly(
							output,
							network,
						)
					),
				})}
				let:result={transaction}
			>
				<header slot="header" class="bar">
					<h4>Transaction Simulation</h4>

					<span class="card-annotation">Tenderly</span>
				</header>

				{#if transaction}
					<EthereumTransaction
						{network}
						contextualAddress={fromAddress}
						{transaction}
						layout="collapsible"
						detailLevel="exhaustive"
						isOpen={false}
					>
						<svelte:fragment slot="title">
							{#if transaction?.executionStatus === 'successful'}
								<p>Transaction would execute successfully at block <BlockNumber {network} blockNumber={transaction.blockNumber} />.</p>
							{:else}
								<p>Transaction would fail to execute and revert at block <BlockNumber {network} blockNumber={transaction.blockNumber} />.</p>
							{/if}
						</svelte:fragment>
					</EthereumTransaction>
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
					// const estimatedGas = await contract.estimateGas[contractMethod](...contractArgs)
					// console.log({estimatedGas})
					// try {
					// 	return await contract[contractMethod](...contractArgs)
					// }catch(e){
					// 	errorMessage = e.message
					// 	currentStep = Steps.TransactionFailed
					// }
				}}
				loadingIcon={accountConnectionInfo?.icon}
				loadingIconName={accountConnectionInfo?.walletName}
				loadingMessage="Sign the transaction with {accountConnectionInfo?.walletName} ({formatAddress(fromAddress)})."
				bind:result={signedTransaction}
			>
				<header slot="header" class="bar">
					<h4>Sign Transaction</h4>
					<span class="card-annotation">{accountConnectionInfo?.walletName}</span>
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

			
			<div class="row">
				<button class="medium" on:click={actions.retry}>Try Again</button>
				<button class="medium cancel" on:click={actions.cancel}>Cancel</button>
			</div>
		</div>

	{:else if currentStep === Steps.TransactionSuccess}
		<!-- <div
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
		</div> -->
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
