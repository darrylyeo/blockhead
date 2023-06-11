<script lang="ts">
	import { type EasingFunction, type TransitionConfig, scale } from 'svelte/transition'


    type Key = $$Generic<any>
    type Value = $$Generic<any>
    type TransitionParams = $$Generic<{delay?: number; duration?: number; easing?: EasingFunction}>


    export let element = "span"
    export let key: Key | undefined
    export let value: Value | undefined


    export let align: 'top' | 'center' | 'bottom' = 'top'
    export let transition: (node: Element, _?: TransitionParams) => TransitionConfig = scale
    export let transitionParams: TransitionParams | undefined


    import SizeContainer from './SizeContainer.svelte'
</script>


<SizeContainer class="stack align-{align}" {...$$restProps}>{#key key ?? value}<svelte:element this={element} class="column align-{align}" transition:transition|local={transitionParams}><slot {key} {value}>{value}</slot></svelte:element>{/key}</SizeContainer>
