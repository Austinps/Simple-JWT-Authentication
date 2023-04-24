// controllers/auth.js

import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const token = newUser.generateAuthToken();
    await newUser.save();
    req.user = newUser;
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/user/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send('Invalid credentials');
    }

    const token = user.generateAuthToken();
    req.user = user;
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/user/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
