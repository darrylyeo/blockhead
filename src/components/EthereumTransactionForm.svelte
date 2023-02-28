<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import {
		type SolidityJsonAbi,
		type SolidityJsonAbiPart,
		isReadable,
		isWritable,
	} from '../api/sourcify'
	import type { AccountConnectionState } from '../state/account'
	import { networkProviderConfigByProvider } from '../data/networkProviders'
	import { preferences } from '../state/preferences'


	export let network: Ethereum.Network
	export let provider: Ethereum.Provider
	export let contractAddress: Ethereum.ContractAddress
	export let contractName: string
	export let abi: SolidityJsonAbi


	$: readableMethods = abi.filter(isReadable)
	$: writableMethods = abi.filter(isWritable)


	import { Contract } from 'ethers'

	let selectedAccount: AccountConnectionState

	let selectedMethod: SolidityJsonAbiPart
	$: selectedMethod ??= writableMethods.sort((a, b) => b.inputs.length - a.inputs.length)[0]

	let payableAmount = 0n

	let inputValues = {}


	import { formatIdentifierToWords } from '../utils/formatIdentifierToWords'


	import Address from './Address.svelte'
	import AddressInput from './AddressInput.svelte'
	import AddressWithLabel from './AddressWithLabel.svelte'
	import ConnectedAccountSelect from './ConnectedAccountSelect.svelte'
	import BigNumberInput from './BigNumberInput.svelte'
	import HeightContainer from './HeightContainer.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import TransactionFlow from './TransactionFlow.svelte'
	import { TenderlyIcon } from '../assets/icons'


	import { flip } from 'svelte/animate'
	import { scale } from 'svelte/transition'
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

	.tenderly {
		--primary-color: #6e5e9b;
	}
</style>


<section class="column">
	<header class="bar">
		<h3>Smart Contract Interactions</h3>

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
			accountConnectionState={selectedAccount}
			{network}

			getContract={({ signer }) => (
				new Contract(
					contractAddress,
					abi,
					isWritable(selectedMethod) ? signer : provider
				)
			)}
			contractMethod={method.name}
			contractArgs={args}

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
							<ConnectedAccountSelect bind:selectedAccount required={true} />
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
									{@const numBits = BigInt(input.type.match(/\d+/)?.[0])}

									<BigNumberInput
										required
										bind:value={inputValues[inputKey]}
										min={2n ** (numBits - 1n) * -1n}
										max={2n ** (numBits - 1n) - 1n}
									/>
								{:else if input.type.startsWith('uint')}
									{@const numBits = BigInt(input.type.match(/\d+/)?.[0])}

									<BigNumberInput
										required
										bind:value={inputValues[inputKey]}
										min={0n}
										max={2n ** numBits - 1n}
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

					<button type="submit" class="medium">Next ›</button>
				</footer>
			</svelte:fragment>

			<svelte:fragment slot="confirming" let:walletName let:walletIcon let:actions>
				<article class="card">
					<header class="row spaced">
						<span class="row">
							<img src={walletIcon} width="25" />
							<Address {network} address={selectedAccount.address} format="middle-truncated" />
						</span>
						
						<span>
							will
							{#if payableAmount > 0}
								send
								<TokenBalance
									{network} erc20Token={network.nativeCurrency}
									balance={payableAmount}
								/>
								to
							{:else}
								call
							{/if}
						</span>

						<span>
							<AddressWithLabel
								{network}
								label={contractName}
								address={contractAddress}
								format="middle-truncated"
								linked
							/>
							›
							<abbr title={method.name}>{formatIdentifierToWords(method.name, true)}</abbr>
						</span>

						{#if method.inputs.length}
							with {method.inputs.length} parameters:
						{/if}
					</header>

					{#if method.inputs.length}
						<hr>

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
					{/if}
				</article>

				<div class="row spaced">
					<button type="button" class="medium cancel" on:click={actions.back}>‹ Back</button>

					<div class="row">
						{#if isReadable(method)}
							<button type="button" class="medium" on:click={actions.query}><img src={networkProviderConfigByProvider[$preferences.rpcNetwork]?.icon} width="16" /> Query Contract ›</button>
						{:else if isWritable(method)}
							<button type="button" class="tenderly medium" on:click={actions.simulate}><img src={TenderlyIcon} width="16" /> Simulate Transaction ›</button>

							<button type="button" class="medium" on:click={actions.sign}><img src={walletIcon} width="16" /> Sign & Broadcast Transaction ›</button>
						{:else}
						{/if}
					</div>
				</div>
			</svelte:fragment>


			<svelte:fragment slot="simulating-actions" let:actions>
				<div class="row spaced">
					<button type="button" class="medium cancel" on:click={actions.confirm}>‹ Back</button>

					<div class="row">
						<button type="button" class="medium destructive" on:click={actions.cancel}>« Start Over</button>
						<button type="button" class="tenderly medium" on:click={actions.simulate}><img src={TenderlyIcon} width="16" /> Simulate Again</button>
					</div>
				</div>
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
