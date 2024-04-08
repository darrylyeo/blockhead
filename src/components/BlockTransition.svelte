<script lang="ts">
	// Types
	import type { EasingFunction, TransitionConfig } from 'svelte/transition'

	type Key = $$Generic<any>
	type Value = $$Generic<any>
	type TransitionParams = $$Generic<{delay?: number; duration?: number; easing?: EasingFunction}>


	// Inputs
	// export let element = "span"
	export let key: Key | undefined
	export let value: Value | undefined
	export let renderOnlyWhenOpen = false
	export let clip = true

	// (View options)
	export let align: 'top' | 'center' | 'bottom' = 'top'
	export let transition: ((node: Element, _?: TransitionParams) => TransitionConfig) | undefined
	export let transitionParams: TransitionParams | undefined
	export let inTransition: ((node: Element, _?: TransitionParams) => TransitionConfig) | undefined
	export let inTransitionParams: TransitionParams | undefined
	export let outTransition: ((node: Element, _?: TransitionParams) => TransitionConfig) | undefined
	export let outTransitionParams: TransitionParams | undefined

	// (Computed)
	$: alignBlock = ({ 'top': 'start', 'center': 'center', 'bottom': 'end' } as const)[align]


	// Components
	import SizeContainer from './SizeContainer.svelte'
</script>


<SizeContainer
	layout="block"
	{renderOnlyWhenOpen}

	{clip}
	{alignBlock}

	containerProps={{
		class: `stack align-${align}`,
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
		class: `column align-${align}`,
	}}
>
	<slot
		{key}
		{value}
	>
		{value}
	</slot>
</SizeContainer>
