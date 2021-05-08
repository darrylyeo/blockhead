<script lang="ts">
	import { goto } from '@sapper/app'
	import { onMount } from 'svelte'

	onMount(() => goto('explorer/bitcoin'))
</script>