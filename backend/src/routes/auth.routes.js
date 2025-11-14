import express from 'express';
import { signup } from '../controllers/auth.controllers.js';

const router = express.Router()

router.get('/login', (req,res) =>{
    res.send('login')
})

router.get('/logout', (req,res) =>{
    res.send('logout')
})

router.post('/signup', signup)

export default router