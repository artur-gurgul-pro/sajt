const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

export function serve() {
    app.use(express.static('./.build'))

    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    })
}