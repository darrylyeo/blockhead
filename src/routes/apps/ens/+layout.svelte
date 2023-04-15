<script lang="ts">
	import { accountId } from '../_appsParams'


	$: currentAddressOrEnsName = $accountId


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
	<form on:submit|preventDefault={() => $accountId = currentAddressOrEnsName}>
		<AddressField bind:address={currentAddressOrEnsName}/>
		<button type="submit">Go</button>
	</form>

	<slot />
</section>
