import execa from 'execa'

export async function executeBashCommands (bashCommands) {
  return bashCommands.map(execa)
}
