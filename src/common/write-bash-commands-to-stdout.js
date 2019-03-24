export function writeBashCommandsToStdout (bashCommands) {
  console.log('#!/bin/bash')
  bashCommands.forEach(function (bashCommand) {
    console.log(bashCommand)
  })
}
