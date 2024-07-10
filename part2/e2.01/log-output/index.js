const axios = require('axios')
const express = require('express')
const app = express()

const randomString = Math.random().toString(36).substr(2, 6)

const getRandomStringNow = () => {
    const now = new Date().toUTCString()
    return `${now}: ${randomString}`
}

app.get('/', async (request, response) => {
    const pingpong = await axios.get('http://pingpong-svc:2346/pingpong').then(response => response.data)
    response.send(`<p>${getRandomStringNow()}</p><p>${pingpong}</p>`)
})

const PORT = 3000
app.listen(PORT, () => console.log(`Started the server in ${PORT}`))