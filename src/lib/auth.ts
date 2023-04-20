import { hash, compare } from 'bcrypt';

export const hashPassword = (password: string) => {
  return hash(password, 12);
};

export const comparePassword = async (password: string, hashed: string) => {
  return compare(password, hashed);
};
