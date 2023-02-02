export type Events = {
	'Home/LogoMousedown': {},
	'Preferences/Change': {
		preferenceKey: string;
		preferenceValue: string;
	}
}

export type EventType = keyof Events
