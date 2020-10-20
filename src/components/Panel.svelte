<script>
    import Controls from "./Controls.svelte"
</script>

<Controls>
    <slot name="title"></slot>
    <slot name="controls"></slot>
</Controls>

<slot></slot>