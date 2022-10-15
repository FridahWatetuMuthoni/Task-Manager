const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const tasks = require('./routes/tasks')
const connectDB = require('./models/connect')
require('dotenv').config() //To access the environment variables

//authentication and authorization website :https://geekflare.com/user-authentication-with-jwt-in-nodejs/

//DATABASE
connectDB()

///MIDDLEWARES
//express json middleware (because we will be sending json to the frontend)
app.use(express.json())

//ROUTES
app.get('/hello', (req, res) => {
    res.send("successful setup")
})
app.use("/api/v1/tasks",tasks)

//only listen to requests when the database is connected
mongoose.connection.once('open', () => {
    console.log('Connected to mongoDB')
    app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})
})


/*
DATABASE:MONGODB
Collections are like tables in SQL
Now you have to convert your password to a percentage encoding password so for that put,
@ = %40 (put %40 instead of @)
? = %3F
# = %23
[ = %5B
] = %5D
 */