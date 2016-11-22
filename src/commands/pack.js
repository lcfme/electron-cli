import os from 'os'
import semver from 'semver'
import pack from '../util/pack'
import pathFromCwd from '../util/path-from-cwd'
export const command = 'pack'
export const desc = 'Pack an electron application'

export const builder = {}

export const handler = async (argv) => {
  console.log(os.arch())
  console.log(os.platform());
  const {version, dependencies } = require(pathFromCwd('package.json'))


  await pack(os.arch(),os.platform(),semver.clean(dependencies.electron),version)
}
