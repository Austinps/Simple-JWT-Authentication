import Joi from 'joi';

// define the schema for validating the request body
export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const updateProfileSchema = Joi.object({
  username: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
});

export const updatePasswordSchema = Joi.object({
  password: Joi.string().min(6).optional(),
  confirmPassword: Joi.string().trim().valid(Joi.ref('password')).optional(),
});
