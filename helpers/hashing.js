import { hash, compare } from 'bcrypt';

export const hashPassword = async (password) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  return hash(password, saltRounds);
};

export const comparePassword = async (clearTextPassword, hashedPassword) =>
  compare(clearTextPassword, hashedPassword);
