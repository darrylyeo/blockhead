<script lang="ts">
	// const onMount = () => {
		globalThis.window.onmousemove = ({x, y}) => {
			globalThis.document.documentElement.style.setProperty('--mouseX', x.toString())
			globalThis.document.documentElement.style.setProperty('--mouseY', y.toString())
		}
	// }
</script>


<!-- <svelte:window
	on:mousemove={({x, y}) => {
		globalThis.document.documentElement.style.setProperty('--mouseX', x.toString())
		globalThis.document.documentElement.style.setProperty('--mouseY', y.toString())
	}}
/> -->


<style>
	.tooltip {
		position: sticky;
		top: 0;
		left: 0;
		transform: translate(
			min(var(--mouseX) * 1px, 100vw - 100%),
			min(var(--mouseY) * 1px, 100vh - 100%)
		);
	}

	.tooltip:before {
		content: var(--title);
	}
</style>


<div class="tooltip"><!-- use:onMount -->
	Whee
</div>