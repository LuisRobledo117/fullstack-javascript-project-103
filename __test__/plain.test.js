import { describe, test, expect } from '@jest/globals';
import {fileURLToPath} from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const getFixturePath = (filename) => path.join(dirName, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');


describe('plain formatter', () => {
  test('should show diff in plain format', () => {
    const filepath1 = '__fixtures__/file1.json';
    const filepath2 = '__fixtures__/file2.json';
    const expected = readFile('expected_plain.txt');

    const result = genDiff(filepath1, filepath2, 'plain');
    expect(result).toBe(expected);
  });
});