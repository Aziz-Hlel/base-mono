//openapi-ts.config.ts
import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: '../server/openapi.yaml',
  output: './src/api/generated/client',

  plugins: [],
});
