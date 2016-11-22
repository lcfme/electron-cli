import denodeify from 'denodeify'

const packager = denodeify(require('electron-packager'))

export default function(arch,platform,version) {
  return packager({dir: process.cwd(),version,arch,platform})
}
