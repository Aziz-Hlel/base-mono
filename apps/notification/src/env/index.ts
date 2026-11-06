import { notificationEnv } from '@base-monorepo-v2/env/notification';

const ENV = notificationEnv;

export const NODE_ENVS = {
  dev: 'dev',
  build: 'build',
  stage: 'stage',
  production: 'production',
} as const;
export const prodEnvs = [NODE_ENVS.stage, NODE_ENVS.production] as const;

export const devEnvs = [NODE_ENVS.dev, NODE_ENVS.build] as const;

export const isProd = () => {
  return prodEnvs.some((env) => env === ENV.NODE_ENV);
};

export const isDev = () => {
  return devEnvs.some((env) => env === ENV.NODE_ENV);
};

export default ENV;
