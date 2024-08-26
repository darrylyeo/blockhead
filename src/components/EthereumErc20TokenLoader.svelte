<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { QuoteCurrency } from '$/data/currencies'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import { Erc20TokenProvider, erc20TokenProviderIcons } from '$/data/erc20TokenProvider'
	import { preferences } from '$/state/preferences'


	// Inputs
	export let network: Ethereum.Network
	export let address: Ethereum.ContractAddress
	export let erc20TokenProvider: Erc20TokenProvider
	export let networkProvider: NetworkProvider
	export let quoteCurrency: QuoteCurrency

	// (Computed)
	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork
	$: erc20TokenProvider = $$props.erc20TokenProvider ?? $preferences.erc20TokenProvider
	$: quoteCurrency = $$props.quoteCurrency || $preferences.quoteCurrency


	// Functions
	import { createQuery } from '@tanstack/svelte-query'

	import { normalizeToken as normalizeErc20TokenAirstack } from '$/api/airstack/normalize'
	import { normalizeToken as normalizeErc20TokenBlockscout } from '$/api/blockscout/rest/normalize'
	import { normalizeTokenMetadata as normalizeErc20TokenChainbase } from '$/api/chainbase/normalize'
	import { normalizeToken as normalizeErc20TokenDecommas } from '$/api/decommas/normalize'
	import { MoralisWeb3Api, chainCodeFromNetwork } from '$/api/moralis/web3Api'
	import { normalizeErc20Token as normalizeErc20TokenMoralis } from '$/api/moralis/web3Api/normalize'


	// Outputs
	export let erc20Token: Ethereum.Erc20Token

	type SharedSlotProps = {
		erc20Token: typeof erc20Token,
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps & {
			isOpen: boolean,
			toggle: () => boolean,
		},
	}


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	{...$$restProps}
	loadingIcon={erc20TokenProviderIcons[erc20TokenProvider] || undefined}
	loadingIconName={erc20TokenProvider}
	loadingMessage="Loading token metadata from {erc20TokenProvider}..."
	errorMessage="Failed to load token metadata from {erc20TokenProvider}."
	fromQuery={{
		[Erc20TokenProvider.RpcProvider]: createQuery({
			queryKey: ['Erc20Token', {
				provider: erc20TokenProvider,
				chainId: network.chainId,
				address,
			}],
			queryFn: async ({
				queryKey: [, {
					provider,
					chainId,
					address,
				}],
			}) => {
				const { getViemPublicClient } = await import('$/data/networkProviders')
				const { parseAbi } = await import('viem')
				const { readContract } = await import('viem/actions')

				const publicClient = getViemPublicClient({
					network,
					networkProvider,
				})

				if (!publicClient)
					throw new Error('Public client not available')

				const [
					name,
					symbol,
					decimals,
					totalSupply,
				] = await Promise.all([
					readContract(publicClient, { address: address, abi: parseAbi(['function name() view returns (string)']), functionName: 'name' }),
					readContract(publicClient, { address: address, abi: parseAbi(['function symbol() view returns (string)']), functionName: 'symbol' }),
					readContract(publicClient, { address: address, abi: parseAbi(['function decimals() view returns (uint8)']), functionName: 'decimals' }),
					readContract(publicClient, { address: address, abi: parseAbi(['function totalSupply() view returns (uint256)']), functionName: 'totalSupply' }),
				])

				return {
					chainId: network.chainId,
					address,
					name,
					symbol,
					decimals,
					totalSupply,
				}
			},
			select: result => ({
				chainId: network.chainId,
				address,
				name: result.name,
				symbol: result.symbol,
				decimals: result.decimals,
				totalSupply: result.totalSupply,
			}),
		}),

		[Erc20TokenProvider.Airstack]: createQuery({
			queryKey: ['Erc20Token', {
				provider: erc20TokenProvider,
				chainId: network.chainId,
				address,
			}],
			queryFn: async ({
				queryKey: [, {
					provider,
					chainId,
					address,
				}],
			}) => {
				const { getToken } = await import('$/api/airstack/index')

				const result = await getToken({
					address,
					chainId,
				})

				const token = result
					?.Tokens
					.Token
					[0]
				
				if (!token)
					throw new Error(`Token at address ${address} was not found, or it hasn't been indexed yet.`)

				return token
			},
			select: result => (
				normalizeErc20TokenAirstack(
					result,
					network.chainId
				)
			),
		}),

		[Erc20TokenProvider.Blockscout]: createQuery({
			queryKey: ['Erc20Token', {
				provider: erc20TokenProvider,
				chainId: network.chainId,
				address,
			}],
			queryFn: async ({
				queryKey: [, {
					provider,
					chainId,
					address,
				}],
			}) => {
				const { getToken } = await import('$/api/blockscout/rest')
				const { getBlockscoutRestEndpoint } = await import('$/api/blockscout/index')

				return await getToken(
					address,
					{
						baseUrl: getBlockscoutRestEndpoint(chainId),
					}
				)
			},
			select: result => (console.log({result}),
				normalizeErc20TokenBlockscout(
					result,
					network.chainId
				)
			),
		}),

		[Erc20TokenProvider.Chainbase]: createQuery({
			queryKey: ['Erc20Token', {
				provider: erc20TokenProvider,
				chainId: network.chainId,
				address,
			}],
			queryFn: async ({
				queryKey: [, {
					provider,
					chainId,
					address,
				}],
			}) => {
				const { getTokenMetadata } = await import('$/api/chainbase')

				return getTokenMetadata({
					chainId,
					contractAddress: address,
				})
			},
			select: result => (
				normalizeErc20TokenChainbase(
					result.data,
					network.chainId
				)
			),
		}),

		[Erc20TokenProvider.Decommas]: createQuery({
			queryKey: ['Erc20Token', {
				provider: erc20TokenProvider,
				chainId: network.chainId,
				address,
			}],
			queryFn: async ({
				queryKey: [, {
					provider,
					chainId,
					address,
				}],
			}) => {
				const { decommas, chainNameByChainId } = await import('$/api/decommas')

				const chainName = chainNameByChainId[chainId]

				if(!chainName)
					throw new Error(`Decommas doesn't yet support chain ${chainId}.`)

				const tokenMetadata = await decommas.metadata.getToken({
					chainName,
					contractAddress: address,
				})

				if (!tokenMetadata)
					throw new Error(`Token at address ${address} was not found, or it hasn't been indexed yet.`)

				return tokenMetadata
			},
			select: (result) => (
				normalizeErc20TokenDecommas(
					result,
					network.chainId
				)
			),
		}),

		[Erc20TokenProvider.Moralis]: createQuery({
			queryKey: ['Erc20Token', {
				provider: erc20TokenProvider,
				chainId: network.chainId,
				address,
			}],
			queryFn: async ({
				queryKey: [, {
					provider,
					chainId,
					address,
				}],
			}) => {
				const chain = chainCodeFromNetwork(network)

				const result = await MoralisWeb3Api.erc20.getTokenMetadata({
					chain,
					addresses: [address],
				})

				return result[0]
			},
			select: result => (
				normalizeErc20TokenMoralis(
					result,
					network.chainId
				)
			),
		}),
	}[erc20TokenProvider]}
	let:result={erc20Token}
>
	<slot name="header"
		{erc20Token}
	/>

	<slot
		{erc20Token}
	/>
</Loader>
