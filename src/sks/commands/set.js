import { exists, readFile } from 'fs-extra'
import getStdin from 'get-stdin'

import { createBashCommands } from '../../common/create-bash-commands'
import { createLogger } from '../../common/create-logger'
import { executeBashCommands } from '../../common/execute-bash-commands'
import { outputBashCommands } from '../../common/output-bash-commands'
import { parseConfig } from '../../common/parse-config'
import { unsetAllKeyboardShortcutsBashCommand } from '../../common/unset-all-keyboard-shortcuts-bash-command'

export const set = {
  command: ['set [file]', '$0'],
  describe: 'Sets keyboard shortcuts as defined in the specified file',
  builder: {
    script: {
      alias: ['s'],
      default: false,
      describe: 'Outputs a bash script to stdout',
      type: 'boolean'
    }
  },
  handler: async function (argv) {
    const logger = createLogger()
    const filePath = argv.file
    if (filePath && !(await exists(filePath))) {
      return Promise.reject(new Error('File does not exist'))
    }
    try {
      const fileContent = filePath
        ? await readFile(filePath, 'utf8')
        : await getStdin()
      const config = JSON.parse(fileContent)
      const keyboardShortcuts = parseConfig(config)
      const bashCommands = [
        unsetAllKeyboardShortcutsBashCommand,
        ...createBashCommands(keyboardShortcuts)
      ]
      if (argv.script) {
        outputBashCommands(bashCommands)
      } else {
        await executeBashCommands(bashCommands)
        logger.succeed('Set keyboard shortcuts')
      }
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
