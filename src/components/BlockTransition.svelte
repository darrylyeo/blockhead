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
<SizeContainer class="stack align-{align}" {...$$restProps}>{#key key ?? value}{#if transition}<div class="column align-{align}" transition:transition|global={transitionParams}><slot {key} {value}>{value}</slot></div>{:else if inTransition && outTransition}<div class="column align-{align}" in:inTransition|global={inTransitionParams} out:outTransition|global={outTransitionParams}><slot {key} {value}>{value}</slot></div>{/if}{/key}</SizeContainer>
