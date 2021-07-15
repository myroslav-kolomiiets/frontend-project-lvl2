import { test, expect } from '@jest/globals';
import compareFiles from '../src/index.js';

const result =
  '- follow: false\n' +
  '  host: hexlet.io\n' +
  '- proxy: 123.234.53.22\n' +
  '- timeout: 50\n' +
  '+ timeout: 20\n' +
  '+ verbose: true\n';


test('Compare files.', () => {
  expect(compareFiles('test-data/file1.json', 'test-data/file2.json')).toBe(result);
});
