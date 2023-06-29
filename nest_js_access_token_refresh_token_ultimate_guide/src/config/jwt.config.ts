import { registerAs } from '@nestjs/config';

export type JwtConfig = {
  accessTokenSecret: string;
  refreshTokenSecret: string;
};

const jwt = (): JwtConfig => {
  const appEnv = process.env.APP_ENV;
  const appRunAt = process.env.APP_RUN_AT;
  let accessTokenSecret: string;
  let refreshTokenSecret: string;

  if (appEnv === 'development' && appRunAt == 'staging_server') {
    accessTokenSecret = process.env.STAGING_ACCESS_TOKEN_SECRET;
    refreshTokenSecret = process.env.STAGING_REFRESH_TOKEN_SECRET;
  } else if (appEnv === 'development' && appRunAt == 'testing_server') {
    accessTokenSecret = process.env.TESTING_ACCESS_TOKEN_SECRET;
    refreshTokenSecret = process.env.TESTING_REFRESH_TOKEN_SECRET;
  } else if (appEnv === 'production' && appRunAt == 'production_server') {
    accessTokenSecret = process.env.PRODUCTION_ACCESS_TOKEN_SECRET;
    refreshTokenSecret = process.env.PRODUCTION_REFRESH_TOKEN_SECRET;
  } else {
    accessTokenSecret = process.env.LOCAL_ACCESS_TOKEN_SECRET;
    refreshTokenSecret = process.env.LOCAL_REFRESH_TOKEN_SECRET;
  }

  return { accessTokenSecret, refreshTokenSecret } as JwtConfig;
};

export default registerAs('jwt', jwt);
