const {Schema, Types, model} = require('mongoose')

const user = new Schema({
    email: {type: String, required: true, unique: true},
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: Boolean, default: false},
    teacher: {type: String},
    students: [{type: String}],
    token: {type: String},
    confirmationEmail: {type: Boolean, default: false},
    registered: {type: Number, default: Date.now()},
    lessons: [{type: Types.ObjectId}],
    sessions: [{type: Object}],
    theme: [{type: Object}],
})


module.exports = model('User', user)