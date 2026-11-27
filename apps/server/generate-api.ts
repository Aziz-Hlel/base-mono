import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { getOpenApiDocumentation } from './src/openapi/generate';

const document = getOpenApiDocumentation();

const outputPath = path.resolve(process.cwd(), 'openapi.yaml');

fs.writeFileSync(outputPath, YAML.stringify(document), 'utf8');

console.log(`Generated ${outputPath}`);

process.exit(0);
