import { exists, readFile } from 'fs-extra'
import getStdin from 'get-stdin'

import { createBashCommands } from '../common/create-bash-commands'
import { executeBashCommands } from '../common/execute-bash-commands'
import { outputBashCommands } from '../common/output-bash-commands'
import { parseConfig } from '../common/parse-config'

export const set = {
  command: ['set <file>'],
  describe: 'Sets keyboard shortcuts as defined in the specified file',
  builder: function (yargs) {
    yargs.positional('file', {
      type: 'string',
      describe: 'JSON file with keyboard shortcuts'
    })
    yargs.option('script', {
      alias: ['bash', 's'],
      default: false,
      describe: 'Outputs a bash script to stdout',
      type: 'boolean'
    })
  },
  handler: async function (argv) {
    const filePath = argv.file
    if (!filePath) {
      return Promise.reject(new Error('Need a file'))
    }
    if (!(await exists(filePath))) {
      return Promise.reject(new Error('File does not exist'))
    }
    try {
      const fileContent = filePath
        ? await readFile(filePath, 'utf8')
        : await getStdin()
      const config = JSON.parse(fileContent)
      const keyboardShortcuts = parseConfig(config)
      const bashCommands = createBashCommands(keyboardShortcuts)
      if (argv.script) {
        outputBashCommands(bashCommands)
      } else {
        await executeBashCommands(bashCommands)
      }
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
