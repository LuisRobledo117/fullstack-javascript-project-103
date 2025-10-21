import parseFile from './parsers.js';
import _ from 'lodash';

export default function genDiff(filepath1, filepath2) {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  
  const result = keys.map((key) => {
    if(!Object.hasOwn(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }
    
    if(!Object.hasOwn(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }

    if(_.isEqual(data1[key], data2[key])){
      return `    ${key}: ${data1[key]}`;
    }

      return `  - ${key}: ${data1[key]}\r\n  + ${key}: ${data2[key]}`;
  });

  return `{\r\n${result.join('\r\n')}\r\n}`;
};