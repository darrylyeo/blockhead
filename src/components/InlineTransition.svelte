<script lang="ts">
	import { type EasingFunction, type TransitionConfig, scale } from 'svelte/transition'


	type Key = $$Generic<any>
	type Value = $$Generic<any>
	type TransitionParams = $$Generic<{delay?: number; duration?: number; easing?: EasingFunction}>


	export let key: Key | undefined
	export let value: Value | undefined
	export let isOpen: boolean = true
	export let renderOnlyWhenOpen = false

	export let contentProps: Record<string, any> | undefined

	export let align: 'start' | 'center' | 'end' = 'start'
	export let clip: boolean | undefined

	export let transition: ((node: Element, _?: TransitionParams) => TransitionConfig) | undefined = scale
	export let transitionParams: TransitionParams | undefined
	export let inTransition: ((node: Element, _?: TransitionParams) => TransitionConfig) | undefined
	export let inTransitionParams: TransitionParams | undefined
	export let outTransition: ((node: Element, _?: TransitionParams) => TransitionConfig) | undefined
	export let outTransitionParams: TransitionParams | undefined


	import InlineContainer from './InlineContainer.svelte'
</script>


<InlineContainer
	{isOpen}
	{renderOnlyWhenOpen}

	{clip}

	containerProps={{
		class: `stack inline align-${align}`,
	}}

	contentKey={key ?? value}
	contentTransition={
		transition ?
			[transition, transitionParams]
		: inTransition || outTransition ?
			{
				...inTransition && { in: [inTransition, inTransitionParams] },
				...outTransition && { out: [outTransition, outTransitionParams] },
			}
		: undefined
	}
	contentProps={{
		class: `stack inline align-${align}`,
		...contentProps,
	}}
>
	<span
		class={`row inline align-${align}`}
	>
		<slot
			{key}
			{value}
		>
			{value}
		</slot>
	</span>
</InlineContainer>
