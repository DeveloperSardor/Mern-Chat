const userRouter = require('../routes/user.routes');
const chatRouter= require('../routes/chat.routes.js')
const  messageRouter = require('../routes/message.routes.js')
const {Router} = require('express');

const mainRouter = Router();


mainRouter.use('/api/user', userRouter);
mainRouter.use('/api/chat', chatRouter)
mainRouter.use('/api/message', messageRouter)

module.exports = mainRouter;
