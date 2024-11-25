<script lang="ts">
	// Inputs
	export let value: string
	export let startLength = 6
	export let endLength = 4
</script>


<span tabindex="0">{#if value}<span>{value.slice(0, startLength)}</span><span class="middle"><span>{value.slice(startLength, value.length / 2)}</span><span></span><span>{value.slice(value.length / 2, -endLength)}</span></span><span>{value.slice(-endLength)}</span>{/if}</span>


<style>
	[tabindex] {
		&:is(:active, :focus-within) {
			--isTruncated: 0;
		}

		&:not(:is(:active, :focus-within)) {
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

		> .middle {
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
	}
</style>
