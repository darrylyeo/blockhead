<script lang="ts">
	import { type EasingFunction, type TransitionConfig, scale } from 'svelte/transition'


    type Key = $$Generic<any>
    type Value = $$Generic<any>
    type TransitionParams = $$Generic<{delay?: number; duration?: number; easing?: EasingFunction}>


    export let key: Key | undefined
    export let value: Value | undefined


    export let align: 'start' | 'center' | 'end' = 'start'
    export let transition: (node: Element, _?: TransitionParams) => TransitionConfig = scale
    export let transitionParams: TransitionParams | undefined


    import InlineContainer from './InlineContainer.svelte'
</script>


<InlineContainer class="stack inline align-{align}" {...$$restProps}>{#key key ?? value}<span class="row inline align-{align}" transition:transition={transitionParams}><slot {key} {value}>{value}</slot></span>{/key}</InlineContainer>
