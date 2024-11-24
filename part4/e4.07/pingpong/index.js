const express = require('express')
const { Pool } = require('pg')

const app = express()
const pool = new Pool({connectionTimeoutMillis: 4000, query_timeout: 4000})

const insertToDb = async () => {
    await pool.query('UPDATE requests SET counter = counter + 1 WHERE id = 1')
    const res = await pool.query('SELECT counter FROM requests WHERE id = 1')
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

const PORT = 3001
app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
})