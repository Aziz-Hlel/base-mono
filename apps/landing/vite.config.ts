import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

function getPort(mode: string): number | undefined {
  const env = loadEnv(mode, process.cwd());

  const NODE_ENV = env.VITE_NODE_ENV;
  if (!NODE_ENV) throw new Error(`❌ Missing required environment variable: VITE_NODE_ENV`);

  if (!['dev', 'build', 'stage', 'production'].includes(NODE_ENV))
    throw new Error(
      `❌ Invalid NODE_ENV: "${NODE_ENV}". Must be one of "dev", "build", "stage", "production"`,
    );

  const value = env.VITE_LANDING_PORT;

  if (!value && ['dev', 'build'].includes(NODE_ENV))
    throw new Error(`❌ Missing required VITE_LANDING_PORT when VITE_NODE_ENV is ${NODE_ENV}`);
  if (value && isNaN(Number(value)))
    throw new Error(`❌ Invalid value for VITE_LANDING_PORT: "${value}" is not a number`);

  return Number(value) || undefined;
}

export default ({ mode }: { mode: string }) => {
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    server: {
      port: getPort(mode),
      strictPort: true,
      host: '0.0.0.0', // for docker
      allowedHosts: true, // enable port forwarding
    },
  });
};
