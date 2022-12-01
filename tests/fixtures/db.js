const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const config=require('../../helper/config')
const userOneId = new mongoose.Types.ObjectId();
console.log(userOneId);
const userOne = {
  _id: userOneId,
  name: "Karan",
  email: "karan@example.com",
  password: "56what!!",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, config.secretKey),
    },
  ],
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First task',
    completed: false,
    owner: userOne._id
}
const taskOneId =taskOne._id;


const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new Task(taskOne).save()
  
}

module.exports = {
    userOneId,
    userOne,
    taskOne,
    taskOneId,
    setupDatabase
}
