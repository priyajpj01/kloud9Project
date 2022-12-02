const request = require('supertest')
const { createTask,findByTaskId} = require('../controllers/taskController')
const app = require('../src/app')  

const Task = require('../models/task')
const { userOneId, userOne,taskOne,taskOneId, setupDatabase } = require('./fixtures/db')

// beforeEach(setupDatabase)
// describe("/GET/getUser", () => {
//     test("Should login existing user", async () => {
//       const response = await request(app)
//         .post("/users/login")
//         .send({
//           email: userOne.email,
//           password: userOne.password,
//         })
//         .expect(201);
//       const user = await User.findById(userOneId);
//       expect(response.body.user.tokens[0].token).toBe(user.tokens[0].token);
//     });
  
//     test("Should not login nonexistent user", async () => {
//       await request(app)
//         .post("/users/login")
//         .send({
//           email: "demo@gmail.com",
//           password: "demo@123",
//         })
//         .expect(400);
//     });

//     test('Should fetch user tasks', async () => {
//         const response = await request(app)
//             .get('/tasks')
//             .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//             .send()
//             .expect(200)
//         expect(response.body.length).toEqual(2)
//     })

//   });


test.only('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

// test('Should fetch user tasks', async () => {
//     const response = await request(app)
//         .get('/tasks')
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .send()
//         .expect(200)
//     expect(response.body.length).toEqual(2)
// })

// test('Should not delete other users tasks', async () => {
//     const response = await request(app)
//         .delete(/tasks/`${taskOne._id}`)
//         .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
//         .send()
//         .expect(404)
//     const task = await Task.findById(taskOne._id)
//     expect(task).not.toBeNull()
// })






