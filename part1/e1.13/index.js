const path = require('path')
const fs = require('fs')
const axios = require('axios')
const express = require('express')
const app = express()

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'image.jpg')
const cacheDuration = 60 * 60 * 1000

const saveImage = async () => {
  await new Promise(res => fs.mkdir(directory, (err) => res()))
  console.log('Fetching a new image')
  const response = await axios.get('https://picsum.photos/200', { responseType: 'stream' })
  response.data.pipe(fs.createWriteStream(filePath))
}

const getCachedImage = () => {
    try {
        const stats = fs.statSync(filePath)
        const now = Date.now()
        const fileAge = now - stats.mtime.getTime()

        if (fileAge > cacheDuration) {
            console.log('Cached image expired. Fetching a new one...')
            saveImage()
        }
    } catch (err) {
        console.error('Error checking cached image:', err)
        saveImage()
    }
}

app.get('/', async (request, response) => {
  getCachedImage()
  const imageBase64 = fs.readFileSync(filePath, { encoding: 'base64' });
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <body>
      <h1>TODO app</h1>
      <img src="data:image/jpeg;base64,${imageBase64}" alt="Image">
      <form id="todoForm">
          <input type="text" id="todoInput" name="todoInput">
          <input type="submit" value="Create TODO">
      </form>
      <ul id="todoList">
      </ul>
      <script>
        const items = ['Wash windows', 'Clean oven', 'Scrub shower', 'Repot Monstera plant']
        const todoList = document.getElementById('todoList')
        items.forEach(item => {
          const li = document.createElement('li')
          li.textContent = item
          todoList.appendChild(li)
        })

        const todoInput = document.getElementById('todoInput');
        const todoForm = document.getElementById('todoForm')
        todoForm.addEventListener('submit', (event) => {
          event.preventDefault()
          const newTodo = todoInput.value.trim()
          if (newTodo.length > 0 && newTodo.length <= 140) {
            const li = document.createElement('li')
            li.textContent = newTodo
            todoList.appendChild(li)
            todoInput.value = ''
          } else {
            alert('Todo must be between 1 and 140 characters long.')
          }
        })
      </script>
    </body>
    </html>
  `
  response.send(html)
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server started in port ${PORT}`))