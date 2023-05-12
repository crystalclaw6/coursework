const {Course} = require("../models/models")
const ApiError = require('../error/ApiError')
class CourseController{
    async create(req, res){
        try{
        const {title, description} = req.body
        const course = await Course.create({title, description})
        return res.json(course)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res){
        const courses = await Course.findAll()
        return res.json(courses)
    }
    async getOne(req,res){
        const id = req.params
        const course = await Course.findOne({
            where: {id}
        })
    }
}
module.exports = new CourseController()