<script lang="ts">
	// Inputs
	export let value: string

	// (View options)
	export let startLength = 6
	export let endLength = 4

	export let format: 'abbr' | 'visual' | 'visual-characters' = 'visual'


	// (Computed)
	$: isTruncated = startLength + endLength < value.length
	$: excess = Math.max(0, startLength + endLength - value.length)
	$: _startLength = startLength - (startLength > endLength ? Math.ceil : Math.floor)(excess / 2)
	$: _endLength = endLength - (startLength > endLength ? Math.floor : Math.ceil)(excess / 2)
</script>


{#if format === 'abbr'}
	{@const formattedValue = (
		isTruncated ?
			`${value.slice(0, startLength)}⸱⸱⸱${value.slice(-endLength || value.length)}`
		:
			value
	)}

	<abbr title={value}>{formattedValue}</abbr>

{:else if format === 'visual'}
	<span
		data-format="visual"
		data-is-truncated={isTruncated}
		tabindex="0"
	>
		{#if value}
			{@const start = value.slice(0, _startLength)}
			{@const middle = value.slice(_startLength, -_endLength || value.length)}
			{@const end = value.slice(-_endLength || value.length)}

			<span>{start}</span><span class="middle"><span>{middle.slice(0, middle.length / 2)}</span><span aria-hidden="true"></span><span>{middle.slice(middle.length / 2)}</span></span><span>{end}</span>
		{/if}
	</span>

{:else if format === 'visual-characters'}
	<span
		data-format="visual-characters"
		data-is-truncated={isTruncated}
		tabindex="0"
	>{#if _startLength}<span>{value.slice(0, _startLength)}</span>{/if}<span class="middle" style:--l={value.length - _startLength - _endLength}>{#each value.slice(_startLength, -_endLength || value.length) as char, i}<span style:--i={i}>{char}</span>{/each}</span>{#if _endLength}<span>{value.slice(-_endLength)}</span>{/if}</span>

{/if}


<style>
	[tabindex] {
		--isTruncated: 0;

		&:not(
			:is(
				:active,
				:focus-within,
				[data-is-truncated="false"]
			)
		) {
			--isTruncated: 1;
			cursor: zoom-in;
		}

		* {
			text-decoration: none;
		}

		&:focus-within {
			outline: 1px solid var(--primary-color);
			outline-offset: 2px;
			text-shadow: 0 0.5px 0.2em var(--primary-color);
		}

		&[data-format="visual"] > .middle {
			align-items: baseline;

			> span {
				word-break: break-all;

				transition-property: font-size;
				transition-duration: 0.2s;
				transition-timing-function: var(--ease-out-expo);

				&:not(:empty) {
					font-size: calc((1 - var(--isTruncated)) * 1em);
					letter-spacing: calc((1 - var(--isTruncated)) * 0.03ch);
				}

				&:empty {
					font-size: calc(var(--isTruncated) * 1em);
					letter-spacing: calc(var(--isTruncated) * 0.03ch);

					opacity: var(--isTruncated);
					text-decoration: none;

					pointer-events: none;

					&:after {
						content: '⸱⸱⸱';
					}
				}
			}
		}

		&[data-format="visual-characters"] > span {
			vertical-align: baseline;

			&.middle {
				> span {
					--d: (
						1 - sin(var(--i) / (var(--l) - 1) * 180deg)
					);

					--x: (
						pow(
							var(--d),
							var(--isTruncated) * 2.5
						)
					);

					vertical-align: middle;

					font-size: calc(var(--x) * 1em);
					letter-spacing: calc(var(--x) * 0.03ch);

					transition-property: font-size;
					transition-duration: 0.2s;
				}
			}
		}
	}
</style>
