<script lang="ts">
	// Types/constants
	import type { Readable } from 'svelte/store'
	import type { Result, Error as ApolloStoreError } from '../utils/apolloRequestStore'
	import type { ApolloError } from '@apollo/client'
	import type { GraphQLObject, GraphQLVariables } from 'houdini'
	import type { QueryStore } from '$houdini'
	import type { CreateQueryResult, CreateInfiniteQueryResult } from '@tanstack/svelte-query'

	type LoaderResult = $$Generic<unknown>
	type LoaderError = $$Generic<{message: string} | Error | ApolloStoreError | ApolloError | unknown>
	type HoudiniQueryInput = $$Generic<unknown>
	type LoaderReturnResult = $$Generic<unknown>
	type LoaderLayout = $$Generic<'default' | 'passive' | 'collapsible' | 'headless'>

	enum LoadingStatus {
		Idle = 'idle',
		Loading = 'loading',
		Resolved = 'resolved',
		Reloading = 'reloading',
		Errored = 'error'
	}


	// Inputs
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
	export let fromHoudiniQuery: (() => QueryStore<LoaderResult extends GraphQLObject ? LoaderResult : never, HoudiniQueryInput extends GraphQLVariables ? HoudiniQueryInput : never>) | undefined
	export let fromQuery: (CreateQueryResult<LoaderResult, LoaderError>) | undefined
	export let fromInfiniteQuery: (CreateInfiniteQueryResult<LoaderResult, LoaderError>) | undefined

	export let then: ((result: LoaderResult) => LoaderReturnResult) | undefined
	export let whenLoaded: ((result: LoaderReturnResult) => void) | undefined
	export let whenErrored: ((error: LoaderError) => void) | undefined
	export let whenCanceled: (() => Promise<any>) | undefined

	// (View options)
	export let layout: LoaderLayout = 'default' as LoaderLayout
	export let collapsibleType: 'label' | 'details' = 'details'

	export let showIf: ((then: LoaderReturnResult | undefined) => boolean | any) | undefined
	export let isOpen = true
	export let clip = true

	export let containerClass: string
	export let contentClass = 'column-block'

	export let showStatusAndActions = false

	// (Computed)
	$: isHidden = layout === 'headless' || (status === LoadingStatus.Resolved && showIf && !showIf(result))


	// Internal state
	let promise: ReturnType<NonNullable<typeof fromPromise>> | undefined
	let store: Awaited<ReturnType<NonNullable<typeof fromStore>>> | undefined
	let houdiniQuery: ReturnType<NonNullable<typeof fromHoudiniQuery>> | undefined


	// Outputs
	let status = startImmediately ? LoadingStatus.Loading : LoadingStatus.Idle

	let _result: LoaderResult
	export let result: LoaderReturnResult

	let error: LoaderError

	// (Types)
	type CollapsibleSlotProps = LoaderLayout extends 'collapsible'
		? {
			isOpen: boolean,
			toggle: () => boolean,
		}
		: {}

	type SharedSlotProps = {
		result: typeof result,
		status: typeof status,
		load: typeof load,
		cancel: typeof cancel,
		pagination?: {
			hasPreviousPage: boolean,
			hasNextPage: boolean,
			fetchPreviousPage: () => void,
			fetchNextPage: () => void,
		}
	} & CollapsibleSlotProps

	type $$Slots = {
		default: SharedSlotProps,
		header: SharedSlotProps & {
			loadingMessage: typeof loadingMessage,
			errorMessage: typeof errorMessage,
		},
		idle: {
			load: typeof load,
		},
		loading: {

		},
		loadingIcon: {

		},
		loadingMessage: {

		},
		footer: {

		},
		footerStart: {

		},
		errorTitle: {
			error: typeof error,
			errorMessage: typeof errorMessage,
		},
		errorDetails: {
			error: typeof error,
			errorMessage: typeof errorMessage,
		},
		errorActions: {
			load: typeof load,
			cancel: typeof cancel
		},
	}


	// Actions
	const load = () => {
		status = LoadingStatus.Loading
		// houdiniRefetch?.()

		if(fromQuery)
			$fromQuery!.refetch()

		if(fromInfiniteQuery)
			$fromInfiniteQuery!.refetch()
	}

	const cancel = async () => {
		if(whenCanceled)
			await whenCanceled().catch(() => {}) // .catch(console.error)

		status = LoadingStatus.Idle

		// if(startImmediately)
		// 	load()
	}

	$: if(status === LoadingStatus.Loading){
		try {
			if(fromPromise)
				promise = fromPromise()

			if(fromStore){
				const storeOrPromise = fromStore()

				if('then' in storeOrPromise)
					storeOrPromise
						.then(_ => store = _)
						.catch?.(e => {
							error = e
							status = LoadingStatus.Errored
						})
				else
					store = storeOrPromise
			}

			if(fromHoudiniQuery)
				houdiniQuery = fromHoudiniQuery()

			// if(fromQuery)
			// 	fromQuery.setEnabled(true)

			// if(fromInfiniteQuery)
			// 	fromInfiniteQuery.setEnabled(true)
		}catch(e){
			error = e as LoaderError
			status = LoadingStatus.Errored
		}
	}
	// else{
	// 	if(fromQuery)
	// 		fromQuery.setEnabled(false)

	// 	if(fromInfiniteQuery)
	// 		fromInfiniteQuery.setEnabled(false)
	// }

	$: if(promise){
		promise.then(result => {
			_result = result
			status = LoadingStatus.Resolved
		}, _error => {
			error = _error
			status = LoadingStatus.Errored
		})
	}
	else if(store && $store){
		if($store.loading){
			if($store.data)
				_result = $store.data
			status = LoadingStatus.Loading
		}
		else if($store.error){
			error = $store.error
			status = LoadingStatus.Errored
		}
		else if($store.data){
			_result = $store.data
			status = LoadingStatus.Resolved
		}
	}
	else if(houdiniQuery && $houdiniQuery){
		if($houdiniQuery.loading){
			status = LoadingStatus.Loading
		}
		else if($houdiniQuery.error){
			error = $houdiniQuery.error
			status = LoadingStatus.Errored
		}
		else if($houdiniQuery.data){
			_result = $houdiniQuery.data
			status = LoadingStatus.Resolved
		}
	}else if(fromQuery && $fromQuery){
		if($fromQuery.isPlaceholderData){
			status = LoadingStatus.Idle
		}
		else if($fromQuery.isLoading){
			status = LoadingStatus.Loading
		}
		else if($fromQuery.isRefetching){
			status = LoadingStatus.Reloading
		}
		else if($fromQuery.isSuccess){
			_result = $fromQuery.data
			status = LoadingStatus.Resolved
		}
		else if($fromQuery.isError){
			error = $fromQuery.error
			status = LoadingStatus.Errored
		}
	}else if(fromInfiniteQuery && $fromInfiniteQuery){
		if($fromInfiniteQuery.isPlaceholderData){
			status = LoadingStatus.Idle
		}
		else if($fromInfiniteQuery.isLoading){
			status = LoadingStatus.Loading
		}
		else if($fromInfiniteQuery.isRefetching){
			status = LoadingStatus.Reloading
		}
		else if($fromInfiniteQuery.isSuccess){
			_result = $fromInfiniteQuery.data
			status = LoadingStatus.Resolved
		}
		else if($fromInfiniteQuery.isError){
			error = $fromInfiniteQuery.error
			status = LoadingStatus.Errored
		}
	}

	$: if(status === LoadingStatus.Resolved){
		// (Computed)
		try {
			result = then ? then(_result) : _result as LoaderReturnResult

			whenLoaded?.(result)
		}catch(_error){
			error = _error as LoaderError
			status = LoadingStatus.Errored
		}
	}

	$: if(status === LoadingStatus.Errored){
		// console.error(error)
		whenErrored?.(error)
	}


	// Debugging
	export let debug: boolean

	$: if(debug && result){
		(console.groupCollapsed || console.log)(loadingMessage, { status })
		// if(Array.isArray(result)){
		// 	console.log({ status })
		// 	console.table(result)
		// }else{
			console.log(result)
		// }
		console.groupEnd?.()
	}


	// Components
	import Collapsible from './Collapsible.svelte'
	import Date from './Date.svelte'
	import Loading from './Loading.svelte'
	import SizeContainer from './SizeContainer.svelte'


	// Transitions/animations
	import { fade, scale } from 'svelte/transition'
</script>


{#if !isHidden}
	{#if layout === 'collapsible'}
		<Collapsible
			type={collapsibleType}
			{containerClass}
			class="loader stack"
			{isOpen}
			{clip}
			let:isOpen let:toggle
		>
			<svelte:fragment slot="header"
				let:isOpen
				let:toggle
			>
				<slot name="header"
					{result}
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

			{#if status === LoadingStatus.Resolved || status === LoadingStatus.Reloading || (fromStore && status === LoadingStatus.Loading && result)}
				<div class={contentClass} transition:fade|global>
					<slot
						{result}
						{status}
						{loadingMessage}
						{errorMessage}
						{load}
						{cancel}
						pagination={$fromInfiniteQuery && {
							hasPreviousPage: $fromInfiniteQuery.hasPreviousPage,
							hasNextPage: $fromInfiniteQuery.hasNextPage,
							fetchPreviousPage: $fromInfiniteQuery.fetchPreviousPage,
							fetchNextPage: $fromInfiniteQuery.fetchNextPage,
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
				<div class="card" transition:scale|global>
					<div class="bar wrap">
						<slot name="errorTitle" {error} {errorMessage}>
							<h4>{errorMessage || 'Error'}</h4>
						</slot>

						<slot name="errorActions" {load} {cancel}>
							<div class="row wrap">
								<button class="small" on:click={load}>Retry</button>
								<button class="small cancel" on:click={cancel}>Cancel</button>
							</div>
						</slot>
					</div>

					<slot name="errorDetails" {error} {errorMessage}>
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
			{result}
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
				pagination={$fromInfiniteQuery && {
					hasPreviousPage: $fromInfiniteQuery.hasPreviousPage,
					hasNextPage: $fromInfiniteQuery.hasNextPage,
					fetchPreviousPage: $fromInfiniteQuery.fetchPreviousPage,
					fetchNextPage: $fromInfiniteQuery.fetchNextPage,
				}}
			/>
		{:else if layout === 'default'}
			<SizeContainer
				{containerClass}
				class="loader stack"
				{isOpen}
				{clip}
			>
				{#if status === LoadingStatus.Resolved || status === LoadingStatus.Reloading || (fromStore && status === LoadingStatus.Loading && result)}
					<div class={contentClass} transition:fade|global>
						<slot
							{result}
							{status}
							{loadingMessage}
							{errorMessage}
							{load}
							{cancel}
							pagination={$fromInfiniteQuery && {
								hasPreviousPage: $fromInfiniteQuery.hasPreviousPage,
								hasNextPage: $fromInfiniteQuery.hasNextPage,
								fetchPreviousPage: $fromInfiniteQuery.fetchPreviousPage,
								fetchNextPage: $fromInfiniteQuery.fetchNextPage,
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
					<div class="card" transition:scale|global>
						<div class="bar wrap">
							<slot name="errorTitle" {error} {errorMessage}>
								<h4>{errorMessage || 'Error'}</h4>
							</slot>

							<slot name="errorActions" {load} {cancel}>
								<button class="small" on:click={load}>Retry</button>
								<button class="small cancel" on:click={cancel}>Cancel</button>
							</slot>
						</div>

						<slot name="errorDetails" {error} {errorMessage}>
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
			<footer class="bar wrap">
				<slot name="footerStart" />

				{#if fromQuery}
					{#if $fromQuery.dataUpdatedAt}
						<span>
							Last updated
							<Date
								date={$fromQuery.dataUpdatedAt || $fromQuery.errorUpdatedAt}
								format="relative"
								layout="horizontal"
							/>
						</span>
					{/if}

					{#if status === LoadingStatus.Resolved || status === LoadingStatus.Errored}
						<button class="small" on:click={load}>Reload</button>
					{:else if status === LoadingStatus.Loading || status === LoadingStatus.Reloading || $fromQuery.isRefetching}
						<span>Loading...</span>
						<button class="small cancel" on:click={cancel}>Cancel</button>
					{/if}
				{/if}

				{#if fromInfiniteQuery}
					{#if $fromQuery.dataUpdatedAt}
						<span>
							Last updated
							<Date
								date={$fromInfiniteQuery.dataUpdatedAt || $fromInfiniteQuery.errorUpdatedAt}
								format="relative"
								layout="horizontal"
							/>
						</span>
					{/if}

					{#if status === LoadingStatus.Resolved || status === LoadingStatus.Errored}
						<div class="row">
							<button class="small" on:click={load}>Reload</button>

							{#if $fromInfiniteQuery.hasPreviousPage}
								<button class="small" on:click={() => $fromInfiniteQuery.fetchPreviousPage()}>Previous</button>
							{/if}

							{#if $fromInfiniteQuery.hasNextPage}
								<button class="small" on:click={() => $fromInfiniteQuery.fetchNextPage()}>Next</button>
							{/if}
						</div>
					{:else if status === LoadingStatus.Loading || status === LoadingStatus.Reloading || $fromQuery.isRefetching}
						<span>Loading...</span>
						<button class="small cancel" on:click={cancel}>Cancel</button>
					{/if}
				{/if}
			</footer>
		{/if}
	</slot>
{/if}


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
