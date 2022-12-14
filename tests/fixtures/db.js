const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Task =require('../../models/task')
const config=require('../../helper/config')

const userOneId = new mongoose.Types.ObjectId();
console.log(userOneId);
const userOne = {
  _id: userOneId,
  name: "shrabanti1",
  email: "shrabanti@gmail.com",
  password: "shrabanti@123",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, config.secretKey),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();

const userTwo = {
  _id: userTwoId,
  name: "priya",
  email: "priya@gmail.com",
  password: "priya@123",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, config.secretKey),
    },
  ],
};



const userThree = {
  name: "test",
  email: "test@gmail.com",
  password: "test@123"
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First task',
    completed: false,
    owner: userOne._id
}

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Second task',
  completed: false,
  owner: userOne._id
}
const taskOneId =taskOne._id;
const taskTwoId =taskTwo._id;

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
  
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    userThree,
    taskOne,
    taskTwo,
    taskTwoId,
    taskOneId,
    setupDatabase
}
