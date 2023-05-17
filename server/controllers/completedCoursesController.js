const {Course} = require("../models/models")
const {CompletedCourses} = require("../models/models")
const ApiError = require('../error/ApiError')
class CompletedCoursesController{
    async create(req, res){
        try{
        const {grade, userId, courseId} = req.body
        const completedCourse = await CompletedCourses.create({grade, userId, courseId})
        return res.json(completedCourse)}
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res){
        let {userId, courseId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let courses;
        if (!userId && !courseId){
            courses = await Course.findAndCountAll({limit, offset})
        }
        if (userId && !courseId){
            courses = await Course.findAndCountAll({where:{userId}, limit, offset})
        }
        if (!userId && courseId){
            courses = await Course.findAndCountAll({where:{courseId}, limit, offset})
        }
        if (userId && courseId){
            courses = await Course.findAndCountAll({where:{userId,courseId}, limit, offset})
        }
        return res.json(courses)
    }
    async getOne(req,res){
        const {id} = req.params
        const course = await CompletedCourses.findOne({
            where: {id}
        })
        return res.json(course)
    }
}
module.exports = new CompletedCoursesController