import resolvePkg from 'resolve'
import denodeify from 'denodeify'
import path from 'path'
import chalk from 'chalk'

const exec = denodeify(require('child_process').exec)

function getVersion (electron) {
  const verPath = path.join(__dirname, 'version.js')
  return exec(`${electron} ${verPath}`).then(out => JSON.parse(out))
}

export default function () {
  return new Promise((resolve, reject) => {
    resolvePkg('electron', {
      basedir: process.cwd()
    }, (error, localElectron) => {
      if (error) {
        reject('No local electron found')
      } else {
        console.log(chalk.green('Local Electron found'))
        resolve(require(localElectron))
      }
    })
  }).then(el => getVersion(el))
}
