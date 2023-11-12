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


	// Components
	import SizeContainer from './SizeContainer.svelte'
</script>


<!-- <SizeContainer class="stack align-{align}" {...$$restProps}>{#key key ?? value}<svelte:element this={element} class="column align-{align}" transition:transition={transitionParams}><slot {key} {value}>{value}</slot></svelte:element>{/key}</SizeContainer> -->
<SizeContainer class="stack align-{align}" {...$$restProps}>{#key key ?? value}{#if transition}<span class="column align-{align}" transition:transition={transitionParams}><slot {key} {value}>{value}</slot></span>{:else if inTransition && outTransition}<span class="column align-{align}" in:inTransition={inTransitionParams} out:outTransition={outTransitionParams}><slot {key} {value}>{value}</slot></span>{/if}{/key}</SizeContainer>
