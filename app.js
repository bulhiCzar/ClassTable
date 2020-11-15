const express = require('express')
const bodyParser = require('body-parser')
const DB = require('./src/modules/connectDataBase')
const GS = require('./globalSetings')

const app = express()
const PORT = process.env.PORT || GS.server.port

app.use(bodyParser.json())
// app.enable('trust proxy')

app.use('/api/auth', require('./src/routes/auth.routes'))
app.use('/api/lesson', require('./src/routes/lesson.routes'))


app.use(express.static('static'))

const start = async () => {
    try {
        await DB()
        app.listen(PORT, () => { console.log(`Server on localhost:${PORT}`) })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}





start()