<script lang="ts">
	import { preferences, preferencesConfig } from '../data/ethereum/preferences'


	import { scale } from 'svelte/transition'
</script>


<style>
	.preferences {
		font-size: 0.9em;
		--padding-inner: 1.25em;

		align-items: stretch;
	}

	.preference-section {
		display: contents;
	}

	/* label {
		display: grid;
		gap: 0.2em;
	}
	label span {
		font-size: 0.9em;
	} */
	label {
		display: flex;
		align-items: baseline;
		gap: 0.5em;
	}
	/* label {
		--padding-inner: 0.25em;
	} */
	/* label > span {
		display: block;
		opacity: 0.85;
		letter-spacing: 0.2ch;
		font-size: 0.8em;
		text-transform: uppercase;
	} */
</style>


<div class="preferences bar">
	<h3>Preferences</h3>

	{#each preferencesConfig as preferencesSection (preferencesSection.id)}
		<section class="preference-section row" transition:scale>
			<!-- <h4>{preferencesSection.name}</h4> -->
			{#each preferencesSection.preferences as {id, name, type, options} (id)}
				<label>
					<span>{name}</span>
					<select bind:value={$preferences[id]}><!--  multiple={type === 'multiple'} -->
						{#each options as {id, name, options, value, disabled} (id)}
							{#if options}
								<optgroup label={name}>
									{#each options as {id, name, value, disabled} (id)}
										<option value={value || id} disabled={disabled}>{name}</option>
									{/each}
								</optgroup>
							{:else}
								<option value={value || id} disabled={disabled}>{name}</option>
							{/if}
						{/each}
					</select>
				</label>
			{/each}
		</section>
	{/each}
</div>