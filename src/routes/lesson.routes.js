const {Router} = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const Lesson = require('../models/Lesson')
const GD = require('../../globalData')
const auth = require('../middleware/auth.middleware')


const route = Router()

route.delete(
    '/:id',
    auth,
    async (req, res)=>{
        try {
            const id = req.params.id
            const login = req.user.login

            let lesson = await Lesson.findById(id)
            const user = await User.findOne({login})

            if (!lesson.checkPay && !user.role) return res.status(401).json({m: 'Сначала оплатите урок', type: GD.TYPE.warning,})


            const newLessons = user.lessons.filter(item => {
                return item.toString() !== lesson._id.toString()
            })

            let condition
            // if (login === lesson.teacher){
            //     condition = await User.findOne()
            // }


            if (user.login === lesson.teacher){
                condition = await User.findOne({login: lesson.student})
            } else if (user.login === lesson.student){
                condition = await User.findOne({login: lesson.teacher})
            }

            user.lessons = newLessons
            condition.lessons = newLessons

            await Lesson.findByIdAndDelete(lesson._id)
            await user.save()
            await condition.save()


            res.status(200).json({m: 'Урок удален', type: GD.TYPE.success,})
        }catch (e) {
            res.status(403).json({m: 'что-то сломалось', type: GD.TYPE.error,})
        }
    }
)

route.post(
    '/add',
    auth,
    [
        check('student').isAlphanumeric(),
        check('teacher').isAlphanumeric(),
        check('topic').trim().rtrim().escape(),
        check('price').isNumeric(),
        check('dateCarrying').isNumeric(),
        check('comment').trim().rtrim().escape(),
    ],
    async (req, res) => {
        try {
            const validation = validationResult(req)
            if (!validation.isEmpty()) {
                return res.status(400).json({
                    m: 'Данные не приняты',
                    type: GD.TYPE.warning,
                    values: validation.array()
                })
            }

            const user = req.user
            const {student, teacher, price, dateCarrying, comment, topic, multiplier} = req.body

            const lesson = new Lesson({
                student,
                teacher,
                price,
                checkPay: false,
                dateCarrying,
                owner: user.login,
                comment,
                topic,
                multiplier
            })
            // console.log(lesson)

            const teacherDB = await User.findOne({login: teacher})
            const studentDB = await User.findOne({login: student})

            if (!(teacherDB || studentDB)){return res.status(401).json({m: 'Преподаватель или студент не найдены', type: GD.TYPE.warning})}

            teacherDB.lessons.push(lesson._id)
            studentDB.lessons.push(lesson._id)

            await lesson.save()
            await teacherDB.save()
            await studentDB.save()

            res.status(200).json({m: 'Урок добавлен', type: GD.TYPE.success})
        } catch (e) {
            console.log(e)
            res.status(403).json({m: 'что-то сломалось', type: GD.TYPE.error,})
        }
    }
)


route.post(
    '/all',
    auth,
    async (req, res) => {
        try {
            let lessons = []
            const login = req.user.login
            const user = await User.findOne({login})

            for (let i = 0; user.lessons.length > i; i++){
                const id = user.lessons[i]
                const item = await Lesson.findOne({_id: id})
                lessons.push(item)
            }

            res.status(200).json({m: 'Данные выданы', type: GD.TYPE.success, lessons})
        } catch (e) {
            res.status(403).json({m: 'Ошибка какая-то, повторите позже', type: GD.TYPE.error})
        }
    }
)





module.exports = route