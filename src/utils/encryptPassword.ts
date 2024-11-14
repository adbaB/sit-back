import * as bcrypt from 'bcrypt';
export function encryptPassword(password: string): Promise<string> {
  return bcrypt.hash(password, parseInt(process.env.SALT_HASH, 10));
}
