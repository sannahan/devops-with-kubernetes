const cors = require('cors')
const { Client } = require('pg')
const express = require('express')
const app = express()
const client = new Client()

const insertToDb = async (todo) => {
    const result = await client.query('INSERT INTO todos (todo) VALUES ($1) RETURNING *', [todo])
    return result.rows[0]
}

const selectFromDb = async () => {
    const result = await client.query('SELECT * FROM todos')
    return result.rows
}

app.use(express.json())
app.use(cors())

app.get('/todos', async (request, response) => {
    const select = await selectFromDb()
    response.json(select)
})

app.post('/todos', async (request, response) => {
    const body = request.body
    if (!body.content) {
        return response.status(400).json({error: 'content missing'})
    }
    const todo = await insertToDb(body.content)
    response.status(201).json(todo)
})

const PORT = process.env.PORT || 8083
app.listen(PORT, async () => {
    await client.connect()
    console.log(`Server started in port ${PORT}`)
})
