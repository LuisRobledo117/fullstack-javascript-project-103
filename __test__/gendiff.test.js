import {fileURLToPath} from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const getFixturePath = (filename) => path.join(dirName, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

// eslint-disable-next-line no-undef
test('genDiff JSON plano', () => {
   const file1 = getFixturePath('file1.json');
   const file2 = getFixturePath('file2.json');
   const expected = readFile('expected.txt');

   const result = genDiff(file1, file2);

   // eslint-disable-next-line no-undef
   expect(result.trim()).toEqual(expected.trim());
});

// eslint-disable-next-line no-undef
test('genDiff YAML plano', () => {
   const file1 = getFixturePath('file1.yml');
   const file2 = getFixturePath('file2.yml');
   const expected = readFile('expected.txt');

   const result = genDiff(file1, file2);

   // eslint-disable-next-line no-undef
   expect(result.trim()).toEqual(expected.trim());
});

