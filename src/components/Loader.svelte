<script lang="ts">
	import { tick } from 'svelte'

	export let startImmediately = true
	export let loadingIcon: string
	export let loadingIconName: string
	export let loadingMessage: string
	export let loadingIconWidth = 32
	export let errorMessage: string

	type Type = any
	export let load: () => Promise<Type>
	export let showIf: ((then: Type) => boolean) | undefined

	let isResolved = false
	let promise: Promise<Type>
	let result: Type

	function start(){
		isResolved = false
		promise = load()
		promise.then(async _result => {
			result = _result
			await tick()
			isResolved = true
		})
	}

	if(startImmediately)
		start()
	
	$: isHidden = showIf && isResolved && !showIf(result)


	import Loading from './Loading.svelte'
</script>

<style>
	.loader:empty {
		display: none;
	}
</style>

<slot name="header" />

{#if promise && !isHidden}
	<div class="loader stack">
		{#await promise}
			<Loading iconAnimation="hover">
				<slot slot="loadingIcon" name="icon">
					<img src={loadingIcon} alt={loadingIconName} width={loadingIconWidth}>
				</slot>
				<slot name="loadingMessage">
					{loadingMessage}
				</slot>
			</Loading>
		{:then}
			<slot then={result} />
		{:catch error}
			<div class="card">
				<slot name="errorMessage">
					<p>{errorMessage}</p>
				</slot>
				<slot name="error" {error}>
					<pre>{error}</pre>
				</slot>
				<button on:click={start}>Retry</button>
			</div>
		{/await}
	</div>
{/if}