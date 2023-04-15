<script lang="ts">
	import { accountId } from '../_appsParams'


	$: currentAccountId = $accountId


	import AddressField from '../../../components/AddressField.svelte'


	import { fly } from 'svelte/transition'
</script>


<style>
	form {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--padding-inner);
		align-items: center;
	}
</style>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	<form on:submit|preventDefault={() => $accountId = currentAccountId}>
		<AddressField bind:address={currentAccountId}/>
		<button type="submit">Go</button>
	</form>

	<slot />
</section>
