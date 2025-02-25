import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export default class ProjectConfig {
    public config: any = {}

    constructor() {
       
    }

    public load() {
        this.config = {
            ... this.read(),
            buildDir: './.build',
            ignore: [".build", ".sajt"]
        }

        this.config.remote.port = 22
        this.config.remote.privateKey = fs.readFileSync(path.resolve(process.env.HOME ?? "", '.ssh/id_rsa'))
    }

    read(): any {
        const __dirname =  process.cwd()
        const configPath = path.join(__dirname, '.sajt/config.yaml')
        const fileContents = fs.readFileSync(configPath, 'utf8')
        return yaml.load(fileContents)
    }
}