import { test, expect } from '@jest/globals';
import compareFiles from '../src/index.js';
import {
  resultStylishFormatter,
  resultPlainFormatter,
  resultJsonFormatter,
} from './__fixtures__/diffs.js';

test('Compare 2 .json files with stylish formatter.', () => {
  expect(compareFiles(
    '__tests__/__fixtures__/file1.json',
    '__tests__/__fixtures__/file2.json',
    'stylish',
  )).toBe(resultStylishFormatter);
});

test('Compare 2 .yml files with plain formatter.', () => {
  expect(compareFiles(
    '__tests__/__fixtures__/file1.yml',
    '__tests__/__fixtures__/file2.yml',
    'plain',
  )).toBe(resultPlainFormatter);
});

test('Compare .json and .yml files with json formatter.', () => {
  expect(compareFiles(
    '__tests__/__fixtures__/file1.json',
    '__tests__/__fixtures__/file2.yml',
    'json',
  )).toBe(resultJsonFormatter);
});
