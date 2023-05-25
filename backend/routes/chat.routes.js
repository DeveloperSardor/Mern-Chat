const {Router} = require('express');
const { protect } = require('../middlewares/authMiddlewaire');
const {accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup} = require('../controllers/chatController.js')
const chatRouter = Router();

chatRouter.route('/')
  .post(protect, accessChat)
  .get(protect, fetchChats)
chatRouter.route('/group').post(protect, createGroupChat)
chatRouter.route('/rename/:chatId').put(protect, renameGroup);
chatRouter.route('/group/add').put(protect, addToGroup);
chatRouter.route('/group/remove').put(protect, removeFromGroup);


module.exports = chatRouter; 