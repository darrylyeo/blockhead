<script lang="ts">
	export let startImmediately = true
	export let loadingIcon: string
	export let loadingIconName: string
	export let loadingMessage: string
	export let loadingIconWidth = 32
	export let errorMessage: string
	export let hideError = true

	type Type = any
	export let load: () => Promise<Type>
	export let showIf: ((then: Type) => boolean | any) | undefined

	enum PromiseStatus {
		Idle,
		Pending,
		Resolved,
		Rejected
	}
	let status = PromiseStatus.Idle
	let promise: Promise<Type>
	let result: Type
	let error

	function start(){
		status = PromiseStatus.Pending
		promise = load()
		promise.then(_result => {
			result = _result
			status = PromiseStatus.Resolved
		}, _error => {
			error = _error
			status = PromiseStatus.Rejected
		})
	}

	if(startImmediately)
		start()
	
	$: isHidden = showIf && status === PromiseStatus.Resolved && !showIf(result)


	import Loading from './Loading.svelte'
</script>

<style>
	.loader:empty {
		display: none;
	}
</style>

{#if !isHidden}
<slot name="header" />
{/if}

{#if promise && !isHidden}
	<div class="loader stack">
		{#if status === PromiseStatus.Pending}
			<Loading iconAnimation="hover">
				<slot slot="loadingIcon" name="icon">
					<img src={loadingIcon} alt={loadingIconName} width={loadingIconWidth}>
				</slot>
				<slot name="loadingMessage">
					{loadingMessage}
				</slot>
			</Loading>
		{:else if status === PromiseStatus.Resolved}
			<slot then={result} />
		{:else if !hideError && status === PromiseStatus.Rejected}
			<div class="card">
				<slot name="errorMessage">
					<p>{errorMessage}</p>
				</slot>
				<slot name="error" {error}>
					<pre>{error}</pre>
				</slot>
				<button on:click={start}>Retry</button>
			</div>
		{/if}
	</div>
{/if}