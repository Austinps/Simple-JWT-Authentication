// controllers/auth.js
import createError from 'http-errors';
import User from '../models/User.js';
import config from '../config.js';
import { registerSchema, loginSchema } from '../helpers/validation.js';

export const register = async (req, res, next) => {
  try {
    const { error: validationError, value: validatedData } =
      registerSchema.validate(req.body);
    if (validationError) {
      return res.status(400).send(validationError.details[0].message);
    }

    const { username, email, password } = validatedData;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).send('An account with this email already exists');
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    const token = newUser.generateAuthToken();
    await newUser.save();
    req.user = newUser;
    res.cookie('token', token, config.cookieOptions);
    res.redirect('/user/dashboard');
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { error: validationError, value: validatedData } =
      loginSchema.validate(req.body);
    if (validationError) {
      return res.status(400).send(validationError.details[0].message);
    }

    const { email, password } = validatedData;

    const userToLogin = await User.findOne({ email });
    if (!userToLogin) {
      return res.status(400).send('Invalid credentials');
    }

    const doPasswordsMatch = await userToLogin.authenticate(password);
    if (!doPasswordsMatch) {
      throw new createError.Unauthorized('Invalid email or password');
    }

    const token = userToLogin.generateAuthToken();
    req.user = userToLogin;
    res.cookie('token', token, config.cookieOptions);
    res.redirect('/user/dashboard');
  } catch (err) {
    next(err);
  }
};
