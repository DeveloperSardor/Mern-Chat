const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, gender, email, img_path, password } = req.body;

    if (!username || !gender || !email || !password) {
      throw new Error(`Please Enter all Fields`);
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error(`User with ${email} - email already exists`);
    }
    const newUser = await User.create({
      username,
      gender,
      email,
      password,
      img_path: img_path
        ? img_path
        : gender == "male"
        ? "https://yt3.ggpht.com/a/AGF-l78AzseOtv4fYGdmRtS7CtaL4wJZLKuFwsi54g=s900-c-k-c0xffffffff-no-rj-mo"
        : gender == "female"
        ? "https://cdn4.iconfinder.com/data/icons/business-conceptual-part1-1/513/employee-1024.png"
        : null,
    });

    if (newUser) {
      res.status(201).send({
        token: generateToken(newUser._id),
        _id: newUser._id,
        username: newUser.username,
        gender: newUser.gender,
        email: newUser.email,
        password: newUser.password,
        img_path: img_path
          ? img_path
          : gender == "male"
          ? "https://yt3.ggpht.com/a/AGF-l78AzseOtv4fYGdmRtS7CtaL4wJZLKuFwsi54g=s900-c-k-c0xffffffff-no-rj-mo"
          : gender == "female"
          ? "https://cdn4.iconfinder.com/data/icons/business-conceptual-part1-1/513/employee-1024.png"
          : null,
      });
    } else {
      throw new Error(`Failed to Create the User`);
    }
  } catch (error) {
    res.send({ msg: `Error: ${error.message}`, status: 401 }).status(401);
  }
});

const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        token: generateToken(user._id),
        _id: user._id,
        username: user.username,
        gender: user.gender,
        email: user.email,
        password: user.password,
      });
    } else {
      throw new Error("Invalid Email or Password");
    }
  } catch (error) {
    res.send({ msg: `Error : ${error.message}`, status: 401 }).status(401);
  }
});

// api/user?search=sardor
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword);
  res.send(await users);
});

module.exports = { registerUser, authUser, allUsers };