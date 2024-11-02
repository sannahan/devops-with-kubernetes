const path = require('path')
const fs = require('fs')
const axios = require('axios')
const sharp = require('sharp');

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'image.jpg')
const cacheDuration = 60 * 60 * 1000

const saveImage = async () => {
  await new Promise(res => fs.mkdir(directory, (err) => res()))
  console.log('Fetching a new image')
  const response = await axios.get('https://picsum.photos/200', { responseType: 'stream' })
  await new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filePath)
    response.data.pipe(writer)
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
  console.log('New image saved')
}

const getCachedImage = async () => {
    let stats
    try {
        stats = fs.statSync(filePath)
    } catch (err) {
        console.log('No cached image')
    }

    if (!stats || Date.now() - stats.mtime.getTime() > cacheDuration) {
        await saveImage()
    }

    return new Promise(res => {
      fs.readFile(filePath, { encoding: 'base64' }, (err, buffer) => {
        if (err) return console.log(`Failed to read file: ${err}`)
        res(buffer)
      })
    })
}

/*
    If image cannot be found in file path (eg. when running development environment),
    create a dark green placeholder
*/
const getEmptyImage = async () => {
    const buffer = await sharp({
        create: {
            width: 150,
            height: 150,
            channels: 3,
            background: { r: 1, g: 50, b: 32, alpha: 1 }
        }
    }).jpeg().toBuffer();
    return buffer.toString('base64');
}

const getImage = async () => {
    let imageBase64
    try {
        imageBase64 = await getCachedImage()
    } catch (err) {
        console.error('Creating a new image because image could not be fetched:', err)
        imageBase64 = await getEmptyImage()
    }
    return imageBase64
}

module.exports = getImage