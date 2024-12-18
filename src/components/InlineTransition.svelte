<script lang="ts">
	// Types
	type Key = $$Generic<any>
	type Value = $$Generic<any>
	type TransitionParams = $$Generic<{delay?: number; duration?: number; easing?: EasingFunction}>


	// Inputs
	export let key: Key | undefined
	export let value: Value | undefined
	export let isOpen: boolean = true
	export let renderOnlyWhenOpen = false

	export let align: 'start' | 'center' | 'end' = 'start'
	export let clip: boolean | undefined
	
	export let containerProps: Record<string, any> | undefined
	export let contentTransition: SizeContainer['$$prop_def']['contentTransition'] = [scale]
	export let contentProps: Record<string, any> | undefined
	
	
	// Components
	import type SizeContainer from './SizeContainer.svelte'
	import InlineContainer from './InlineContainer.svelte'


	// Transitions
	import { scale } from 'svelte/transition'
</script>


<InlineContainer
	{isOpen}
	{renderOnlyWhenOpen}

	{clip}

	containerProps={{
		...containerProps,
		class: `stack inline align-${align} ${containerProps && containerProps.class || ''}`,
	}}

	contentKey={key ?? value}
	{contentTransition}
	contentProps={{
		...contentProps,
		class: `stack inline align-${align} ${contentProps && contentProps.class || ''}`,
	}}
>
	<slot
		{key}
		{value}
	>
		{value}
	</slot>
</InlineContainer>
