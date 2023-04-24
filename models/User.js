// models/User.js
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { comparePassword, hashPassword } from '../helpers/hashing.js';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
};

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await hashPassword(this.password);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.method('authenticate', async function (clearTextPassword) {
  return await comparePassword(clearTextPassword, this.password);
});

const User = mongoose.model('User', userSchema);
export default User;
