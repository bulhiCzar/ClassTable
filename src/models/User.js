const {Schema, Types, model} = require('mongoose')

const user = new Schema({
    email: {type: String, required: true, unique: true},
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: Boolean, default: false}, // true - teacher | false - student
    lessons: [{
        student: String,
        price: Number,
        pay: Number,
        check: Boolean,
        date: Date,
        currency: String
    }],
    confirmationEmail: {type: Boolean, default: false},
    token: {type: String},
    sessions: [{
        ty: Number,
        ip: String
    }],
    teacher: {type: String},
    students: [{
        type: String
    }],
    registered: {type: Number, default: Date.now()}
})


module.exports = model('User', user)