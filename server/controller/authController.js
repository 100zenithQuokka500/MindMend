import mongoose from 'mongoose';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const generateToken = (user)=>{
  return jwt.sign({id:user._id , name:user.firstname} , JWT_SECRET , {expiresIn:JWT_EXPIRES_IN});
}
const isProd = process.env.NODE_ENV === 'production';
const cookieOptions = {
  httpOnly: true,
  secure: isProd, // only secure in production; allows localhost dev
  sameSite: isProd ? "None" : "Lax",
};
export const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;
    
    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)' 
      });
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists. Please log in.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ firstname, lastname, email, password: hashedPassword, role });
    await newUser.save({ newUser });
    const accessToken = await generateToken(newUser);
    res.status(201).cookie("accessToken" , accessToken , cookieOptions).json({
      success: true,
      message: 'User signed up successfully',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error signing up user' });
    console.log(error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found. Please sign up.' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid password. Please try again.' });
    }
    const accessToken = generateToken(user);
    res.status(200).cookie("accessToken" , accessToken , cookieOptions).json({
      message: 'Login successful',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
    console.log(error);
  }
};
export const logout = async (req, res) => {
  const token = req.cookies?.accessToken;
  try {
    if (!token) {
      return res.status(401).json({ error: 'Token not found!.' });
    }
    const decodedToken = jwt.verify(token , process.env.JWT_SECRET);
    if (!decodedToken || !decodedToken.id) {
      return res.status(401).json({ error: 'token is expired!.' });
    }
    const user = await User.findById(decodedToken.id);
    if(!user){
      res.status(404).json({error: 'user not found!.'})
    }
    res.status(200).clearCookie("accessToken" , cookieOptions).json({
      message: 'Logout successful',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Logout failed' });
    console.log(error);
  }
};
export const currentUser = async (req, res) => {
  const token = req.cookies?.accessToken;
  try {
    if (!token) {
      return res.status(401).json({ error: 'Token not found!.' });
    }
    const decodedToken = jwt.verify(token , process.env.JWT_SECRET);
    if (!decodedToken || !decodedToken.id) {
      return res.status(401).json({ error: 'token is expired!.' });
    }
    const user = await User.findById(decodedToken.id);
    if(!user){
      res.status(404).json({error: 'user not found!.'})
    }
    res.status(200).json({
      message: 'current user is!',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'not found current user' });
    console.log(error);
  }
};


