export default function (dir) {
  return new Promise((resolve, reject) => {
    try {
      process.chdir(dir)
      resolve()
    }
    catch (err) {
      reject(err)
    }
  })
}
