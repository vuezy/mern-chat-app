const router = require('express').Router()
const isAuthenticated = require('../middlewares/isAuthenticated')
const chatPolicy = require('../middlewares/chatPolicy')
const chatController = require('../controllers/chatController')

router.use('/', isAuthenticated)
router
  .route('/')
  .get(chatController.getAllChats)
  .post(chatPolicy.createChat, chatController.createChat)

router
  .route('/:chatId')
  .get(chatController.getChatDetails)

router.patch('/group/:chatId', chatController.leaveGroup)
router.delete('/group/:chatId', chatController.deleteGroup)
router.patch('/group/edit/:chatId', chatController.editGroupMembers)

module.exports = router