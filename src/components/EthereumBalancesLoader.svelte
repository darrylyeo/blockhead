<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/networks/types'
	import type { QuoteCurrency } from '../data/currencies'
	import { networkProviderConfigByProvider } from '../data/networkProviders'
	import type { NetworkProvider } from '../data/networkProviders/types'
	import { TokenBalancesProvider, tokenBalancesProviderIcons } from '../data/tokenBalancesProvider'

	import type { Covalent } from '../api/covalent'
	import { chainCodeFromNetwork } from '../api/moralis/web3Api'


	// Context
	import { preferences } from '../state/preferences'


	// External state
	export let network: Ethereum.Network
	export let address: Ethereum.Address
	export let tokenBalancesProvider: TokenBalancesProvider
	export let quoteCurrency: QuoteCurrency

	// (Computed)
	export let networkProvider: NetworkProvider

	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork


	// View options
	export let showIf: (<TData = unknown> (then: TData) => boolean | any) | undefined
	export let isOpen: boolean

	export let containerClass: string
	export let contentClass: string


	// Shared state
	export let balances: {
		type?: Covalent.ERC20TokenOrNFTContractWithBalance['type'],
		token: Ethereum.ERC20Token,
		balance: Covalent.ERC20TokenOrNFTContractWithBalance['balance'],
		value: Covalent.ERC20TokenOrNFTContractWithBalance['quote'],
		rate: Covalent.ERC20TokenOrNFTContractWithBalance['quote_rate'],
	}[] = []

	$: loadingMessage = `Retrieving ${network.name} balances from ${tokenBalancesProvider === TokenBalancesProvider.RpcProvider ? networkProvider : tokenBalancesProvider}...`
	$: errorMessage = `Couldn't retrieve ${network.name} balances from ${tokenBalancesProvider}.`


	// Actions
	import { createQuery } from '@tanstack/svelte-query'
	import { queryStore, gql } from '@urql/svelte'

	import { getEthersProvider } from '../data/networkProviders'

	import { airstackNetworkNames, getClient } from '../api/airstack'
	import { getTokenAddressBalances } from '../api/covalent'
	import { MoralisWeb3Api } from '../api/moralis/web3Api'
	import { getWalletTokenBalance } from '../api/quicknode'
	import { getTokenBalances } from '../api/zapper'


	// Components
	import Loader from './Loader.svelte'
</script>


{#if tokenBalancesProvider === TokenBalancesProvider.RpcProvider}
	<Loader
		layout="collapsible"
		collapsibleType="label"
		loadingIcon={networkProviderConfigByProvider[networkProvider].icon}
		loadingIconName={tokenBalancesProvider}
		{loadingMessage}
		{errorMessage}
		fromQuery={address && network && networkProvider && (
			createQuery({
				queryKey: ['Balances', {
					tokenBalancesProvider,
					networkProvider,
					address,
					chainID: network.chainId,
				}],
				queryFn: async () => {
					const provider = await getEthersProvider({
						network,
						networkProvider,
					})

					if(!provider) throw new Error(`No provider found.`)

					const balance = await provider.getBalance(address)

					return [{
						token: network.nativeCurrency,
						balance: String(balance),
					}]
				}
			})
		)}
		{showIf}
		{isOpen}
		{containerClass}
		{contentClass}
		bind:result={balances}
		let:result={balances}
		debug
	>
		<svelte:fragment slot="header"
			let:result={balances}
			let:status
			let:loadingMessage
			let:errorMessage
		>
			<slot name="header" {balances} {status} {loadingMessage} {errorMessage} />
		</svelte:fragment>

		<slot {balances} />
	</Loader>

	
{:else if tokenBalancesProvider === TokenBalancesProvider.Airstack}
	<Loader
		layout="collapsible"
		collapsibleType="label"
		loadingIcon={tokenBalancesProviderIcons[tokenBalancesProvider]}
		loadingIconName={tokenBalancesProvider}
		{loadingMessage}
		{errorMessage}
		fromStore={address && network && (() => {
			if(!(network.chainId in airstackNetworkNames))
				throw new Error(`Airstack doesn't yet support ${network.name}.`)

			return queryStore({
				client: getClient(),
				query: gql`
					query TokenBalances(
						$address: Identity!, 
						$blockchain: TokenBlockchain!, 
						$limit: Int!, 
						$cursor: String!
					) {
						TokenBalances(
							input: {
								filter: {
									owner: {_in: [$address]},
									tokenType: { _in: [ERC20] }
								},
								blockchain: $blockchain,
								limit: $limit,
								cursor: $cursor
							}
						) {
							TokenBalance {
								tokenAddress
								amount
								tokenType
								blockchain
								chainId
								formattedAmount
								id
								lastUpdatedBlock
								lastUpdatedTimestamp
								token {
									address
									baseURI
									chainId
									blockchain
									contractMetaData {
										description
										externalLink
										feeRecipient
										image
										name
										sellerFeeBasisPoints
									}
									contractMetaDataURI
									decimals
									id
									lastTransferBlock
									lastTransferHash
									lastTransferTimestamp
									logo {
										external
										large
										medium
										original
										small
									}
									name
									projectDetails {
										collectionName
										description
										discordUrl
										externalUrl
										twitterUrl
									}
									rawContractMetaData
									symbol
									tokenTraits
									totalSupply
									type
								}
							}
							pageInfo {
								nextCursor
								prevCursor
							}
						}
					}
				`,
				variables: {
					address,
					blockchain: airstackNetworkNames[network.chainId],
					limit: 50,
					cursor: '',
				},
			})
		})}
		then={data => (
			(data.TokenBalances.TokenBalance ?? [])
				.map(tokenWithBalance => ({
					token: {
						chainId: Number(tokenWithBalance.chainId),
						address: tokenWithBalance.tokenAddress,
						name: tokenWithBalance.token.name,
						symbol: tokenWithBalance.token.symbol,
						decimals: tokenWithBalance.token.decimals,
					},
					balance: tokenWithBalance.amount, // BigInt(tokenWithBalance.amount),
				}))
		)}
		{showIf}
		{isOpen}
		{containerClass}
		{contentClass}
		bind:result={balances}
		let:result={balances}
	>
		<svelte:fragment slot="header"
			let:result={balances}
			let:status
			let:loadingMessage
			let:errorMessage
		>
			<slot name="header" {balances} {status} {loadingMessage} {errorMessage} />
		</svelte:fragment>

		<slot {balances} />
	</Loader>

{:else if tokenBalancesProvider === TokenBalancesProvider.Covalent}
	<Loader
		layout="collapsible"
		collapsibleType="label"
		loadingIcon={tokenBalancesProviderIcons[tokenBalancesProvider]}
		loadingIconName={tokenBalancesProvider}
		{loadingMessage}
		{errorMessage}
		fromQuery={address && network && (
			createQuery({
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
		)}
		{showIf}
		{isOpen}
		{containerClass}
		{contentClass}
		bind:result={balances}
		let:result={balances}
	>
		<svelte:fragment slot="header"
			let:result={balances}
			let:status
			let:loadingMessage
			let:errorMessage
		>
			<slot name="header" {balances} {status} {loadingMessage} {errorMessage} />
		</svelte:fragment>

		<slot {balances} />
	</Loader>

{:else if tokenBalancesProvider === TokenBalancesProvider.Liquality}
	<Loader
		loadingIcon={tokenBalancesProviderIcons[tokenBalancesProvider]}
		loadingIconName={tokenBalancesProvider}
		{loadingMessage}
		{errorMessage}
		fromQuery={address && network && (
			createQuery({
				queryKey: ['Balances', {
					tokenBalancesProvider,
					address,
					chainID: network.chainId,
				}],
				queryFn: async () => {
					const { ERC20Service } = await import('@liquality/wallet-sdk')

					const { liqualitySupportedNetworks } = await import('../api/liquality')

					if(!liqualitySupportedNetworks.includes(network.chainId))
						throw new Error(`Liquality doesn't yet support ${network.name}.`)

					return await ERC20Service.listAccountTokens(
						address,
						network.chainId
					)
				}
			})
		)}
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
		bind:result={balances}
		let:result={balances}
	>
		<svelte:fragment slot="header"
			let:result={balances}
			let:status
			let:loadingMessage
			let:errorMessage
		>
			<slot name="header" {balances} {status} {loadingMessage} {errorMessage} />
		</svelte:fragment>

		<slot {balances} />
	</Loader>

{:else if tokenBalancesProvider === TokenBalancesProvider.Moralis}
	<Loader
		layout="collapsible"
		collapsibleType="label"
		loadingIcon={tokenBalancesProviderIcons[tokenBalancesProvider]}
		loadingIconName={tokenBalancesProvider}
		{loadingMessage}
		{errorMessage}
		fromQuery={address && network && (
			createQuery({
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
		)}
		{showIf}
		{isOpen}
		{containerClass}
		{contentClass}
		bind:result={balances}
		let:result={balances}
	>
		<svelte:fragment slot="header"
			let:result={balances}
			let:status
			let:loadingMessage
			let:errorMessage
		>
			<slot name="header" {balances} {status} {loadingMessage} {errorMessage} />
		</svelte:fragment>

		<slot {balances} />
	</Loader>

{:else if tokenBalancesProvider === TokenBalancesProvider.Zapper}
	<Loader
		loadingIcon={tokenBalancesProviderIcons[tokenBalancesProvider]}
		loadingIconName={tokenBalancesProvider}
		{loadingMessage}
		{errorMessage}
		fromQuery={address && network && (
			createQuery({
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
		)}
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
		bind:result={balances}
		let:result={balances}
	>
		<svelte:fragment slot="header"
			let:result={balances}
			let:status
			let:loadingMessage
			let:errorMessage
		>
			<slot name="header" {balances} {status} {loadingMessage} {errorMessage} />
		</svelte:fragment>

		<slot {balances} />
	</Loader>

{:else if tokenBalancesProvider === TokenBalancesProvider.QuickNode}
	<Loader
		loadingIcon={tokenBalancesProviderIcons[tokenBalancesProvider]}
		loadingIconName={tokenBalancesProvider}
		{loadingMessage}
		{errorMessage}
		fromQuery={address && network && (
			createQuery({
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
		)}
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
		bind:result={balances}
		let:result={balances}
	>
		<svelte:fragment slot="header"
			let:result={balances}
			let:status
			let:loadingMessage
			let:errorMessage
		>
			<slot name="header" {balances} {status} {loadingMessage} {errorMessage} />
		</svelte:fragment>

		<slot {balances} />
	</Loader>
{/if}
