import { registerAs } from '@nestjs/config';

const database = () => {
  const dbProvider = process.env.DATABASE_PROVIDER;
  const dbHost = process.env.DATABASE_HOST;
  const dbPort = process.env.DATABASE_PORT;
  const dbName = process.env.DATABASE_NAME;
  const dbUsername = process.env.DATABASE_USERNAME;
  const dbPassword = process.env.DATABASE_PASSWORD;

  const databaseURL = `${dbProvider}://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
  process.env.DATABASE_URL = databaseURL;

  return {
    databaseURL: databaseURL,
  };
};

export default registerAs('database', database);
