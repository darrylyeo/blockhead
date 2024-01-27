<script lang="ts">
	export let userId: string


	import { getUser } from '$/api/audius'


	import AudiusUser from './AudiusUser.svelte'
	import Loader from './Loader.svelte'


	import { AudiusIcon } from '$/assets/icons'
</script>


{#if userId}
	<Loader
		loadingIcon={AudiusIcon}
		loadingMessage="Fetching user data from Audius network..."
		fromPromise={() => getUser({userId}).then(({data: user}) => user)}
		let:result={user}
	>
		<slot slot="header" name="header" />

		<AudiusUser {user} />
	</Loader>
{/if}