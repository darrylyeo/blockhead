<script lang="ts">
	import { preferences, preferencesConfig, resetPreferences } from '../state/preferences'
	import { triggerEvent } from '../events/triggerEvent'


	export let relevantPreferences = []

	export let isShowingAll = false

	const isShowingPreference = ({id}) => isShowingAll || !(relevantPreferences.length && !relevantPreferences.includes(id))


	const resolveName = name =>
		typeof name === 'function'
			? name($preferences)
			: name


	import { expoOut } from 'svelte/easing'
	import { flip } from 'svelte/animate'
	import { scale } from 'svelte/transition'
</script>


<form class="preferences" class:is-showing-all={isShowingAll}>
	<header class="column" on:click={() => isShowingAll = !isShowingAll}>
		<h3>Preferences</h3>
		{#if isShowingAll}
			<button type="button" class="small" on:click={resetPreferences}>Reset All</button>
		{/if}
	</header>
	<!-- <label class="header">
		<h3>Preferences</h3>
		<button type="button" class="medium" on:click={() => isShowingAll = !isShowingAll}>{isShowingAll ? 'Show Less' : 'Show All'}</button>
	</label> -->

	{#each isShowingAll
		? preferencesConfig
		: (relevantPreferences, preferencesConfig.filter(preferencesSection => preferencesSection.preferences.some(isShowingPreference)))
		as
		preferencesSection, i (preferencesSection.id)
	}
		<!-- <section class="preference-section" transition:scale={{duration: 200, opacity: 0, delay: i * 20, easing: expoOut}} animate:flip={{duration: 250}}> -->
		<section class="preference-section">
			{#if isShowingAll}
				<h4 in:scale={{duration: 300, easing: expoOut, /* delay: i * 20 */}}>{preferencesSection.name}</h4>
			{/if}
			{#each
				preferencesSection.preferences.filter(isShowingPreference)
				as {id, name, type, options}, j (id)
			}
				<label class="preference" transition:scale={{duration: 200, opacity: 0, /* delay: i * 20 + j * 10, */ easing: expoOut}} animate:flip={{duration: 250, easing: expoOut}}>
					<span>{name}</span>
					{#if type === 'multiple'}
						<select
							multiple
							bind:value={$preferences[id]}
							on:change={(e) => triggerEvent('Preferences/Change', { preferenceKey: id, preferenceValue: e.target.value })}
						>
							{#each options as {id, name, options, value, disabled} (id)}
								{#if options}
									<optgroup label={name}>
										{#each options as {id, name, value, disabled} (id)}
											<option value={value || id} disabled={disabled}>{resolveName(name)}</option>
										{/each}
									</optgroup>
								{:else}
									<option value={value || id} disabled={disabled}>{resolveName(name)}</option>
								{/if}
							{/each}
						</select>
					{:else}
						<select
							bind:value={$preferences[id]}
							on:change={(e) => triggerEvent('Preferences/Change', {
								preferenceSectionKey: preferencesSection.id,
								preferenceKey: id,
								preferenceValue: e.target.value
							})}
						>
						<!--  multiple={type === 'multiple'} -->
							{#each options as {id, name, options, value, disabled} (id)}
								{#if options}
									<optgroup label={name}>
										{#each options as {id, name, value, disabled} (id)}
											<option value={value || id} disabled={disabled}>{resolveName(name)}</option>
										{/each}
									</optgroup>
								{:else}
									<option value={value || id} disabled={disabled}>{resolveName(name)}</option>
								{/if}
							{/each}
						</select>
					{/if}
				</label>
			{/each}
		</section>
	{/each}

	<footer>
		<button type="button" class="medium" on:click={() => isShowingAll = !isShowingAll}>{isShowingAll ? '✕' : '· · ·'}</button>
	</footer>
</form>


<style>
	.preferences {
		--scrollbar-height: 2px;

		--padding-inner: 1.25em;
		height: 3.5rem;
		padding: var(--padding-outer);

		font-size: 0.85em;

		overflow: auto hidden;

		/* display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: var(--padding-inner);
		justify-content: start;
		align-content: start; */
		
		gap: 1.5em;
		align-items: stretch;

		display: flex;
		transition: background-color 0.25s, gap 0.25s;
		/* transition: background-color 0.2s, height 0.2s ease-out; */
	}
	.preferences.is-showing-all {
		gap: 2em;

		/* height: 14em; */
		height: max-content;
		/* justify-content: center; */

		background-color: rgba(var(--rgb-light-dark), 0.4);
	}
	.preferences::scrollbar {
		height: var(--scrollbar-height);
	}
	.preferences::-webkit-scrollbar {
		height: var(--scrollbar-height);
	}

	.preferences > * {
		min-width: max-content;
	}


	/* .header, .footer {
		transition: margin 0.3s;
	} */

	header {
		gap: 0.75em 1.5em;
		justify-items: start;
	}
	.preferences:not(.is-showing-all) > header {
		position: sticky;
		left: 0;
		z-index: 1;

		/* background: linear-gradient(to right, rgba(var(--rgb-light-dark), 0.2) calc(100% - var(--padding-outer)), transparent); */
		background-color: rgba(var(--rgb-light-dark), 0.42);
		box-shadow: 0 0 var(--padding-outer) calc(var(--padding-outer) / 2) rgba(var(--rgb-light-dark), 0.5);
		left: calc(-1 * var(--padding-outer));
		margin: calc(-1 * var(--padding-outer));
		padding: var(--padding-outer);

		margin-right: auto;

		display: flex;
		align-items: center;
	}
	.preferences.is-showing-all > header {
		margin-left: auto;
	}

	footer {
		position: sticky;
		right: 0;
		z-index: 1;
	}
	.preferences:not(.is-showing-all) > footer {		
		/* background: linear-gradient(to left, rgba(var(--rgb-light-dark), 0.2) calc(100% - var(--padding-outer)), transparent); */
		background-color: rgba(var(--rgb-light-dark), 0.42);
		box-shadow: 0 0 var(--padding-outer) calc(var(--padding-outer) / 2) rgba(var(--rgb-light-dark), 0.5);
		right: calc(-1 * var(--padding-outer));
		margin: calc(-1 * var(--padding-outer));
		padding: var(--padding-outer);

		margin-left: auto;

		display: flex;
		align-items: center;
	}
	.preferences.is-showing-all > footer {
		margin-right: auto;
	}

	.preference-section {
		display: inline-flex;
		max-height: inherit;
		gap: 0.75em 1.5em;
		align-content: stretch;

		/* flex-direction: column;
		flex-wrap: wrap; */

		flex-direction: row;
	}
	/* .preference:not(.is-showing-all) .preference-section:empty {
		display: none;
	} */
	.preferences.is-showing-all .preference-section {
		flex-direction: column;
	}

	h4 {
		line-height: 1.5;
		/* text-align: center; */
	}

	.preference {
		justify-content: space-between;
	}
	/* .preferences.is-showing-all .preference > * {
		min-width: 50%;
	}
	.preferences.is-showing-all .preference > span {
		text-align: right;
	} */


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


	select[multiple] {
		height: 1.8em;
	}
</style>
