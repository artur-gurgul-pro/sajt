import yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'

export function parseYML(file) {
    const fileContents = fs.readFileSync(file, 'utf8')
    return yaml.load(fileContents)
}

export function getAllFilesWithExtension(directory, extension, excludes) {
    let results = []
    function readDirectory(directory) {
        const items = fs.readdirSync(directory)
        
        items.forEach(item => {
            if(excludes.includes(item)) {
                return
            }
            const itemPath = path.join(directory, item)
            const stat = fs.statSync(itemPath)
            if (stat.isDirectory()) {
                readDirectory(itemPath)
            } else if (path.extname(item) === extension) {
                results.push(itemPath)
            }
        })
    }
    readDirectory(directory)
    return results
}

// copyDirectory
export function cp(source, destination) {
    fs.mkdirSync(destination, { recursive: true })
    const items = fs.readdirSync(source)
    items.forEach(item => {
        const sourceItemPath = path.join(source, item)
        const destinationItemPath = path.join(destination, item)
        const stat = fs.statSync(sourceItemPath)
        if (stat.isDirectory()) {
            cp(sourceItemPath, destinationItemPath)
        } else {
            fs.copyFileSync(sourceItemPath, destinationItemPath)
        }
    })
}

export function pathToArray(filePath) {
    // Normalize the file path to handle different OS path separators
    const normalizedPath = path.normalize(filePath)
    // Split the path into an array of directories
    return normalizedPath.split(path.sep)
}