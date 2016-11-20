import fs from 'fs'

export default function (dir, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${dir}/package.json`, JSON.stringify(data, null, 4), 'utf8', (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
