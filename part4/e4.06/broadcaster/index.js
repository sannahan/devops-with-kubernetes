const TelegramBot = require('node-telegram-bot-api')
const {connect, StringCodec} = require('nats')

const chatId = process.env.CHAT_ID
const token = process.env.TOKEN
const bot = new TelegramBot(token)

const handleSubscription = async (sub) => {
    const sc = StringCodec()
    for await (const m of sub) {
        const msg = sc.decode(m.data)
        console.log(msg)
        bot.sendMessage(chatId, msg)
    }
}

const connectAndListen = async () => {
    const nc = await connect({ servers: process.env.NATS_URL || 'nats://nats:4222' })
    const subscription = nc.subscribe('broadcast', { queue: 'queue-group-for-kubernetes'})
    await handleSubscription(subscription)
}

connectAndListen()