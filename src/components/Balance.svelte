<script lang="ts">
	import type { TickerSymbol } from 'src/data/currency/currency'
	import type { Ethereum } from '../data/ethereum/types'
	import * as ethers from 'ethers'


	export let network: Ethereum.Network
	export let provider: Ethereum.Provider
	export let address: Ethereum.Address

	export let symbol: TickerSymbol | undefined
	export let contractAddress: Ethereum.ContractAddress | undefined // = `${symbol.toLowerCase()}.thetoken.eth` // = `${symbol.toLowerCase()}.tokens.ethers.eth`
	export let erc20Token: Ethereum.ERC20Token | undefined

	$: symbol ||= erc20Token?.symbol
	$: contractAddress ||= erc20Token?.address


	const erc20ABI = [
		// Some details about the token
		"function name() view returns (string)",
		"function symbol() view returns (string)",

		// Get the account balance
		"function balanceOf(address) view returns (uint)",

		// Send some of your tokens to someone else
		"function transfer(address to, uint amount)",

		// An event triggered whenever anyone transfers to someone else
		"event Transfer(address indexed from, address indexed to, uint amount)"
	]
	let erc20Contract
	if(contractAddress)
		erc20Contract = new ethers.Contract(contractAddress, erc20ABI, provider)


	import Loader from './Loader.svelte'
	import TokenIcon from './TokenIcon.svelte'
	import TokenValue from './TokenValue.svelte'

	import { scale } from 'svelte/transition'
</script>


<div class="stack">
	{#if provider && address && (symbol === 'ETH' || erc20Contract)}
		<Loader
			fromPromise={() => symbol === 'ETH' ? provider.getBalance(address) : erc20Contract.balanceOf(address)}
			loadingMessage="Reading balance..."
			let:then={balance}
		>
			<TokenIcon slot="loadingIcon" {symbol} address={contractAddress} {erc20Token} />
			<div class="card" in:scale>
				<TokenValue {symbol} value={ethers?.utils.formatEther(balance)} />
			</div>
		</Loader>
	{/if}
</div>
