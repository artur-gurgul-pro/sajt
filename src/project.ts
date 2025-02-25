import { fileURLToPath } from 'url'
import path from 'path'
import { cp } from './utils.js'
import { build } from './site.js'
import ProjectConfig from './project-config.js'


export default class Project {
    public config = new ProjectConfig() // should be injected
    private __filename: string
    private __dirname: string
    private DEFAULT_PROJECT_PATH: string 

    constructor() {
        // Get the directory of the current file
        this.__filename = fileURLToPath(import.meta.url)
        this.__dirname = path.dirname(this.__filename)

        // Path relative to the script file's directory
        this.DEFAULT_PROJECT_PATH = path.join(this.__dirname, '..', 'empty')

    }

    new() {
        console.log("Initialize a new project")
        console.log(this.DEFAULT_PROJECT_PATH)
        cp(this.DEFAULT_PROJECT_PATH, ".")

        console.log(this.config)
        this.config.load()
    }

    existing() {
        this.config.load()
    }

    build() {
        this.config.load()
        build(this.config.config)
    }
}