import { KEYBOARD_KEY_MAP, ESCAPE_KEY } from './keyboard'
import { DOMAIN, KEY } from './constants'

export function createBashCommands (keyboardShortcuts) {
  const result = [`defaults delete ${DOMAIN} ${KEY}`]
  keyboardShortcuts.forEach(function ({ domain, menu, shortcut }) {
    result.push(
      `defaults write ${DOMAIN} ${KEY} -dict-add "${createMenu(
        menu
      )}" "${createShortcut(shortcut)}"`
    )
  })
  return result
}

function createMenu (menu) {
  return menu
    .map(function (string) {
      return `${ESCAPE_KEY}${string}`
    })
    .join('')
}

function createShortcut (shortcut) {
  return shortcut
    .map(function (keyboardKey) {
      const character = KEYBOARD_KEY_MAP[keyboardKey]
      return typeof character !== 'undefined' ? character : keyboardKey
    })
    .join('')
}
