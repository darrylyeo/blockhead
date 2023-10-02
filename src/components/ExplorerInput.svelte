<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../data/networks/types'

	import type { ExplorerInputParams } from '../routes/explorer/_explorerParams'
	import { ExplorerQueryType, explorerQuery, getExplorerQueryType } from '../routes/explorer/_explorerContext'

	const explorerInputTypes = {
		ensName: {
			label: 'ENS Name',
		},
		address: {
			label: 'Address',
		},
		transaction: {
			label: 'Transaction',
		},
		blockNumber: {
			label: 'Block',
		},
	}
	type ExplorerInputType = keyof typeof explorerInputTypes


	// Context
	import { accountConnections } from '../state/account'

	import { getLocalPortfolios } from '../state/portfolio-accounts'
	const localPortfolios = getLocalPortfolios()

	import { localStorageWritable } from '../utils/localStorageWritable'
	const history = localStorageWritable('ExplorerInput/history', [] as string[])


	// Inputs
	export let required = false
	export let autofocus = false
	export let placeholder = 'Address (0xabcd...6789) / Transaction ID (0xabcdef...456789) / Block Number (12345678) / ENS Domain (vitalik.eth)'

	export let network: Ethereum.Network


	// Functions
	import { findMatchedCaptureGroupName } from '../utils/findMatchedCaptureGroup'

	const pattern = /^(?:(?<none>)|(?<address>0x[0-9a-fA-F]{40})|(?<transactionId>0x[0-9a-fA-F]{64})|(?<blockNumber>0|[1-9][0-9]*)|(?<ensName>(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club|test)))$/
	const subpattern = /(?<address>0x[0-9a-fA-F]{40})|(?<transactionId>0x[0-9a-fA-F]{64})|(?<blockNumber>0|[1-9][0-9]*)|(?<ensName>(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club|test))/g

	const findMatches = (value: string) =>
		[...value.matchAll(subpattern)]
			.flatMap(match =>
				Object.entries(match.groups ?? {})
					.map(([type, match]) => ({ type: type as ExplorerInputType, match }))
					.filter(({match}) => match)
			)


	// Shared state
	export let explorerInputParams: ExplorerInputParams
	export let explorerQueryType: ExplorerQueryType = ExplorerQueryType.None
	export let value: string
	// (Computed)
	$: value = $explorerQuery
	$: explorerInputParams = value.match(pattern)?.groups ?? {}
	$: explorerQueryType = getExplorerQueryType(explorerInputParams)


	// Internal state
	$: matchedParam = findMatchedCaptureGroupName<keyof ExplorerInputParams>(pattern, value) ?? ''	


	// Actions
	import { afterNavigate } from '$app/navigation'

	afterNavigate(() => {
		$history = [...new Set([value, ...$history])]
	})
</script>


<style>
	[data-param="address"],
	[data-param="blockNumber"],
	/* [data-param="ensName"], */
	[data-param="transactionId"] {
		font-family: var(--monospace-fonts);
	}
</style>


<input
	type="search"
	bind:value
	{required}
	{autofocus}
	{placeholder}
	pattern={pattern.source}
	data-param={matchedParam}
	list="ExplorerInputList"
	on:focus={e => e.target.select()}
/>

<datalist id="ExplorerInputList">
	<!-- {#each Object.entries(value.match(subpattern)?.groups ?? {}) as [type, substringMatch]} -->
	{#each findMatches(value) as {type, match}}
		<option
			value={match}
			label={explorerInputTypes[type].label}
		/>
	{/each}

	{#if $localPortfolios.length}
		{#each $localPortfolios as {name, accounts}, i (i)}
			<optgroup label={name}>
				{#each accounts as account}
					{@const _value = account.id}
					{@const type = explorerInputTypes[findMatches(_value)[0]?.type]}
					<option
						value={_value}
						label={`Portfolio › ${name}${type ? ` │ ${network ? `${network.name} › ` : ''}${type.label}` : ''}`}
					/>
				{/each}
			</optgroup>
		{/each}
	{/if}

	{#if $accountConnections?.length}
		<optgroup label="Connected Accounts">
			{#each $accountConnections as accountConnection}
				{#if accountConnection.state?.account?.address}
					<option
						value={accountConnection.state.account.address}
						label={accountConnection.walletType}
					/>
				{/if}
			{/each}
		</optgroup>
	{/if}

	{#each $history as _value}
		{@const type = explorerInputTypes[findMatches(_value)[0]?.type]}
		<optgroup label="History">
			<!-- {#if _value !== value}
				<option value={_value} />
			{/if} -->
			<option
				value={_value}
				label={`History${type ? ` │ ${network ? `${network.name} › ` : ''}${type.label}` : ''}`}
			/>
				<!-- label={
					type
						// ? `${type.label} (Explore › History)`
						// ? `Explore › History (${type.label})`
						? `Explore › History │ ${type.label}`
						: 'Explore › History'
				} -->
		</optgroup>
	{/each}
</datalist>
