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


	// Internal state
	/** 1-indexed, end-exclusive */
	$: displayedRange = currentRange && [
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


	// Components
	import InlineTransition from './InlineTransition.svelte'
	import TweenedNumber from './TweenedNumber.svelte'
</script>


<span>(</span
	>{#if displayedRange}<InlineTransition
		align="end"
		clip
		isOpen={isShowingRange && itemsCount !== undefined}
	><span
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
