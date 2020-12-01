const User = require('./src/models/User')

const express = require('express')
const bodyParser = require('body-parser')
const DB = require('./src/modules/connectDataBase')
const GD = require('./globalData')

const app = express()
const PORT = process.env.PORT || GD.server.port


const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    if ('OPTIONS' === req.method) {
        res.sendStatus(200)
    } else {
        next()
    }
}


app.use(bodyParser.json())
app.use(allowCrossDomain)

app.use('/api/auth', require('./src/routes/auth.routes'))
app.use('/api/lesson', require('./src/routes/lesson.routes'))
app.use('/api/user', require('./src/routes/user.routes'))


app.use(express.static('client/build'))
app.get('/mail1/:id', async (req, res) => {
        try {
            const id = req.params.id
            const condition = await User.findOne({token: id}, (err, data) => {
                return err
            })
            if (condition === null) {
                res.status(403).json({m: 'Ничего не нашлось по этому токену', type: GD.TYPE.warning})
                return
            }
            if (!condition) {
                res.status(403).json({m: 'Ничего не нашлось по этому токену', type: GD.TYPE.warning})
                return
            }
            if (condition.token !== id) {
                return res.status(403).json({m: 'Токен не совпал', type: GD.TYPE.warning})
            }

            condition.token = undefined
            condition.confirmationEmail = true


            await condition.save()

            res.status(200).json({m: 'Почта подтверждена', type: GD.TYPE.success})
        } catch (e) {
            res.status(403).json({m: 'Ошибка какая-то, повторите позже', type: GD.TYPE.error})
        }
    }
)
app.use('/*', express.static('client/build/index.html'))

const start = async () => {
    try {
        await DB()
        app.listen(PORT, () => {
            console.log(`Server on localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


start()