import chalk from 'chalk'
import Table from 'cli-table2'
import getVersions from '../util/get-versions'
import pkg from '../../package.json'
export const command = 'stats'
export const desc = 'Info about the current electron version'

export const builder = {}

export const handler = async (argv) => {

  const versions = await getVersions()

  const table = new Table({
    head: ['Component', 'Version']
  , colWidths: [15, 15]
  })

  for (let component in versions) {
    if (versions.hasOwnProperty(component)) {
      table.push({[component]: versions[component]})
    }
  }
  table.push({'electron-cli':pkg.version})
  console.log(table.toString())
}
