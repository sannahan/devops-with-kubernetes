const cors = require('cors')
const { Pool } = require('pg')
const express = require('express')
const app = express()
const pool = new Pool({"query_timeout":4000})

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(cors())
app.use(requestLogger)

const insertTodoToDb = async (todo) => {
    const result = await pool.query('INSERT INTO todos (todo) VALUES ($1) RETURNING *', [todo])
    return result.rows[0]
}

const selectAllFromDb = async () => {
    const result = await pool.query('SELECT * FROM todos')
    return result.rows
}

const markTodoAsDone = async (id) => {
    const result = await pool.query('UPDATE todos SET done=true WHERE id=$1 RETURNING *', [id])
    return result.rows.length === 1
}

app.get('/', (request, response) => {
    response.status(200).send('Ready for todos')
})

app.get('/todos', async (request, response) => {
    const select = await selectAllFromDb()
    response.json(select)
})

app.post('/todos', async (request, response) => {
    const body = request.body
    if (!body.content) {
        return response.status(400).json({error: 'content missing'})
    }
    if (body.content.length > 140) {
        return response.status(400).json({error: 'content was over 140 characters'})
    }
    const todo = await insertTodoToDb(body.content)
    response.status(201).json(todo)
})

app.put('/todos/:id', async (request, response) => {
    const id = request.params.id
    const success = await markTodoAsDone(id)
    if (!success) {
        return response.status(404).json({error: 'todo not found'})
    }
    response.status(204).end()
})

app.get('/healthz', async (request, response) => {
    try {
        console.log('Testing database connection')
        await pool.query('SELECT 1')
        response.status(200).send('Database connection is healthy')
    } catch (err) {
        console.error('Failed to connect to the database when testing health:', err)
        response.status(500).send('Database connection is not healthy')
    }
})

const PORT = process.env.PORT || 8083
app.listen(PORT, async () => {
    console.log(`Server started in port ${PORT}`)
})
