import { browser, building } from '$app/environment'
import { error as svelteKitError } from '@sveltejs/kit'

export const isBrowser = browser

export let clientStarted = false;

export function setClientStarted() {
	clientStarted = true
}

export const isPrerender = building

export const error = svelteKitError
