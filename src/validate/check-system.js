import { exec } from 'child_process'
import semver from 'semver'

export default async () => {
  const git = new Promise((resolve, reject) => {
    exec('git --version', (err) => {
      if (err) {
        reject('Git instalation not detected')
      }
      resolve(true)
    })
  })

  const node = new Promise((resolve, reject) => {
    if (semver.gt(process.versions.node, '4.0.0')) {
      resolve()
    } else {
      reject('unsuported node vesion')
    }
  })

  return Promise.all([git, node])
}
