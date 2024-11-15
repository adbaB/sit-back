import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    db: {
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      password: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
    },
    mail: {
      port: parseInt(process.env.PORT, 10),
    },
    jwt: {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
      refreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
      refreshExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    },
  };
});
