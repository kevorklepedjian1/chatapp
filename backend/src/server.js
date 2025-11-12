import express from 'express';
import dotenv from 'dotenv';
import path from 'path'

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/messages.routes.js'
import connectDb from './libs/db.js';

const app = express()
const PORT = process.env.PORT || 3000
const _dirname = path.resolve()
dotenv.config()

app.use("/api/auth",authRoutes)
app.use('/api/messages', messageRoutes)

//make it production ready 
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(_dirname, "../frontend/chat/dist")))
    app.get("*", (req,res) =>{
        res.sendFile(path.join(_dirname, "../frontend/chat", "dist", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log(`the port is running on ${PORT}`)
    connectDb()
})