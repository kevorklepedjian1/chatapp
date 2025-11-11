import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js'

const app = express()
const PORT = process.env.PORT || 3000
dotenv.config()

app.use("/api/auth",authRoutes)

app.listen(PORT, () => console.log(`the port is running on ${PORT}`))