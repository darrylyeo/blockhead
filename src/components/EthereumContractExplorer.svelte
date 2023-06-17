<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import type { ContractMetadata } from '../api/sourcify'
	import type { NetworkProvider } from '../data/networkProviders/types'
	import { getEthersProvider } from '../data/networkProviders'
	import { preferences } from '../state/preferences'


	export let name: string
	export let network: Ethereum.Network
	export let address: Ethereum.Address
	export let providerName: NetworkProvider
	export let provider: Ethereum.Provider

	export let transactionProvider

	$: providerName = $$props.providerName ?? $preferences.rpcNetwork

	$: if(network && providerName && !provider)
		getEthersProvider({
			network,
			networkProvider: providerName,
		}).then(_ => provider = _)

	$: transactionProvider = $$props.transactionProvider || $preferences.transactionProvider


	let showContractSourcePath = 'EVM Bytecode'
	// TODO: refactor one-off whenLoaded side effect
	let hasLoadedMetadata = false
	$: address && (hasLoadedMetadata = false)


	const getContractName = (contractMetadata: ContractMetadata<string>) =>
		Object.values(contractMetadata.settings.compilationTarget)?.[0] as string


	import Address from './Address.svelte'
	import EthereumContractBytecodeLoader from './EthereumContractBytecodeLoader.svelte'
	import EthereumContractMetadataLoader from './EthereumContractMetadataLoader.svelte'
	import EthereumTransactionForm from './EthereumTransactionForm.svelte'
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
		{address}
		{providerName}
		{provider}
		{network}
		showIf={contractCode => !!contractCode}
		let:contractCode
	>
		<slot slot="header" name="header" />

		<section>
			<EthereumContractMetadataLoader
				{address}
				{network}
				whenLoaded={async ({ contractMetadata }) => {
					if(!contractMetadata || hasLoadedMetadata) return
					hasLoadedMetadata = true

					// Uncaught ReferenceError: contractMetadata is not defined
					await new Promise(r => setTimeout(r))

					// Auto-set to target source path

					const contractName = getContractName(contractMetadata)

					const targetSourcePath = Object.keys(contractMetadata.sources)
						.find(sourcePath => sourcePath.match(new RegExp(`(?:^|[/])${contractName}[.]`)))

					if(targetSourcePath)
						showContractSourcePath = targetSourcePath
				}}
				let:contractMetadata
				let:sourcifyUrl
			>
				<header class="bar" slot="header" let:contractMetadata>
					<slot name="title" contractName={name} {network} {address}>
						<h4><Address {network} {address} format="middle-truncated" let:formattedAddress>{name || formattedAddress}</Address></h4>
					</slot>

					<label>
						<span>View: </span>
						<select bind:value={showContractSourcePath}>
							<optgroup label="On-Chain">
								<option value="EVM Bytecode">EVM Bytecode</option>
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
					{#key showContractSourcePath}
						{#if contractMetadata && showContractSourcePath !== 'EVM Bytecode'}
							{@const source = contractMetadata?.sources[showContractSourcePath]}
							{@const sourceFile = showContractSourcePath.match(/[^/]+$/)?.[0]}
							{@const sourceFileName = sourceFile?.replace(/.sol$/, '')}
							{@const solidityDefinitionType =
								contractMetadata?.language === 'Solidity' &&
								source.content?.match(new RegExp(`((?:abstract )?library|contract|interface|function|constant|struct|enum|type|error)\\s+(${sourceFileName})`))?.[1]
							}

							<section class="card" in:fly={{ x: 10, duration: 200 }} out:fly={{ x: -10, duration: 200 }}>
								<header class="bar">
									<abbr
										class="row-inline"
										title={[
											showContractSourcePath,
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
									<code class="scrollable-list" style="height: 30em">{source.content}</code>

									<hr>

									<footer class="footer bar">
										<a href={sourcifyUrl} target="_blank">Sourcify</a>

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
										<code class="source-code scrollable-list" style="height: 30em">{sourceCode}</code>

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
							<code class="card scrollable-list" style="height: 7.5em" transition:fade>{contractCode}</code>
						{/if}
					{/key}
				</div>

				{#if contractMetadata}
					<hr>

					<EthereumTransactionForm
						{network}
						{provider}
						contractName={getContractName(contractMetadata)}
						contractAddress={address}
						abi={contractMetadata.output.abi}
					/>
				{/if}
			</EthereumContractMetadataLoader>
		</section>
	</EthereumContractBytecodeLoader>
	<!-- {/if}
{/await} -->
