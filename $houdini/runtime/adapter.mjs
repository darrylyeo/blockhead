import { goto as go } from '$app/navigation'
import { getStores } from '$app/stores'
import { browser } from '$app/env'

export function getSession() {
    return getStores().session
}

export function goTo(location, options) {
    go(location, options)
}

export const isBrowser = browser
