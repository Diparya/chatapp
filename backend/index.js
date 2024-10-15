const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/connectDB')
const router = require('./routes/index')
const cookiesParser = require('cookie-parser')
const { app, server } = require('./socket/index')
const path = require('path')


// const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(express.json())
app.use(cookiesParser())

const PORT = process.env.PORT || 8080

const dirname = path.resolve()

//api endpoints
app.use('/api',router)

app.use(express.static(path.join(dirname, "/frontend/build")))
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(dirname, "frontend", "build", "index.html"))
})

connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log("server running at " + PORT)
    })
})
