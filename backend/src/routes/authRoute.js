const router = require('express').Router()
const authPolicy = require('../middlewares/authPolicy')
const authController = require('../controllers/authController')

router.get('/', authController.getImageId)
router.post('/register', authPolicy.register, authController.register)
router.post('/login', authController.login)

module.exports = router