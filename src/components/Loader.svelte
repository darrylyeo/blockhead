<script lang="ts">
	import type { Readable } from 'svelte/store'
	import type { Result } from '../data/apollo-store'

	export let startImmediately = true
	export let loadingIcon: string
	export let loadingIconName: string
	export let loadingMessage: string
	export let loadingIconWidth = 25
	export let errorMessage: string
	export let errorFunction: ((Error) => string) | undefined
	export let hideError = false

	export let fromPromise: <TData = unknown> () => Promise<TData>
	export let fromStore: <TData = unknown> () => Readable<Result<TData>>
	export let showIf: (<TData = unknown> (then: TData) => boolean | any) | undefined
	export let isCollapsed = false

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

	function load(){
		startImmediately = !startImmediately
		startImmediately = !startImmediately
	}

	function cancel(){
		status = LoadingStatus.Idle
	}

	$: if(promise)
		promise.then(_result => {
			result = _result
			status = LoadingStatus.Resolved
		}, _error => {
			error = _error
			status = LoadingStatus.Errored
		})
	$: if(store && $store)
		if($store.loading){
			status = LoadingStatus.Loading
		}else if($store.error){
			error = $store.error
			status = LoadingStatus.Errored
		}else if($store.data){
			result = $store.data
			status = LoadingStatus.Resolved
		}

	$: isHidden = showIf && status === LoadingStatus.Resolved && !showIf(result)

	import { fade, scale } from 'svelte/transition'
	import { transitionHeight } from '../transitions/height'
	import Loading from './Loading.svelte'
</script>

<style>
	.loader:empty {
		display: none;
	}
</style>

{#if !isHidden}
	<slot name="header" {status} />

	<!-- {#if !isCollapsed} -->
		<div>
			<div class="loader stack" use:transitionHeight={!isCollapsed}>
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
					<div class="column" transition:fade>
						<slot then={result} />
					</div>
				{:else if !hideError && status === LoadingStatus.Errored}
					<div class="card" transition:scale>
						<div class="bar">
							<slot name="errorMessage">
								{#if errorMessage}
									<h4>{errorMessage}</h4>
								{/if}
							</slot>
							<slot name="errorActions" {load} {cancel}>
								<button class="small" on:click={load}>Retry</button>
								<button class="small" on:click={cancel}>Cancel</button>
							</slot>
						</div>
						<slot name="error" {error}>
							<pre>{errorFunction ? errorFunction(error) : error}</pre>
						</slot>
					</div>
				{/if}
			</div>
		</div>
	<!-- {/if} -->
{/if}