<script lang="ts">
	import type { LensInstance, LensName } from '../api/lens'


	export let instance: LensInstance
	export let lensName: LensName
	export let linked = true
</script>


<style>
	.lens-name {
		font-family: var(--monospace-fonts), var(--base-fonts);
	}
</style>


<svelte:element
	this={linked ? 'a' : 'span'}
	class="lens-name"
	{...linked ? {
		href: `/apps/lens/account/${lensName}`
	} : {}}
	title={lensName}
>
	<slot {lensName}>{lensName}</slot>
</svelte:element>
