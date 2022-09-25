import { goto as go } from '$app/navigation'
import { get } from 'svelte/store';
import { browser, prerendering } from '$app/environment'
import { page } from '$app/stores'
import { error as svelteKitError } from '@sveltejs/kit'

export function goTo(location, options) {
    go(location, options)
}

export const isBrowser = browser

export let clientStarted = false;

export function setClientStarted() {
	clientStarted = true
}

export const isPrerender = prerendering

export const error = svelteKitError
