const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, CompletedCourses} = require('../models/models')
const genereateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
        )

}
class UserController{
    async registration(req, res, next){
        const {email, password, role} = req.body
        if (!email || !password){
            return next(ApiError.badRequest('Заполните пустые поля'))
        }
        const candidate = await User.findOne({where:{email}})
        if (candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            return next(ApiError.badRequest('Неверный формат почтового адреса'))
        }
        if (password.length < 5) {
            return next(ApiError.badRequest('Пароль должен состоять не менее чем из 5 символов'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const courses = await CompletedCourses.create({userId: user.id, courseId: 1, grade: 0})
        const token = genereateJwt(user.id, user.email, user.role)
            return res.json({token})
    }
    async login(req, res, next){
        const {email, password} = req.body
        if (!email || !password){
            return next(ApiError.badRequest('Заполните пустые поля'))
        }
        const user = await User.findOne({where: {email}})
        if (!user){
            return next(ApiError.internal("Пользователь не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal("Введен неверный пароль"))
        }
        const token = genereateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async check(req, res, next){
        const token = genereateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}
module.exports = new UserController()