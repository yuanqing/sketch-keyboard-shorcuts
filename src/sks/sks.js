import yargs from 'yargs'

import { set } from './commands/set'
import { unset } from './commands/unset'

yargs
  .command(set)
  .command(unset)
  .help()
  .version()
  .parse()
