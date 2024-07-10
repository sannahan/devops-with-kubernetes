const cors = require('cors')
const express = require('express')
const app = express()

let todos = [
  {
    id: 1,
    todo: "Scrub shower"
  },
  {
    id: 2,
    todo: "Repot a Monstera plant"
  }
]

const generateId = () => {
  const maxId = todos.length > 0
    ? Math.max(...todos.map(t => Number(t.id)))
    : 0
  return String(maxId + 1)
}

app.use(express.json())
app.use(cors())

app.get('/todos', (request, response) => {
    response.json(todos)
})

app.post('/todos', (request, response) => {
    const body = request.body
    if (!body.content) {
        return response.status(400).json({error: 'content missing'})
    }
    const todo = {
        todo: body.content,
        id: generateId(),
    }
    todos = todos.concat(todo)
    response.status(201).json(todo)
})

const PORT = process.env.PORT || 8083
app.listen(PORT, () => console.log(`Server started in port ${PORT}`))