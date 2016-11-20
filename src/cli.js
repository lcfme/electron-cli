#!/usr/bin/env node
import cli from 'yargs'

// Provide a title to the process in `ps`
process.title = 'electron-cli'

cli.commandDir('./commands')
.demand(1)
.help()
.argv
