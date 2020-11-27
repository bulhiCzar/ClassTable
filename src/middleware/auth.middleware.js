const jwt = require('jsonwebtoken')
const GD = require('../../globalData')

module.exports = async (req, res, next)=>{
    try {
        if (req.method === 'OPTIONS'){
            return next()
        }
        // ожидание получения авторизации
        // console.log(req.headers.authorization)
        // Authorization: Basic YWxhZGRpbjpvcGVuc2VzYW1l
        let token = req.headers.authorization
        if (!token){
            return res.status(401).json({m: 'Вы не авторизованны', help: 'not have auth token'})
        }
        token = token.split(' ')[1]

        if (token === undefined || token === null){
            return res.status(401).json({m: 'Токена нет'})
        }


        const decode = jwt.verify(token, GD.JWT.secretKey, (err, decode)=>{
            if (err){return}else {return decode}
        })
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