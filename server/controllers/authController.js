import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const {username, email, password} = req.body;
    //step1: validate input
    if(!username || !email || !password) {
      return res.status(400).json({message: "All fields are required"});
    }

    //step2: check if user already exists
    const userExists = await User.findOne({
      $or: [{email}, {username}],
    });

    if(userExists) {
      return res.status(400).json({
        message: "User already exists with this email or username"
      })
    }

    //step3: hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //step4: create user
    const user = await User.create({
      username, email, password: hashedPassword,
    });

    //step5: send response with token
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch(error) {
    res.status(500).json({message: error.message});
  }
}; 

export const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;

    //step1: validate Input
    if(!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    //step2: find User
    const user = await User.findOne({email})

    if(!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    //step3: compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    //step4: send response with token
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  }catch(error) {
    res.status(500).json({message: error.message});
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  }catch (error){
    res.status(500).json({ message: error.message});
  }
}