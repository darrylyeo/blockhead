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
	renderOnlyWhenOpen={false}
	containerProps={{
		class: `stack align-${align}`,
	}}
	contentKey={key ?? value}
	{alignBlock}
>
	{#if transition}
		<div
			class="column align-{align}"
			transition:transition|global={transitionParams}
		>
			<slot
				{key}
				{value}
			>
				{value}
			</slot>
		</div>
	{:else if inTransition && outTransition}
		<div
			class="column align-{align}"
			in:inTransition|global={inTransitionParams}
			out:outTransition|global={outTransitionParams}
		>
			<slot
				{key}
				{value}
			>
				{value}
			</slot>
		</div>
	{/if}
</SizeContainer>
