const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const taskController=require('../controllers/taskController.js')

const router = new express.Router()

// Load Input Validation
const validateInput = require("../src/validate");


router.post('/createTasks', auth, async (req, res) => {
    const response= validateInput.createTaskValidation(req.body);

     //check Validation
     if(response.error)
     {
     var res_arr=[]
     response.error.details.map((error)=>
     { res_arr.push(error.message) })
         return res.status(400).json(res_arr)
     
     } 

    console.log(req.body);
    // const task = new Task({
    //     ...req.body,
    //     owner: req.user._id
    // })

    try {
        
        // await task.save()
        // res.status(201).send(task)
        var task = await taskController.createTask({
            ...req.body,
            owner: req.user._id
        })
        console.log("Task is "+ task)
        res.status(201).send({message: 'Task created sucessfully',task:task})   
    } catch (e) {
        res.status(400).send(e)
    }
 
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await taskController.findByTaskId({ _id, owner: req.user._id })
        res.status(201).send({task:task}) 
        // if (!task) {
        //     return res.status(404).send()
        // }
        // res.send(task)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }
        console.log(task);

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        res.status(201).send({message:`Task with ID : ${req.params.id} successfully deleted`})       

    } catch (e) {
        res.status(400).send(e.message)
    }

   
})

module.exports = router