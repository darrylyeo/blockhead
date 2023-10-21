<script lang="ts">
	import type { TickerSymbol } from '../data/currencies'
	import type { Ethereum } from '../data/networks/types'
	import type { NetworkProvider } from '../data/networkProviders/types'
	import { getViemPublicClient } from '../data/networkProviders'


	export let network: Ethereum.Network
	export let networkProvider: NetworkProvider
	export let address: Ethereum.Address

	export let symbol: TickerSymbol | undefined
	export let contractAddress: Ethereum.ContractAddress | undefined // = `${symbol.toLowerCase()}.thetoken.eth` // = `${symbol.toLowerCase()}.tokens.ethers.eth`
	export let erc20Token: Ethereum.ERC20Token | undefined

	$: symbol = $$props.symbol || erc20Token?.symbol
	$: contractAddress = $$props.address || erc20Token?.address


	let publicClient: Ethereum.PublicClient | undefined
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider: networkProvider,
	})


	import { formatEther, parseAbi } from 'viem'

	const erc20Abi = parseAbi([
		// Some details about the token
		"function name() view returns (string)",
		"function symbol() view returns (string)",

		// Get the account balance
		"function balanceOf(address) view returns (uint)",

		// Send some of your tokens to someone else
		"function transfer(address to, uint amount)",

		// An event triggered whenever anyone transfers to someone else
		"event Transfer(address indexed from, address indexed to, uint amount)"
	])


	import Loader from './Loader.svelte'
	import TokenIcon from './TokenIcon.svelte'
	import TokenBalance from './TokenBalance.svelte'


	import { scale } from 'svelte/transition'
</script>


<div class="stack">
	{#if publicClient && address && (symbol === 'ETH' || contractAddress)}
		<Loader
			fromPromise={async () => (
				symbol === network.nativeCurrency.symbol
					? await publicClient.getBalance({ address })
					: await publicClient.readContract({
						address: contractAddress,
						abi: erc20Abi,
						functionName: 'balanceOf',
						args: [address]
					})
			)}
			loadingMessage="Reading balance..."
			let:result={balance}
		>
			<TokenIcon slot="loadingIcon" {network} {symbol} address={contractAddress} {erc20Token} />

			<div class="card" in:scale|global>
				<TokenBalance
					{network} {symbol} address={contractAddress} {erc20Token}
					balance={Number(balance) * 0.1 ** (symbol === network.nativeCurrency.symbol ? network.nativeCurrency.decimals : erc20Token?.decimals ?? 18)}
				/>
			</div>
		</Loader>
	{/if}
</div>
