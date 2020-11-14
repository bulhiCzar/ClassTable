const {Router} = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const GD = require('../../globalSetings')
const auth = require('../middleware/auth.middleware')


const route = Router()


route.post(
    '/add',
    auth,
    [
        check('student').isAlphanumeric(),
        check('teacher').isAlphanumeric(),
        check('price').isNumeric(),
        check('date').isNumeric(),
        check('comment').trim().rtrim().escape(),
    ],
    async (req, res) => {
        try {
            const validation = validationResult(req)
            if (!validation.isEmpty()) {
                return res.status(400).json({
                    message: 'данные говно',
                    type: 'warning',
                    values: validation.array()
                })
            }

            const user = req.user
            const {student, teacher, price, data, comment} = req.body

            console.log(user,req.body)




            res.status(200).json({mas: 'somebody'})
        } catch (e) {
            res.status(403).json({mas: 'что-то сломалось'})
        }
    }
)

// route.post(
//     '/login',
//     async (req, res) => {
//         try {
//             const loginClient = req.body.login
//             const passwordClient = req.body.password
//
//             const condition = await User.findOne({login: loginClient})
//             if (!condition) {
//                 res.status(403).json({m: 'ничего не найдено'})
//                 return
//             }
//             if (!condition.confirmationEmail){
//                 res.status(403).json({m: 'ваша почта не подтверждена'})
//                 return
//             }
//
//             const equivalent = await bcrypt.compare(passwordClient, condition.password)
//             if (!equivalent){
//                 res.status(403).json({m: 'пароль не подошел'})
//                 return
//             }
//
//             const tokenAuth = await jwt.sign({login: condition.login}, GD.JWT.secretKey, {expiresIn: '30d' })
//
//             condition.sessions.push({date: Date.now(), ip: 'ip'})
//
//             var http = require('http')
//             http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
//                 resp.on('data', function(ip) {
//                     // console.log("My public IP address is: " + ip)
//                 })
//             })
//             condition.save()
//
//             res.status(200).json({m: 'Успешный вход', tokenAuth})
//         } catch (e) {
//             res.status(403).json({m: 'Ошибка какая-то, повторите позже', e})
//         }
//     }
// )
//
// route.get(
//     '/mail/:id',
//     async (req, res) => {
//         try {
//             const id = req.params.id
//
//             const verify = await jwt.verify(id, GD.JWT.secretKey, (el) => {
//                 return el
//             })
//
//             if (verify) res.status(402).json({m: 'токен закочился...'})
//
//             const decode = jwt.decode(id)
//
//             const condition = await User.findOne({token: id, email: decode.email})
//
//             if (condition.token !== id) res.status(402).json({m: 'токен не равен...'})
//             if (!condition) res.status(402).json({m: 'ничего не найшлось по этому токену...'})
//
//             condition.token = Date.now() + '-' + condition.token.slice(0, 4)
//             condition.confirmationEmail = true
//             await condition.save()
//
//
//             res.status(200).json({id, decode, verify, condition})
//
//         } catch (e) {
//             res.status(403).json({m: 'Ошибка какая-то, повторите позже', e})
//         }
//     }
// )


module.exports = route