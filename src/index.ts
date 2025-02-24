import { Command } from 'commander'
import chalk from 'chalk'
//import fs from 'fs-extra'
import path from 'path'
import { newProject, buildProject, appProject } from './project.js'
import { serve } from './serve.js'

const program = new Command()

program
  .command('init')
  .description('Initialize project in the current directory with the default theme')
  .action(newProject)

program
  .command('build')
  .description('Build the webpage')
  .action(buildProject)

program
  .command('serve')
  .description('Run the website locally')
  .action(serve)

program
  .command('app')
  .description('Run notes as the the app')
  .action(appProject)

program.parse(process.argv)