import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import { cp } from './utils.js'

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Path relative to the script file's directory
const DEFAULT_PROJECT_PATH = path.join(__dirname, 'empty')

export function newProject() {
    console.log("Initialize a new project")
    console.log(DEFAULT_PROJECT_PATH)
    cp(DEFAULT_PROJECT_PATH, ".")
}

import { readConfig } from './site.js'
import { build } from './site.js'

export function buildProject() {
    console.log("building")
    
    let config = {
        ... readConfig(),
        buildDir: './.build',
        ignore: [".build", ".sajt"]
    }

    config.remote.port = 22
    config.remote.privateKey = fs.readFileSync(path.resolve(process.env.HOME ?? "", '.ssh/id_rsa'))


    build(config)

    //loadTemplate()
    //parseMD()
    //buildProject(config)
}

//import { run } from './src/desktop/main.js'
import * as proc from 'child_process'

//import { app, BrowserWindow } from 'electron'

import * as electron from 'electron'

export function appProject() {
    //run()
    
    //const child = proc.spawn(electron, ["."])
    // console.log(electron)
    // console.log(electron.default)

//    const child = proc.spawn(electron.default, [".build"])
    
    // https://www.matthewslipper.com/2019/09/22/everything-you-wanted-electron-child-process.html
    // exec('node start', (error, stdout, stderr) => {
    // if (error) {
    //     console.error(`error: ${error.message}`)
    //     return;
    // }

    // if (stderr) {
    //     console.error(`stderr: ${stderr}`);
    //     return
    // }

    // console.log(`stdout:\n${stdout}`)
    // })
}