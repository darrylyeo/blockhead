<script lang="ts">
	import type { Readable } from 'svelte/store'
	import type { Result, Error as ApolloStoreError } from '../utils/apollo-store'
	import type { ApolloError } from '@apollo/client'
	import type { QueryStore } from '$houdini'
	import type { UseQueryStoreResult, UseInfiniteQueryStoreResult } from '@sveltestack/svelte-query'

	type LoaderResult = $$Generic<unknown>
	type LoaderError = $$Generic<{message: string} | Error | ApolloStoreError | ApolloError>
	type HoudiniQueryInput = $$Generic<unknown>
	type LoaderReturnResult = $$Generic<unknown>
	type LoaderLayout = $$Generic<'default' | 'passive' | 'collapsible'>

	export let layout: LoaderLayout = 'default'
	export let collapsibleType: 'label' | 'details' = 'details'

	export let startImmediately = true

	export let loadingIcon: string
	export let loadingIconName: string
	export let loadingMessage: string
	export let loadingIconWidth = 25

	export let errorMessage: string
	export let errorFunction: ((error: LoaderError) => string) | undefined
	export let hideError = false

	export let fromPromise: (() => Promise<LoaderResult>) | undefined
	export let fromStore: (() => Readable<Result<LoaderResult>> | Promise<Readable<Result<LoaderResult>>>) | undefined
	export let fromHoudiniQuery: (() => QueryStore<LoaderResult, HoudiniQueryInput>) | undefined
	export let fromUseQuery: (UseQueryStoreResult<LoaderResult, LoaderError>) | undefined
	export let fromUseInfiniteQuery: (UseInfiniteQueryStoreResult<LoaderResult[number], LoaderError>) | undefined

	export let then: ((result: LoaderResult) => LoaderReturnResult) = result => result as unknown as LoaderReturnResult
	export let whenLoaded: ((result: LoaderResult) => void) | undefined
	export let whenErrored: ((error: LoaderError) => void) | undefined
	export let whenCanceled: (() => Promise<any>) | undefined

	export let showIf: ((then: LoaderReturnResult) => boolean | any) | undefined
	export let isOpen = true
	export let clip = true

	export let showStatusAndActions = false

	export let containerClass: string
	export let contentClass: string


	enum LoadingStatus {
		Idle = 'idle',
		Loading = 'loading',
		Resolved = 'resolved',
		Reloading = 'reloading',
		Errored = 'error'
	}
	let status: LoadingStatus = LoadingStatus.Idle

	let promise: ReturnType<NonNullable<typeof fromPromise>>
	let store: ReturnType<NonNullable<typeof fromStore>>
	let houdiniQuery: ReturnType<NonNullable<typeof fromHoudiniQuery>>


	export let result: LoaderReturnResult

	type CollapsibleSlotProps = LoaderLayout extends 'collapsible'
		? {
			isOpen: boolean,
			toggle: () => boolean,
		}
		: {}

	type $$Slots = {
		default: {
			status: LoadingStatus,
			load: typeof load,
			cancel: typeof cancel,
			result: LoaderReturnResult
			pagination?: {
				hasPreviousPage: boolean,
				hasNextPage: boolean,
				fetchPreviousPage: () => void,
				fetchNextPage: () => void,
			}
		} & CollapsibleSlotProps,
		header: {
			status: LoadingStatus,
			loadingMessage: string,
			errorMessage: string,
			load: typeof load,
			cancel: typeof cancel,
		} & CollapsibleSlotProps,
		idle: {

		},
		loading: {

		},
		loadingIcon: {

		},
		loadingMessage: {

		},
		footer: {

		},
		'footerStart': {

		},
		error: {
			error: LoaderError
		},
		errorMessage: {
			
		},
		errorActions: {
			load: typeof load,
			cancel: typeof cancel
		},
	}


	let error: LoaderError
	// $: if(error) console.error(error)

	let started = startImmediately
	$: if(started){
		status = LoadingStatus.Loading

		if(fromPromise)
			promise = fromPromise()

		if(fromStore){
			const _store = fromStore()
			_store.then
				? _store.then(_ => store = _)
				: store = _store
		}

		if(fromHoudiniQuery)
			houdiniQuery = fromHoudiniQuery()

		if(fromUseQuery)
			fromUseQuery.setEnabled(true)

		if(fromUseInfiniteQuery)
			fromUseInfiniteQuery.setEnabled(true)
	}
	else{
		if(fromUseQuery)
			fromUseQuery.setEnabled(false)

		if(fromUseInfiniteQuery)
			fromUseInfiniteQuery.setEnabled(false)
	}

	function load(){
		started = false
		started = true
		// houdiniRefetch?.()

		if(fromUseQuery)
			$fromUseQuery.refetch()

		if(fromUseInfiniteQuery)
			$fromUseInfiniteQuery.refetch()
	}

	async function cancel(){
		if(whenCanceled)
			await whenCanceled().catch(() => {}) // .catch(console.error)

		status = LoadingStatus.Idle

		if(startImmediately)
			load()
	}

	$: if(promise)
		promise.then(_result => {
			result = then(_result)
			status = LoadingStatus.Resolved
		}, _error => {
			error = _error
			status = LoadingStatus.Errored
		})

	$: if(store?.subscribe){
		if($store.loading){
			if($store.data)
				result = then($store.data)
			status = LoadingStatus.Loading
		}
		else if($store.error){
			error = $store.error
			status = LoadingStatus.Errored
		}
		else if($store.data){
			result = then($store.data)
			status = LoadingStatus.Resolved
		}
	}

	$: if(houdiniQuery)
		if($houdiniQuery.loading){
			status = LoadingStatus.Loading
		}
		else if($houdiniQuery.error){
			error = $houdiniQuery.error
			status = LoadingStatus.Errored
		}
		else if($houdiniQuery.data){
			result = then($houdiniQuery.data)
			status = LoadingStatus.Resolved
		}

	$: if(fromUseQuery)
		if($fromUseQuery.isIdle){
			status = LoadingStatus.Idle
		}
		else if($fromUseQuery.isLoading){
			status = LoadingStatus.Loading
		}
		else if($fromUseQuery.isSuccess){
			result = then($fromUseQuery.data)
			status = LoadingStatus.Resolved
		}
		else if($fromUseQuery.isError){
			error = $fromUseQuery.error
			status = LoadingStatus.Errored
		}
		else if($fromUseQuery.isRefetching){
			status = LoadingStatus.Reloading
		}

	$: if(fromUseInfiniteQuery)
		if($fromUseInfiniteQuery.isIdle){
			status = LoadingStatus.Idle
		}
		else if($fromUseInfiniteQuery.isLoading){
			status = LoadingStatus.Loading
		}
		else if($fromUseInfiniteQuery.isSuccess){
			console.log('fromUseInfiniteQuery', $fromUseInfiniteQuery, $fromUseInfiniteQuery.data)
			result = then($fromUseInfiniteQuery.data) // .pages
			status = LoadingStatus.Resolved
		}
		else if($fromUseInfiniteQuery.isError){
			error = $fromUseInfiniteQuery.error
			status = LoadingStatus.Errored
		}
		else if($fromUseInfiniteQuery.isRefetching){
			status = LoadingStatus.Reloading
		}

	$: if(result) whenLoaded?.(result)
	$: if(error) whenErrored?.(error)

	$: isHidden = showIf && status === LoadingStatus.Resolved && !showIf(result)


	export let debug: string
	$: if(debug && result) console.log(debug, result)


	import { fade, scale } from 'svelte/transition'
	import Collapsible from './Collapsible.svelte'
	import Date from './Date.svelte'
	import Loading from './Loading.svelte'
	import SizeContainer from './SizeContainer.svelte'
</script>


<style>
	.loader:empty {
		display: none;
	}


	footer {
		font-size: 0.66em;
	}

	pre {
		max-height: 15em;
		overflow-y: auto;
	}
</style>


{#if !isHidden}
	{#if layout === 'collapsible'}
		<Collapsible
			type={collapsibleType}
			{containerClass}
			class="loader stack {contentClass}"
			{isOpen}
			{clip}
			let:isOpen let:toggle
		>
			<svelte:fragment slot="header" let:isOpen let:toggle>
				<slot
					name="header"
					{status}
					{loadingMessage}
					{errorMessage}
					{load}
					{cancel}
					{isOpen} {toggle}
				>
					<!-- <slot name="title">
						<div class="row">
							<slot name="toolbar" {isOpen} {toggle}>
								{#if $$slots['toolbar-items']}
									<div role="toolbar">
										<slot name="toolbar-items" {isOpen} {toggle} />
									</div>
								{/if}
							</slot>
			
							<slot name="header-right" {isOpen} {toggle} />
			
							<button
								class="small"
								data-after={isOpen ? '⏶' : '⏷'}
								on:click={toggle}
							>{isOpen ? 'Hide' : 'Show'}</button>
						</div>
					</slot> -->

					<button
						class="small"
						data-after={isOpen ? '⏶' : '⏷'}
						on:click={toggle}
					>{isOpen ? 'Hide' : 'Show'}</button>
				</slot>
			</svelte:fragment>

			{#if status === LoadingStatus.Resolved || (fromStore && status === LoadingStatus.Loading && result)}
				<div class="column-block" transition:fade>
					<slot
						{result}
						{status}
						{loadingMessage}
						{errorMessage}
						{load}
						{cancel}
						pagination={$fromUseInfiniteQuery && {
							hasPreviousPage: $fromUseInfiniteQuery.hasPreviousPage,
							hasNextPage: $fromUseInfiniteQuery.hasNextPage,
							fetchPreviousPage: $fromUseInfiniteQuery.fetchPreviousPage,
							fetchNextPage: $fromUseInfiniteQuery.fetchNextPage,
						}}
						{isOpen}
					/>
					<!-- {toggle} --><!-- ReferenceError: toggle is not defined -->
				</div>
			{/if}
			{#if status === LoadingStatus.Idle}
				<slot name="idle" {load}></slot>
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
							<button class="small cancel" on:click={cancel}>Cancel</button>
						</slot>
					</div>
					<slot name="error" {error}>
						<pre>{
							errorFunction
								? errorFunction(error) :
							typeof error === 'object' ?
								error.message ?? JSON.stringify(error)
							:
								error
						}</pre>
					</slot>
				</div>
			{/if}
		</Collapsible>
	{:else}
		<slot
			name="header"
			{status}
			{loadingMessage}
			{errorMessage}
			{load}
			{cancel}
		/>

		{#if layout === 'passive'}
			<slot
				{result}
				{status}
				{loadingMessage}
				{errorMessage}
				{load}
				{cancel}
				pagination={$fromUseInfiniteQuery && {
					hasPreviousPage: $fromUseInfiniteQuery.hasPreviousPage,
					hasNextPage: $fromUseInfiniteQuery.hasNextPage,
					fetchPreviousPage: $fromUseInfiniteQuery.fetchPreviousPage,
					fetchNextPage: $fromUseInfiniteQuery.fetchNextPage,
				}}
			/>
		{:else if layout === 'default'}
			<SizeContainer
				{containerClass}
				class="loader stack {contentClass}"
				{isOpen}
				{clip}
			>
				{#if status === LoadingStatus.Resolved || (fromStore && status === LoadingStatus.Loading && result)}
					<div class="column-block" transition:fade>
						<slot
							{result}
							{status}
							{loadingMessage}
							{errorMessage}
							{load}
							{cancel}
							pagination={$fromUseInfiniteQuery && {
								hasPreviousPage: $fromUseInfiniteQuery.hasPreviousPage,
								hasNextPage: $fromUseInfiniteQuery.hasNextPage,
								fetchPreviousPage: $fromUseInfiniteQuery.fetchPreviousPage,
								fetchNextPage: $fromUseInfiniteQuery.fetchNextPage,
							}}
						/>
					</div>
				{/if}
				{#if status === LoadingStatus.Idle}
					<slot name="idle" {load}></slot>
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
								<button class="small cancel" on:click={cancel}>Cancel</button>
							</slot>
						</div>
						<slot name="error" {error}>
							<pre>{
								errorFunction
									? errorFunction(error) :
								typeof error === 'object' ?
									error.message ?? JSON.stringify(error)
								:
									error
							}</pre>
						</slot>
					</div>
				{/if}
			</SizeContainer>
		{/if}
	{/if}

	<slot name="footer">
		{#if showStatusAndActions}
			<!-- <footer class="sticky-bottom card bar"> -->
			<footer class="bar">
				<slot name="footerStart" />

				{#if fromUseQuery}
					{#if $fromUseQuery.dataUpdatedAt}
						<span>
							Last updated
							<Date
								date={$fromUseQuery.dataUpdatedAt || $fromUseQuery.errorUpdatedAt}
								format="relative"
								layout="horizontal"
							/>
						</span>
					{/if}

					{#if status === LoadingStatus.Resolved || status === LoadingStatus.Errored}
						<button class="small" on:click={load}>Reload</button>
					{:else if status === LoadingStatus.Loading || status === LoadingStatus.Reloading || $fromUseQuery.isRefetching}
						<span>Loading...</span>
						<button class="small cancel" on:click={cancel}>Cancel</button>
					{/if}
				{/if}

				{#if fromUseInfiniteQuery}
					{#if $fromUseQuery.dataUpdatedAt}
						<span>
							Last updated
							<Date
								date={$fromUseInfiniteQuery.dataUpdatedAt || $fromUseInfiniteQuery.errorUpdatedAt}
								format="relative"
								layout="horizontal"
							/>
						</span>
					{/if}

					{#if status === LoadingStatus.Resolved || status === LoadingStatus.Errored}
						<div class="row">
							<button class="small" on:click={load}>Reload</button>

							{#if $fromUseInfiniteQuery.hasPreviousPage}
								<button class="small" on:click={() => $fromUseInfiniteQuery.fetchPreviousPage()}>Previous</button>
							{/if}

							{#if $fromUseInfiniteQuery.hasNextPage}
								<button class="small" on:click={() => $fromUseInfiniteQuery.fetchNextPage()}>Next</button>
							{/if}
						</div>
					{:else if status === LoadingStatus.Loading || status === LoadingStatus.Reloading || $fromUseQuery.isRefetching}
						<span>Loading...</span>
						<button class="small cancel" on:click={cancel}>Cancel</button>
					{/if}
				{/if}
			</footer>
		{/if}
	</slot>
{/if}
