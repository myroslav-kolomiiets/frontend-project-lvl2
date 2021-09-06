import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildAst from './tree-builder.js';
import formatter from './formatter/index.js';

const extractFormat = (filePath) => path.extname(filePath).slice(1);

const getData = (filePath) => parse(readFileSync(filePath), extractFormat(filePath));

const compareFiles = (path1, path2, format = 'stylish') => {
  const obj1 = getData(path1);
  const obj2 = getData(path2);
  const ast = buildAst(obj1, obj2);

  return formatter(ast, format);
};

export default compareFiles;
