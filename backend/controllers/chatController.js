const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatsModel");
const User = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      throw new Error(`userId param not sent with request`);
    }
    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "username img_path email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
    }

    const createdChat = await Chat.create(chatData);
    const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );
    res.send(FullChat).status(200);
  } catch (error) {
    res.send({ msg: `Error : ${error.message}`, status: 400 }).status(400);
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    // console.log(req.url);
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "username img_path email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.send({ msg: error.message, status: 400 }).status(400);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  try {
    if (!req.user || !req.body.chatName) {
      throw new Error("Please Fill all the fields");
    }

    var users = JSON.parse(req.body.users);

    if (users.length < 1) {
      throw new Error("More Than 2 users are required to form a group chat");
    }

    users.push(req.user);

    const groupChat = await Chat.create({
      chatName: req.body.chatName,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.send({ msg: error.message, status: 400 }).status(400);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  try {
    const { chatName } = req.body;
    const { chatId } = req.params;
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      throw new Error("Chat Not Found");
    } else {
      res.json(updatedChat);
    }
  } catch (error) {
    res.send({ msg: error.message, status: 400 }).status(400);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  try {
    // const chatId = req.params;
    const { userId, chatId } = req.body;

    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!added) {
      throw new Error("Chat Not Found");
    } else {
      res.json(added);
    }
  } catch (error) {
    res.send({ msg: error.message, status: 400 }).status(400);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  try {
    const { userId, chatId } = req.body;
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removed) {
      throw new Error("Chat Not Found");
    } else {
      res.json(removed);
    }
  } catch (error) {
    res.send({ msg: error.message, status: 400 }).status(400);
  }
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
