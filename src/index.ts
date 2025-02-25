import { Command } from 'commander'
import chalk from 'chalk'
//import fs from 'fs-extra'
import path from 'path'
import Project from './project.js'
import { serve } from './serve.js'

const program = new Command()

let project = new Project()

program
  .command('init')
  .description('Initialize project in the current directory with the default theme')
  .action(()=> { project.new() })

program
  .command('build')
  .description('Build the webpage')
  .action(()=> { project.build() })

program
  .command('serve')
  .description('Run the website locally')
  .action(serve)


program.parse(process.argv)