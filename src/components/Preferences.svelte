<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import {
		preferencesConfig, type Preference, type PreferenceId, type PreferenceSection, type PreferenceOption,
		preferences, resetPreferences,
	} from '$/state/preferences'
	import { triggerEvent } from '$/events/triggerEvent'


	// Inputs
	export let relevantPreferences: PreferenceId[] = []
	// (View options)
	export let isShowingAll = false


	// Functions
	const shouldShowPreference = (preference: Preference) => (
		relevantPreferences ? relevantPreferences.includes(preference.preferenceId) : true
	)

	const resolveOptionName = (name: PreferenceOption['name']) => (
		typeof name === 'function'
			? name($preferences)
			: name
	)


	// Components
	import NetworkIcon from './NetworkIcon.svelte'


	// Transitions/animations
	import { expoOut } from 'svelte/easing'
	import { flip } from 'svelte/animate'
	import { scale } from 'svelte/transition'
</script>


<form class="preferences" class:is-showing-all={isShowingAll}>
	<header class="column">
		<label for="preferences-button"><h3>Preferences</h3></label>

		{#if isShowingAll}
			<button
				type="button"
				class="small destructive"
				data-before="↻"
				on:click={resetPreferences}
			>Reset All</button>
		{/if}
	</header>
	<!-- <label class="header">
		<h3>Preferences</h3>
		<button type="button" class="medium" on:click={() => isShowingAll = !isShowingAll}>{isShowingAll ? 'Show Less' : 'Show All'}</button>
	</label> -->

	{#each
		isShowingAll
			? preferencesConfig
			: (
				relevantPreferences,
				preferencesConfig.filter((section) => (
					section.preferences.some(shouldShowPreference)
				))
			)
		as
		section, i (section.sectionId)
	}
		{@const sectionKey = section.sectionId}

		<!-- <section class="preference-section" transition:scale={{duration: 200, opacity: 0, delay: i * 20, easing: expoOut}} animate:flip={{duration: 250}}> -->
		<section
			class="preference-section"
			data-preference-section={sectionKey}
		>
			{#if isShowingAll}
				<h4
					class="row-inline"
					in:scale={{duration: 300, easing: expoOut, /* delay: i * 20 */}}
				>
					{section.name}
				</h4>
			{/if}

			{#each
				isShowingAll
					? section.preferences
					: section.preferences.filter(shouldShowPreference)
				as preference, j (preference.preferenceId)
			}
				{@const preferenceKey = preference.preferenceId}

				<label
					class="preference"
					data-preference={sectionKey}
					transition:scale={{duration: 200, opacity: 0, /* delay: i * 20 + j * 10, */ easing: expoOut}}
					animate:flip={{duration: 250, easing: expoOut}}
				>
					<span class="row-inline">
						{preference.name}
					</span>

					{#if preference.type === 'multiple'}
						<select
							multiple
							bind:value={$preferences[preferenceKey]}
							on:change={(e) => triggerEvent('Preferences/Change', {
								preferenceSectionKey: section.sectionId,
								preferenceKey: preference.preferenceId,
								preferenceValue: e.target.value,
							})}
						>
							{#each preference.options as optionOrOptionGroup ('groupId' in optionOrOptionGroup ? optionOrOptionGroup.groupId : optionOrOptionGroup.value)}
								{#if 'groupId' in optionOrOptionGroup}
									{@const optionGroup = optionOrOptionGroup}

									{#if optionGroup.options.length}
										<optgroup label={optionGroup.name}>
											{#each optionGroup.options as optionOrOptionGroup ('groupId' in optionOrOptionGroup ? optionOrOptionGroup.groupId : optionOrOptionGroup.value)}
												{#if 'groupId' in optionOrOptionGroup}
													{@const optionGroup = optionOrOptionGroup}

													<optgroup />
												{:else}
													{@const option = optionOrOptionGroup}

													<option value={option.value} disabled={option.disabled}>{resolveOptionName(option.name)}</option>
												{/if}
											{/each}
										</optgroup>
									{/if}
								{:else if 'value' in optionOrOptionGroup}
									{@const option = optionOrOptionGroup}

									<option value={option.value} disabled={option.disabled}>{resolveOptionName(option.name)}</option>
								{/if}
							{/each}
						</select>
					{:else}
						<select
							bind:value={$preferences[preferenceKey]}
							on:change={(e) => triggerEvent('Preferences/Change', {
								preferenceSectionKey: section.sectionId,
								preferenceKey: preference.preferenceId,
								preferenceValue: e.target.value,
							})}
						>
						<!--  multiple={type === 'multiple'} -->
							{#each preference.options as optionOrOptionGroup ('groupId' in optionOrOptionGroup ? optionOrOptionGroup.groupId : optionOrOptionGroup.value)}
								{#if 'groupId' in optionOrOptionGroup}
									{@const optionGroup = optionOrOptionGroup}

									{#if optionGroup.options.length}
										<optgroup label={optionGroup.name}>
											{#each optionGroup.options as optionOrOptionGroup ('groupId' in optionOrOptionGroup ? optionOrOptionGroup.groupId : optionOrOptionGroup.value)}
												{#if 'groupId' in optionOrOptionGroup}
													{@const optionGroup = optionOrOptionGroup}

													<optgroup />
												{:else}
													{@const option = optionOrOptionGroup}

													<option value={option.value} disabled={option.disabled}>{resolveOptionName(option.name)}</option>
												{/if}
											{/each}
										</optgroup>
									{/if}
								{:else if 'value' in optionOrOptionGroup}
									{@const option = optionOrOptionGroup}

									<option value={option.value} disabled={option.disabled}>{resolveOptionName(option.name)}</option>
								{/if}
							{/each}
						</select>
					{/if}
				</label>
			{/each}
		</section>
	{/each}

	<footer>
		<!-- <button
			type="button"
			class="medium"
			class:cancel={isShowingAll}
			data-before={isShowingAll ? '✕' : '· · ·'}
			on:click={() => isShowingAll = !isShowingAll}
		/> -->
		<button
			id="preferences-button"
			type="button"
			class="medium"
			data-before={isShowingAll ? '✓' : '· · ·'}
			on:click={() => isShowingAll = !isShowingAll}
		/>
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
