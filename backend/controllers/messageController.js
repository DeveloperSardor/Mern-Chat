const expressAsyncHandler = require("express-async-handler");
const Messages = require("../models/messageModel");
const Users = require("../models/userModel");
const Chats = require("../models/chatsModel");
const sendMessage = expressAsyncHandler(async (req, res) => {
  try {
    const {content, chatId} = req.body;
    if(!content || !chatId){
      throw new Error(`Invalid data passes into request`);
    }
    var newMessage = {
      sender : req.user._id,
      content : content,
      chat : chatId
    }
    var message  = await Messages.create(newMessage);

    message = await message.populate("sender", "username img_path")
    message = await message.populate("chat")
     message = await Users.populate(message, {
      path : "chat.users",
      select : "username img_path email"
     })

     await Chats.findByIdAndUpdate(req.body.chatId, {
      latestMessage : message
     })

     res.json(message)

    
  } catch (error) {
    res.send({ message: `Error: ${error.message}`, status: 400 });
  }
});

const allMessages = expressAsyncHandler(async (req, res) => {
  try {
    const messages = await Messages.find({ chat: req.params.chatId }).populate(
      "sender",
      "username img_path email"
    ).populate('chat');
    res.json(messages)
  } catch (error) {
    res.send({ message: `Error: ${error.message}`, status: 400 });
  }
});

module.exports = { sendMessage, allMessages };
