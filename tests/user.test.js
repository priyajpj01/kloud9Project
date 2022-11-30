const request = require('supertest')
const { createUsers,findByCredentials} = require('../controllers/userController')
const app = require('../src/index')  

const User = require('../models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

// beforeEach(setupDatabase)
describe('/POST/createUesr',()=>
{
    describe("when the username or password is passed to save", () => {
test('Should save username and password in database',async ()=>
{
    const body={
   "email":"abc@gmail.com",
   "password":"priya@123"
   }
    User.findOne=jest.fn().mockReturnValueOnce(body);

   User.prototype.save=jest.fn().mockImplementation(()=>{})

   await expect(createUsers(body)).rejects.toThrowError()



})
//  test("should respond with a 200 status code",async ()=>
//  {
// const response=await request(app).post('/createUser').send({
//     "name":"priya",
//     "email":"abc@gmail.com",
//     "password":"priya@123",
//     "age":25

// }).expect(response.statusCode).toBe(200)
//  })

 test("should respond with a json object that contains the id from the database",()=>
 {


 })

    })
describe("when the username or password is missing", () => {
 test("should return a 400 status code to show there was a user error",()=>
 {






 })


})


})



//----------------------------------------------------------------------------------------------------------

describe("/GET/getUser",()=>
{

    test('Should login existing user', async () => {
        const response = await request(app).post('/users/login').send({
            email: userOne.email,
            password: userOne.password
        }).expect(200)
        const user = await User.findById(userOneId)
        expect(response.body.token).toBe(user.tokens[1].token)
    })

    test('Should not login nonexistent user', async () => {
        await request(app).post('/users/login').send({
            email: userOne.email,
            password: 'thisisnotmypass'
        }).expect(400)
    })
})

//-------------------------------------------------------------------------------------------------


describe("/DELETE/deleteUser",()=>
{

    test('Should delete account for user', async () => {
        await request(app)
            .delete('/deleteUser')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)
        const user = await User.findById(userOneId)
        expect(user).toBeNull()
    })


    test('Should not delete account for unauthenticate user', async () => {
        await request(app)
            .delete('/users/me')
            .send()
            .expect(401)
    })

 
    
})

//-------------------------------------------------------------------------------------------------------



describe("/UPDATE/updateUser",()=>
{
    test('Should update valid user fields', async () => {
        await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({
                name: 'Jess'
            })
            .expect(200)
        const user = await User.findById(userOneId)
        expect(user.name).toEqual('Jess')
    })
    

})






