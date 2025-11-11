import { describe, test, expect } from '@jest/globals';
import {fileURLToPath} from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const getFixturePath = (filename) => path.join(dirName, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const normalize = (str) => str.replace(/\r\n/g, '\n');

describe('json formatter', () => {
  test('genDiff JSON Anidado', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = normalize(readFile('expected_json.txt'));

  const result = normalize(genDiff(file1, file2, 'json'));
  expect(result).toBe(expected);
  });

  test('genDiff YML Anidado', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expected = normalize(readFile('expected_json.txt'));

  const result = normalize(genDiff(file1, file2, 'json'));
  expect(result).toBe(expected);
  });
});