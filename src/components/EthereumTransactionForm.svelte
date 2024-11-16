<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import type { AccountConnection } from '$/state/account'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import { networkProviderConfigByProvider } from '$/data/networkProviders'
	import { knownWalletsByType } from '$/data/wallets'
	import type { UnionToObject } from '$/utils/UnionToObject'
	
	type Abi = $$Generic<Ethereum.Abi>
	type AbiMethod = Ethereum.AbiMethod<Abi>

	type InputValues =
		{
			[
				Method in AbiMethod
				as
				Method['name']
			]: {
				[
					Index in Exclude<keyof Method['inputs'], keyof any[]>
					as
					Method['inputs'][Index] extends { name: string }
						? Method['inputs'][Index]['name']
						: Index
				]: Ethereum.AbiMethodArg<Abi, Method['name'], Index extends `${infer T extends number}` ? T : never>
			}
		} extends infer T ?
			Partial<UnionToObject<{
				[MethodKey in keyof T]: {
					[
						InputKey in keyof T[MethodKey]
						as
						`${MethodKey & string}/${InputKey & string}`
					]: T[MethodKey][InputKey]
				}
			}[keyof T]>>
		: never

	type InputTypes =
		{
			[
				Method in AbiMethod
				as
				Method['name']
			]: {
				[
					Index in Exclude<keyof Method['inputs'], keyof any[]>
					as
					Method['inputs'][Index] extends { name: string }
						? Method['inputs'][Index]['name']
						: Index
				]: Method['inputs'][Index] extends { type: any } ? Method['inputs'][Index]['type'] : never
			}
		} extends infer T ?
			Partial<UnionToObject<{
				[MethodKey in keyof T]: {
					[
						InputKey in keyof T[MethodKey]
						as
						`${MethodKey & string}/${InputKey & string}`
					]: T[MethodKey][InputKey]
				}
			}[keyof T]>>
		: never


	// Context
	import { preferences } from '$/state/preferences'


	// Functions
	import { isReadable, isWritable, isReadableWithoutInputs } from '$/utils/abi'
	import { isTruthy } from '$/utils/isTruthy'


	// Inputs
	export let network: Ethereum.Network
	export let networkProvider: NetworkProvider
	export let publicClient: Ethereum.PublicClient
	export let contractAddress: Ethereum.ContractAddress
	export let contractName: string = ''
	export let contractAbi: Abi = [] as unknown as Abi

	// (Computed)
	$: readableMethods = contractAbi.filter(isReadable)
	$: readableMethodsWithoutInputs = readableMethods.filter(isReadableWithoutInputs)
	$: readableMethodsWithInputs = readableMethods.filter(method => !isReadableWithoutInputs(method))
	$: writableMethods = contractAbi.filter(isWritable)

	$: methodsByGroup = [
		{
			name: 'Variables',
			singularName: 'Variable',
			methods: readableMethodsWithoutInputs,
		},
		{
			name: 'Queries',
			singularName: 'Query',
			methods: readableMethodsWithInputs,
		},
		{
			name: 'Actions',
			singularName: 'Action',
			methods: writableMethods,
		},
	]

	// (View options)
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 3


	// Internal state
	let inputValues: InputValues = {} as InputValues
	let inputTypes: InputTypes = {} as InputTypes

	let selectedAccountConnection: AccountConnection | undefined

	let contractMethod: AbiMethod | undefined
	$: contractMethod ??= writableMethods.sort((a, b) => b.inputs.length - a.inputs.length)[0]

	let payableAmount = 0n

	$: contractMethodArgs = contractMethod?.inputs.map((input, i) => inputValues[`${contractMethod.name}/${'name' in input && input.name || i}`]) ?? []


	// View options
	let showFormattedNames = true


	// Formatting
	import { formatIdentifierToWords } from '$/utils/formatIdentifierToWords'

	$: formatIdentifier = showFormattedNames
		? formatIdentifierToWords
		: (identifier: string) => identifier


	// Components
	import Address from './Address.svelte'
	import AddressInput from './AddressInput.svelte'
	import AddressWithLabel from './AddressWithLabel.svelte'
	import ConnectedAccountSelect from './ConnectedAccountSelect.svelte'
	import BigNumberInput from './BigNumberInput.svelte'
	import Collapsible from './Collapsible.svelte'
	import EthereumParameters from './EthereumParameters.svelte'
	import HeightContainer from './HeightContainer.svelte'
	import Input from './Input.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
	import TokenAmountSelect from './TokenAmountSelect.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import TransactionFlow from './TransactionFlow.svelte'
	import { TenderlyIcon } from '$/assets/icons'


	// Transitions
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


<Collapsible
	type="label"
	showTriggerText={false}
>
	<svelte:fragment slot="title">
		<svelte:element this={`h${headingLevel}`}>Smart Contract Interactions</svelte:element>
	</svelte:fragment>

	<svelte:fragment slot="toolbar-items"
		let:isOpen
	>
		{#if isOpen}
			<div
				class="row align-end"
				transition:scale={{ duration: 300 }}
			>
				<label>
					<input type="checkbox" bind:checked={showFormattedNames} />
					<span>Format Names</span>
				</label>

				<label>
					<span>{contractMethod && methodsByGroup.find(group => group.methods.includes(contractMethod))?.singularName || 'Method'}</span> 

					<select bind:value={contractMethod}>
						{#each methodsByGroup.filter(({ methods }) => methods.length) as { name, methods }}
							<optgroup label={name}>
								{#each methods.sort((a, b) => a.name.localeCompare(b.name)) as method}
									<!-- <option value={method}>{formatIdentifierToWords(method.name, true)} {#if !showFormattedNames}({method.name}){/if}</option> -->
									<option value={method}>{formatIdentifier(method.name, true)}</option>
								{/each}
							</optgroup>
						{:else}
							<option value={undefined} selected disabled>[No interactions available.]</option>
						{/each}
					</select>
				</label>
			</div>
		{/if}
	</svelte:fragment>

	{#if contractMethod}
		<TransactionFlow
			accountConnection={selectedAccountConnection}
			{network}
			{networkProvider}

			{publicClient}

			{contractAddress}
			{contractAbi}
			contractMethodName={contractMethod.name}
			{contractMethodArgs}
			{payableAmount}

			onTransactionSuccess={async tx => {
				console.log(tx)
			}}
		>
			<svelte:fragment slot="idle" let:actions={{ next }} let:isValid>
				<header class="bar">
					<svelte:element this={`h${headingLevel + 1}`} class="row with-float">
						<!-- <span class="row with-float"> -->
							<NetworkIcon {network} />
							<!-- {network.name}
						</span> -->
						›
						<AddressWithLabel
							{network}
							label={formatIdentifier(contractName, true)}
							address={contractAddress}
							addressFormat="middle-truncated"
							linked
						/>
						›
						<abbr title={contractMethod.name}>{formatIdentifier(contractMethod.name, true)}</abbr>
					</svelte:element>

					{#if contractMethod.stateMutability === 'nonpayable' || contractMethod.stateMutability === 'payable'}
						<label class="row inline">
							<span>From</span>
							<ConnectedAccountSelect bind:selectedAccountConnection required />
						</label>
					{/if}
				</header>

				{#if contractMethod.inputs.length}
					<hr>

					<HeightContainer>
						{#each contractMethod.inputs as input, i (`${contractMethod.name || i}/${input.name || i}`)}
							{@const inputKey = `${contractMethod.name || i}/${input.name || i}`}
							{@const _ = inputTypes[inputKey] = input.type}

							{@const otherValuesOfType = Object.entries(inputValues).filter(([key, address]) => key !== inputKey && address && inputTypes[key] === input.type)}
							{@const suggestedValues = [
								selectedAccountConnection?.state?.account?.address && {
									value: selectedAccountConnection.state.account.address,
									label: `From Address (${selectedAccountConnection.selector.knownWallet && knownWalletsByType[selectedAccountConnection.selector.knownWallet]?.name})`,
								},
								...otherValuesOfType
									.map(([key, address]) => ({
										value: address,
										label: [
											contractName,
											...key.split('/')
										]
											.map(part =>
												!isNaN(part)
													? `Input ${Number(part) + 1}`
													: formatIdentifier(part, true)
											)
											.join(' › '),
									}))
							].filter(isTruthy)}

							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label class="input-param" transition:scale={{ duration: 300, start: 0.8, delay: i * 10 }} animate:flip>
								<span>
									{#if input.name}
										<abbr title={input.name}>{formatIdentifier(input.name, true)}</abbr>
									{:else}
										<span class="input-index">Input {i + 1}</span>
									{/if}
								</span>
								
								{#if input.type === 'address'}
									<AddressInput
										bind:address={inputValues[inputKey]}
										required
										{suggestedValues}
									/>
								{:else if input.type.startsWith('int')}
									{@const numBits = BigInt(input.type.match(/\d+/)?.[0])}

									<BigNumberInput
										required
										bind:value={inputValues[inputKey]}
										min={2n ** (numBits - 1n) * -1n}
										max={2n ** (numBits - 1n) - 1n}
										suggestedValues={[
											...suggestedValues ?? [],
											'min',
											'zero',
											'max',
										]}
									/>
								{:else if input.type.startsWith('uint')}
									{@const numBits = BigInt(input.type.match(/\d+/)?.[0])}

									<BigNumberInput
										required
										bind:value={inputValues[inputKey]}
										min={0n}
										max={2n ** numBits - 1n}
										suggestedValues={[
											...suggestedValues ?? [],
											'min',
											'max',
										]}
									/>
								{:else}
									<Input
										type="text"
										required
										bind:value={inputValues[inputKey]}
										{suggestedValues}
									/>
								{/if}

								<abbr class="card-annotation" title="{input.type} ({input.indexed ? `indexed ` : ''}{input.internalType})">{input.type}</abbr>
							</label>
						{/each}
					</HeightContainer>
				{/if}

				<hr>

				<footer class="bar">
					<label class="row">
						<!-- <span>Estimated Gas:</span>
						<output>

							gwei
						</output> -->

						{#if contractMethod.stateMutability === 'payable'}
							<label class="row">
								<span>Pay</span>
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
					<header class="row">
						<span class="row">
							<img src={walletIcon} width="25" />
							<Address {network} address={selectedAccountConnection?.state?.account?.address} format="middle-truncated" />
						</span>

						<span>
							will
							{#if payableAmount > 0}
								send
								<TokenBalance
									token={{
										chainId: network.chainId,
										...network.nativeCurrency
									}}
									balance={Number(payableAmount)}
								/>
								to
							{:else}
								call
							{/if}
						</span>

						<span>
							<AddressWithLabel
								{network}
								label={formatIdentifier(contractName, true)}
								address={contractAddress}
								addressFormat="middle-truncated"
								linked
							/>
							›
							<abbr title={contractMethod.name}>{formatIdentifier(contractMethod.name, true)}</abbr>
						</span>

						{#if contractMethod.inputs.length}
							with {contractMethod.inputs.length} parameters:
						{/if}
					</header>

					{#if contractMethod.inputs.length}
						<hr>

						<EthereumParameters
							{network}
							inputDecoded={{
								methodName: contractMethod.name,
								methodHash: contractMethod.signature,
								params: (
									contractMethod.inputs
										.map(input => {
											const inputKey = `${contractMethod.name || i}/${input.name || i}`
											const value = inputValues[inputKey]

											return {
												name: input.name,
												type: input.type,
												value,
											}
										})
								),
							}}
							{showFormattedNames}
						/>
					{/if}
				</article>

				<div class="row">
					<button type="button" class="medium cancel" on:click={actions.back}>‹ Back</button>

					<div class="row">
						{#if isReadable(contractMethod)}
							<button type="button" class="medium" on:click={actions.query}><img src={networkProviderConfigByProvider[$preferences.rpcNetwork]?.icon} width="16" /> Query Contract ›</button>
						{:else if isWritable(contractMethod)}
							<button type="button" class="tenderly medium" on:click={actions.simulate}><img src={TenderlyIcon} width="16" /> Simulate Transaction ›</button>

							<button type="button" class="medium" on:click={actions.sign}><img src={walletIcon} width="16" /> Sign & Broadcast Transaction ›</button>
						{:else}
						{/if}
					</div>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="query-result" let:result>
				<hr>

				{@const isSingleOutput = contractMethod.outputs?.length === 1}

				{#each contractMethod.outputs as output, i (`${contractMethod.name || i}/${output.name || i}`)}
					<!-- {@const outputKey = `${method.name || i}/${output.name || i}`} -->
					{@const outputValue = isSingleOutput ? result : result[i]}

					<label class="input-param" transition:scale={{ duration: 300, start: 0.8, delay: i * 25 }}>
						<span>
							{#if output.name}
								<abbr title={output.name}>{formatIdentifier(output.name, true)}</abbr>
							{:else if isSingleOutput && contractMethod.name}
								<abbr title={contractMethod.name}>{formatIdentifier(contractMethod.name, true)}</abbr>
							{:else}
								<span class="input-index">Output {i + 1}</span>
							{/if}
						</span>

						<output>{#if output.type === 'address'}<Address {network} address={outputValue} />{:else}{outputValue}{/if}</output>

						<abbr class="card-annotation" title="{output.type} ({output.indexed ? `indexed ` : ''}{output.internalType})">{output.type}</abbr>
					</label>
				{/each}
			</svelte:fragment>

			<svelte:fragment slot="simulating-actions" let:actions>
				<div class="row">
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
</Collapsible>
