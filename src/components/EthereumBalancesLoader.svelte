<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import type { Covalent } from '../api/covalent'
	import type { QuoteCurrency } from '../data/currencies'
	import { MoralisWeb3Api, chainCodeFromNetwork } from '../api/moralis/web3Api'
	import { TokenBalancesProvider, tokenBalancesProviderIcons } from '../data/tokenBalancesProvider'

	import { getTokenBalances } from '../api/zapper'
	import { getWalletTokenBalance } from '../api/quicknode'
	import { ERC20Service } from '@liquality/wallet-sdk'


	export let network: Ethereum.Network
	export let address: string
	export let tokenBalancesProvider: TokenBalancesProvider
	export let quoteCurrency: QuoteCurrency

	export let showIf: (<TData = unknown> (then: TData) => boolean | any) | undefined
	export let isOpen: boolean

	export let containerClass: string
	export let contentClass: string


	export let balances: {
		type?: Covalent.ERC20TokenOrNFTContractWithBalance['type'],
		token: Ethereum.ERC20Token,
		balance: Covalent.ERC20TokenOrNFTContractWithBalance['balance'],
		value: Covalent.ERC20TokenOrNFTContractWithBalance['quote'],
		rate: Covalent.ERC20TokenOrNFTContractWithBalance['quote_rate'],
	}[] = []


	import { useQuery } from '@sveltestack/svelte-query'

	import { getTokenAddressBalances } from '../api/covalent'


	import Loader from './Loader.svelte'
</script>


{#if tokenBalancesProvider === TokenBalancesProvider.Covalent}
	<Loader
		layout="collapsible"
		collapsibleType="label"
		loadingIcon={tokenBalancesProviderIcons[tokenBalancesProvider]}
		loadingIconName={tokenBalancesProvider}
		loadingMessage="Retrieving {network.name} balances from {tokenBalancesProvider}..."
		errorMessage="Error retrieving {network.name} balances from {tokenBalancesProvider}"
		fromUseQuery={
			useQuery({
				queryKey: ['Balances', {
					tokenBalancesProvider,
					address,
					chainID: network.chainId,
				}],
				queryFn: async () => (
					(await getTokenAddressBalances({
						address,
						nft: false,
						chainID: network.chainId,
						quoteCurrency
					}))
					.items
					.map(({
						type,
						balance, quote, quote_rate,
						contract_name, contract_address, contract_decimals, contract_ticker_symbol, logo_url, contract_logo_url,
					}) => ({
						type,
						token: {
							symbol: contract_ticker_symbol || contract_name,
							address: contract_address,
							name: contract_name,
							icon: contract_logo_url || logo_url,
							decimals: contract_decimals,
						},
						balance,
						value:
							quote >= 10 ** 24 ?
								quote / (10 ** contract_decimals) / (10 ** contract_decimals)
							: quote >= 10 ** 12 ?
								quote / (10 ** contract_decimals)
							:
								quote,
						rate:
							quote_rate >= 10 ** contract_decimals ?
								quote_rate / (10 ** contract_decimals)
							:
								quote_rate,
					}))
				)
			})
		}
		{showIf}
		{isOpen}
		{containerClass}
		{contentClass}
		let:status
		bind:result={balances}
		let:result={balances}
	>
		<slot name="header" slot="header" let:loadingMessage let:errorMessage {balances} {status} {loadingMessage} {errorMessage} />

		<slot {balances} />
	</Loader>

{:else if tokenBalancesProvider === TokenBalancesProvider.Liquality}
	<Loader
		loadingIcon={tokenBalancesProviderIcons[tokenBalancesProvider]}
		loadingIconName={tokenBalancesProvider}
		loadingMessage="Retrieving {network.name} balances from {tokenBalancesProvider}..."
		errorMessage="Error retrieving {network.name} balances from {tokenBalancesProvider}"
		fromUseQuery={
			useQuery({
				queryKey: ['Balances', {
					tokenBalancesProvider,
					address,
					chainID: network.chainId,
				}],
				queryFn: async () => (
					await ERC20Service.listAccountTokens(
						address,
						network.chainId
					)
				)
			})
		}
		then={assets => (
			assets.map(({
				formattedBalance,
				tokenContractAddress,
				tokenName,
				tokenSymbol,
				rawBalance,
			}) => ({
				token: {
					name: tokenName,
					symbol: tokenSymbol,
					address: tokenContractAddress,
					// icon: 
				},
				balance: formattedBalance, // parseInt(rawBalance),
			}))
		)}
		{showIf}
		{isOpen}
		{containerClass}
		{contentClass}
		let:status
		bind:result={balances}
		let:result={balances}
	>
		<slot name="header" slot="header" let:loadingMessage let:errorMessage {balances} {status} {loadingMessage} {errorMessage} />

		<slot {balances} />
	</Loader>

{:else if tokenBalancesProvider === TokenBalancesProvider.Moralis}
	<Loader
		layout="collapsible"
		collapsibleType="details"
		loadingIcon={tokenBalancesProviderIcons[tokenBalancesProvider]}
		loadingIconName={tokenBalancesProvider}
		loadingMessage="Retrieving {network.name} balances from {tokenBalancesProvider}..."
		errorMessage="Error retrieving {network.name} balances from {tokenBalancesProvider}"
		fromUseQuery={
			useQuery({
				queryKey: ['Balances', {
					tokenBalancesProvider,
					address,
					chainID: network.chainId,
				}],
				queryFn: async () => {
					try {
						const chain = chainCodeFromNetwork(network)
						const nativeBalance = await MoralisWeb3Api.address.getNativeBalance({
							chain,
							address
						})
						const tokenBalances = await MoralisWeb3Api.address.getTokenBalances({
							chain,
							address
							// to_block: 
						})

						const result = [
							{
								token: network.nativeCurrency,
								balance: nativeBalance.balance
							},
							...await Promise.all(tokenBalances.map(async ({
								balance,
								token_address,
								name = '',
								symbol = '',
								logo,
								thumbnail,
								decimals
							}) => ({
								token: {
									symbol,
									address: token_address,
									name,
									icon: logo || thumbnail,
									decimals
								},
								balance,
								value: (
									quoteCurrency === 'USD' ?
										await MoralisWeb3Api.erc20.getTokenPrice({
											chain,
											address: token_address
										})
											.then(({ usdPrice }) =>
												usdPrice >= 10 ** decimals ? usdPrice / (10 ** decimals) : usdPrice
											)
											.catch(e => undefined)
											// .catch(e => console.error(e?.error?.message))
									: quoteCurrency === network.nativeCurrency.symbol ?
										await MoralisWeb3Api.erc20.getTokenPrice({
											chain,
											address: token_address
										})
											.then(({ nativePrice: { value } }) =>
												value >= 10 ** decimals ? value / (10 ** decimals) : value
											)
											.catch(e => undefined)
											// .catch(e => console.error(e?.error?.message))
									:
										undefined
								) ?? 0
							})))
						]

						// console.log(result)
						return result
					}catch(e){
						throw new Error(e?.error?.message ?? e?.error ?? e)
					}
				}
			})
		}
		{showIf}
		{isOpen}
		{containerClass}
		{contentClass}
		let:status
		bind:result={balances}
		let:result={balances}
	>
		<slot name="header" slot="header" let:loadingMessage let:errorMessage {balances} {status} {loadingMessage} {errorMessage} />

		<slot {balances} />
	</Loader>

{:else if tokenBalancesProvider === TokenBalancesProvider.Zapper}
	<Loader
		loadingIcon={tokenBalancesProviderIcons[tokenBalancesProvider]}
		loadingIconName={tokenBalancesProvider}
		loadingMessage="Retrieving {network.name} balances from {tokenBalancesProvider}..."
		errorMessage="Error retrieving {network.name} balances from {tokenBalancesProvider}"
		fromUseQuery={
			useQuery({
				queryKey: ['Balances', {
					tokenBalancesProvider,
					address,
					chainID: network.chainId,
				}],
				queryFn: async () => (
					await getTokenBalances({
						network,
						address
					})
				)
			})
		}
		then={({products}) => products[0]?.assets.map(
			({
				address,
				decimals,
				symbol,
				balance,
				balanceUSD,
				balanceRaw,
				price,
				displayProps
			}) => ({
				token: {
					symbol,
					name: displayProps.label,
					address,
					icon: displayProps.images[0],
					decimals,
				},
				balance: balanceRaw,
				value: balanceUSD,
				rate: price
			})
		) ?? []}
		{showIf}
		{isOpen}
		{containerClass}
		{contentClass}
		let:status
		bind:result={balances}
		let:result={balances}
	>
		<slot name="header" slot="header" let:loadingMessage let:errorMessage {balances} {status} {loadingMessage} {errorMessage} />

		<slot {balances} />
	</Loader>

{:else if tokenBalancesProvider === TokenBalancesProvider.QuickNode}
	<Loader
		loadingIcon={tokenBalancesProviderIcons[tokenBalancesProvider]}
		loadingIconName={tokenBalancesProvider}
		loadingMessage="Retrieving {network.name} balances from {tokenBalancesProvider}..."
		errorMessage="Error retrieving {network.name} balances from {tokenBalancesProvider}"
		fromUseQuery={
			useQuery({
				queryKey: ['Balances', {
					tokenBalancesProvider,
					address,
					chainID: network.chainId,
				}],
				queryFn: async () => (
					await getWalletTokenBalance({
						network,
						address
					})
				)
			})
		}
		then={({owner, assets}) => (
			assets.map(({amount, logoURI, ...token}) => ({
				balance: amount,
				token: {icon: logoURI, ...token}
			}))
		)}
		{showIf}
		{isOpen}
		{containerClass}
		{contentClass}
		let:status
		bind:result={balances}
		let:result={balances}
	>
		<slot name="header" slot="header" let:loadingMessage let:errorMessage {balances} {status} {loadingMessage} {errorMessage} />

		<slot {balances} />
	</Loader>
{/if}
