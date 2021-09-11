import _ from 'lodash';

const stringify = (value, level) => {
  if (_.isObject(value)) {
    return (`${JSON.stringify(value, null, 4 + level)}`);
  }

  return (`${value}`);
};

const getIndent = (level) => ' '.repeat(level += 1);

const stylish = (ast, level = 1) => {
  if (!ast) {
    return null;
  }

  const indentLevel = level;

  const indent = getIndent(indentLevel);

  const log = {
    nested: (item) => `${indent}${item.key}: ${stylish(item.children, indentLevel)}\n${indent}`,
    deleted: (item) => `${indent}  - ${item.key}: ${stringify(item.value, indentLevel)}${indent}`,
    added: (item) => `${indent}  + ${item.key}: ${stringify(item.value, indentLevel)}${indent}`,
    changed: (item) => `${indent}  - ${item.key}: ${stringify(item.oldValue, indentLevel)}\n${indent}  + ${item.key}: ${stringify(item.newValue, level)}${indent}`,
    'not-modified': (item) => `${indent}    ${item.key}: ${stringify(item.value, indentLevel)}${indent}`,
  };

  return `{\n${ast.map((item) => log[item.type](item)).join('\n')}\n}`;
};

export default stylish;
