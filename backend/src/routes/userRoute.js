const router = require('express').Router()
const isAuthenticated = require('../middlewares/isAuthenticated')
const userController = require('../controllers/userController')

router.use('/', isAuthenticated)
router.get('/', userController.searchUser)
router.get('/group', userController.searchUserInGroupModal)

module.exports = router