<script lang="ts">
	// Types
	import type { FarcasterFrameServerMeta, FarcasterFrameSignaturePacket } from '$/api/farcaster/frame'


	// Inputs
	export let frameUrl: string
	export let farcasterFrameMetadata: FarcasterFrameServerMeta


	// Internal state
	export let history: FarcasterFrameServerMeta[] = []

	$: history = [...history, farcasterFrameMetadata]



	// Functions
	import { parseFarcasterFrameServerMeta } from '$/api/farcaster/frame'


	// Actions
	const onSubmit = async ({
		inputText,
		buttonIndex,
	}: {
		inputText: string
		buttonIndex: number
	}) => {
		const signaturePacket: FarcasterFrameSignaturePacket = {
			untrustedData: {
				inputText,
				buttonIndex,
			},
			trustedData: {
				
			},
		}

		const button = farcasterFrameMetadata.buttons?.[buttonIndex - 1]

		const postUrl =
			button && (button.action === 'post' || button.action === 'post_redirect') && button.targetUrl ?
				button.targetUrl
			: farcasterFrameMetadata.postUrl ?
				farcasterFrameMetadata.postUrl
			:
				frameUrl

		const html = await fetch(postUrl, {
			method: 'POST',
			body: JSON.stringify(signaturePacket),
		})
			.then(async response => {
				if (!response.ok)
					throw new Error(`Failed to fetch ${postUrl}: ${response.status} ${response.statusText}`)

				return await response.text()
			})

		const document = new DOMParser().parseFromString(html, 'text/html')

		const newFarcasterFrameMetadata = parseFarcasterFrameServerMeta(
			Object.fromEntries(
				Array.from(
					document.querySelectorAll('meta[property^="fc:frame"]') as NodeListOf<HTMLMetaElement>,
					metaElement => [
						metaElement.attributes.getNamedItem('property')!.textContent,
						metaElement.content,
					],
				)
			)
		)

		farcasterFrameMetadata = newFarcasterFrameMetadata
	}


	// Internal state
	let inputText: string


	// Transitions/animations
	import { blur } from 'svelte/transition'
</script>


<div class="stack">
	{#each Object.entries(history).slice(-1) as [i, farcasterFrameMetadata] (i)}
		<div
			class="column"
			transition:blur={{ duration: 300 }}
		>
			{#if farcasterFrameMetadata.image}
				<img
					src={farcasterFrameMetadata.image.url}
					style:aspect-ratio={(farcasterFrameMetadata.image.aspectRatio ?? '1.91:1').replace(':', ' / ')}
					alt=""
				/>
			{/if}

			{#if farcasterFrameMetadata.textInput || farcasterFrameMetadata.buttons?.length}
				<form
					action={farcasterFrameMetadata.postUrl}
					on:submit|preventDefault={e => {
						const buttonIndex = Number(e.submitter.dataset.buttonIndex)

						onSubmit({
							postUrl: farcasterFrameMetadata.postUrl,
							inputText,
							buttonIndex,
						})
					}}
				>
					{#if farcasterFrameMetadata.textInput}
						<input
							type="text"
							bind:value={inputText}
							placeholder={farcasterFrameMetadata.textInput}
						/>
					{/if}

					{#if farcasterFrameMetadata.buttons?.length}
						<div class="row columns wrap">
							{#each Object.entries(farcasterFrameMetadata.buttons) as [i, button] (i)}
								{@const index = Number(i) + 1}

								{#if !button}
									<!--  -->
								{:else if button.action === 'post'}
									<button
										type="submit"
										formmethod="post"
										formaction={button.targetUrl}
										data-button-index={index}
										class="medium"
									>
										{button.label}
									</button>
								{/if}
							{/each}
						</div>
					{/if}
				</form>
			{/if}
		</div>
	{/each}
</div>


<style>
	.columns > * {
		flex: 1;
	}

	img {
		width: 100%;
	}
</style>
