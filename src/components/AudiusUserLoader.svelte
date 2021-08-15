<script lang="ts">
	export let userId: string


	import { getUser } from '../data/audius/audius'


	import AudiusUser from './AudiusUser.svelte'
	import Loader from './Loader.svelte'
</script>


{#if userId}
	<Loader
		loadingIcon={'/logos/audius-icon.png'}
		loadingMessage="Fetching user data from Audius network..."
		fromPromise={() => getUser({userId}).then(({data: user}) => user)}
		let:then={user}
	>
		<slot slot="header" name="header" />

		<AudiusUser {user} />
	</Loader>
{/if}