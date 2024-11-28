<script lang="ts">
	// Types/constants
	import type { NetworkAccountAddress } from '$/data/address'
	import { NetworkProvider } from '$/data/networkProviders/types'
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
	import { createQuery, createQueries } from '@tanstack/svelte-query'


	// Components
	import Loader from './Loader.svelte'
	import { ENSIcon } from '$/assets/icons'
</script>


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
			networkProvider,
			chainId: network.chainId,
			ensName: normalizedEnsName,
		}],
		queryFn: async ({
			queryKey: [_, {
				networkProvider,
				chainId,
				ensName,
			}],
		}) => {
			const { getEnsResolver } = await import('viem/ens')
			const { getViemPublicClient } = await import('$/data/networkProviders')

			const publicClient = getViemPublicClient({
				network,
				networkProvider,
			})

			return await getEnsResolver(publicClient, {
				name: ensName,
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
						networkProvider,
						chainId: network.chainId,
						resolverContractAddress,
					}],
					queryFn: async ({
						queryKey: [_, {
							chainId,
							resolverContractAddress,
						}],
					}) => {
						const { getViemPublicClient } = await import('$/data/networkProviders')
						const { readContract } = await import('viem/actions')

						const publicClient = getViemPublicClient({
							network,
							networkProvider,
						})

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
							ensName: normalizedEnsName,
							supportsEnsip7,
						}],
						queryFn: async ({
							queryKey: [_, {
								chainId,
								networkProvider,
								resolverContractAddress,
								ensName,
								supportsEnsip7,
							}],
						}) => {
							const { getViemPublicClient } = await import('$/data/networkProviders')
							const { readContract } = await import('viem/actions')

							const publicClient = getViemPublicClient({
								network,
								networkProvider,
							})

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
			fromQuery={createQueries({
				queries: (
					resolveTextRecordKeys
						.map(textRecordKey => ({
							queryKey: ['EnsTextRecord', {
								chainId: network.chainId,
								networkProvider,
								ensName: normalizedEnsName,
								textRecordKey
							}],
							queryFn: async ({
								queryKey: [_, {
									chainId,
									networkProvider,
									ensName,
									textRecordKey,
								}],
							}) => {
								const { getViemPublicClient } = await import('$/data/networkProviders')
								const { getEnsText } = await import('viem/actions')

								const publicClient = getViemPublicClient({
									network,
									networkProvider
								})

								return await getEnsText(publicClient, {
									name: ensName,
									key: textRecordKey
								})
							}
						}))
				),
				combine: (textRecordQueries) => ({
					...textRecordQueries[0],
					isLoading: textRecordQueries.some(query => query.isLoading),
					data: (
						new Map(
							textRecordQueries
								.map((textRecordQuery, i) => [
									resolveTextRecordKeys[i],
									textRecordQuery.data
								])
						)
					),
				}),
			})}
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
						const { getViemPublicClient } = await import('$/data/networkProviders')
						const { readContract } = await import('viem/actions')

						const publicClient = getViemPublicClient({
							network,
							networkProvider,
						})

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
				fromQuery={createQueries({
					queries: (
						resolveCoinTypes
							.map(coinType => ({
								queryKey: ['EnsCoinType', {
									networkProvider,
									chainId: network.chainId,
									resolverContractAddress,
									node,
									coinType,
								}],
								queryFn: async ({
									queryKey: [_, {
										networkProvider,
										chainId,
										resolverContractAddress,
										node,
										coinType,
									}],
								}) => {
									const { getViemPublicClient } = await import('$/data/networkProviders')
									const { readContract } = await import('viem/actions')

									const publicClient = getViemPublicClient({
										network,
										networkProvider
									})

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
							}))
					),
				})}
				bind:result={cryptoAddressRecords}
			/>
		</Loader>
	{/if}

	<slot
		{contentHash} {textRecords} {cryptoAddressRecords}
		{networkProvider}
	/>
</Loader>
