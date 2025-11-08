import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringity = (value, depth) => {
    if (!_.isObject(value)) return `${value}`;

    const entries = Object.entries(value)
      .map(([key, val]) => `${indent(depth + 1)}  ${key}: ${stringity(val, depth + 1)}`);
    
    return `{\r\n${entries.join('\r\n')}\r\n${indent(depth)}  }`;
};

const formatStylish = (diff, depth = 1) => {
    const lines = diff.map((node) => {
        switch (node.type) {
            case 'added' : 
              return `${indent(depth)}+ ${node.key}: ${stringity(node.value, depth)}`;
            case 'removed':
              return `${indent(depth)}- ${node.key}: ${stringity(node.value, depth)}`;
            case 'unchanged':
              return `${indent(depth)}  ${node.key}: ${stringity(node.value, depth)}`;
            case 'changed':
              return [
                `${indent(depth)}- ${node.key}: ${stringity(node.value1, depth)}`,
                `${indent(depth)}+ ${node.key}: ${stringity(node.value2, depth)}`,
              ].join('\r\n');
            case 'nested':
              return `${indent(depth)}  ${node.key}: {\r\n${formatStylish(node.children, depth + 1)}\r\n${indent(depth)}  }`;
            default:
              throw new Error(`Unknown type: ${node.type}`);
        }
    });

    return lines.join('\r\n');
};

export default (diff) => `{\r\n${formatStylish(diff)}\r\n}`;