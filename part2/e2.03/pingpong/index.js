const express = require('express')
const app = express()

let counter = 0

app.get('/pingpong', async (request, response) => {
    const txt = `Ping / Pongs: ${counter++}`
    response.send(txt)
})

const PORT = 3001
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))