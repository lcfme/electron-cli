import path from 'path'
import chalk from 'chalk'
import startElectron from '../util/start-electron'
import pathFromCwd from '../util/path-from-cwd'

export const command = 'start --global'
export const desc = 'Run the electron application on the current directory whit the locally installed electron or the globally installed electron'

export const builder = {
  global: {
     alias: 'g',
     type: 'boolean',
     default: false
  }
}

export const handler = async (argv) => {

  const { script, global:runGlobal } = argv

  const localPkg = require(pathFromCwd('package.json'))

  const optScript = script && pathFromCwd(script)

  if(!localPkg.main) {
    console.error(chalk.red('There is no main file on the package.json'))
  }

  const scriptToRun = optScript || pathFromCwd(localPkg.main)

  await startElectron(scriptToRun,runGlobal)

  process.exit(0)

}
