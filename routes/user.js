const express = require('express')
const multer = require('multer')
const jwt=require('jsonwebtoken')
// const sharp = require('sharp')
const bcrypt = require("bcryptjs");
const auth = require('../middleware/auth')
const userController=require('../controllers/userController.js')
const router = new express.Router()

// Load Input Validation
const validateRegisterInput = require("../src/validate");

// Load User model
const User = require("../models/user");


// @route   POST /createUser
// @desc    Register user
// @access  Public
//{
// "name":"xx",
// "email":"xx",
// "password":"xx",
// "age":"xx"
// }

router.post('/createUser', async (req, res) => {
   
    const response= validateRegisterInput.registerValidation(req.body);

    //check Validation
    if(response.error)
    {
    var res_arr=[]
    response.error.details.map((error)=>
    { res_arr.push(error.message) })
        return res.status(400).json(res_arr)
    
    } 
    // console.log(req.body)
    // const user=new User(req.body)
    // console.log(user)
    // await user.save()
    // console.log("user saved")
    var result = await userController.createUsers(req.body)
    res.status(201).send(result)

   
})

router.post('/users/login', auth,async (req, res) => {
    try {
        const user = await userController.findByCredentials(req.body.email, req.body.password)
        res.send({ user })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/deleteUser', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router