const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}, 
})
const Course = sequelize.define('course', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    task: {type: DataTypes.STRING},
    code: {type: DataTypes.STRING},
})
const CompletedCourses = sequelize.define('completed_courses',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    grade: {type: DataTypes.INTEGER, defaultValue: 0},
})
User.belongsToMany(Course, {through: CompletedCourses});
Course.belongsToMany(User, {through: CompletedCourses})
module.exports = {
    User,
    Course,
    CompletedCourses
}
