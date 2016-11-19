const co = require('co')
const inquirer = require('inquirer')
const fetch = require('node-fetch')
const semver = require('semver')
const ora = require('ora')
const validate = require('validate-npm-package-name')

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
  console.error(err.stack)
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
      name: 'version',
      message: 'Which name would you like for you proyect',
      validate: validateName
    },
    {
      type: 'input',
      name: 'version',
      message: `What version of electron would you like to install? latest is`,
      default: latest,
      validate: version => versions.find(v => v === version) ? true : `That version is unavailable available versions ${formatedVersions}`
    },
    {
      type: 'input',
      name: 'boilerPlate',
      message: 'Would you like to install with the provided boilerplate?',
      default: 'yes',
      when: answers => answers.version === latest
    }
  ]

  spinner.stop()

  const answers = yield inquirer.prompt(questions)

  console.log(answers)
}
