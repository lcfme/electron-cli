import denodeify from 'denodeify'
import pkg from '../../package.json'

const exec = denodeify(require('child_process').exec)

export default function (dir) {
  return exec('git init')
  .then(() => exec('git add .'))
  .then(() => exec(`git commit -m "Initial Commit from Electron CLI v${pkg.version}"`))
}
