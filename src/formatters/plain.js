const formatValue = (value) => {
  if (value === null) return 'null';
  if (typeof value === 'string') return `'${value}'`;
  if (typeof value === 'object') return '[complex value]';
  return String(value);
};

const plain = (diff, parentPath = '') => {
  const lines = diff.flatMap((node) => {
    const property = parentPath ? `${parentPath}.${node.key}` : node.key;

    switch (node.type) {
      case 'added':
        return `Property '${property}' was added with value: ${formatValue(node.value)}`;
      case 'removed':
        return `Property '${property}' was removed`;
      case 'changed':
        return `Property '${property}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`;
      case 'nested':
        return plain(node.children, property);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return lines.join('\r\n');
};

export default plain;
