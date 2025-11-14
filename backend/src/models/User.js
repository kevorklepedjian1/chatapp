import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    email:{
      type: String,
      required: true,
      unique: true
    },
    firstName:{
      type: String,
      required: true,
    },
     password:{
      type: String,
      required: true,
      mixlenght:6
    },
     profilePic:{
      type: String,
     defaut:'',
    }
}, {timestemps: true})