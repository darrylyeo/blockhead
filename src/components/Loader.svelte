<script lang="ts">
	import type { Readable } from 'svelte/store'
	import type { Result } from '../data/apollo-store'
	import type { QueryResponse } from '$houdini/runtime/query'


	type LoaderResult = $$Generic<unknown>
	type LoaderError = $$Generic<{message: string} | unknown>
	type HoudiniQueryInput = $$Generic<unknown>


	export let startImmediately = true

	export let loadingIcon: string
	export let loadingIconName: string
	export let loadingMessage: string
	export let loadingIconWidth = 25

	export let errorMessage: string
	export let errorFunction: ((Error) => string) | undefined
	export let hideError = false

	export let fromPromise: () => Promise<LoaderResult>
	export let fromStore: () => Readable<Result<LoaderResult>>
	export let fromHoudiniQuery: () => QueryResponse<LoaderResult, HoudiniQueryInput>

	export let showIf: (<T extends LoaderResult = LoaderResult>(then: T) => boolean | any) | undefined
	export let isCollapsed = false

	export let whenErrored: (() => {}) | undefined
	export let whenCanceled: (() => Promise<any>) | undefined


	enum LoadingStatus {
		Idle = 'idle',
		Loading = 'loading',
		Resolved = 'resolved',
		Errored = 'error'
	}
	let status: LoadingStatus = LoadingStatus.Idle

	let promise: ReturnType<typeof fromPromise>
	let store: ReturnType<typeof fromStore>
	let houdiniQuery: ReturnType<typeof fromHoudiniQuery>
	$: ({loading: houdiniLoading, error: houdiniError, data: houdiniData, refetch: houdiniRefetch} = houdiniQuery ?? {})


	export let result: LoaderResult

	type $$Slots = {
		default: {
			then: LoaderResult,
			status: LoadingStatus,
			load: typeof load,
			cancel: typeof cancel
		},
		header: {
			then: LoaderResult,
			status: LoadingStatus,
			load: typeof load,
			cancel: typeof cancel
		},
		error: {
			error: string
		},
		errorMessage,
		errorActions: {
			load: typeof load,
			cancel: typeof cancel
		}
	}


	let error: LoaderError
	$: if(error) console.error(error)

	let started = startImmediately
	$: if(started){
		status = LoadingStatus.Loading

		if(fromPromise)
			promise = fromPromise()
		else if(fromStore){
			const _store = fromStore()
			_store.then
				? _store.then(_ => store = _)
				: store = _store
		}
		else if(fromHoudiniQuery)
			houdiniQuery = fromHoudiniQuery()
	}

	function load(){
		started = false
		started = true
		// houdiniRefetch?.()
	}

	async function cancel(){
		if(whenCanceled)
			await whenCanceled().catch(console.error)

		status = LoadingStatus.Idle

		if(startImmediately)
			load()
	}

	$: if(promise)
		promise.then(_result => {
			result = _result
			status = LoadingStatus.Resolved
		}, _error => {
			error = _error
			status = LoadingStatus.Errored
			whenErrored?.()
		})
	$: if(store?.subscribe){
		if($store.loading){
			if($store.data)
				result = $store.data
			status = LoadingStatus.Loading
		}else if($store.error){
			error = $store.error
			status = LoadingStatus.Errored
			whenErrored?.()
		}else if($store.data){
			result = $store.data
			status = LoadingStatus.Resolved
		}
	}
	$: if(houdiniQuery)
		if($houdiniLoading){
			status = LoadingStatus.Loading
		}else if($houdiniError){
			error = $houdiniError
			status = LoadingStatus.Errored
			whenErrored?.()
		}else if($houdiniData){
			result = $houdiniData
			status = LoadingStatus.Resolved
		}

	$: isHidden = showIf && status === LoadingStatus.Resolved && !showIf(result)


	export let debug: string
	$: if(debug && result) console.log(debug, result)


	import { fade, scale } from 'svelte/transition'
	import HeightContainer from './HeightContainer.svelte'
	import Loading from './Loading.svelte'
</script>


<style>
	.loader:empty {
		display: none;
	}
</style>


{#if !isHidden}
	<slot name="header" {status} {load} {cancel} />

	<!-- {#if !isCollapsed} -->
		<HeightContainer class="loader stack" isOpen={!isCollapsed}>
			{#if status === LoadingStatus.Resolved || (fromStore && status === LoadingStatus.Loading && result)}
				<div class="column" transition:fade>
					<slot then={result} {status} {load} {cancel} />
				</div>
			{/if}
			{#if status === LoadingStatus.Idle}
				<slot name="idle"></slot>
			{:else if status === LoadingStatus.Loading}
				<Loading iconAnimation="hover">
					<slot name="loadingIcon" slot="icon">
						<img src={loadingIcon} alt={loadingIconName} width={loadingIconWidth}>
					</slot>
					<slot name="loadingMessage">
						{loadingMessage}
					</slot>
				</Loading>
			{:else if !hideError && status === LoadingStatus.Errored}
				<div class="card" transition:scale>
					<div class="bar">
						<slot name="errorMessage">
							<h4>{errorMessage || 'Error'}</h4>
						</slot>
						<slot name="errorActions" {load} {cancel}>
							<button class="small" on:click={load}>Retry</button>
							<button class="small" on:click={cancel}>Cancel</button>
						</slot>
					</div>
					<slot name="error" {error}>
						<pre>{
							errorFunction ? errorFunction(error) : 
							typeof error === 'object' ? error.message ?? JSON.stringify(error) :
							error
						}</pre>
					</slot>
				</div>
			{/if}
		</HeightContainer>
	<!-- {/if} -->
{/if}