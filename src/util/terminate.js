import chalk from 'chalk'

process.on('unhandledRejection', (err) => {
  console.error(chalk.red(err))
  process.exit(1)
})

process.on('uncaughtException', (err) => {
  console.error(chalk.red(err))
  process.exit(1)
})
