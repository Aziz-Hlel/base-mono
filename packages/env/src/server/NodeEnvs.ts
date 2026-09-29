export const NODE_ENVS = {
  dev: 'dev',
  build: 'build',
  stage: 'stage',
  production: 'production',
} as const;

export type NodeEnvs = (typeof NODE_ENVS)[keyof typeof NODE_ENVS];

export const prodEnvs = [NODE_ENVS.stage, NODE_ENVS.production] as const;

export const devEnvs = [NODE_ENVS.dev, NODE_ENVS.build] as const;
