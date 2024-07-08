const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()

const randomString = Math.random().toString(36).substr(2, 6)
const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'count.txt')

const getRandomStringNow = () => {
    const now = new Date().toUTCString()
    return `${now}: ${randomString}`
}

app.get('/', async (request, response) => {
    const pingpong = await new Promise(res => {fs.readFile(filePath, (err, data) => res(data))})
    response.send(`<p>${getRandomStringNow()}</p><p>${pingpong}</p>`)
})

const PORT = 3000
app.listen(PORT, () => console.log(`Started the server in ${PORT}`))