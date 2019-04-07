import yargs from 'yargs'

import { set } from './commands/set'
import { unset } from './commands/unset'
import { createLogger } from './common/create-logger'

yargs
  .command(set)
  .command(unset)
  .fail(fail)
  .help()
  .version()
  .parse()

function fail (message, error) {
  const logger = createLogger()
  logger.fail(message || error.message)
  process.exitCode = 1
}
