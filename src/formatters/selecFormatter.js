import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import json from './json.js';


const getFormatter = (formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatStylish;
    case 'plain':
      return formatPlain;
    case 'json':
      return json;
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
};

export default getFormatter;
