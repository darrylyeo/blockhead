<script lang="ts">
	// Constants/types
	import type { AccountConnection } from '../../../state/account'
	import { InputPattern } from '../../../data/inputPatterns'


	// Params
	import {
		type AppsSearchInputParams,
		accountId,
	} from '../_appsParams'


	// Context
	import {
		defaultSearchInputValue,
	} from '../_appsContext'


	// Internal state
	let searchInputValue: string
	$: searchInputValue = $defaultSearchInputValue

	let searchInputParams: Partial<AppsSearchInputParams> = {}

	let selectedAccountConnection: AccountConnection | undefined



	// Components
	import ConnectedAccountSelect from '../../../components/ConnectedAccountSelect.svelte'
	import SearchInput from '../../../components/SearchInput.svelte'


	// Transitions
	import { fly } from 'svelte/transition'
</script>


<style>
	.accountId-form {
		display: grid;
		grid-template-columns: 3fr auto 1fr auto;
	}
</style>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	<form class="accountId-form row" on:submit|preventDefault={() => {
		$accountId = searchInputParams.address ?? searchInputParams.ensName ?? ''
	}}>
		<SearchInput
			inputPatterns={[
				InputPattern.Address,
				InputPattern.EnsName,
			]}
			bind:value={searchInputValue}
			bind:matchedPatterns={searchInputParams}
		/>

		<span>or</span>

		<label class="row inline">
			<ConnectedAccountSelect address={$accountId} bind:selectedAccountConnection />
		</label>

		<button type="submit">Go</button>
	</form>

	<slot />
</section>
