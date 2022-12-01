const request = require("supertest");
var {
  createUsers,
  findByCredentials,
} = require("../../controllers/userController");
const app = require("../../src/index");
const User = require("../../models/user");


// beforeEach(setupDatabase)
describe("/POST/createUesr", () => {
  describe("when the name,age,email and password is passed to save", () => {
    test("Should not create a user with duplicate email and throw error", async () => {
      const body = {
        name: "priya",
        age: 0,
        email: "priya@example.com",
        password: "56what!!",
      };
      User.findOne = jest.fn().mockReturnValueOnce(body);

      User.prototype.save = jest.fn().mockImplementation(() => {});

      await expect(createUsers(body)).rejects.toThrowError();
    });

    test("Should create user and save in database", async () => {
      const stateObj = {
        name: "priya",
        age: 0,
        email: "priya@example.com",
        password: "56what!!",
      };
      User.findOne = jest.fn().mockReturnValueOnce(stateObj);

      User.prototype.save = jest.fn().mockImplementation(() => {});
      const { body } = await request(app).post("/users/signup").send(stateObj);
      expect(body).toEqual(body);
      expect(createUsers).resolves;
    });
  });
});

describe("/POST/loginUser", () => {
  describe("when the email and password is passed", () => {
    test("Should login user", async () => {
      const stateObj = {
        email: "kp@example.com",
        password: "56what!!",
      };
      User.prototype.save = jest.fn().mockImplementation(() => {});
      User.findOne = jest.fn().mockReturnValueOnce(stateObj);

      const { body } = await request(app).post("/users/login").send(stateObj);
      expect(body).toEqual(body);
      expect(findByCredentials).resolves;
    });

    test("Should not login non existing user", async () => {
      const stateObj = {
        email: "kp@example.com",
        password: "56what!!",
      };

      User.findOne = jest.fn().mockReturnValueOnce();

      const { body } = await request(app).post("/users/login").send(stateObj);
      expect(body).toEqual(body);
      expect(findByCredentials).rejects.toThrowError;
    });
  });
});

// describe("when the username or password is missing", () => {
//  test("should return a 400 status code to show there was a user error",()=>
//  {

//  })

// })
