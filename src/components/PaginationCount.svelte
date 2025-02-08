<script lang="ts"
	generics="
		T extends number | bigint = number | bigint
	"
>
	// Inputs
	export let itemsCount: T | undefined

	export let currentRange = (
		typeof itemsCount === 'bigint' ?
			[0n, itemsCount] as const
		: typeof itemsCount === 'number' ?
			[0, itemsCount] as const
		:
			undefined
	) as [NonNullable<T>, NonNullable<T>] | undefined

	export let hasMoreItems: boolean | undefined = false

	// (View options)
	export let isShowingRange = false


	// Components
	import InlineTransition from './InlineTransition.svelte'
	import TweenedNumber from './TweenedNumber.svelte'
</script>


<span>(</span
	>{#if currentRange}<InlineTransition
		align="end"
		clip
		isOpen={isShowingRange && itemsCount !== undefined}
	><span
		><TweenedNumber
			value={
				typeof currentRange[0] === 'bigint' ?
					currentRange[0] + 1n
				: typeof currentRange[0] === 'number' ?
					currentRange[0] + 1
				:
					currentRange[0]
			}
		/> – <TweenedNumber
			value={currentRange[1]}
		/></span> of&nbsp;</InlineTransition
	>{/if}<TweenedNumber
		value={itemsCount}
	/>{
		#if itemsCount === undefined && hasMoreItems}+{/if
	}<span>)</span
>
