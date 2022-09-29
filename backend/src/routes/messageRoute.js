const router = require('express').Router()
const isAuthenticated = require('../middlewares/isAuthenticated')
const messagePolicy = require('../middlewares/messagePolicy')
const messageController = require('../controllers/messageController')

router.use('/', isAuthenticated)
router.post('/', messagePolicy.createMessage, messageController.createMessage)
router.get('/:chatId', messageController.getAllMessages)
router.patch('/:chatId', messageController.markAsRead)
router.patch('/unread/:chatId', messageController.markAsUnread)

module.exports = router