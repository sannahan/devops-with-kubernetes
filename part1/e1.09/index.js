const express = require('express')
const app = express()

let counter = 0

app.get('/pingpong', (request, response) => {
    response.send(`pong ${counter++}`)
})

const PORT = 3001
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))