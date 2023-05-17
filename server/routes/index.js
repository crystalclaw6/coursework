const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const courseRouter = require('./courseRouter')

router.use('/user', userRouter)
router.use('/course', courseRouter)

module.exports = router