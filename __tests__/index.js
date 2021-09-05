import { test, expect } from '@jest/globals';
import compareFiles from '../src/index.js';

const result = '- follow: false\n'
  + '  host: hexlet.io\n'
  + '- proxy: 123.234.53.22\n'
  + '- timeout: 50\n'
  + '+ timeout: 20\n'
  + '+ verbose: true';

test('Compare .json files.', () => {
  expect(compareFiles('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(result);
});

test('Compare .yml files.', () => {
  expect(compareFiles('__fixtures__/filepath1.yml', '__fixtures__/filepath2.yml')).toBe(result);
});
