import chalk from 'chalk'

process.on('unhandledRejection', (err) => {
  if(err.stack){
    console.error(chalk.red(err.stack))
  } else {
    console.error(chalk.red(err))
  }
  process.exit(1)
})

process.on('uncaughtException', (err) => {
  if(err.stack){
    console.error(chalk.red(err.stack))
  } else {
    console.error(chalk.red(err))
  }
  process.exit(1)
})
