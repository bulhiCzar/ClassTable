const {Schema, Types, model} = require('mongoose')

const lesson = new Schema({
    student: {type:String, required: true}, // логин студента
    teacher: {type: String, required: true}, // логин препода
    price: {type: Number, required: true}, // цена урока
    checkPay: {type: Boolean, default: false}, // проверка платежа
    dateCreate: {type: Number, default: Date.now()}, // дата создания
    dateCarrying: {type: Number, required: true}, // дата проведения
    owner: {type: String}, // создатель урока
    comment: {type: String}, // коментарий к заказу
    topic: {type: String}, // тема занятия
    multiplier: {type: Number, default: 1}, // продолжительность
    isDisable: {type: Boolean, default: false}, // активность урока
})

module.exports = model('Lesson', lesson)