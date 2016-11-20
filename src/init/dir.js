import mkdirp from 'mkdirp'

export default function createDir (name) {
  return new Promise((resolve, reject) => {
    mkdirp(name, (err, made) => {
      if (err) {
        reject(err)
      } else {
        resolve(made)
      }
    })
  })
}
