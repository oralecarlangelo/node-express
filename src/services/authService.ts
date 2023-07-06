// services/authService.ts

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { LoginUserDto, RegisterUserDto } from '../dto/UserDto';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Don't forget to add it in .env file

export async function register(dto: RegisterUserDto) {
  const { password, ...rest } = dto
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({ ...rest, password: hashedPassword });

  return user;
}

interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface LoginResponse {
  data: UserResponse;
  token: string;
}

export async function login(dto: LoginUserDto): Promise<LoginResponse> {
  const user = await User.findOne({ where: { email: dto.email } });

  if (!user) {
    throw new Error('No such user found');
  }

  const isPasswordValid = await bcrypt.compare(dto.password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET || 'your_default_secret_key');
  const userResponse: UserResponse = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  return { data: userResponse, token };
}