import parse from './parsers.js';
import buildAst from './tree-builder.js';
import formatter from './formatter/index.js';
import { readFileSync } from 'fs';
import path from 'path';

const extractFormat = (filePath) => path.extname(filePath).slice(1);

const getData = (path) => parse(readFileSync(path), extractFormat(path));

const compareFiles = (path1, path2, format = 'stylish') => {
  const obj1 = getData(path1);
  const obj2 = getData(path2);
  const ast = buildAst(obj1, obj2);

  // console.log(JSON.stringify(ast, null, 4));

  return formatter(ast, format);
};

export default compareFiles;
