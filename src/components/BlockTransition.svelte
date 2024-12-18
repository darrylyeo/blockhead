<script lang="ts">
	// Types
	import type { EasingFunction } from 'svelte/transition'

	type Key = $$Generic<any>
	type Value = $$Generic<any>
	type TransitionParams = $$Generic<{delay?: number; duration?: number; easing?: EasingFunction}>


	// Inputs
	// export let element = "span"
	export let key: Key | undefined
	export let value: Value | undefined
	export let isOpen = true
	export let renderOnlyWhenOpen = false
	export let clip = true

	// (View options)
	export let align: 'top' | 'center' | 'bottom' = 'top'
	
	export let containerProps: Record<string, any> | undefined
	export let contentTransition: SizeContainer['$$prop_def']['contentTransition'] = [scale]
	export let contentProps: Record<string, any> | undefined

	// (Computed)
	$: alignBlock = ({ 'top': 'start', 'center': 'center', 'bottom': 'end' } as const)[align]


	// Components
	import SizeContainer from './SizeContainer.svelte'


	// Transitions
	import { scale } from 'svelte/transition'
</script>


<SizeContainer
	layout="block"
	{isOpen}
	{renderOnlyWhenOpen}

	{clip}
	{alignBlock}

	containerProps={{
		...containerProps,
		class: `stack align-${align} ${containerProps && containerProps.class || ''}`,
	}}

	contentKey={key ?? value}
	{contentTransition}
	contentProps={{
		...contentProps,
		class: `column align-${align} ${contentProps && contentProps.class || ''}`,
	}}
>
	<slot
		{key}
		{value}
	>
		{value}
	</slot>
</SizeContainer>
