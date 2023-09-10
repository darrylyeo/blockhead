<script lang="ts">
	// Actions
	import { createQuery } from '@tanstack/svelte-query'


	// Internal state
	let username: string = ''


	// Outputs
	type $$Slots = {
		default: {
			user: { sub: string }
		}
	}


	// Actions
	import { trpc } from '../api/fireblocks-ncw/trpc'


	// Components
	import Loader from './Loader.svelte'
	import { FireblocksIcon } from '../assets/walletIcons'
</script>


<Loader
	{...$$restProps}
	startImmediately={false}
	fromQuery={createQuery({
		queryKey: ['FireblocksAuthentication', {
			username,
		}],
		queryFn: async () => (
			username
		),
	})}
	then={async (username) => ({
		sub: username
	})}
	loadingIcon={FireblocksIcon}
	loadingMessage={`Signing in with Fireblocks...`}
	errorMessage={`Couldn't sign-in with Fireblocks.`}
	clip={false}
	let:result={user}
>
	<svelte:fragment slot="idle" let:load>
		<form
			class="column"
			on:submit|preventDefault={load}
		>
			<slot name="header">
				<header class="bar wrap">
					<slot name="title" />

					<div role="toolbar" class="row wrap">
						<slot name="toolbar" />
					</div>
				</header>
			</slot>

			<hr>

			<div class="bar">
				<input type="text" bind:value={username} placeholder="Enter username..." />

				<button
					type="submit"
					class="fireblocks medium"
				>
					<img src={FireblocksIcon} width="20" />
					Sign in ›
				</button>
			</div>
		</form>
	</svelte:fragment>

	<slot {user} />
</Loader>


<style>
	.fireblocks {
		--primary-color: #14223D;
		color: #fff;
	}
</style>
