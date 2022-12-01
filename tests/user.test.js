const request = require("supertest");
const app = require("../src/app");
const User = require("../models/user");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

// Test cases without mocking library

describe("/POST/createUser", () => {
  test("Shloud give error when the fields is missing", async () => {
    await request(app)
      .post("/users/signup")
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(400);
  });

  test("Should not create a user with duplicate email", async () => {
    const body={
      email: userOne.email,
      password: userOne.password,
      name:userOne.name
    }
    const response=await request(app)
      .post("/users/signup")
      .send(body);
      expect(400)
      expect(response.text).toBe(" A user with email "+body.email+" already exists")
    
  });
});


describe("/GET/getUser", () => {
  test("Should login existing user", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(201);
    const user = await User.findById(userOneId);
    expect(response.body.user.tokens[0].token).toBe(user.tokens[0].token);
  });

  test("Should not login with wrong password", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({
        email: userOne.email,
        password: "wrong_pass",
      })
      .expect(400);
      expect(response.text).toBe("Please enter valid password, password does not match")
  });


  test("Should not login nonexistent user", async () => {
    await request(app)
      .post("/users/login")
      .send({
        email: "demo@gmail.com",
        password: "demo@123",
      })
      .expect(400);
  });
});

//-------------------------------------------------------------------------------------------------

describe("/DELETE/deleteUser", () => {
  test("Should delete account for user", async () => {
    await request(app)
      .delete("/users/delete")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(201);
    const user = await User.findById(userOneId);
    expect(user).toBeNull();
  });

  test("Should not delete account for unauthenticate user", async () => {
    await request(app).delete("/users/delete").send().expect(401);
  });
});

//-------------------------------------------------------------------------------------------------------

describe("/UPDATE/updateUser", () => {
  test("Should update valid user fields", async () => {
    await request(app)
      .patch("/users/update")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        name: "Jess",
      })
      .expect(201);
    const user = await User.findById(userOneId);
    expect(user.name).toEqual("Jess");
  });
});
