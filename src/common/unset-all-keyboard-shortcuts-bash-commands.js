import { DOMAIN, KEY } from './constants'

export const unsetAllKeyboardShortcutsBashCommands = [
  `defaults delete ${DOMAIN} ${KEY} > /dev/null 2>&1 || true`,
  'echo "Unset all keyboard shortcuts"'
]
