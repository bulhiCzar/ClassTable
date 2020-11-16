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
    '/add',
    auth,
    [
        check('student').isAlphanumeric(),
        check('teacher').isAlphanumeric(),
        check('topic').trim().rtrim().escape().isAlphanumeric(),
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
                    type: GD.TYPE.warning,
                    values: validation.array()
                })
            }

            const user = req.user
            const {student, teacher, price, date, comment, topic} = req.body

            const lesson = new Lesson({
                student,
                teacher,
                price,
                checkPay: false,
                dateCarrying: date,
                owner: user.login,
                comment,
                topic
            })

            const teacherDB = await User.findOne({login: teacher})
            const studentDB = await User.findOne({login: student})

            if (!(teacherDB || studentDB)){return res.status(401).json({m: 'преподаватель или студент не были найдены', type: GD.TYPE.warning})}


            teacherDB.lessons.push(lesson._id)
            studentDB.lessons.push(lesson._id)

            await lesson.save()
            await teacherDB.save()
            await studentDB.save()

            res.status(200).json({m: 'Урок добавлен', type: GD.TYPE.success})
        } catch (e) {
            res.status(403).json({m: 'что-то сломалось', type: GD.TYPE.error,})
        }
    }
)


route.get(
    '/all',
    auth,
    async (req, res) => {
        try {
            let lessons = []
            const login = req.user.login
            const user = await User.findOne({login})

            for (let i = 0; user.lessons.length > i; i++){
                const id = user.lessons[i]
                lessons.push(await Lesson.findOne({_id: id}))
            }

            res.status(200).json({m: 'Данные выданы', type: GD.TYPE.success, lessons})
        } catch (e) {
            res.status(403).json({m: 'Ошибка какая-то, повторите позже', type: GD.TYPE.error})
        }
    }
)





module.exports = route