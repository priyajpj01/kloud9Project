const request = require("supertest");
const { createTask, findByTaskId } = require("../controllers/taskController");
const app = require("../src/app");

const Task = require("../models/task");
const {
  userTwoId,
  userTwo,
  userOne,
  taskOne,
  taskOneId,
  taskTwoId,
  taskTwo,
  setupDatabase,
} = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should fetch user tasks", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toEqual(2);
});

test("Should create task for user", async () => {
  const response = await request(app)
    .post("/createTasks")
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send({
      description: "Third task",
    })
    .expect(201);
  const task = await Task.findById(response.body.task._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});


test('Should not delete other users tasks', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskTwo._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(401)
    const task = await Task.findById(taskTwo._id)
    expect(task).not.toBeNull()
})
