const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const  tasks = require('./routes/tasks')

//MIDDLEWARES
//express json middleware (because we will be sending json to the frontend)
app.use(express.json())

//ROUTES
app.get('/hello', (req, res) => {
    res.send("successful setup")
})
app.use("/api/v1/tasks",tasks)


app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})