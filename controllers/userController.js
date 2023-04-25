import {
  updatePasswordSchema,
  updateProfileSchema,
} from '../helpers/validation.js';
import User from '../models/User.js';

export const updateUserProfile = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { userId: paramUserId } = req.params;

    const { error: validationError, value: validatedData } =
      updateProfileSchema.validate(req.body);
    if (validationError) {
      return res.status(400).send(validationError.details[0].message);
    }

    const { username, email } = validatedData;

    const userToUpdate = await User.findById(paramUserId);
    if (!userToUpdate) {
      return res.status(404).send('User not found');
    }

    if (userToUpdate._id.toString() !== userId.toString()) {
      return res.status(403).send('Unauthorized');
    }

    userToUpdate.username = username;
    userToUpdate.email = email;

    await userToUpdate.save();

    // redirect to profile page
    res.redirect('/user/profile');
  } catch (err) {
    next(err);
  }
};

export const updateUserPassword = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { userId: paramUserId } = req.params;

    const { error: validationError, value: validatedData } =
      updatePasswordSchema.validate(req.body);
    if (validationError) {
      return res.status(400).send(validationError.details[0].message);
    }

    const { password } = validatedData;

    const userToUpdate = await User.findById(paramUserId);
    if (!userToUpdate) {
      return res.status(404).send('User not found');
    }

    if (userToUpdate._id.toString() !== userId.toString()) {
      return res.status(403).send('Unauthorized');
    }

    userToUpdate.password = password;

    await userToUpdate.save();

    // redirect to profile page
    res.redirect('/user/profile');
  } catch (err) {
    next(err);
  }
};
