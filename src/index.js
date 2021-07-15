import _ from 'lodash';
import { readFileSync } from 'fs';

const compareFiles = (firstFile, secondFile) => {
  const firstFileToCompare = JSON.parse(readFileSync(firstFile));
  const secondFileToCompare = JSON.parse(readFileSync(secondFile));
  const firstKeys = Object.keys(firstFileToCompare);
  const secondKeys = Object.keys(secondFileToCompare);
  const keys = _.sortBy(_.union(firstKeys, secondKeys));

  const tree = keys.map((key) => {
    if (!secondFileToCompare[key]) {
      return {
        type: 'deleted',
        key,
        value: firstFileToCompare[key],
      };
    }
    if (!firstFileToCompare[key]) {
      return {
        type: 'added',
        key,
        value: secondFileToCompare[key],
      };
    }
    if (firstFileToCompare[key] !== secondFileToCompare[key]) {
      return {
        type: 'changed',
        key,
        oldValue: firstFileToCompare[key],
        newValue: secondFileToCompare[key],
      };
    }
    return {
      type: 'not-modified',
      key,
      value: firstFileToCompare[key],
    };
  });

  const log = tree.map((item) => {
    if (item.type === 'deleted') {
      return (`- ${item.key}: ${item.value}`);
    }
    if (item.type === 'added') {
      return (`+ ${item.key}: ${item.value}`);
    }
    if (item.type === 'changed') {
      return (`- ${item.key}: ${item.oldValue}\n+ ${item.key}: ${item.newValue}`);
    }
    return (`  ${item.key}: ${item.value}`);
  });

  return log.join('\n');
};

export default compareFiles;
