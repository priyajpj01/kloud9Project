const express = require('express')
const bodyParser=require('body-parser')
require('../db/mongoose')
const userRouter = require('../routes/user')
const taskRouter = require('../routes/task')

const app = express()
const port = process.env.PORT || 3000

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "*");
  
    next();
  });


app.use(userRouter)
app.use(taskRouter)




app.get("/",(req,res)=>
{
res.send("hello world")
})
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

