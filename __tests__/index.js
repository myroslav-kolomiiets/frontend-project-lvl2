import { test, expect } from '@jest/globals';
import compareFiles from '../src/index.js';

const resultStylishFormatter = '  common: {\n' +
  '   + follow: false   \n' +
  '     setting1: Value 1   \n' +
  '   - setting2: 200   \n' +
  '   - setting3: true\n' +
  '   + setting3: null   \n' +
  '   + setting4: blah blah   \n' +
  '   + setting5: {\n' +
  '    "key5": "value5"\n' +
  '}   \n' +
  '   setting6: {\n' +
  '    doge: {\n' +
  '     - wow: \n' +
  '     + wow: so much     \n' +
  '    }\n' +
  '      key: value    \n' +
  '    + ops: vops    \n' +
  '   }\n' +
  '  }\n' +
  '  group1: {\n' +
  '   - baz: bas\n' +
  '   + baz: bars   \n' +
  '     foo: bar   \n' +
  '   - nest: {\n' +
  '    "key": "value"\n' +
  '}\n' +
  '   + nest: str   \n' +
  '  }\n' +
  '  - group2: {\n' +
  '   "abc": 12345,\n' +
  '   "deep": {\n' +
  '      "id": 45\n' +
  '   }\n' +
  '}  \n' +
  '  + group3: {\n' +
  '   "deep": {\n' +
  '      "id": {\n' +
  '         "number": 45\n' +
  '      }\n' +
  '   },\n' +
  '   "fee": 100500\n' +
  '}  ';

const resultPlainFormatter = 'Property common.follow was added with value: false\n' +
  'Property common.setting2 was removed\n' +
  'Property common.setting3 was updated. From true to null\n' +
  'Property common.setting4 was added with value: blah blah\n' +
  'Property common.setting5 was added with value: [complex value]\n' +
  'Property common.setting6.doge.wow was updated. From  to so much\n' +
  'Property common.setting6.ops was added with value: vops\n' +
  'Property group1.baz was updated. From bas to bars\n' +
  'Property group1.nest was updated. From [complex value] to str\n' +
  'Property group2 was removed\n' +
  'Property group3 was added with value: [complex value]';

const resultJsonFormatter = "[{\"type\":\"nested\",\"key\":\"common\",\"children\":[{\"type\":\"added\",\"key\":\"follow\",\"value\":false},{\"type\":\"not-modified\",\"key\":\"setting1\",\"value\":\"Value 1\"},{\"type\":\"deleted\",\"key\":\"setting2\",\"value\":200},{\"type\":\"changed\",\"key\":\"setting3\",\"oldValue\":true,\"newValue\":null},{\"type\":\"added\",\"key\":\"setting4\",\"value\":\"blah blah\"},{\"type\":\"added\",\"key\":\"setting5\",\"value\":{\"key5\":\"value5\"}},{\"type\":\"nested\",\"key\":\"setting6\",\"children\":[{\"type\":\"nested\",\"key\":\"doge\",\"children\":[{\"type\":\"changed\",\"key\":\"wow\",\"oldValue\":\"\",\"newValue\":\"so much\"}]},{\"type\":\"not-modified\",\"key\":\"key\",\"value\":\"value\"},{\"type\":\"added\",\"key\":\"ops\",\"value\":\"vops\"}]}]},{\"type\":\"nested\",\"key\":\"group1\",\"children\":[{\"type\":\"changed\",\"key\":\"baz\",\"oldValue\":\"bas\",\"newValue\":\"bars\"},{\"type\":\"not-modified\",\"key\":\"foo\",\"value\":\"bar\"},{\"type\":\"changed\",\"key\":\"nest\",\"oldValue\":{\"key\":\"value\"},\"newValue\":\"str\"}]},{\"type\":\"deleted\",\"key\":\"group2\",\"value\":{\"abc\":12345,\"deep\":{\"id\":45}}},{\"type\":\"added\",\"key\":\"group3\",\"value\":{\"deep\":{\"id\":{\"number\":45}},\"fee\":100500}}]";

test('Compare 2 .json files with stylish formatter.', () => {
  expect(compareFiles(
    '__tests__/__fixtures__/file1.json',
    '__tests__/__fixtures__/file2.json',
    'stylish'
  )).toBe(resultStylishFormatter);
});

test('Compare 2 .yml files with plain formatter.', () => {
  expect(compareFiles(
    '__tests__/__fixtures__/file1.yml',
    '__tests__/__fixtures__/file2.yml',
    'plain'
  )).toBe(resultPlainFormatter);
});

test('Compare .json and .yml files with json formatter.', () => {
  expect(compareFiles(
    '__tests__/__fixtures__/file1.json',
    '__tests__/__fixtures__/file2.yml',
    'json'
  )).toBe(resultJsonFormatter);
});
