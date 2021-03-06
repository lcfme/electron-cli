import ora from 'ora'
import fetch from 'node-fetch'
import semver from 'semver'
import inquirer from 'inquirer'
import username from 'username'
import chalk from 'chalk'
import path from 'path'
import denodeify from 'denodeify'

import validateName from '../validate/name'
import checkSystem from '../validate/check-system'
import createDir from '../init/dir'
import initJson from '../init/json'
import initGit from '../init/git'
import initNpm from '../init/npm'
import changeDir from '../util/change-dir'

const writeFile = denodeify(require('fs').writeFile)

export const command = 'init [dir]'
export const desc = 'Creates a new electron application'

export const builder = {
  dir: {
    default: undefined
  }
}

export const handler = async (argv) => {
  const initSpinner = ora('Getting versions').start()

  const request = await fetch('https://registry.npmjs.org/electron').then(res => res.json())

  const versions = Object.keys(request.versions)

  versions.sort((a, b) => (semver.lt(a, b) ? 1 : -1))

  const latest = versions[0]

  const formatedVersions = versions.map(v => `(${v})`).join(' ')

  await checkSystem()

  const questions = [
    { type: 'input',
      name: 'name',
      message: 'Which name would you like for you proyect',
      validate: validateName,
      when: argv.dir === undefined
    },
    {
      type: 'input',
      name: 'version',
      message: 'Project version',
      default: '0.0.0',
      validate: version => (semver.valid(version) ? true : 'Incorrect version fomat')
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
      name: 'author',
      default: await username()
    },
    {
      type: 'input',
      name: 'electronVersion',
      message: `What version of electron would you like to install? latest is`,
      default: latest,
      validate: version => (versions.find(v => v === version) ? true : `That version is unavailable available versions ${formatedVersions}`)
    },
    {
      type: 'confirm',
      name: 'boilerPlate',
      message: 'Would you like to install with the provided boilerplate?',
      when: answers => answers.electronVersion === latest
    }
  ]

  initSpinner.succeed()

  const { electronVersion, boilerPlate, ...rest } = await inquirer.prompt(questions)

  const dirSpinner = ora('Initializing Directory').start()

  const name = argv.dir || rest.name

  const createdDir = await createDir(name)

  const dependencies = { electron: `^${electronVersion}` }

  const scripts = { start: 'electron .' }

  const main = 'main.js'

  if (boilerPlate) {
    const filesToDownload = [
      'https://raw.githubusercontent.com/Ikana/electron-cli/master/templates/main.js',
      'https://raw.githubusercontent.com/Ikana/electron-cli/master/templates/index.html',
      'https://raw.githubusercontent.com/Ikana/electron-cli/master/templates/.gitignore'
    ]

    const fileNames = filesToDownload.map(f => f.split('/').pop())

    const fileContent = await Promise.all(filesToDownload.map(f => fetch(f).then(r => r.text())))

    await fileNames.map((el, index) => writeFile(path.join(createdDir, el), fileContent[index], 'utf8'))
  }
  await initJson(createdDir, { name, dependencies, scripts, main, ...rest })

  await changeDir(createdDir)

  await initGit()

  await initNpm()

  dirSpinner.succeed()

  console.log(chalk.green(`To start enter the ${name} directory, then you can run npm start to run your electron application`))
}
