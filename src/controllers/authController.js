// controllers/auth.js
// import createError from 'http-errors';
import User from '../models/User.js';
import config from '../config/config.js';
import { registerSchema, loginSchema } from '../helpers/validation.js';

export const register = async (req, res, next) => {
  try {
    const { error: validationError, value: validatedData } =
      registerSchema.validate(req.body);
    if (validationError) {
      return res.redirect(
        '/auth/register?error=' +
          encodeURIComponent(validationError.details[0].message)
      );
    }

    const { username, email, password } = validatedData;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.redirect(
        '/auth/register?error=' + encodeURIComponent('Account already exists')
      );
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
    res.redirect('/user/profile');
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { error: validationError, value: validatedData } =
      loginSchema.validate(req.body);
    if (validationError) {
      return res.redirect(
        '/auth/login?error=' +
          encodeURIComponent(validationError.details[0].message)
      );
    }

    const { email, password } = validatedData;

    const userToLogin = await User.findOne({ email });
    if (!userToLogin) {
      return res.redirect(
        '/auth/login?error=' + encodeURIComponent('Invalid credentials')
      );
    }

    const doPasswordsMatch = await userToLogin.authenticate(password);
    if (!doPasswordsMatch) {
      return res.redirect(
        '/auth/login?error=' + encodeURIComponent('Invalid credentials')
      );
    }

    const token = userToLogin.generateAuthToken();
    req.user = userToLogin;
    res.cookie('token', token, config.cookieOptions);
    res.redirect('/user/profile');
  } catch (err) {
    next(err);
  }
};
