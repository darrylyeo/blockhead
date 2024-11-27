<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { NetworkAccountAddress } from '$/data/address'
	import { NetworkProvider } from '$/data/networkProviders/types'
	import { getViemPublicClient } from '$/data/networkProviders'
	import { ethereumMainnet } from '$/data/networks'

	type ContentHash = $$Generic<string>
	type TextRecordKey = $$Generic<string>
	type CoinType = $$Generic<number>


	// Context
	import { preferences } from '$/state/preferences'


	// Inputs
	export let network = ethereumMainnet
	export let networkProvider: NetworkProvider
	export let ensName: string

	export let resolveContentHash = false
	export let resolveTextRecordKeys: TextRecordKey[] | undefined
	export let resolveCoinTypes: CoinType[] | undefined

	// (View options)
	export let layout: 'default' | 'passive' = 'default'
	export let isOpen = true


	// (Computed)
	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork

	let publicClient: Ethereum.PublicClient | undefined
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider: networkProvider,
	})


	// Internal state
	import { normalize, namehash } from 'viem/ens'


	// (Computed)
	$: normalizedEnsName = (() => { try { return normalize(ensName) } catch(e) { return ensName } })()
	$: node = namehash(normalizedEnsName)

	$: viaRPC = networkProvider === NetworkProvider.Default ? '' : ` via ${networkProvider}`


	// Outputs
	export let contentHash: ContentHash | undefined
	export let textRecords: Map<TextRecordKey, NetworkAccountAddress> | undefined
	export let cryptoAddressRecords: Map<CoinType, string> | undefined

	type $$Slots = {
		default: {
			contentHash: typeof contentHash,
			textRecords: typeof textRecords,
			cryptoAddressRecords: typeof cryptoAddressRecords,
			networkProvider: NetworkProvider,
		},
		header: {
			networkProvider: NetworkProvider,
		}
	}


	// Functions
	import { parseAbi } from 'abitype'
	import { parallelLoaderStore } from '$/utils/parallelLoaderStore'
	import { createQuery } from '@tanstack/svelte-query'


	// Components
	import Loader from './Loader.svelte'
	import { ENSIcon } from '$/assets/icons'
</script>


{#if publicClient}
	<Loader
		viewOptions={{
			layout,
			isOpen,
			showIf: resolverContractAddress => resolverContractAddress,
		}}
		loadingIconName={'ENS'}
		loadingIcon={ENSIcon}
		loadingMessage={`Getting ENS Resolver${viaRPC}...`}
		fromQuery={createQuery({
			queryKey: ['EnsResolver', {
				chainId: network.chainId,
				networkProvider,
				ensName,
			}],
			queryFn: async () => {
				const { getEnsResolver } = await import('viem/ens')

				return await getEnsResolver(publicClient, {
					name: normalizedEnsName,
				})
			},
		})}
		let:result={resolverContractAddress}
	>
		<svelte:fragment slot="header">
			<slot name="header" {networkProvider} />
		</svelte:fragment>

		{#if resolveContentHash}
			<Loader
				viewOptions={{
					layout,
					showIf: supportsEnsip7 => supportsEnsip7,
				}}
				loadingIconName={'ENS'}
				loadingIcon={ENSIcon}
				loadingMessage={`Checking resolver for ENSIP-7 support${viaRPC}...`}
				fromQuery={(
					createQuery({
						queryKey: ['EnsResolverEnsip7Support', {
							chainId: network.chainId,
							networkProvider,
							resolverContractAddress,
						}],
						queryFn: async () => {
							const { readContract } = await import('viem/actions')

							return await readContract(publicClient, {
								address: resolverContractAddress,
								functionName: 'supportsInterface',
								abi: parseAbi([`function supportsInterface(bytes4 interfaceID) public pure returns (bool)`]),
								args: [
									'0xbc1c58d1',
								],
							})
						},
					})
				)}
				errorMessage={`Failed to check resolver for ENSIP-7 support${viaRPC}.`}
				let:result={supportsEnsip7}
			>
				<Loader
					viewOptions={{
						layout,
						showIf: () => false,
					}}
					loadingIconName={'ENS'}
					loadingIcon={ENSIcon}
					loadingMessage={`Fetching content hash${viaRPC}...`}
					fromQuery={(
						createQuery({
							queryKey: ['EnsContentHash', {
								chainId: network.chainId,
								networkProvider,
								resolverContractAddress,
								ensName,
								supportsEnsip7,
							}],
							queryFn: async () => {
								const { readContract } = await import('viem/actions')

								if(!supportsEnsip7)
									throw `ENSIP-7 Content Hashes are not supported by resolver ${resolverContractAddress}.`

								const contentHash = await readContract(publicClient, {
									address: resolverContractAddress,
									functionName: 'contenthash',
									abi: parseAbi([`function contenthash(bytes32 node) public view returns (bytes memory)`]),
									args: [
										node,
									],
								})

								return contentHash === '0x0000000000000000000000000000000000000000'
									? null
									: contentHash
							}
						})
					)}
					errorMessage={`Failed to fetch content hash${viaRPC}.`}
					bind:result={contentHash}
				/>
			</Loader>
		{/if}

		{#if resolveTextRecordKeys?.length}
			<Loader
				viewOptions={{
					layout,
					showIf: () => false,
				}}
				loadingIconName={'ENS'}
				loadingIcon={ENSIcon}
				loadingMessage={`Resolving ENS records${viaRPC}...`}
				fromStore={(() => (
					parallelLoaderStore(
						resolveTextRecordKeys,
						async textRecordKey => {
							const { getEnsText } = await import('viem/actions')

							return await getEnsText(publicClient, {
								name: normalizedEnsName,
								key: textRecordKey,
							})
						})
					)
				)}
				bind:result={textRecords}
			/>
		{/if}

		{#if resolveCoinTypes?.length}
			<Loader
				viewOptions={{
					layout,
					showIf: supportsEnsip9 => supportsEnsip9,
				}}
				loadingIconName={'ENS'}
				loadingIcon={ENSIcon}
				loadingMessage={`Checking resolver for ENSIP-9 support${viaRPC}...`}
				fromQuery={(
					createQuery({
						queryKey: ['EnsResolverEnsip9Support', {
							chainId: network.chainId,
							networkProvider,
							resolverContractAddress,
						}],
						queryFn: async () => {
							const { readContract } = await import('viem/actions')

							return await readContract(publicClient, {
								address: resolverContractAddress,
								functionName: 'supportsInterface',
								abi: parseAbi([`function supportsInterface(bytes4 interfaceID) public pure returns (bool)`]),
								args: [
									'0xf1cb7e06',
								],
							})
						},
					})
				)}
				errorMessage={`Failed to check resolver for ENSIP-9 support${viaRPC}.`}
				let:result={supportsEnsip9}
			>
				<Loader
					viewOptions={{
						layout,
						showIf: () => false,
					}}
					loadingIconName={'ENS'}
					loadingIcon={ENSIcon}
					loadingMessage={`Resolving crypto addresses${viaRPC}...`}
					fromStore={(() => (
						parallelLoaderStore(
							resolveCoinTypes,
							async coinType => {
								const { readContract } = await import('viem/actions')

								const address = await readContract(publicClient, {
									address: resolverContractAddress,
									functionName: 'addr',
									abi: parseAbi([`function addr(bytes32 node, uint coinType) public view returns(bytes memory)`]),
									args: [
										node,
										BigInt(coinType),
									],
								})

								return address === '0x'
									? undefined
									: address
							}
						)
					))}
					bind:result={cryptoAddressRecords}
				/>
			</Loader>
		{/if}

		<slot
			{contentHash} {textRecords} {cryptoAddressRecords}
			{networkProvider}
		/>
	</Loader>
{/if}
