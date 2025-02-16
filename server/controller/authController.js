import mongoose from 'mongoose';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

export const signup = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { firstname, lastname, email, password, role } = req.body;
    console.log('request from user: ', firstname, lastname, email, password, role);
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: 'Username or email already exists. Please log in.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ firstname, lastname, email, password: hashedPassword, role });
    await newUser.save({ session });
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      success: true,
      message: 'User signed up successfully',
      data: {
        token,
        user: newUser,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: 'Error signing up user' });
    console.log(error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('request from user: ', email, password);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found. Please sign up.' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid password. Please try again.' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.status(200).json({
      message: 'Login successful',
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
    console.log(error);
  }
};


