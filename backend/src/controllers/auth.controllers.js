import { sendWelcomeEmail } from "../email/emailHandlers.js";
import { generateToken } from "../libs/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import 'dotenv/config'

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // check if emailis valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    // 123456 => $dnjasdkasj_?dmsakmk
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // before CR:
      // generateToken(newUser._id, res);
      // await newUser.save();

      // after CR:
      // Persist user first, then issue auth cookie
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });

      try {
        await sendWelcomeEmail(savedUser.email, savedUser.fullName, process.env.CLIENT_URL);
      } catch (error) {
        console.error("Failed to send welcome email:", error);
      }
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req,res) =>{
  const {email,password} = req.body

  try {
    const user = await User.findOne({email})
    if(!user) return res.status(400).json({message: 'invalid cred'})
    
    const ispasshashed = await bcrypt.compare(password,user.password)
    if(!ispasshashed) return res.status(400).json({message: 'invalid cred'})

    generateToken(user._id,res)

    res.status(200).json({
      _id: user._id,
      email:user.email,
      fullName: user.fullName,

      
    })
  } catch (error) {
    
  }
}

export const logout = (_,res) =>{
  res.cookie("jwt","",{maxAge:0})
  res.status(200).json({message: "you are logged out"})
}