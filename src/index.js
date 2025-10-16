import parseFile from './parsers.js';

export default function genDiff(filepath1, filepath2) {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  console.log('Archivo 1:', data1);
  console.log('Archivo 2:', data2);

  return 'Archivos leídos correctamente';
}