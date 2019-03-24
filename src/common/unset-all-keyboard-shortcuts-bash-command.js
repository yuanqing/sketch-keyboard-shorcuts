import { DOMAIN, KEY } from './constants'

export const unsetAllKeyboardShortcutsBashCommand = `defaults delete ${DOMAIN} ${KEY}`
