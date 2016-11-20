#!/usr/bin/env node
import cli from 'yargs'
import './util/terminate'
// Provide a title to the process in `ps`
process.title = 'electron-cli'

cli.commandDir('./commands')
.demand(1)
.help('h')
.alias('h', 'help')
.argv
