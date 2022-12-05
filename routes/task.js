const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const taskController=require('../controllers/taskController.js')

const router = new express.Router()

// Load Input Validation
const validateInput = require("../src/validate");


router.post('/createTasks',auth, async (req, res) => {
    console.log("Inside create task")
    const response= validateInput.createTaskValidation(req.body);

     //check Validation
     if(response.error)
     {
     var res_arr=[]
     response.error.details.map((error)=>
     { res_arr.push(error.message) })
         return res.status(400).json(res_arr)
     
     } 
    try {
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
        const task = await Task.findOneAndRemove({ _id: req.params.id, owner: req.user._id })
        console.log(task);
        res.status(201).send({message:`Task with ID : ${req.params.id} successfully deleted`})       

    } catch (e) {
        res.status(400).send(e.message)
    }

   
})
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc

router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router