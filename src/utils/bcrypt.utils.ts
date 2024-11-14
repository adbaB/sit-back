import * as bcrypt from 'bcrypt';
export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, parseInt(process.env.SALT_HASH, 10));
}

export function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
