const {Course} = require("../models/models")
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
class CourseController{
    async create(req, res, next){
        try{
        const {title, description} = req.body
        const {task, code} = req.files
        let filename_task = uuid.v4() + ".txt"
        let filename_code = uuid.v4() + ".txt"
        task.mv(path.resolve(__dirname, '..', 'static', filename_task))
        code.mv(path.resolve(__dirname, '..', 'static', filename_code))
        const course = await Course.create({title, description, task: filename_task, code: filename_code})
        return res.json(course)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res){
        const courses = await Course.findAll()
        return res.json(courses)
    }
    async getOne(req, res){
        const {id} = req.params
        const course = await Course.findOne({
            where: {id}
        })
        return res.json(course)
    }
}
module.exports = new CourseController()