import express from 'express'
import { setWatcher } from './watch.js'

const app = express()
const PORT = process.env.PORT || 3000

export function serve() {
    app.use(express.static('./.build'))

    setWatcher(url => {
        console.log(url)
    })

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}