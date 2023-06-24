import { registerAs } from '@nestjs/config';

const database = () => {
  let databaseURL: string;
  const appEnv = process.env.APP_ENV;
  const appRunAt = process.env.APP_RUN_AT;

  let databaseConnection: string;
  let databaseHost: string;
  let databasePort: number;
  let databaseName: string;
  let databaseUsername: string;
  let databasePassword: string;

  if (appEnv === 'development' && appRunAt == 'staging_server') {
    databaseConnection = process.env.STAGING_DATABASE_CONNECTION;
    databaseHost = process.env.STAGING_DATABASE_HOST;
    databasePort = parseInt(process.env.STAGING_DATABASE_PORT) || 3306;
    databaseName = process.env.STAGING_DATABASE_NAME;
    databaseUsername = process.env.STAGING_DATABASE_USERNAME;
    databasePassword = process.env.STAGING_DATABASE_PASSWORD;

    databaseURL = `${databaseConnection}://${databaseUsername}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}`;
    process.env.DATABASE_URL = databaseURL;
  } else if (appEnv === 'development' && appRunAt == 'testing_server') {
    databaseConnection = process.env.TESTING_DATABASE_CONNECTION;
    databaseHost = process.env.TESTING_DATABASE_HOST;
    databasePort = parseInt(process.env.TESTING_DATABASE_PORT) || 3306;
    databaseName = process.env.TESTING_DATABASE_NAME;
    databaseUsername = process.env.TESTING_DATABASE_USERNAME;
    databasePassword = process.env.TESTING_DATABASE_PASSWORD;

    databaseURL = `${databaseConnection}://${databaseUsername}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}`;
    process.env.DATABASE_URL = databaseURL;
  } else if (appEnv === 'production' && appRunAt == 'production_server') {
    databaseConnection = process.env.PRODUCTION_DATABASE_CONNECTION;
    databaseHost = process.env.PRODUCTION_DATABASE_HOST;
    databasePort = parseInt(process.env.PRODUCTION_DATABASE_PORT) || 3306;
    databaseName = process.env.PRODUCTION_DATABASE_NAME;
    databaseUsername = process.env.PRODUCTION_DATABASE_USERNAME;
    databasePassword = process.env.PRODUCTION_DATABASE_PASSWORD;

    databaseURL = `${databaseConnection}://${databaseUsername}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}`;
    process.env.DATABASE_URL = databaseURL;
  } else {
    databaseConnection = process.env.LOCAL_DATABASE_CONNECTION;
    databaseHost = process.env.LOCAL_DATABASE_HOST;
    databasePort = parseInt(process.env.LOCAL_DATABASE_PORT) || 3306;
    databaseName = process.env.LOCAL_DATABASE_NAME;
    databaseUsername = process.env.LOCAL_DATABASE_USERNAME;
    databasePassword = process.env.LOCAL_DATABASE_PASSWORD;

    databaseURL = `${databaseConnection}://${databaseUsername}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}`;
    process.env.DATABASE_URL = databaseURL;
  }

  return { databaseURL: databaseURL };
};

export default registerAs('database', database);
