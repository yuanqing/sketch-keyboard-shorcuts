import { createLogger } from '../../common/create-logger'
import { executeBashCommands } from '../../common/execute-bash-commands'
import { outputBashCommands } from '../../common/output-bash-commands'
import { unsetAllKeyboardShortcutsBashCommand } from '../../common/unset-all-keyboard-shortcuts-bash-command'

export const unset = {
  command: 'unset',
  describe: 'Unsets all Sketch keyboard shortcuts',
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
    try {
      const bashCommands = [unsetAllKeyboardShortcutsBashCommand]
      if (argv.bash) {
        outputBashCommands(bashCommands)
        return
      }
      await executeBashCommands(bashCommands)
      logger.succeed('Unset keyboard shortcuts')
    } catch (error) {
      logger.fail(error)
      process.exit(1)
    }
    return Promise.resolve()
  }
}
