const axios = require('axios')
const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()

const randomString = Math.random().toString(36).substr(2, 6)
const directory = path.join('/', 'etc', 'config')
const filePath = path.join(directory, 'information.txt')

const getFile = async () => new Promise(res => {
  fs.readFile(filePath, (err, buffer) => {
    if (err) return console.log(`Failed to read file: ${err}`)
    res(buffer)
  })
})

const getRandomStringNow = () => {
    const now = new Date().toUTCString()
    return `${now}: ${randomString}`
}

const pingpongUrl = 'http://pingpong-svc:2346'

app.get('/', async (request, response) => {
    const message = await getFile()
    const pingpong = await axios.get(`${pingpongUrl}/pingpong`).then(response => response.data)
    response.send(`<p>file content: this text is from file</p><p>env variable: ${message}</p><p>${getRandomStringNow()}</p><p>${pingpong}</p>`)
})

app.get('/healthz', async (request, response) => {
    try {
        console.log('Trying to reach pingpong service')
        const res = await axios.get(`${pingpongUrl}/`)
        if (res.status === 200) {
            response.status(200).send('Pingpong service reached')
        } else {
            response.status(500).send('Pingpong service not available')
        }
    } catch (err) {
        console.error('Failed to connect to the pingpong service:', err)
        response.status(500).send('Pingpong service not available')
    }
})

const PORT = 3000
app.listen(PORT, () => console.log(`Started the server in ${PORT}`))