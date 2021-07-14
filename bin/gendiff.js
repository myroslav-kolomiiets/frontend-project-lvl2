#!/usr/bin/env node
import _ from 'lodash';
import { readFileSync } from 'fs';

const compareFiles = (firstFile, secondFile) => {
  const firstFileToCompare = JSON.parse(readFileSync(firstFile));
  const secondFileToCompare = JSON.parse(readFileSync(secondFile));
  const firstKeys = Object.keys(firstFileToCompare);
  const secondKeys = Object.keys(secondFileToCompare);
  const keys = _.sortBy([...new Set(firstKeys.concat(secondKeys))]);

  const commonKeys = keys
    .filter((key) => firstKeys.includes(key) && secondKeys.includes((key)) && key !== undefined);

  const uniqFirstFileKeys = keys
    .filter((key) => firstKeys.includes(key) && !secondKeys.includes((key)) && key !== undefined);

  const uniqSecondFileKeys = keys
    .filter((key) => !firstKeys.includes(key) && secondKeys.includes((key)) && key !== undefined);

  const commonKeysResult = commonKeys.map((key) => {
    if (firstFileToCompare[key] === secondFileToCompare[key]) {
      return (`  ${key}: ${firstFileToCompare[key]}`)
    }
    return (`- ${key}: ${firstFileToCompare[key]}${'\n'}+ ${key}: ${secondFileToCompare[key]}`)
  })

  const uniqFirstKeysResult = uniqFirstFileKeys.map((key) => `- ${key}: ${firstFileToCompare[key]}`);

  const uniqSecondKeysResult = uniqSecondFileKeys.map((key) => `+ ${key}: ${secondFileToCompare[key]}`);

  const log = commonKeysResult.concat(uniqFirstKeysResult, uniqSecondKeysResult);

  for (const logItem of log) {
    console.log(logItem);
  }
};

export default compareFiles;
