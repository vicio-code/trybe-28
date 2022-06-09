import { NextFunction, Request, Response } from 'express';
import { compareSync } from 'bcryptjs';
import User from '../database/models/users';

const emailValidation = (email: string): boolean => {
  const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  return regex.test(email);
};

const passwordValidation = async (email: string, password: string):Promise<boolean> => {
  const user = await User.findOne({ where: { email } });
  if (!user) return false;

  const checkPassword = compareSync(password, user.password);
  return checkPassword;
};

const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  let isValid;

  if (!email || !password) {
    const message = { message: 'All fields must be filled' };
    return res.status(400).json(message);
  }

  isValid = emailValidation(email);
  if (!isValid) {
    const message = { message: 'Incorrect email or password' };
    return res.status(401).json(message);
  }

  isValid = await passwordValidation(email, password);
  if (!isValid) {
    const message = { message: 'Incorrect email or password' };
    return res.status(401).json(message);
  }

  next();
};

export default loginValidation;
