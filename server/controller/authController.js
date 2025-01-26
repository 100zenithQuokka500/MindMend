import User from '../models/userModel.js';

export const signup = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;
  console.log("request from user: ", firstname, lastname, email, password, role);
  try {
    const existingUser = await User.findOne({ $or: [{ email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists. Please log in.' });
    }

    const newUser = new User({ firstname, lastname, email, password, role });
    await newUser.save();
    res.status(201).send('User signed up successfully');
  } catch (error) {
    res.status(500).send('Error signing up user');
    console.log(error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("request from user: ", email, password);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found. Please sign up.' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
    console.log(error);
  }
};


