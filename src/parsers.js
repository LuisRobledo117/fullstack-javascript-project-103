import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default function parseFile(filepath) {
  // eslint-disable-next-line no-undef
  const absolutePath = path.resolve(process.cwd(), filepath);

  const fileContent = fs.readFileSync(absolutePath, 'utf-8');

  const ext = path.extname(filepath);

  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(fileContent);
  }

  if (ext === '.json') {
    return JSON.parse(fileContent);
  }

  throw new Error(`Unsupported file format: ${ext}`);
}