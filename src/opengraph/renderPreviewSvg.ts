export const renderPreviewSvg = ({
	title = '',
	subtitle = '',
	annotation = '',
	body = '',
	url,
	primaryColor = '',
	width = 1620,
	height = 1080,
}: {
	title: string | undefined,
	subtitle: string | undefined,
	annotation: string | undefined,
	body: string | undefined,
	url: URL,
	primaryColor: string | undefined,
	width: number | undefined,
	height: number | undefined,
}) => {
	const style = {
		padding: 80,
		headerHeight: 80,
		logoWidth: 120,
		logoHeight: 120,
		footerGap: 30,
	}

	const urlString = `${url.host}${url.pathname}`

	return `
		<svg xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 ${width} ${height}"
		>
			<style>
				:root {
					--global-background-gradient-base-color: #01002d;
					--primary-color: ${primaryColor};

					font-size: 40px;
					fill: hsl(0 0 255 / 0.5);
					font-family: sans-serif;
					/* font-family: Arial Narrow, sans-serif; */
					
				}

				.title {
					font-size: 1.5em;
					font-size: min(42rem / var(--length), 1.5rem);
					font-weight: 700;
				}

				.subtitle {
					fill-opacity: 0.75;
					font-size: min(42rem / var(--length), 0.8rem);
				}

				.monospace {
					font-family: 'Ubuntu Mono', monospace;
					word-spacing: -.5ch;
				}

				.url {
					font-size: 0.8em;
					font-size: min(52rem / var(--length), 1rem);
				}

				.h3 {
					font-size: 1.17em;
					font-weight: 900;
					font-family: monospace, sans-serif;
				}

				.align-start {
					text-anchor: start;
					dominant-baseline: middle;
				}

				.align-end {
					text-anchor: end;
					dominant-baseline: middle;
				}

				.annotation {
					fill-opacity: 0.4;
					letter-spacing: 0.2ch;
					font-size: 0.8em;
					text-transform: uppercase;
				}
			</style>

			<!-- Background -->
			<rect x="0" y="0" width="100%" height="100%" fill="rgba(0, 0, 0, 0.5)" />

			<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" style="stop-color: var(--global-background-gradient-base-color)" />
				<stop offset="100%" style="stop-color: var(--primary-color)" />
			</linearGradient>

			<rect x="0" y="0" width="250%" height="250%" fill="url(#gradient)" />

			<defs>
				<symbol
					id="logo"
					viewBox="0 0 512 512"
				>
					<svg viewBox="0 0 512 512"><g clip-path="url(#a)"><mask id="c" width="512" height="512" x="0" y="0" mask-type="alpha" maskUnits="userSpaceOnUse"><path fill="#000" d="M253.12 403.4h-78.54c-10.92 0-16.38-5.6-16.38-16.8V130.4c0-5.6 1.4-9.66 4.2-12.18 2.8-2.8 7-4.34 12.6-4.62l73.5-4.2c32.2-1.96 56.98 4.06 74.34 18.06 17.36 13.72 26.04 31.92 26.04 54.6 0 15.12-4.06 28.28-12.18 39.48-8.12 11.2-17.5 19.46-28.14 24.78 20.44 5.04 35.7 13.72 45.78 26.04 10.36 12.32 15.54 27.02 15.54 44.1 0 28.56-9.66 50.26-28.98 65.1-19.32 14.56-48.58 21.84-87.78 21.84zM235.9 168.2l-16.8 1.26v51.66h23.1c16.52 0 28.28-2.24 35.28-6.72 7-4.76 10.5-11.76 10.5-21s-3.78-16.1-11.34-20.58c-7.56-4.48-21.14-6.02-40.74-4.62zm-16.8 176.4h44.1c16.52 0 28.28-2.66 35.28-7.98s10.5-13.3 10.5-23.94-4.34-18.76-13.02-24.36c-8.4-5.6-22.12-8.4-41.16-8.4h-35.7v64.68z"/><path fill="url(#b)" fill-opacity=".2" d="M0 0h512v512H0z"/><path fill="#000" fill-rule="evenodd" d="M512 0H0v512h512V0zM150 50C94.772 50 50 94.772 50 150v212c0 55.228 44.772 100 100 100h212c55.228 0 100-44.772 100-100V150c0-55.228-44.772-100-100-100H150z" clip-rule="evenodd"/></mask><g mask="url(#c)"><rect width="512" height="512" fill="url(#d)" rx="150"/></g></g><defs><radialGradient id="b" cx="0" cy="0" r="1" gradientTransform="rotate(90 0 256) scale(256)" gradientUnits="userSpaceOnUse"><stop stop-opacity="0"/><stop offset="1"/></radialGradient><linearGradient id="d" x1="0" x2="512" y1="0" y2="512" gradientUnits="userSpaceOnUse"><stop offset=".172" stop-color="#627EEA"/><stop offset="1" stop-color="#47CCF7"/></linearGradient><clipPath id="a"><path fill="#fff" d="M0 0h512v512H0z"/></clipPath></defs></svg>
				</symbol>
			</defs>

			<!-- Top left -->
			<g
				class="align-start"
				style="
					translate: 0 0;
				"
			>
				<g
					transform="translate(${style.padding} ${style.padding})"
				>
					<text
						class="title monospace"
						y="${style.headerHeight / 2}"
						style="
							--length: ${title.length};
						"
					>
						${title}
					</text>

					<text
						class="subtitle monospace"
						y="${style.headerHeight / 2 + 75}"
						style="
							--length: ${title.length};
						"
					>
						${subtitle}
					</text>
				</g>
			</g>

			<!-- Top right -->
			<g
				class="align-end"
				style="
					translate: 100% 0;
				"
			>
				<g
					transform="translate(${-style.padding} ${style.padding})"
				>
					<text
						x="0"
						y="${style.headerHeight / 2}"
						class="annotation"
					>
						${annotation}
					</text>
				</g>
			</g>

			<!-- Center left -->
			<g
				class="align-start"
				style="
					translate: 0 50%;
				"
			>
				<g
					transform="translate(${style.padding} 0)"
				>
					${body.split('\n').map((line, index) => `
						<text
							class="monospace"
							y="${index * 40}"
						>
							${line}
						</text>
					`).join('\n')}
				</g>
			</g>

			<!-- Bottom left -->
			<g
				class="align-start"
				style="
					translate: 0 100%;
				"
			>
				<g
					transform="translate(${style.padding} ${-style.padding})"
				>
					<!-- Logo -->
					<use href="#logo"
						viewBox="0 0 512 512"
						x="0"
						y="${-style.logoHeight}"
						width="${style.logoWidth}"
						height="${style.logoHeight}"
					/>

					<!-- <text
						x="${style.logoWidth + style.footerGap}"
						y="${-style.logoHeight / 2}"
						style="
							text-anchor: start;
							dominant-baseline: middle;

							font-size: 50px;
						"
					>
						<tspan
							style="
								text-transform: uppercase;
								letter-spacing: 0.225ch;
								font-weight: 900;
							"
						>Blockhead</tspan>
						› ${'Explorer'}
					</text> -->

					<text
						class="url monospace align-start"
						x="${style.logoWidth + style.footerGap}"
						y="${-style.logoHeight / 2}"
						style="
							--length: ${urlString.length};
						"
					>
						${urlString}
					</text>
				</g>
			</g>
		</svg>
	`
}
