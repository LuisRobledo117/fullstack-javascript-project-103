import parseFile from './parsers.js';
import _ from 'lodash';
import formatStylish from './formatters/stylish.js';

const buildDiff = (obj1, obj2) => {
   const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  
  return keys.map((key) => {
    if (!_.has(obj2, key)) {
      return { key, type: 'removed', value: obj1[key] };
    }
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: 'nested', children: buildDiff(obj1[key], obj2[key]) };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return { key, type: 'changed', obj1Value: obj1[key], obj2Value: obj2[key] };
    }
    return { key, type: 'unchanged', value: obj1[key] };
  });
}

export default function genDiff(filepath1, filepath2) {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  
  const diff = buildDiff(data1, data2);
  return formatStylish(diff);
};