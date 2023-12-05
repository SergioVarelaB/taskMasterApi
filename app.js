const express = require("express");
const app = express()
const port = 4000

const routes = require('./Routes/router')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Routes
app.use("/", routes) 

//connect to bd
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/taskMaster");

// 
app.listen(port, ()=>{
    console.log(`listening at http://localhost:${port}`)
})
