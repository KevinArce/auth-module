import { User } from '../models/user';
import bcrypt from 'bcryptjs';

const users: User[] = [];

export const registerUser = async (username: string, password: string, roles: string[]): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user: User = {
    id: (users.length + 1).toString(),
    username,
    password: hashedPassword,
    roles
  };
  users.push(user);
  return user;
};

export const authenticateUser = async (username: string, password: string): Promise<User | null> => {
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  }
  return null;
};
