import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { generatetoken } from '../libs/utils.js'

export const signup = async (req, res) => {
  const { firstName, email, password } = req.body

  try {
    if (!firstName || !email || !password) {
      return res.status(400).json({ message: 'there are empty fields' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'password is short than 6' })
    }

    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'user already exists' })
    }

    // hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      email,
      firstName,
      password: hashedPassword
    })

    await newUser.save()

    generatetoken(newUser._id, res)

    return res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      firstname: newUser.firstName,
      profilePic: newUser.profilePic
    })

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


