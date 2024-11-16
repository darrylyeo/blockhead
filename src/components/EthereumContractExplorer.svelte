<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import { getViemPublicClient } from '$/data/networkProviders'

	enum ContractCodeType {
		CreationBytecode = 'Creation Bytecode',
		RuntimeBytecode = 'Runtime Bytecode',
	}


	// Context
	import { preferences } from '$/state/preferences'


	// Inputs
	export let name: string
	export let network: Ethereum.Network
	export let contractAddress: Ethereum.ContractAddress
	export let networkProvider: NetworkProvider

	export let transactionProvider

	// (Computed)
	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork

	let publicClient: Ethereum.PublicClient | undefined
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider: networkProvider,
	})

	$: transactionProvider = $$props.transactionProvider || $preferences.transactionProvider

	// (View options)
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 3


	// Outputs
	export let runtimeBytecode: Ethereum.ContractBytecode | undefined
	export let contractState: {
		creationBytecode?: Ethereum.ContractBytecode,
		runtimeBytecode?: Ethereum.ContractBytecode,
		isSelfDestructed?: boolean,
	}
	export let contractMetadata: Ethereum.ContractMetadata<string>
	export let contractName: string | undefined
	// (Computed)
	$: contractName = contractMetadata?.name ||contractMetadata?.settings?.compilationTarget && Object.values(contractMetadata.settings.compilationTarget)?.[0]


	// Internal state
	let showContractCodeTypeOrSourcePath: ContractCodeType | keyof typeof contractMetadata.sources = ContractCodeType.RuntimeBytecode

	// (Computed)
	$: source = contractMetadata?.sources?.[showContractCodeTypeOrSourcePath]

	// Auto-set to target source path
	let hasLoadedMetadata = {} as Record<Ethereum.Address, boolean>
	$: if(contractAddress && contractMetadata){
		const sourcePaths = Object.keys(contractMetadata.sources)

		const targetSourcePath =
			sourcePaths.length === 1
				? sourcePaths[0]
				: sourcePaths.find(sourcePath => sourcePath.match(new RegExp(`(?:^|[/])${contractName}[.]`)))

		if(!hasLoadedMetadata[contractAddress])
			showContractCodeTypeOrSourcePath = targetSourcePath ?? ContractCodeType.RuntimeBytecode
		
		hasLoadedMetadata[contractAddress] = true
	}else{
		showContractCodeTypeOrSourcePath = ContractCodeType.RuntimeBytecode
	}


	// Components
	import Address from './Address.svelte'
	import Code from './Code.svelte'
	import BlockTransition from './BlockTransition.svelte'
	import EthereumContractBytecodeLoader from './EthereumContractBytecodeLoader.svelte'
	import EthereumContractMetadataLoader from './EthereumContractMetadataLoader.svelte'
	import EthereumTransactionForm from './EthereumTransactionForm.svelte'
	import EvmBytecode from './EvmBytecode.svelte'
	import IpfsLoader from './IpfsLoader.svelte'


	// Transitions
	import { fade, fly, scale } from 'svelte/transition'
</script>


<EthereumContractBytecodeLoader
	loaderViewOptions={{
		showIf: contractBytecode => !!contractBytecode,
	}}
	{contractAddress}
	{networkProvider}
	{network}
	bind:contractBytecode={runtimeBytecode}
	let:contractBytecode
>
	<svelte:fragment slot="header"
		let:isOpen
		let:toggle
	>
		<slot name="header"
			{isOpen}
			{toggle}
		/>
	</svelte:fragment>

	<section>
		<EthereumContractMetadataLoader
			{contractAddress}
			{network}
			bind:contractMetadata
			bind:contractState
			let:repository
			let:contractMetadata
			let:contractState
			let:swarmUri
			let:contractSourceProvider
		>
			<svelte:fragment slot="header"
				let:contractMetadata
				let:isOpen
				let:toggle
			>
				<header class="bar">
					<slot name="title" contractName={name} {network} {contractAddress}>
						<svelte:element this={`h${headingLevel}`}>
							<Address {network} address={contractAddress} format="middle-truncated" let:formattedAddress>{name || formattedAddress}</Address>
						</svelte:element>
					</slot>

					{#if isOpen}
						<div role="toolbar">
							<label
								class="align-end"
								transition:scale={{ duration: 300 }}
							>
								<span>View: </span>
								<select bind:value={showContractCodeTypeOrSourcePath}>
									<optgroup label="Onchain">
										{#if contractState?.creationBytecode}
											<option value={ContractCodeType.CreationBytecode}>Creation Bytecode</option>
										{/if}
										{#if runtimeBytecode || contractState?.runtimeBytecode}
											<option value={ContractCodeType.RuntimeBytecode}>Runtime Bytecode</option>
										{/if}
									</optgroup>

									{#if contractMetadata}
										<optgroup label="Source Code">
											<!-- Uncaught ReferenceError: contractMetadata is not defined -->
											{#each Object.entries(contractMetadata?.sources) as [sourcePath, source]}
												<option value={sourcePath}>{sourcePath}</option>
											{/each}
										</optgroup>
									{/if}
								</select>
							</label>
						</div>
					{/if}

					<button
						class="small"
						data-after={isOpen ? '▲' : '▼'}
						on:click={toggle}
					/>
				</header>
			</svelte:fragment>

			<BlockTransition
				key={showContractCodeTypeOrSourcePath}
				contentTransition={{
					in: [fly, { x: 10, duration: 200 }],
					out: [fly, { x: -10, duration: 200 }],
				}}
			>
				{#if source && !Object.values(ContractCodeType).includes(showContractCodeTypeOrSourcePath)}
					{@const sourceFile = showContractCodeTypeOrSourcePath.match(/[^/]+$/)?.[0] ?? ''}
					{@const [_, sourceFileName, sourceFileExtension] = sourceFile.match(/^(.+?)(?:[.](.+?))?$/) ?? []}
					{@const solidityDefinitionType =
						contractMetadata?.language === 'Solidity' &&
						source.content?.match(new RegExp(`((?:abstract )?library|contract|interface|function|constant|struct|enum|type|error)\\s+(${sourceFileName})`))?.[1]
					}

					<section class="card">
						<header class="bar">
							<abbr
								class="row inline"
								title={[
									showContractCodeTypeOrSourcePath,
									source.license && `License: ${source.license}`,
									source.keccak256 && `keccak256 hash: ${source.keccak256}`
								].filter(Boolean).join('\n\n')}
							>
								<svelte:element this={`h${headingLevel + 1}`}>{sourceFile}</svelte:element>
								{#if source.license && source.license !== 'None'}<small><span class="card-annotation">{source.license}</span></small>{/if}
							</abbr>

							<abbr class="card-annotation" title="{contractMetadata?.language} {contractMetadata?.compiler?.version}">
								{#if contractMetadata?.language}{contractMetadata?.language}{/if}
								<!-- {contractMetadata?.compiler?.version} -->
								{#if solidityDefinitionType}{solidityDefinitionType}{/if}
							</abbr>
						</header>

						<hr>

						{#if source.content}
							<Code
								code={source.content}
								extension={sourceFileExtension ?? 'sol'}
								class="scrollable-list"
								style="--resizeVertical-defaultHeight: 30em;"
							/>

							<hr>

							<footer class="footer bar">
								<a href={repository?.url || swarmUri} target="_blank">{repository?.name || contractSourceProvider}</a>

								<!-- {#if source.license}<span>License: {source.license}</span>{/if} -->
							</footer>
						{:else if source.urls?.length}
							{@const ipfsContentId = source.urls.find(url => url.startsWith('dweb:/'))?.match(/^dweb:\/ipfs\/(.+)$/)?.[1]}
							<!-- {@const ipfsUrl = source.urls.find(url => url.startsWith('dweb:/'))} -->

							<IpfsLoader
								{ipfsContentId}
								errorMessage="Couldn't fetch content on Sourcify."
								let:text={sourceCode}
								let:ipfsContentId
								let:resolvedIpfsUrl
								let:ipfsGateway
							>
								{#if sourceCode}
									<Code
										code={sourceCode}
										extension={sourceFileExtension}
										class="scrollable-list"
										style="--resizeVertical-defaultHeight: 30em;"
									/>
								{/if}

								<hr>

								<footer class="footer row">
									<span>
										<a href={repository?.url} target="_blank">{repository?.name ?? 'Sourcify'}</a>
									</span>

									<!-- {#if source.license}<span>License: {source.license}</span>{/if} -->
									
									<span><a href="https://{ipfsGateway.gatewayDomain}" title="IPFS Gateway: {ipfsGateway.name} ({ipfsGateway.gatewayDomain})" target="_blank">IPFS</a> › <a href={resolvedIpfsUrl} target="_blank">{ipfsContentId}</a></span>
								</footer>
							</IpfsLoader>
						{/if}
					</section>
				{:else}
					<section class="card">
						<EvmBytecode
							contractBytecode={
								showContractCodeTypeOrSourcePath === ContractCodeType.CreationBytecode
									? contractState.creationBytecode
									: runtimeBytecode || contractState?.runtimeBytecode
							}
							{networkProvider}
						>
							<svelte:fragment slot="title">
								<svelte:element this={`h${headingLevel + 1}`}>{showContractCodeTypeOrSourcePath}</svelte:element>
							</svelte:fragment>
						</EvmBytecode>
					</section>
				{/if}
			</BlockTransition>

			{#if contractMetadata}
				<hr>

				<EthereumTransactionForm
					{network}
					{networkProvider}
					{publicClient}
					{contractName}
					{contractAddress}
					contractAbi={contractMetadata.output.abi}
					{headingLevel}
				/>
			{/if}
		</EthereumContractMetadataLoader>
	</section>
</EthereumContractBytecodeLoader>


<style>
	* :global(code) {
		user-select: initial;
	}
</style>
