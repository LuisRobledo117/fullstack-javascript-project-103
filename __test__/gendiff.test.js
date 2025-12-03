import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const getFixturePath = (filename) => path.join(dirName, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const stylishResult = readFile('expected_stylish.txt');
  const plainResult = readFile('expected_plain.txt');
  const jsonResult = readFile('expected_json.txt');

  const normalize = (text) => text.replace(/\r\n/g, '\n');

  expect(normalize(genDiff(filepath1, filepath2))).toEqual(normalize(stylishResult));
  expect(normalize(genDiff(filepath1, filepath2, 'stylish'))).toEqual(normalize(stylishResult));
  expect(normalize(genDiff(filepath1, filepath2, 'plain'))).toEqual(normalize(plainResult));
  expect(normalize(genDiff(filepath1, filepath2, 'json'))).toEqual(normalize(jsonResult));
});

test('gendiff yml', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const stylishResult = readFile('expected_stylish.txt');
  const plainResult = readFile('expected_plain.txt');
  const jsonResult = readFile('expected_json.txt');

  const normalize = (text) => text.replace(/\r\n/g, '\n');

  expect(normalize(genDiff(filepath1, filepath2))).toEqual(normalize(stylishResult));
  expect(normalize(genDiff(filepath1, filepath2, 'stylish'))).toEqual(normalize(stylishResult));
  expect(normalize(genDiff(filepath1, filepath2, 'plain'))).toEqual(normalize(plainResult));
  expect(normalize(genDiff(filepath1, filepath2, 'json'))).toEqual(normalize(jsonResult));
});
