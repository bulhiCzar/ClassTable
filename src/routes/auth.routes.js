const {Router} = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const GD = require('../../globalData')
const mail = require('../modules/mail')
const auth = require('../middleware/auth.middleware')


const route = Router()


route.post(
    '/register',
    [
        check('login', 'Логин побольше сделай').trim().rtrim().isLength({min: 4, max: 20}).escape().isAlphanumeric(),
        check('email', 'Это не почта').trim().isEmail().normalizeEmail().escape(),
        check('password', 'Маленький пароль').trim().isLength({min: 6, max: 18}),
        check('role', 'Какая ваша роль?').isBoolean(),
        check('teacher', 'Заполните учителя').trim().rtrim()
    ],
    async (req, res) => {
        try {
            const validation = validationResult(req)
            if (!validation.isEmpty()) {
                res.status(400).json({
                    m: 'Данные не приняты',
                    type: GD.TYPE.warning,
                    values: validation.array()
                })
                return
            }
            const {login, email, password, role, teacher} = req.body

            const validateUserLogin = await User.findOne({login})
            const validateUserEmail = await User.findOne({email})
            if (validateUserEmail || validateUserLogin) {
                res.status(402).json({m: 'логин или почта уже заняты', type: GD.TYPE.warning})
                return
            }

            const passwordHash = await bcrypt.hash(password, 6)
            // const token = await jwt.sign({date: Date.now(), email, login}, GD.JWT.secretKey, {expiresIn: '15m'})
            const token = login + '_' + Math.random().toString(15).substring(3)

            const user = new User({
                login,
                email,
                password: passwordHash,
                role,
                token
            })

            if (!role){
                if (!teacher){return res.status(401).json({m: 'Выберете своего преподавателя', type: GD.TYPE.warning})}
                const teacherSearch = await User.findOne({login: teacher})
                if (!teacherSearch){return res.status(401).json({m: 'Такой преподватель не найден', type: GD.TYPE.warning})}
                user.teacher = teacherSearch.login
                teacherSearch.students.push(login)

                await teacherSearch.save()
            }

            let transporter = nodeMailer.createTransport({
                host: 'smtp.mail.ru',
                port: 465,
                secure: true,
                auth: {
                    user: 'spam.bulhi@mail.ru',
                    pass: '741236a'
                }
            })
            let dataMessage = await transporter.sendMail({
                from: 'spam.bulhi@mail.ru',
                to: email,
                subject: 'Проверка почти от bulhi',
                text: 'Hello world? text',
                html: mail({url: GD.server.url, token})
            //         `
            //     <head>
            //         <style></style>
            //     </head>
            //     <body>
            //         <div style="width: 100%; min-height: 300px; font-size: 32px">
            //             <div style="background: ">
            //                 <a href="${GD.server.host + GD.server.port + '/api/auth/mail/' + token}" target="_blank">
            //                 Сылка для подтверждения почти, перейдите по ней:
            //                 </a>
            //                 <hr/>
            //                 <a target="_blank" href="${GD.server.host + GD.server.port + '/api/auth/mail/' + token}" style="font-size: 16px">${GD.server.host + GD.server.port + '/api/auth/mail/' + token}</a>
            //             </div>
            //         <div>
            //     </body>
            // `
            })

            await user.save()

            res.status(200).json({m: 'Успешная регистрация', type: GD.TYPE.success})
        } catch (e) {
            console.log(e)
            res.status(403).json({m: 'Что-то сломалось', type: GD.TYPE.error})
        }
    }
)

route.post(
    '/login',
    [
        check('login').trim(),
        check('password').trim()
    ],
    async (req, res) => {
        try {
            const loginClient = req.body.login
            const passwordClient = req.body.password

            const condition = await User.findOne({login: loginClient})
            if (!condition) {
                res.status(403).json({m: 'Такого логина не найдено', type: GD.TYPE.warning})
                return
            }

            const equivalent = await bcrypt.compare(passwordClient, condition.password)
            if (!equivalent){
                res.status(403).json({m: 'Пароль не верный', type: GD.TYPE.warning})
                return
            }

            if (!condition.confirmationEmail){
                res.status(403).json({m: 'Ваша почта не подтверждена', type: GD.TYPE.warning})
                return
            }

            const tokenAuth = await jwt.sign({login: condition.login}, GD.JWT.secretKey, {expiresIn: '30d' })

            condition.sessions.push({date: Date.now(), ip: 'ip'})

            var http = require('http')
            http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
                resp.on('data', function(ip) {
                    // console.log("My public IP address is: " + ip)
                })
            })

            // доделать айпи к ссеиям

            condition.save()

            res.status(200).json({m: 'Успешный вход', type: GD.TYPE.success, tokenAuth, name: condition.login, role: condition.role})
        } catch (e) {
            res.status(403).json({m: 'Ошибка какая-то, повторите позже', type: GD.TYPE.warning, e})
        }
    }
)

route.post(
    '/mail/:id',
    async (req, res) => {
        try {
            const id = req.params.id
            const condition = await User.findOne({token: id}, (err, data)=>{
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

route.post(
    '/token',
    // auth,
    async (req, res)=>{
        try {
            // const login = req.user.login
            const token = req.body.token

            if (token === 'undefined' || token === 'null'){
                return res.status(401).json({m: 'Токена нет', exit: true})
            }
            if (!token){
                return res.status(401).json({m: 'Вы не авторизованны', exit: true, help: 'not have auth token'})
            }

            const decode = jwt.verify(token, GD.JWT.secretKey, (err, decode)=>{
                if (err){return}else {return decode}
            })
            if (!decode){
                return res.status(401).json({m: 'Авторизация изтекла!', exit: true})
            }
            const login = decode.login
            const user = await User.findOne({login})

            const role = user.role

            res.status(200).json({m: 'Токен проверен', type: GD.TYPE.success, login, role})
        }catch (e) {
            res.status(403).json({m: 'Ошибка какая-то, повторите позже', type: GD.TYPE.error})
        }
    }
)


module.exports = route