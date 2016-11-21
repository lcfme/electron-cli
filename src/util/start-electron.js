import denodeify from 'denodeify'
import { spawn } from 'child_process'

const resolve = denodeify(require('resolve'))

export default function(script,globalFlag = false) {
  if(globalFlag) {
    gotElectron(require('electron'),script)
  } else {
    return resolve('electron',{basedir: process.cwd()})
      .then(localElectron => require(localElectron))
      .then( electron => { gotElectron(electron,script) })
  }
}

const gotElectron = (pathToElectron, script) => new Promise(function(resolve, reject) {
  const proc = spawn(pathToElectron,['.'],{cwd: process.cwd()})

  proc.stdout.on('data', (data) => {
    console.log(data.toString())
  })

  proc.stdout.on('data', (data) => {
    console.error(data.toString())
  })

  proc.on('close',() => {
    resolve()
  })

})
