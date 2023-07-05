import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const user = await authService.register({ email, password, firstName, lastName });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { data, token } = await authService.login({ email, password });

    res.status(200).json({ message: 'Login successful', data, token });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
