
const Task = require("../models/task");

module.exports = {
    /* Function for create task */
    createTask: async (taskData) => {
        try {
            
            const task=new Task(taskData)
            await task.save()
            return task
            
        } catch (e) {
            return(e.message)

    }
},

findByTaskId : async (taskData) => {
    
    const task = await Task.findOne(taskData)

    if (!task) {
        throw new Error(`Task with id ${taskData._id} does not exist, please check again!!`)
    }
    console.log(task);
   

    return task
}
 


}