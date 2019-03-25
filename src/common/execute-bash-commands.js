import { shell } from 'execa'
import pEachSeries from 'p-each-series'

export async function executeBashCommands (bashCommands) {
  return pEachSeries(bashCommands, function (bashCommand) {
    return shell(bashCommand)
  })
}
