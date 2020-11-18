const jwt = require('jsonwebtoken')
const GD = require('../../globalData')

module.exports = async (req, res, next)=>{
    try {
        if (req.method === 'OPTIONS'){
            return next()
        }
        // ожидание получения авторизации
        // console.log(req.headers)
        // Authorization: Basic YWxhZGRpbjpvcGVuc2VzYW1l
        const token = req.headers.authorization.split(' ')[1]

        if (token === 'undefined'){
            return res.status(401).json({m: 'токена нет'})
        }
        if (!token){
            return res.status(401).json({m: 'Вы не авторизованны', help: 'not have auth token'})
        }

        const decode = jwt.verify(token, GD.JWT.secretKey)
        if (!decode){
            return res.status(401).json({m: 'Авторизация изтекла'})
        }

        req.user = decode

        next()
    }catch (e) {
        res.status(401).json({m: 'При проверке авторизации ошибка'})
        console.log(e)
    }
}