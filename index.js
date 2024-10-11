import { Command } from 'commander'
import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import { newProject, buildProject } from './project.js'

const program = new Command()

program
  .command('init')
  .description('Initialize project in the current directory with the default theme')
  .action(newProject)

  program
  .command('build')
  .description('Build the webpage')
  .action(newProject)

program.parse(process.argv)