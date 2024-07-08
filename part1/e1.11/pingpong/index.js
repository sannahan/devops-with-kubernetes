const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()

let counter = 0
const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'count.txt')

app.get('/pingpong', async (request, response) => {
    counter++
    const txt = `Ping / Pongs: ${counter}`
    await new Promise(res => fs.mkdir(directory, (err) => res()))
    await new Promise(res => fs.writeFile(filePath, txt, (err) => res()))
    console.log('Wrote string to file')
    response.send(`pong ${counter}`)
})

const PORT = 3001
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))