<script lang="ts">
	import Nav from '$/views/Nav.svelte'
	import Visualization from '$/views/threlte/Visualization.svelte'
	import { Canvas } from '@threlte/core'
</script>


<Canvas>
	<Visualization
		compact={false}
	/>
</Canvas>
