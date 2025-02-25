import express from 'express'
import { setWatcher } from './watch.js'
import { webdavMiddleware } from "./webdav.js"

const app = express()
const PORT = process.env.PORT || 3000

export function serve() {
    app.use(express.static('./.build'))

    app.use(webdavMiddleware)

    setWatcher(url => {
        console.log(url)
    })

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}