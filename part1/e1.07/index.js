const express = require('express')
const app = express()

const randomString = Math.random().toString(36).substr(2, 6)

const getRandomStringNow = () => {
    const now = new Date().toUTCString()
    return `${now}: ${randomString}`
}

app.get('/', (request, response) => {
    response.send(`<h1>${getRandomStringNow()}</h1>`)
})

const PORT = 3000
app.listen(PORT, () => console.log(`Started the server in ${PORT}`))