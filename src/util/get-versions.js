import resolve from 'resolve'
import denodeify from 'denodeify'
import path from 'path'
import chalk from 'chalk'
const exec = denodeify(require('child_process').exec)

export default function () {
  return new Promise((res, reject) => {
    resolve('electron', {
      basedir: process.cwd()
    }, (error, localElectron) => {
      if (error) {
        reject('No local electron found')
      } else {
        console.log(chalk.green('Local Electron found'))
        res(require(localElectron))
      }
    })
  }).then(el => getVersion(el))
}

function getVersion (electron) {
  const verPath = path.join(__dirname, 'version.js')
  return exec(`${electron} ${verPath}`).then(out => JSON.parse(out))
}
