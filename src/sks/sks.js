import { exists, readFile } from 'fs-extra'
import getStdin from 'get-stdin'
import yargs from 'yargs'

import { parseConfig } from '../common/parse-config'
import { createBashCommands } from '../common/create-bash-commands'
import { createLogger } from '../common/create-logger'
import { executeBashCommands } from '../common/execute-bash-commands'
import { outputBashCommands } from '../common/output-bash-commands'

async function main () {
  const argv = parseCommandLineArguments()
  const logger = createLogger()
  const filePath = argv._[0]
  if (filePath && !(await exists(filePath))) {
    logger.fail('File does not exist')
    process.exit(1)
  }
  try {
    const fileContent = filePath
      ? await readFile(filePath, 'utf8')
      : await getStdin()
    const config = JSON.parse(fileContent)
    const keyboardShortcuts = parseConfig(config)
    const bashCommands = createBashCommands(keyboardShortcuts)
    if (argv.bash) {
      outputBashCommands(bashCommands)
      return
    }
    await executeBashCommands(bashCommands)
    logger.succeed('Set keyboard shortcuts')
  } catch (error) {
    logger.fail(error)
    process.exit(1)
  }
}
main()

function parseCommandLineArguments () {
  return yargs
    .option('bash', {
      alias: 'b',
      default: false,
      describe: 'Outputs a bash script to set keyboard shortcuts',
      type: 'boolean'
    })
    .help()
    .version()
    .parse()
}
