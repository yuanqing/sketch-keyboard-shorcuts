import { executeBashCommands } from '../common/execute-bash-commands'
import { outputBashCommands } from '../common/output-bash-commands'
import { unsetAllKeyboardShortcutsBashCommands } from '../common/unset-all-keyboard-shortcuts-bash-commands'

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
    try {
      if (argv.script) {
        outputBashCommands(unsetAllKeyboardShortcutsBashCommands)
      } else {
        await executeBashCommands(unsetAllKeyboardShortcutsBashCommands)
      }
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
