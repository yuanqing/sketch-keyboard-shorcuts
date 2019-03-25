export function parseConfig (config) {
  const result = []
  for (const key in config) {
    parseItem(config[key], [key], result)
  }
  return result
}

const SINGLE_SPACE_REGEX = /\s/

function parseItem (config, menu, result) {
  if (typeof config === 'string') {
    result.push({
      menu,
      shortcut: config.split(SINGLE_SPACE_REGEX)
    })
    return
  }
  for (const key in config) {
    parseItem(config[key], [...menu, key], result)
  }
}
