import { exists, readFile } from 'fs-extra'
import getStdin from 'get-stdin'

import { parseConfig } from '../../common/parse-config'
import { createBashCommands } from '../../common/create-bash-commands'
import { createLogger } from '../../common/create-logger'
import { executeBashCommands } from '../../common/execute-bash-commands'
import { outputBashCommands } from '../../common/output-bash-commands'
import { unsetAllKeyboardShortcutsBashCommand } from '../../common/unset-all-keyboard-shortcuts-bash-command'

export const set = {
  command: 'set [file]',
  describe: 'Sets Sketch keyboard shortcuts',
  builder: {
    bash: {
      alias: ['b'],
      default: false,
      describe: 'Outputs a bash script',
      type: 'boolean'
    }
  },
  handler: async function (argv) {
    const logger = createLogger()
    const filePath = argv.file
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
      const bashCommands = [
        unsetAllKeyboardShortcutsBashCommand,
        ...createBashCommands(keyboardShortcuts)
      ]
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
    return Promise.resolve()
  }
}
