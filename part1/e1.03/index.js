const randomString = Math.random().toString(36).substr(2, 6)

const getRandomStringNow = () => {
    const now = new Date().toUTCString()

    console.log(`${now}: ${randomString}`)

    setTimeout(getRandomStringNow, 5000)
}

getRandomStringNow()