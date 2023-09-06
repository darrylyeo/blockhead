<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import type { NetworkProvider } from '../data/networkProviders/types'
	import { getViemPublicClient } from '../data/networkProviders'
	import { preferences } from '../state/preferences'


	export let name: string
	export let network: Ethereum.Network
	export let contractAddress: Ethereum.ContractAddress
	export let networkProvider: NetworkProvider

	export let transactionProvider

	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork

	let publicClient: Ethereum.PublicClient | undefined
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider: networkProvider,
	})

	$: transactionProvider = $$props.transactionProvider || $preferences.transactionProvider


	enum ContractCodeType {
		// CreationBytecode = 'Creation Bytecode',
		RuntimeBytecode = 'Runtime Bytecode',
	}
	let showContractCodeTypeOrSourcePath: ContractCodeType | keyof typeof contractMetadata.sources = ContractCodeType.RuntimeBytecode
	// TODO: refactor one-off whenLoaded side effect
	let hasLoadedMetadata = false
	$: contractAddress && (hasLoadedMetadata = false)


	// Outputs
	export let contractBytecode: Ethereum.ContractBytecode
	export let contractMetadata: Ethereum.ContractMetadata<string>
	export let contractName: string | undefined
	// (Computed)
	$: contractName = contractMetadata && getContractName(contractMetadata)


	const getContractName = (contractMetadata: Ethereum.ContractMetadata<string>) =>
		Object.values(contractMetadata.settings.compilationTarget)?.[0] as string


	import Address from './Address.svelte'
	import EthereumContractBytecodeLoader from './EthereumContractBytecodeLoader.svelte'
	import EthereumContractMetadataLoader from './EthereumContractMetadataLoader.svelte'
	import EthereumTransactionForm from './EthereumTransactionForm.svelte'
	import EvmBytecode from './EvmBytecode.svelte'
	import IpfsLoader from './IpfsLoader.svelte'


	import { fade, fly } from 'svelte/transition'
</script>


<style>
	.bar {
		--padding-inner: 1em;
	}
	label {
		font-size: 0.9em;
	}

	h3 {
		line-height: 1.6;
	}

	.source-code {
		display: block;
	}
</style>


<!-- {#await provider.getCode(address) then contractCode}
	{#if contractCode !== '0x'} -->
	<EthereumContractBytecodeLoader
		{contractAddress}
		{networkProvider}
		{network}
		showIf={contractBytecode => !!contractBytecode}
		bind:contractBytecode
		let:contractBytecode
	>
		<slot slot="header" name="header" />

		<section>
			<EthereumContractMetadataLoader
				{contractAddress}
				{network}
				bind:contractMetadata
				whenLoaded={async ({ contractMetadata }) => {
					if(!contractMetadata || hasLoadedMetadata) return
					hasLoadedMetadata = true

					// Uncaught ReferenceError: contractMetadata is not defined
					await new Promise(r => setTimeout(r))

					// Auto-set to target source path

					const contractName = getContractName(contractMetadata)

					const sourcePaths = Object.keys(contractMetadata.sources)

					const targetSourcePath = 
						sourcePaths.length === 1
							? sourcePaths[0]
							: sourcePaths.find(sourcePath => sourcePath.match(new RegExp(`(?:^|[/])${contractName}[.]`)))

					if(targetSourcePath)
						showContractCodeTypeOrSourcePath = targetSourcePath
				}}
				let:contractMetadata
				let:sourcifyUrl
				let:contractSourceProvider
			>
				<header class="bar" slot="header" let:contractMetadata>
					<slot name="title" contractName={name} {network} {contractAddress}>
						<h4><Address {network} address={contractAddress} format="middle-truncated" let:formattedAddress>{name || formattedAddress}</Address></h4>
					</slot>

					<label>
						<span>View: </span>
						<select bind:value={showContractCodeTypeOrSourcePath}>
							<optgroup label="On-Chain">
								{#each Object.values(ContractCodeType) as contractCodeType}
									<option value={contractCodeType}>{contractCodeType}</option>
								{/each}
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
				</header>

				<div class="stack">
					{#key showContractCodeTypeOrSourcePath}
						{#if contractMetadata && !Object.values(ContractCodeType).includes(showContractCodeTypeOrSourcePath)}
							{@const source = contractMetadata?.sources[showContractCodeTypeOrSourcePath]}
							{@const sourceFile = showContractCodeTypeOrSourcePath.match(/[^/]+$/)?.[0]}
							{@const sourceFileName = sourceFile?.replace(/.sol$/, '')}
							{@const solidityDefinitionType =
								contractMetadata?.language === 'Solidity' &&
								source.content?.match(new RegExp(`((?:abstract )?library|contract|interface|function|constant|struct|enum|type|error)\\s+(${sourceFileName})`))?.[1]
							}

							<section class="card" in:fly|global={{ x: 10, duration: 200 }} out:fly|global={{ x: -10, duration: 200 }}>
								<header class="bar">
									<abbr
										class="row-inline"
										title={[
											showContractCodeTypeOrSourcePath,
											source.license && `License: ${source.license}`,
											source.keccak256 && `keccak256 hash: ${source.keccak256}`
										].filter(Boolean).join('\n\n')}
									>
										<h4>{sourceFile}</h4>
										{#if source.license}<small><span class="card-annotation">{source.license}</span></small>{/if}
									</abbr>

									<abbr class="card-annotation" title="{contractMetadata?.language} {contractMetadata?.compiler?.version}">
										{contractMetadata?.language}
										<!-- {contractMetadata?.compiler?.version} -->
										{#if solidityDefinitionType}{solidityDefinitionType}{/if}
									</abbr>
								</header>

								<hr>

								{#if source.content}
									<code class="scrollable-list" style="--resizeVertical-defaultHeight: 30em;">{source.content}</code>

									<hr>

									<footer class="footer bar">
										<a href={sourcifyUrl} target="_blank">{contractSourceProvider}</a>

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
										let:ipfsGatewayProvider
									>
										<code class="source-code scrollable-list" style="--resizeVertical-defaultHeight: 30em;">{sourceCode}</code>

										<hr>

										<footer class="footer row spaced">
											<span>
												<a href={sourcifyUrl} target="_blank">Sourcify</a>
											</span>

											<!-- {#if source.license}<span>License: {source.license}</span>{/if} -->
											
											<span><a href="https://{ipfsGatewayProvider.gatewayDomain}" title="IPFS Gateway: {ipfsGatewayProvider.name} ({ipfsGatewayProvider.gatewayDomain})" target="_blank">IPFS</a> › <a href={resolvedIpfsUrl} target="_blank">{ipfsContentId}</a></span>
										</footer>
									</IpfsLoader>
								{/if}
							</section>
						{:else}
							<section class="card" in:fly|global={{ x: 10, duration: 200 }} out:fly|global={{ x: -10, duration: 200 }}>
								<EvmBytecode
									{contractBytecode}
									{networkProvider}
								>
									<h4 slot="title">{showContractCodeTypeOrSourcePath}</h4>
								</EvmBytecode>
							</section>
						{/if}
					{/key}
				</div>

				{#if contractMetadata}
					<hr>

					<EthereumTransactionForm
						{network}
						{networkProvider}
						{publicClient}
						{contractName}
						{contractAddress}
						contractAbi={contractMetadata.output.abi}
					/>
				{/if}
			</EthereumContractMetadataLoader>
		</section>
	</EthereumContractBytecodeLoader>
	<!-- {/if}
{/await} -->
