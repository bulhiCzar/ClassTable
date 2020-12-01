const {Router} = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const Lesson = require('../models/Lesson')
const GD = require('../../globalData')
const auth = require('../middleware/auth.middleware')


const route = Router()

route.post(
    '/user/:login',
    // auth,
    async (req, res) => {
        try {
            const login = req.params.login

            const condition = await User.findOne({login})
            if (!condition) return res.status(404).json({m: 'Такого пользователя нет', exists: false, type: GD.TYPE.warning})

            condition.password = undefined
            condition.email = undefined

            res.status(200).json({m: 'Данные выданы', exists: true, user: condition, type: GD.TYPE.success})
        }catch (e) {
            res.status(403).json({m: 'Какая-то ошибка', exists: false, type: GD.TYPE.error,})
        }
    }
)

route.post(
    '/students',
    auth,
    async (req, res) => {
        try {
            const user = req.user
            const response = await User.findOne({login: user.login})
            const role = response.role

            if (!role){
                return res.status(401).json({m: 'Вы студент', students: [response.login], role, type: GD.TYPE.success,})
            }

            const students = response.students


            // console.log(response)

            res.json({m: 'ответ есть', students, role, type: GD.TYPE.success,})
        }catch (e) {
            res.status(403).json({m: 'Какая-то ошибка', type: GD.TYPE.error,})
        }
    }
)

route.post(
    '/teacher',
    auth,
    async (req, res) => {
        try {
            const user = req.user
            const response = await User.findOne({login: user.login})
            const role = response.role

            if (response.role){
                return res.status(401).json({m: 'Вы преподаватель', teacher: response.login, role, type: GD.TYPE.success,})
            }

            const teacher = response.teacher

            // console.log(response)

            res.json({m: 'Учитель выдан', teacher, role, type: GD.TYPE.success,})
        }catch (e) {
            res.status(403).json({m: 'Какая-то ошибка', type: GD.TYPE.error,})
        }
    }
)
 route.post(
     '/info',
     auth,
     async (req, res)=>{
         try {
             const loginAuth = req.user.login
             const loginBody = req.body.login

             if (loginBody !== loginAuth) return res.status(403).json({m: 'Авторизация не пройдена', exists: false, type: GD.TYPE.warning,})

             const user = await User.findOne({login: loginAuth})
             if (!user ) return res.status(403).json({m: 'Пользователь не найден', exists: false, type: GD.TYPE.warning,})

             user.password = undefined

             res.status(200).json({m: 'Данные выданы', exists: true, user, type: GD.TYPE.success})
         }catch (e) {
             res.status(403).json({m: 'Какая-то ошибка', exists: false, type: GD.TYPE.error,})
         }
     }
 )

route.post(
    '/update',
    auth,
    async (req, res)=>{
        try {
            const loginAuth = req.user.login
            const loginBody = req.body.user.login

            if (loginBody !== loginAuth) return res.status(403).json({m: 'Авторизация не пройдена', exists: false, type: GD.TYPE.warning,})
            const user = await User.findOne({login: loginAuth})
            if (!user ) return res.status(403).json({m: 'Пользователь не найден', exists: false, type: GD.TYPE.warning,})




            res.status(200).json({m: 'Данные выданы', exists: true, user, type: GD.TYPE.success})
        }catch (e) {
            res.status(403).json({m: 'Какая-то ошибка', exists: false, type: GD.TYPE.error,})
        }
    }
)

module.exports = route