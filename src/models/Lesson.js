const {Schema, Types, model} = require('mongoose')

const lesson = new Schema({
    student: {type:String, required: true}, // логин студента
    teacher: {type: String, required: true}, // логин препода
    price: {type: Number, required: true}, // цена урока
    checkPay: {type: Boolean}, // проверка платежа
    dateCreate: {type: Number, default: Date.now()}, // дата создания
    dateCarrying: {type: Number, required: true}, // дата проведения
    comment: {type: String} // коментарий к заказу
})

module.exports = model('Lesson', lesson)