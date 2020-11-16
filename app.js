const express = require('express')
const bodyParser = require('body-parser')
const DB = require('./src/modules/connectDataBase')
const GS = require('./globalData')

const app = express()
const PORT = process.env.PORT || GS.server.port




const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {res.send(200)} else {next()}
}


app.use(bodyParser.json())
app.use(allowCrossDomain)

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