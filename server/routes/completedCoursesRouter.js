const Router = require('express')
const router = new Router()
const completedCoursesController = require('../controllers/completedCoursesController')

router.post('/', completedCoursesController.create)
router.get('/', completedCoursesController.getAll)
router.get('/:id', completedCoursesController.getOne)

module.exports = router