<script context="module" lang="ts">
	export enum RangeFormat {
		StartIndexed = 'StartIndexed',
		EndIndexed = 'EndIndexed',
	}
</script>


<script lang="ts"
	generics="
		T extends number | bigint = number | bigint
	"
>
	// Inputs
	export let itemsCount: T | undefined

	export let currentRange: [NonNullable<T>, NonNullable<T>] | undefined

	$: currentRange ??= (
		typeof itemsCount === 'bigint' ?
			[0n, itemsCount] as [NonNullable<T>, NonNullable<T>]
		: typeof itemsCount === 'number' ?
			[0, itemsCount] as [NonNullable<T>, NonNullable<T>]
		:
			undefined
	)

	export let hasMoreItems: boolean | undefined = false

	// (View options)
	export let isShowingRange = false
	export let rangeFormat: RangeFormat = RangeFormat.StartIndexed
	export let isShowingRangePrefix = rangeFormat === RangeFormat.EndIndexed
	export let rangePrefix: string = {
		[RangeFormat.StartIndexed]: 'first',
		[RangeFormat.EndIndexed]: 'last',
	}[rangeFormat]

	// Internal state
	$: isFromEnd = rangeFormat === RangeFormat.EndIndexed && itemsCount !== undefined

	/** 1-indexed, end-exclusive */
	$: displayedRange = currentRange && (
		isFromEnd ?
			typeof currentRange[1] === 'bigint' ?
				[
					itemsCount - currentRange[1] + 1n as T,
					itemsCount - currentRange[0] + 1n as T,
				] as const
			: typeof currentRange[1] === 'number' ?
				[
					itemsCount - currentRange[1] + 1 as T,
					itemsCount - currentRange[0] + 1 as T,
				] as const
			:
				undefined as never

		:
			[
				(
					typeof currentRange[0] === 'bigint' ?
						currentRange[0] + 1n as T
					: typeof currentRange[0] === 'number' ?
						currentRange[0] + 1 as T
					:
						undefined as never
				),
				currentRange[1]
			] as const
	)


	// Components
	import InlineTransition from './InlineTransition.svelte'
	import TweenedNumber from './TweenedNumber.svelte'
</script>


<span>(</span
	>{#if currentRange && currentRange[1] > currentRange[0] && displayedRange}<InlineTransition
		align="end"
		clip
		isOpen={isShowingRange && itemsCount !== undefined}
	>{#if isShowingRangePrefix && rangePrefix}{rangePrefix} {/if}<span
		><TweenedNumber
			value={displayedRange[0]}
		/> – <TweenedNumber
			value={displayedRange[1]}
		/></span> of&nbsp;</InlineTransition
	>{/if}<TweenedNumber
		value={itemsCount}
	/>{
		#if hasMoreItems}+{/if
	}<span>)</span
>
