import { registerAs } from '@nestjs/config';

const jwt = () => {
  const appEnv = process.env.APP_ENV;
  const appRunAt = process.env.APP_RUN_AT;
  let accessTokenSecret: string;
  let refreshTokenSecret: string;

  if (appEnv === 'development' && appRunAt == 'staging_server') {
    accessTokenSecret = process.env.STAGING_JWT_ACCESS_TOKEN_SECRET;
    refreshTokenSecret = process.env.STAGING_JWT_REFRESH_TOKEN_SECRET;
  } else if (appEnv === 'development' && appRunAt == 'testing_server') {
    accessTokenSecret = process.env.TESTING_JWT_ACCESS_TOKEN_SECRET;
    refreshTokenSecret = process.env.TESTING_JWT_REFRESH_TOKEN_SECRET;
  } else if (appEnv === 'production' && appRunAt == 'production_server') {
    accessTokenSecret = process.env.PRODUCTION_JWT_ACCESS_TOKEN_SECRET;
    refreshTokenSecret = process.env.PRODUCTION_JWT_REFRESH_TOKEN_SECRET;
  } else {
    accessTokenSecret = process.env.LOCAL_JWT_ACCESS_TOKEN_SECRET;
    refreshTokenSecret = process.env.LOCAL_JWT_REFRESH_TOKEN_SECRET;
  }

  return {
    accessTokenSecret: accessTokenSecret,
    refreshTokenSecret: refreshTokenSecret,
  };
};

export default registerAs('jwt', jwt);
