import _ from 'lodash';

const stringify = (data, replacer = ' ', space = 1) => {
  const indentBefore = replacer.repeat(space);
  const indentAfter = replacer.repeat(space / 2);

  if (_.isObject(data)) {
    const keys = Object.keys(data);
    const result = keys.map((key) => `${indentBefore}${key}: ${stringify(data[key], replacer, space * 2)}`);
    return `{\n${result.join('\n')}\n${indentAfter}}`;
  }

  return `${data}`;
};

const stylish = (ast, level = 1) => {
  if (!ast) {
    return null;
  }

  const indentBefore = new Array(level++ + 1).join(' ');
  const indentAfter = new Array(level - 1).join(' ');

  const log = {
    nested: (item) => `${indentBefore}${item.key}: ${stylish(item.children, level * 2)}`,
    deleted: (item) => `${indentBefore}- ${item.key}: ${stringify(item.value, ' ', level * 2)}`,
    added: (item) => `${indentBefore}+ ${item.key}: ${stringify(item.value, ' ', level * 2)}`,
    changed: (item) => `${indentBefore}- ${item.key}: ${stringify(item.oldValue, ' ', level * 2)}\n${indentBefore}+ ${item.key}: ${stringify(item.newValue, ' ', level * 2)}`,
    'not-modified': (item) => `${indentBefore}  ${item.key}: ${stringify(item.value, ' ', level * 2)}`,
  };

  return `{\n${ast.map((item) => log[item.type](item)).join('\n')}\n${indentAfter}}`;
};

export default stylish;
