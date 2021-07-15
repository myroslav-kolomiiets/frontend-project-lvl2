import { test, expect } from '@jest/globals';
import compareFiles from '../bin/gendiff.js';

// странный результат, необходимо обсудить
// const result = compareFiles('test-data/file1.json', 'test-data/file1.json');
const result =
  '  host: hexlet.io\n' +
  '- timeout: 50\n' +
  '+ timeout: 20\n' +
  '- follow: false\n' +
  '- proxy: 123.234.53.22\n' +
  '+ verbose: true';

test('Compare files.', () => {
  expect(compareFiles('test-data/file1.json', 'test-data/file1.json')).toBe(result);
});

