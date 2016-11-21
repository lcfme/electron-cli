import pkg from '../../package.json'
import denodeify from 'denodeify'
const exec = denodeify(require('child_process').exec)

export default function (dir) {
  return exec('npm install')
}
