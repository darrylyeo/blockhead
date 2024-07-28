<script lang="ts">
	// Types
	import type { TickerSymbol } from '$/data/currencies'
	import type { Ethereum } from '$/data/networks/types'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import { getViemPublicClient } from '$/data/networkProviders'


	// Inputs
	export let network: Ethereum.Network
	export let networkProvider: NetworkProvider
	export let address: Ethereum.Address

	export let token: {
		name?: string,
		chainId?: Ethereum.ChainID,
		symbol?: string,
		address?: Ethereum.ContractAddress,
		decimals?: number,
		icon?: string,
	}

	let publicClient: Ethereum.PublicClient | undefined
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider: networkProvider,
	})

	// (Computed)
	// $: if(!token.address && token.symbol)
	// 	token.address = `${token.symbol.toLowerCase()}.thetoken.eth`
	// 	token.address = `${token.symbol.toLowerCase()}.tokens.ethers.eth`


	// Functions
	import { erc20Abi } from 'viem'
	import { getBalance, readContract } from 'viem/actions'
	import { createQuery } from '@tanstack/svelte-query'


	// Components
	import Loader from './Loader.svelte'
	import TokenIcon from './TokenIcon.svelte'
	import TokenBalance from './TokenBalance.svelte'


	// Transitions
	import { scale } from 'svelte/transition'
</script>


<div class="stack">
	<Loader
		fromQuery={createQuery({
			queryKey: ['TokenBalance', {
				address,
				chainId: network.chainId,
				contractAddress: token.address,
			}],
			queryFn: async () => {
				if(token.address){
					const [
						name,
						symbol,
						decimals,
						balance,
					] = await Promise.all([
						readContract(publicClient, {
							address: token.address,
							abi: erc20Abi,
							functionName: 'name',
						}),
						readContract(publicClient, {
							address: token.address,
							abi: erc20Abi,
							functionName: 'symbol',
						}),
						readContract(publicClient, {
							address: token.address,
							abi: erc20Abi,
							functionName: 'decimals',
						}),
						readContract(publicClient, {
							address: token.address,
							abi: erc20Abi,
							functionName: 'balanceOf',
							args: [address]
						}),
					])

					return {
						token: {
							name,
							symbol,
							decimals,
						},
						balance: await getBalance(publicClient, {
							address,
						})
					}
				}

				else if(token.symbol === network.nativeCurrency.symbol)
					return {
						token: network.nativeCurrency,
						balance: await getBalance(publicClient, {
							address,
						})
					}
				
				else
					throw new Error(`Unknown token ${token.symbol}.`)
			},
		})}
		loadingMessage="Querying token balance..."
		let:result={tokenBalance}
	>
		<svelte:fragment slot="loadingIcon">
			<TokenIcon
				{token}
			/>
		</svelte:fragment>

		{#if tokenBalance}
			<div class="card" in:scale>
				<TokenBalance
					token={{
						chainId: network.chainId,
						symbol: tokenBalance.token.symbol,
						address: token.address,
					}}
					balance={Number(tokenBalance.balance) * 0.1 ** (tokenBalance.token.decimals ?? 18)}
				/>
			</div>
		{/if}
	</Loader>
</div>
