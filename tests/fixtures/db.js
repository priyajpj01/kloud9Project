const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

const userOneId = new mongoose.Types.ObjectId();
console.log(userOneId);
const userOne = {
  _id: userOneId,
  name: "Karan",
  email: "kp@example.com",
  password: "56what!!",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, "Mynewproject"),
    },
  ],
};

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
};

module.exports = {
  userOneId,
  userOne,
  setupDatabase,
};
