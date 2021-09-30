<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import * as ethers from 'ethers'

	export let token = 'ETH'
	export let tokenAddress: Ethereum.ContractAddress // = `${token.toLowerCase()}.thetoken.eth` // = `${token.toLowerCase()}.tokens.ethers.eth`

	export let provider: Ethereum.Provider
	export let address: string


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
	if(tokenAddress)
		erc20Contract = new ethers.Contract(tokenAddress, erc20ABI, provider)


	import Loader from './Loader.svelte'
	import TokenIcon from './TokenIcon.svelte'
	import TokenValue from './TokenValue.svelte'

	import { scale } from 'svelte/transition'
</script>

<div class="stack">
	{#if provider && address && (token === 'ETH' || erc20Contract)}
		<Loader
			fromPromise={() => token === 'ETH' ? provider.getBalance(address) : erc20Contract.balanceOf(address)}
			loadingMessage="Reading balance..."
			let:then={balance}
		>
			<TokenIcon slot="loadingIcon" symbol={token} {tokenAddress} />
			<div class="card" in:scale>
				<TokenValue {token} value={ethers?.utils.formatEther(balance)} />
			</div>
		</Loader>
	{/if}
</div>
