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

	export let symbol: TickerSymbol | undefined
	export let contractAddress: Ethereum.ContractAddress | undefined // = `${symbol.toLowerCase()}.thetoken.eth` // = `${symbol.toLowerCase()}.tokens.ethers.eth`
	export let erc20Token: Ethereum.ERC20Token | undefined

	// (Computed)
	$: symbol = $$props.symbol || erc20Token?.symbol
	$: contractAddress = $$props.contractAddress || erc20Token?.address

	let publicClient: Ethereum.PublicClient | undefined
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider: networkProvider,
	})


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
				contractAddress,
			}],
			queryFn: async () => {
				if(contractAddress){
					const [
						name,
						symbol,
						decimals,
						balance,
					] = await Promise.all([
						readContract(publicClient, {
							address: contractAddress,
							abi: erc20Abi,
							functionName: 'name',
						}),
						readContract(publicClient, {
							address: contractAddress,
							abi: erc20Abi,
							functionName: 'symbol',
						}),
						readContract(publicClient, {
							address: contractAddress,
							abi: erc20Abi,
							functionName: 'decimals',
						}),
						readContract(publicClient, {
							address: contractAddress,
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

				else if(symbol === network.nativeCurrency.symbol)
					return {
						token: network.nativeCurrency,
						balance: await getBalance(publicClient, {
							address,
						})
					}
				
				else
					throw new Error(`Unknown token ${symbol}.`)
			},
		})}
		loadingMessage="Querying token balance..."
		let:result={tokenBalance}
	>
		<svelte:fragment slot="loadingIcon">
			<TokenIcon
				{network}
				symbol={symbol}
				address={contractAddress}
				{erc20Token}
			/>
		</svelte:fragment>

		{#if tokenBalance}
			<div class="card" in:scale>
				<TokenBalance
					{network} symbol={symbol ?? tokenBalance.token?.symbol} address={contractAddress} erc20Token={{...erc20Token, ...tokenBalance.token}}
					balance={Number(tokenBalance.balance) * 0.1 ** (tokenBalance.token.decimals ?? 18)}
				/>
			</div>
		{/if}
	</Loader>
</div>
