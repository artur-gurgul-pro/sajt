import fs from 'fs'
import pug from 'pug'
import path from 'path'

function removeDirectorySync(directory) {
    try {
        fs.rmSync(directory, { recursive: true, force: true })
        console.log("Directory and its contents removed.")
    } catch (err) {
        console.error(`Error removing directory: ${err.message}`)
    }
}

import yaml from 'js-yaml'

export function readConfig() {
    const __dirname =  process.cwd()
    const configPath = path.join(__dirname, '.sajt/config.yaml')
    const fileContents = fs.readFileSync(configPath, 'utf8')
    return yaml.load(fileContents)
}

function compile(template, content, output) {
    if (template == null) {
        console.error("Template is not defined")
        return
    }
    const compiledFunction = pug.compileFile(`.sajt/layouts/${template}.pug`);
    const data = {
        ...content,
        site: {posts: []}
    }

    const dirname = path.dirname(output)
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true })
    }

    const html = compiledFunction(data)
    fs.writeFileSync(output, html)
    console.log(`HTML has been rendered and saved to ${output}`);
}

function compileData(template, content, output) {
    const compiledFunction = pug.compileFile(`.sajt/layouts/${template}.pug`);
    
    const dirname = path.dirname(output)
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true })
    }

    const html = compiledFunction(content)
    fs.writeFileSync(output, html)
    console.log(`HTML has been rendered and saved to ${output}`);
}

import { getAllFilesWithExtension, pathToArray, parseYML } from './utils.js'
import { parseMD } from './markdown.js'

function readMetadata(ignore) {
    let htmlExtension = "html"

    let list = getAllFilesWithExtension('.',".md", ignore)
        .map(f => { return {
            pathMD: f,
            type: "md",
            data: {},
            md: parseMD(f)
        }})
    // sites needs to include data from header
    
    list = list.concat(
        getAllFilesWithExtension('.',".yml", ignore)
        .map(f => { return {
            pathMD: f,
            type: "yml",
            data: parseYML(f),
            md: {meta: {}}
        }}) 
    )

    for(const site of list) {
        
        //console.log(site.md.meta.path)
        // TODO: data can set default path
        if (site.md.meta?.path != null && site.md.meta?.path != undefined) {
            site.path = path.join("/", site.md.meta.path)
        } else {
            const parsedPath = path.parse(site.pathMD)
            const basePath = path.join("/", parsedPath.dir, parsedPath.name)
            site.path = basePath
        }
        
        // add proper extension
        const parsedPath = path.parse(site.path)
        parsedPath.ext = htmlExtension.startsWith('.') ? htmlExtension : `.${htmlExtension}`
        parsedPath.base = `${parsedPath.name}${parsedPath.ext}`
        site.path = path.format(parsedPath)

        // add dirs metadata
        const dirArray = pathToArray(site.path)
        site.fileName = dirArray.pop()
        dirArray.shift()
        site.dir = dirArray

        site.meta = site.md.meta
        
        site.hidden = site.data?.hidden || false
    }

    return list
}

import { cp } from "./utils.js"
import { parseMarkdown } from './markdown.js'

export function build(config) {
    removeDirectorySync(config.buildDir)
    cp("./.sajt/static", path.join(config.buildDir, "static"))

    let data = readMetadata(config.ignore)
    let pages = data.map(site => {
        return {
            title: site.meta.title,
            url: site.path
        }
    })

    for(const site of data) {
        if (site.type == "md") {
            compile(site.meta.layout, 
                {
                    content: site.md.content,
                    title: site.meta.title,
                    hidden: false,
                    pages
                },
                path.join(config.buildDir, site.path))
        } else if (site.type == "yml") {
            let data = {...site.data}
            delete data.layout
            parseMarkdown(data)
            compileData(site.data.layout, 
                        {data, pages, hidden: data.hidden},
                        path.join(config.buildDir, site.path))
        }
    }

    //console.log(readMetadata())
    // sajt

    // Not to upload now
    //uploadDirectory(serverConfig, buildFolder)
}