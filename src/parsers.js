import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

const parseFilesToObject = (firstFile, secondFile) => {
  const firstFileExtension = path.extname(firstFile);
  const secondFileExtension = path.extname(secondFile);

  if (firstFileExtension === '.json' && secondFileExtension === '.json') {
    const firstFileToCompare = JSON.parse(readFileSync(firstFile));
    const secondFileToCompare = JSON.parse(readFileSync(secondFile));

    return [
      firstFileToCompare,
      secondFileToCompare,
    ];
  }
  if (
    (firstFileExtension === '.yml' && secondFileExtension === '.yml')
    || (firstFileExtension === '.yaml' && secondFileExtension === '.yaml')
  ) {
    const firstFileToCompare = yaml.load(readFileSync(firstFile, 'utf8'));
    const secondFileToCompare = yaml.load(readFileSync(secondFile, 'utf8'));

    return [
      firstFileToCompare,
      secondFileToCompare,
    ];
  }

  return null;
};

export default parseFilesToObject;
