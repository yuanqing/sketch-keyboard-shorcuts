import { createLogger } from '../common/create-logger'
import { executeBashCommands } from '../common/execute-bash-commands'
import { outputBashCommands } from '../common/output-bash-commands'
import { unsetAllKeyboardShortcutsBashCommand } from '../common/unset-all-keyboard-shortcuts-bash-command'

export const unset = {
  command: 'unset',
  describe: 'Unsets all keyboard shortcuts',
  builder: function (yargs) {
    yargs.option('script', {
      alias: ['bash', 's'],
      default: false,
      describe: 'Outputs a bash script to stdout',
      type: 'boolean'
    })
  },
  handler: async function (argv) {
    const logger = createLogger()
    try {
      const bashCommands = [unsetAllKeyboardShortcutsBashCommand]
      if (argv.script) {
        outputBashCommands(bashCommands)
      } else {
        await executeBashCommands(bashCommands)
        logger.succeed('Unset all keyboard shortcuts')
      }
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
