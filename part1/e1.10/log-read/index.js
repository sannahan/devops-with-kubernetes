const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'log.txt')

app.get('/', async (request, response) => {
    const randomString = await new Promise(res => {fs.readFile(filePath, (err, data) => res(data))})
    response.send(`<h1>${randomString}</h1>`);
})

const PORT = 3000
app.listen(PORT, () => console.log(`Started the server in ${PORT}`))