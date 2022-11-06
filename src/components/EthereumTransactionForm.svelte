<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import {
		type SolidityJsonAbi,
		type SolidityJsonAbiPart,
		isReadable,
		isWritable,
	} from '../api/sourcify'
	import type { ConnectedAccount } from '../state/account'
	import { walletsByType } from '../data/ethereum/wallets';


	export let network: Ethereum.Network
	export let contractAddress: Ethereum.ContractAddress
	export let contractName: string
	export let abi: SolidityJsonAbi

	$: readableMethods = abi.filter(isReadable)
	$: writableMethods = abi.filter(isWritable)


	import { BigNumber, Contract } from 'ethers'

	let selectedAccount: ConnectedAccount

	let selectedMethod: SolidityJsonAbiPart
	$: selectedMethod ??= writableMethods.sort((a, b) => b.inputs.length - a.inputs.length)[0]

	let payableAmount = BigNumber.from(0)

	let inputValues = {}

	let isSimulation = false


	import { formatIdentifierToWords } from '../utils/formatIdentifierToWords'


	import AddressInput from './AddressInput.svelte'
	import AddressWithLabel from './AddressWithLabel.svelte'
	import ConnectedAccountSelect from './ConnectedAccountSelect.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
	import BigNumberInput from './BigNumberInput.svelte'
	import HeightContainer from './HeightContainer.svelte'
	import TransactionFlow from './TransactionFlow.svelte'


	import { scale } from 'svelte/transition'
	import { flip } from 'svelte/animate';
</script>


<style>
	form {
		/* justify-self: center; */
	}

	form input {
		flex: 1;
	}

	.input-param {
		display: grid;
		grid-template-columns: 1fr minmax(52ch, 1fr) 1fr;
		align-items: center;
	}
	.input-param > :first-child {
		text-align: right;
	}

	.input-index {
		opacity: 0.8;
	}
</style>


<section class="column">
	<header class="bar">
		<h3>Interactions</h3>

		<label>
			<span>{selectedMethod ? isReadable(selectedMethod) ? 'Query' : isWritable(selectedMethod) ? 'Action' : 'Method' : 'Method'}</span> 
			<select bind:value={selectedMethod}>
				<optgroup label="Queries">
					{#each readableMethods as method}
						<option value={method}>{formatIdentifierToWords(method.name, true)}</option>
					{/each}
				</optgroup>

				<optgroup label="Actions">
					{#each writableMethods as method}
						<option value={method}>{formatIdentifierToWords(method.name, true)}</option>
					{/each}
				</optgroup>
			</select>
		</label>
	</header>

	{#if selectedMethod}
		{@const method = selectedMethod}
		{@const args = method.inputs.map((input, i) => inputValues[`${method.name || i}/${input.name}`])}

		<TransactionFlow
			account={selectedAccount}
			{network}

			createTransaction={async ({ network, address, signer }) =>
				await new Contract(
					address,
					abi,
					isWritable(selectedMethod) ? signer : undefined
				)[method.name](...args)
			}

			onTransactionSuccess={async tx => {
				console.log(tx)
			}}
		>
			<svelte:fragment slot="idle" let:actions={{ next }} let:isValid>
				<header class="bar">
					<h4 class="row-inline">
						<!-- <span class="row-inline"> -->
							<NetworkIcon {network} />
							<!-- {network.name}
						</span> -->
						›
						<AddressWithLabel
							{network}
							label={contractName}
							address={contractAddress}
							format="middle-truncated"
							linked
						/>
						›
						<abbr title={method.name}>{formatIdentifierToWords(method.name, true)}</abbr>
					</h4>

					{#if method.stateMutability === 'nonpayable' || method.stateMutability === 'payable'}
						<label>
							<span>From</span>
							<ConnectedAccountSelect bind:selectedAccount required />
						</label>
					{/if}
				</header>

				{#if method.inputs.length}
					<hr>

					<HeightContainer>
						{#each method.inputs as input, i (`${method.name || i}/${input.name}`)}
							{@const inputKey = `${method.name || i}/${input.name}`}

							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label class="input-param" transition:scale={{ duration: 300, start: 0.8, delay: i * 10 }} animate:flip>
								<span>
									{#if input.name}
										<abbr title={input.name}>{formatIdentifierToWords(input.name, true)}</abbr>
									{:else}
										<span class="input-index">Input {i + 1}</span>
									{/if}
								</span>
								
								{#if input.type === 'address'}
									<AddressInput
										bind:address={inputValues[inputKey]}
										required
									/>
								{:else if input.type.startsWith('int')}
									{@const numBits = parseInt(input.type.match(/\d+/)?.[0])}

									<BigNumberInput
										required
										bind:value={inputValues[inputKey]}
										min={BigNumber.from(2).pow(numBits - 1).mul(-1)}
										max={BigNumber.from(2).pow(numBits - 1).sub(1)}
									/>
								{:else if input.type.startsWith('uint')}
									{@const numBits = parseInt(input.type.match(/\d+/)?.[0])}

									<BigNumberInput
										required
										bind:value={inputValues[inputKey]}
										min={BigNumber.from(0)}
										max={BigNumber.from(2).pow(numBits).sub(1)}
									/>
								{:else}
									<input
										type="text"
										required
										bind:value={inputValues[inputKey]}
									/>
								{/if}

								<abbr class="card-annotation" title="{input.type} ({input.indexed ? `indexed ` : ''}{input.internalType})">{input.type}</abbr>
							</label>
						{/each}
					</HeightContainer>
				{/if}

				<hr>

				<footer class="bar">
					<label>
						<!-- <span>Estimated Gas:</span>
						<output>

							gwei
						</output> -->

						{#if method.stateMutability === 'payable'}
							<label>
								<span>Pay {network.nativeCurrency.symbol}</span>
								<TokenAmountSelect
									bind:token={network.nativeCurrency.symbol}
									bind:amount={payableAmount}
								/>
							</label>
						{/if}
					</label>

					<button>Next ›</button>
				</footer>
			</svelte:fragment>

			<!-- <svelte:fragment slot="confirming" let:actions={{ back }}> -->
			<svelte:fragment slot="confirming-body" let:network>
				{#each method.inputs as input, i (`${method.name || i}/${input.name}`)}
					{@const inputKey = `${method.name || i}/${input.name}`}
					{@const arg = inputValues[inputKey]}

					<label class="input-param" transition:scale={{ duration: 300, start: 0.8, delay: i * 25 }}>
						<span>
							{#if input.name}
								<abbr title={input.name}>{formatIdentifierToWords(input.name, true)}</abbr>
							{:else}
								<span class="input-index">Input {i + 1}</span>
							{/if}
						</span>

						<output>{arg}</output>

						<abbr class="card-annotation" title="{input.type} ({input.indexed ? `indexed ` : ''}{input.internalType})">{input.type}</abbr>
					</label>
				{/each}
			</svelte:fragment>

			<svelte:fragment slot="confirming-actions" let:network let:actions>
				{#if isReadable(method)}
					<button type="button" class="medium" on:click={() => actions.query}>Query</button>
				{:else if isWritable(method)}
					<button type="button" class="medium" on:click={() => actions.simulate}>Simulate Transaction ›</button>

					<button type="button" class="medium" on:click={() => actions.sign}>Sign & Broadcast Transaction ›</button>
				{:else}
				{/if}
			</svelte:fragment>

			<!-- <svelte:fragment slot="pending"> -->
			<svelte:fragment slot="pending-message" let:network>
				Pending...
			</svelte:fragment>

			<!-- <svelte:fragment slot="failed"> -->

			<!-- <svelte:fragment slot="success"> -->
			<svelte:fragment slot="success-message" let:network>
				Success!
			</svelte:fragment>
		</TransactionFlow>
	{/if}
</section>
