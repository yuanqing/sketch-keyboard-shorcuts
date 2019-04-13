export function parseConfig (config) {
  const result = []
  for (const key in config) {
    parseItem(config[key], [key], result)
  }
  return result
}

const singleSpaceRegularExpression = /\s/

function parseItem (config, menu, result) {
  if (typeof config === 'string') {
    result.push({
      menu,
      shortcut: config.split(singleSpaceRegularExpression)
    })
    return
  }
  for (const key in config) {
    parseItem(config[key], [...menu, key], result)
  }
}
