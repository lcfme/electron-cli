const co = require('co')
const inquirer = require('inquirer')
const fetch = require('node-fetch')
const semver = require('semver')
const ora = require('ora')
const validate = require('validate-npm-package-name')
const mkdirp = require('mkdirp')
const jsonfile = require('jsonfile')
const cpy = require('cpy')

// this promp should ask for the wich version of electron you want to install
// if there is no answer then it shoul install the latest verstion
// it should also ask for the to create the provided boiler plate on the installation
// directory or to just just leave it with a package.json
// after the initial release maybe we could also provide boiler plates for popular,
// frameworks like react ember or meteor

const spinner = ora('Loading unicorns')

exports.command = 'init [dir]'
exports.desc = 'Create an empty repo'
exports.builder = {
  dir: {
    default: '.'
  }
}
exports.handler = function (argv) {
  co(generator).catch(onerror)
}

function onerror (err) {
  // log any uncaught errors
  // co will not throw any errors you do not handle!!!
  // HANDLE ALL YOUR ERRORS!!!
  console.error(err)
}

function validateName (name) {
  const { errors, warnings } = validate(name)

  let error = ''

  if (errors) {
    error = errors.join(',')
  }

  if (warnings) {
    error = warnings.join(',')
  }

  if ((!errors) && (!warnings)) {
    return true
  }

  return error
}

function createDir (name) {
  return new Promise((resolve, reject) => {
    mkdirp(name, function (err, made) {
      if (err) {
        reject(err)
      } else {
        resolve(made)
      }
    })
  })
}

function initJson (dir, data) {
  console.log(data)
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(`${dir}/package.json`, data, {spaces: 2}, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

function * generator () {
  // console.log('init called for dir', argv.dir)
  spinner.start()
  const request = yield fetch('https://registry.npmjs.org/electron').then(res => res.json())

  let versions = Object.keys(request.versions)

  versions.sort((a, b) => semver.lt(a, b) ? 1 : -1)

  const latest = versions[0]

  const formatedVersions = versions.map(v => `(${v})`).join(' ')

  var questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Which name would you like for you proyect',
      validate: validateName
    },
    {
      type: 'input',
      name: 'version',
      message: `Version`,
      default: '0.0.0'
    },
    {
      type: 'input',
      name: 'license',
      message: `License`,
      default: 'MIT'
    },
    {
      type: 'input',
      name: 'description',
      message: `Description`
    },
    {
      type: 'input',
      message: `Author`,
      name: 'author'
    },
    {
      type: 'input',
      name: 'electronVersion',
      message: `What version of electron would you like to install? latest is`,
      default: latest,
      validate: version => versions.find(v => v === version) ? true : `That version is unavailable available versions ${formatedVersions}`
    },
    {
      type: 'confirm',
      name: 'boilerPlate',
      message: 'Would you like to install with the provided boilerplate?',
      when: answers => answers.electronVersion === latest
    }
  ]

  spinner.stop()

  const { electronVersion, boilerPlate, author, license, version, name, description } = yield inquirer.prompt(questions)
  spinner.start()

  const createdDir = yield createDir(name)

  const dependencies = {electron: `^${electronVersion}`}

  const scripts = {start: 'electron .'}

  const main = 'main.js'

  yield initJson(createdDir, {author, license, version, name, description, dependencies, scripts, main})

  if (boilerPlate) {
    yield cpy(['templates/index.html', 'templates/main.js'], createdDir)
  }

  spinner.stop()
}
