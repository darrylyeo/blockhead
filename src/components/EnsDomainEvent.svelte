<script lang="ts">
	import type { ENS } from '../data/ens'
	
    export let event: ENS.DomainEvent
</script>

<div class="card domain-event">
    <p>Transaction: {event.transactionID}</p>
    <p>Block Number: {event.blockNumber}</p>
    <!-- <p>{event.id}</p> -->
</div>