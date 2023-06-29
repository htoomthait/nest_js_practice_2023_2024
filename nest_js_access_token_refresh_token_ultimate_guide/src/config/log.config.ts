import { LogLevel } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

const log = () => {
  const appEnv = process.env.APP_ENV;
  const appRunAt = process.env.APP_RUN_AT;
  let loggerLevel: string[] = [];
  let channel: string;

  if (appEnv === 'development' && appRunAt === 'staging_server') {
    loggerLevel = ['debug', 'warn', 'error', 'log', 'verbose'];
    channel = 'stack';
  } else if (appEnv === 'development' && appRunAt === 'testing_server') {
    loggerLevel = ['debug', 'warn', 'error', 'log', 'verbose'];
    channel = 'daily';
  } else if (appEnv === 'production' && appRunAt === 'production_server') {
    loggerLevel = ['warn', 'error', 'log'];
    channel = 'daily';
  } else {
    loggerLevel = ['debug', 'warn', 'error', 'log', 'verbose'];
    channel = 'stack';
  }

  return {
    loggerLevel: loggerLevel as LogLevel[],
    channel: channel,
  };
};

export default registerAs('log', log);
