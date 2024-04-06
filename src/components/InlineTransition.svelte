<script lang="ts">
	import { type EasingFunction, type TransitionConfig, scale } from 'svelte/transition'


	type Key = $$Generic<any>
	type Value = $$Generic<any>
	type TransitionParams = $$Generic<{delay?: number; duration?: number; easing?: EasingFunction}>


	export let key: Key | undefined
	export let value: Value | undefined
	export let isOpen: boolean = true

	export let contentProps: Record<string, any> | undefined

	export let align: 'start' | 'center' | 'end' = 'start'
	export let clip: boolean | undefined

	export let transition: (node: Element, _?: TransitionParams) => TransitionConfig = scale
	export let transitionParams: TransitionParams | undefined


	import InlineContainer from './InlineContainer.svelte'
</script>


<InlineContainer
	{isOpen}
	renderOnlyWhenOpen={false}
	containerProps={{
		class: `stack inline align-${align}`,
	}}
	contentProps={{
		class: `stack inline align-${align}`,
	}}
	contentKey={key ?? value}
	{clip}
>{
	#if isOpen
		}<span
			class={`row inline align-${align}`}
			{...contentProps}
			transition:transition|global={transitionParams}
			><slot
				{key}
				{value}
			>{value}</slot
		></span>{
	/if
}</InlineContainer>
