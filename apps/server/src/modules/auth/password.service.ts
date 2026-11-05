import bcrypt from 'bcrypt';
import { AUTH_CONST } from './const';

export class PasswordService {
  hashPassword = async (password: string): Promise<string> => {
    const saltRounds = AUTH_CONST.BCRYPT_ROUNDS;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };

  comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  };
}

export const passwordService = new PasswordService();
