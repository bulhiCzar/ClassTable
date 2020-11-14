const {Router} = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const GD = require('../../globalSetings')
const nodeMailer = require('nodemailer')


const route = Router()


route.post(
    '/register',
    [
        check('login', 'Логин не подошел...').trim().rtrim().isLength({min: 4, max: 20}).escape().isAlphanumeric(),
        check('email', 'mail govno').trim().isEmail().normalizeEmail().escape(),
        check('password', 'pass call').trim().isLength({min: 6, max: 18}),
        check('role', 'role not true').isBoolean(),
        check('teacher', 'учитель не прошел валидацию').trim().rtrim().isAlphanumeric()
    ],
    async (req, res) => {
        try {
            const validation = validationResult(req)
            if (!validation.isEmpty()) {
                res.status(400).json({
                    message: 'данные говно',
                    type: 'warning',
                    values: validation.array()
                })
                return
            }
            const {login, email, password, role, teacher} = req.body

            const validateUserLogin = await User.findOne({login})
            const validateUserEmail = await User.findOne({email})
            if (validateUserEmail || validateUserLogin) {
                res.status(402).json({mas: 'Уже было зарегано'})
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
                if (!teacher){return res.status(401).json({m: 'выберете своего преподавателя'})}
                const teacherSearch = await User.findOne({login: teacher})
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
                html: `
                <head>
                    <style></style>
                </head>
                <body>
                    <div style="width: 100%; min-height: 300px; font-size: 32px">
                        <div style="background: ">
                            <a href="${GD.server.host + GD.server.port + '/api/auth/mail/' + token}" target="_blank">
                            Сылка для подтверждения почти, перейдите по ней:
                            </a>
                            <hr/>
                            <a target="_blank" href="${GD.server.host + GD.server.port + '/api/auth/mail/' + token}" style="font-size: 16px">${GD.server.host + GD.server.port + '/api/auth/mail/' + token}</a>
                        </div>
                    <div>
                </body>
            `
            })

            await user.save()

            res.status(200).json({mas: 'аккаунт создан'})
        } catch (e) {
            // console.log(e)
            res.status(403).json({mas: 'что-то сломалось'})
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
                res.status(403).json({m: 'ничего не найдено'})
                return
            }

            const equivalent = await bcrypt.compare(passwordClient, condition.password)
            if (!equivalent){
                res.status(403).json({m: 'пароль не подошел'})
                return
            }

            if (!condition.confirmationEmail){
                res.status(403).json({m: 'ваша почта не подтверждена'})
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

            res.status(200).json({m: 'Успешный вход', tokenAuth})
        } catch (e) {
            res.status(403).json({m: 'Ошибка какая-то, повторите позже', e})
        }
    }
)

route.get(
    '/mail/:id',
    async (req, res) => {
        try {
            const id = req.params.id
            // const verify = await jwt.verify(id, GD.JWT.secretKey, (el) => {
            //     return el
            // })
            // if (verify) { return res.status(402).json({m: 'токен закочился...'})}
            // const decode = jwt.decode(id)
            // console.log(id)

            const condition = await User.findOne({token: id})

            if (condition.token !== id) res.status(402).json({m: 'токен не равен...'})
            if (!condition) res.status(402).json({m: 'ничего не найшлось по этому токену...'})

            // condition.token = Date.now() + '-' + condition.token.slice(0, 4)
            condition.token = undefined
            condition.confirmationEmail = true
            await condition.save()

            res.status(200).json({m: '', go: true})

        } catch (e) {
            res.status(403).json({m: 'Ошибка какая-то, повторите позже'})
            // console.log(e)
        }
    }
)


module.exports = route