import os from 'os'
import semver from 'semver'
import denodeify from 'denodeify'
import pack from '../util/pack'

import pathFromCwd from '../util/path-from-cwd'

export const command = 'pack'
export const desc = 'Pack an electron application'
const packager = denodeify(require('electron-packager'))

export const builder = {}

export const handler = async (argv) => {
  console.log(os.arch())
  console.log(os.platform())
  const { version, dependencies } = require(pathFromCwd('package.json'))

  await packager({
    dir: process.cwd(),
    version: semver.clean(dependencies.electron),
    arch: os.arch(),
    platform: os.platform()
  })

  process.exit()
}
