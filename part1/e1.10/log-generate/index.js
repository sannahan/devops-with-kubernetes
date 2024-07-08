const path = require('path')
const fs = require('fs')

const randomString = Math.random().toString(36).substr(2, 6)
const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'log.txt')

const getRandomStringNow = () => {
    const now = new Date().toUTCString()
    return `${now}: ${randomString}`
}

const writeRandomString = async () => {
    const randomStringNow = getRandomStringNow()

    await new Promise(res => fs.mkdir(directory, (err) => res()))
    await new Promise(res => fs.writeFile(filePath, randomStringNow, (err) => res()))
    console.log('Wrote string to file')
}

setInterval(() => {
    writeRandomString()
}, 5000);