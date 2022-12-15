import {app} from './app'
import {config} from 'dotenv'
import {connection} from 'mongoose'
import {connectToMongoDB} from './config/db'
import CandleMessageChannel from './messages/CandleMessageChannel'

const createServer = async () => {
    config()

    await connectToMongoDB()
    const PORT = process.env.PORT
    const server = app.listen(PORT, () => console.log(`APP running on port ${PORT}`))

    const candleMsgChannel = new CandleMessageChannel(server)
    candleMsgChannel.consumeMessages()

    process.on('SIGINT', async() => {
        await connection.close()
        server.close()
        console.log('App server and connection to MongoDB closed')
    })

}

createServer()