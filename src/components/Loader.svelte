<script lang="ts"
	generics="
		LoaderResult extends unknown = unknown,
		LoaderError extends {message: string} | Error | ApolloResultError | unknown = {message: string} | Error | ApolloResultError | unknown,
		// type HoudiniQueryInput extends unknown = unknown
		LoaderReturnResult extends unknown = unknown,
		LoaderLayout extends 'default' | 'passive' | 'collapsible' | 'headless' = 'default' | 'passive' | 'collapsible' | 'headless'
	"
>
	// Types/constants
	import type { Readable } from 'svelte/store'
	import type { ApolloResult, ApolloResultError } from '$/utils/apolloResult'
	// import type { GraphQLObject, GraphQLVariables } from 'houdini'
	// import type { QueryStore } from '$houdini'
	import type { CreateQueryResult, CreateInfiniteQueryResult, InfiniteQueryObserverResult } from '@tanstack/svelte-query'

	enum LoadingStatus {
		Idle = 'idle',
		Loading = 'loading',
		Resolved = 'resolved',
		Reloading = 'reloading',
		Errored = 'error'
	}


	// Context
	import { dev } from '$app/environment'


	// Inputs
	export let startImmediately = true

	export let loadingIcon: string | undefined
	export let loadingIconName: string | undefined
	export let loadingMessage: string | undefined
	export let loadingIconWidth = 25

	export let errorMessage: string | undefined
	export let errorFunction: ((error: LoaderError) => string) | undefined
	export let hideError = false

	export let fromPromise: (() => Promise<LoaderResult>) | undefined
	export let fromStore: (() => Readable<ApolloResult<LoaderResult>> | Promise<Readable<ApolloResult<LoaderResult>>>) | undefined
	// export let fromHoudiniQuery: (() => QueryStore<LoaderResult extends GraphQLObject ? LoaderResult : never, HoudiniQueryInput extends GraphQLVariables ? HoudiniQueryInput : never>) | undefined
	export let fromQuery: (CreateQueryResult<LoaderResult, LoaderError>) | undefined
	export let fromInfiniteQuery: (CreateInfiniteQueryResult<LoaderResult, LoaderError>) | undefined

	export let then: ((result: LoaderResult) => LoaderReturnResult) | undefined
	export let whenLoaded: ((result: LoaderReturnResult) => void) | undefined
	export let whenErrored: ((error: LoaderError) => void) | undefined
	export let whenCanceled: (() => void | Promise<void>) | undefined

	// (View options)
	export let viewOptions: Partial<{
		layout: LoaderLayout,
		collapsibleType: 'label' | 'details',

		showIf: ((then: LoaderReturnResult | undefined) => boolean | any) | undefined,
		isOpen: boolean,
		clip: boolean,

		showContentWhenIdle?: boolean,
		showContentWhenLoading?: boolean,

		containerClass?: string,
		contentClass?: string,
		loadingClass?: string,
		errorClass?: string,
	}> = {}

	$: ({
		layout = 'default',
		collapsibleType = 'details',

		showIf = undefined,
		isOpen = true,
		clip = true,

		showContentWhenIdle = false,
		showContentWhenLoading = true,

		containerClass = 'column-block with-hidden-transitions',
		contentClass = 'column-block',
		loadingClass = '',
		errorClass = '',
	} = viewOptions)

	export let showStatusAndActions = false

	// (Computed)
	$: isHidden = layout === 'headless' || (status === LoadingStatus.Resolved && showIf && !showIf(result))


	// Internal state
	let promise: ReturnType<NonNullable<typeof fromPromise>> | undefined
	let store: Awaited<ReturnType<NonNullable<typeof fromStore>>> | undefined
	// let houdiniQuery: ReturnType<NonNullable<typeof fromHoudiniQuery>> | undefined


	// Outputs
	export let result: LoaderReturnResult

	let _result: LoaderResult | undefined = result

	let status = result ? LoadingStatus.Resolved : startImmediately ? LoadingStatus.Loading : LoadingStatus.Idle

	let error: LoaderError

	export let pagination: Pick<InfiniteQueryObserverResult<LoaderResult, LoaderError>, 'hasPreviousPage' | 'isFetchingPreviousPage' | 'fetchPreviousPage' | 'hasNextPage' | 'isFetchingNextPage' | 'fetchNextPage'> | undefined
	$: pagination = $fromInfiniteQuery && {
		hasPreviousPage: $fromInfiniteQuery.hasPreviousPage,
		isFetchingPreviousPage: $fromInfiniteQuery.isFetchingPreviousPage,
		fetchPreviousPage: $fromInfiniteQuery.fetchPreviousPage,

		hasNextPage: $fromInfiniteQuery.hasNextPage,
		isFetchingNextPage: $fromInfiniteQuery.isFetchingNextPage,
		fetchNextPage: $fromInfiniteQuery.fetchNextPage,
	}

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
		pagination?: Pick<InfiniteQueryObserverResult<LoaderResult, LoaderError>, 'hasPreviousPage' | 'isFetchingPreviousPage' | 'fetchPreviousPage' | 'hasNextPage' | 'isFetchingNextPage' | 'fetchNextPage'>,
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
			try {
				await whenCanceled()
			}catch(e){
				console.warn(e)
			}

		status = LoadingStatus.Idle

		promise = undefined
		store = undefined

		// if(startImmediately)
		// 	load()
	}

	$: if(status === LoadingStatus.Loading){
		try {
			if(fromPromise)
				promise = fromPromise()
			else
				promise = undefined

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
			else
				store = undefined

			// if(fromHoudiniQuery)
			// 	houdiniQuery = fromHoudiniQuery()

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
	// else if(houdiniQuery && $houdiniQuery){
	// 	if($houdiniQuery.loading){
	// 		status = LoadingStatus.Loading
	// 	}
	// 	else if($houdiniQuery.error){
	// 		error = $houdiniQuery.error
	// 		status = LoadingStatus.Errored
	// 	}
	// 	else if($houdiniQuery.data){
	// 		_result = $houdiniQuery.data
	// 		status = LoadingStatus.Resolved
	// 	}
	// }
	else if(fromQuery && $fromQuery){
		if($fromQuery.isPlaceholderData){
			status = LoadingStatus.Idle
		}
		else if($fromQuery.isInitialLoading){
			if($fromQuery.data !== undefined)
				_result = $fromQuery.data
			status = LoadingStatus.Loading
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
	}
	else if(fromInfiniteQuery && $fromInfiniteQuery){
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
			result = then ? then(_result!) : _result! as LoaderReturnResult

			whenLoaded?.(result)
		}catch(_error){
			error = _error as LoaderError
			status = LoadingStatus.Errored
		}
	}

	$: if(status === LoadingStatus.Errored){
		console.error(error.stack, error)
		whenErrored?.(error)
	}


	// Debugging
	export let debug: boolean = dev

	$: if(debug && result){
		// (console.groupCollapsed || console.log)(loadingMessage ?? '', { status })
		(console.group || console.log)(loadingMessage ?? '', { status })
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
	import DateTime from './DateTime.svelte'
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
			class="loader stack status-{status}"
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
					{pagination}
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
				<div class={contentClass} transition:fade>
					<slot
						{result}
						{status}
						{loadingMessage}
						{errorMessage}
						{load}
						{cancel}
						{pagination}
						{isOpen}
					/>
					<!-- {toggle} --><!-- ReferenceError: toggle is not defined -->
				</div>
			{/if}

			{#if status === LoadingStatus.Idle}
				<slot name="idle" {load}></slot>
			{:else if status === LoadingStatus.Loading}
				<Loading
					icon={loadingIcon && {
						src: loadingIcon,
						name: loadingIconName,
						width: loadingIconWidth,
					}}
					iconAnimation="hover"
					class={loadingClass}
				>
					<slot name="loadingMessage">
						{loadingMessage}
					</slot>
				</Loading>
			{:else if !hideError && status === LoadingStatus.Errored}
				<div class="card {errorClass}" transition:scale>
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
							errorFunction ?
								errorFunction(error)
							: typeof error === 'object' ?
								error && 'message' in error ?
									error.message
								:
									JSON.stringify(error)
							:
								error
						}</pre>
					</slot>
				</div>
			{/if}
		</Collapsible>
	{:else if layout === 'passive'}
		<slot
			name="header"
			{result}
			{status}
			{pagination}
			{loadingMessage}
			{errorMessage}
			{load}
			{cancel}
		/>

		<slot
			{result}
			{status}
			{pagination}
			{loadingMessage}
			{errorMessage}
			{load}
			{cancel}
		/>
	{:else if layout === 'default'}
		<div class={containerClass}>
			<slot
				name="header"
				{result}
				{status}
				{pagination}
				{loadingMessage}
				{errorMessage}
				{load}
				{cancel}
			/>

			<SizeContainer
				contentProps={{ class: `loader stack status-${status}` }}
				{isOpen}
				{clip}
			>
				{#if (status === LoadingStatus.Resolved || status === LoadingStatus.Reloading || (fromStore && status === LoadingStatus.Loading && result) || showContentWhenIdle) && (status !== LoadingStatus.Loading || showContentWhenLoading)}
					<div class={contentClass} transition:fade>
						<slot
							{result}
							{status}
							{pagination}
							{loadingMessage}
							{errorMessage}
							{load}
							{cancel}
							{isOpen}
						/>
					</div>
				{/if}

				{#if status === LoadingStatus.Idle}
					<slot name="idle" {load}></slot>
				{:else if status === LoadingStatus.Loading}
					<Loading
						icon={loadingIcon && {
							src: loadingIcon,
							name: loadingIconName,
							width: loadingIconWidth,
						}}
						iconAnimation="hover"
						class={loadingClass}
					>
						<slot name="loadingMessage">
							{loadingMessage}
						</slot>
					</Loading>
				{:else if !hideError && status === LoadingStatus.Errored}
					<div class="card {errorClass}" transition:scale>
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
								errorFunction ?
									errorFunction(error)
								: typeof error === 'object' ?
									error && 'message' in error ?
										error.message
									:
										JSON.stringify(error)
								:
									error
							}</pre>
						</slot>
					</div>
				{/if}
			</SizeContainer>
		</div>
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
							<DateTime
								date={$fromQuery.dataUpdatedAt || $fromQuery.errorUpdatedAt}
								format="relative"
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
					{#if $fromInfiniteQuery.dataUpdatedAt}
						<span>
							Last updated
							<DateTime
								date={$fromInfiniteQuery.dataUpdatedAt || $fromInfiniteQuery.errorUpdatedAt}
								format="relative"
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
	:global(.loader.status-reloading) {
		animation: Reloading 0.75s infinite;
	}
	@keyframes Reloading {
		50% {
			opacity: 0.85;
		}
	}


	footer {
		font-size: 0.66em;
	}

	pre {
		max-height: 15em;
		overflow-y: auto;
	}
</style>
