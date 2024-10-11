import { fileURLToPath } from 'url'
import path from 'path'
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

export function buildProject() {
    const ignore = [".build", ".site"]
}