const express = require('express')
const { Client } = require('pg')

const app = express()
const client = new Client()

const insertToDb = async () => {
    await client.query('UPDATE requests SET counter = counter + 1 WHERE id = 1')
    const res = await client.query('SELECT counter FROM requests WHERE id = 1')
    return res.rows[0].counter
}

app.get('/', (request, response) => {
    response.status(200).send('Ready for pingpongs')
})

app.get('/pingpong', async (request, response) => {
    const counter = await insertToDb()
    const txt = `Ping / Pongs: ${counter}`
    response.send(txt)
})

const PORT = 3001
app.listen(PORT, async () => {
    await client.connect()
    console.log(`Listening on port ${PORT}`)
})