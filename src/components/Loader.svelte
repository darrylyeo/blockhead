<script lang="ts">
	import type { Readable } from 'svelte/store'
	import type { Result } from '../data/apollo-store'

	export let startImmediately = true
	export let loadingIcon: string
	export let loadingIconName: string
	export let loadingMessage: string
	export let loadingIconWidth = 25
	export let errorMessage: string
	export let hideError = true

	export let fromPromise: <TData = unknown> () => Promise<TData>
	export let fromStore: <TData = unknown> () => Readable<Result<TData>>
	export let showIf: (<TData = unknown> (then: TData) => boolean | any) | undefined

	enum LoadingStatus {
		Idle = 'idle',
		Loading = 'loading',
		Resolved = 'resolved',
		Errored = 'error'
	}
	let status: LoadingStatus = LoadingStatus.Idle

	let promise: ReturnType<typeof fromPromise>
	let store: ReturnType<typeof fromStore>
	let result: unknown = {}
	let error: unknown

	$: if(startImmediately){
		status = LoadingStatus.Loading

		if(fromPromise)
			promise = fromPromise()
		else if(fromStore)
			store = fromStore()
		}

	function start(){
		startImmediately = !startImmediately
		startImmediately = !startImmediately
	}

	$: if(promise)
		promise.then(_result => {
			result = _result
			status = LoadingStatus.Resolved
		}, _error => {
			error = _error
			status = LoadingStatus.Errored
		})
	$: if(store)
		if($store.loading){
			status = LoadingStatus.Loading
		}else if($store.error){
			error = $store.error
			status = LoadingStatus.Errored
		}else{
			result = $store.data
			status = LoadingStatus.Resolved
		}
				
	$: isHidden = showIf && status === LoadingStatus.Resolved && !showIf(result)


	import { fade, scale } from 'svelte/transition'
	import Loading from './Loading.svelte'
</script>

<style>
	.loader:empty {
		display: none;
	}
</style>

<slot name="header" {status} />

{#if !isHidden}
	<div class="loader stack">
		{#if status === LoadingStatus.Loading}
			<Loading iconAnimation="hover">
				<slot name="loadingIcon" slot="icon">
					<img src={loadingIcon} alt={loadingIconName} width={loadingIconWidth}>
				</slot>
				<slot name="loadingMessage">
					{loadingMessage}
				</slot>
			</Loading>
		{:else if status === LoadingStatus.Resolved}
			<div transition:fade>
				<slot then={result} />
			</div>
		{:else if !hideError && status === LoadingStatus.Errored}
			<div class="card" transition:scale>
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