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
    <h1>This is a header</h1>
    <img src="data:image/jpeg;base64,${imageBase64}" alt="Image">
  `
  response.send(html)
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server started in port ${PORT}`))