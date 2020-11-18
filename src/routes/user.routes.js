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
    '/students',
    auth,
    async (req, res) => {
        try {
            const user = req.user
            const response = await User.findOne({login: user.login})
            const role = response.role

            if (!role){
                res.status(401).json({m: 'Вы студент', students: response.login, role})
            }

            const students = response.students


            // console.log(response)

            res.json({m: 'ответ есть', students, role})
        }catch (e) {
            res.status(403).json({m: 'Какая-то ошибка'})
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
                res.status(401).json({m: 'Вы преподаватель', teacher: response.login, role})
            }

            const teacher = response.teacher

            // console.log(response)

            res.json({m: 'Учитель выдан', teacher, role})
        }catch (e) {
            res.status(403).json({m: 'Какая-то ошибка'})
        }
    }
)


module.exports = route