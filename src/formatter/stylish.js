import _ from 'lodash';

const indentStep = 1;

const getIndent = (level) => '  '.repeat(level * indentStep);

const stringify = (data, level) => {
  const inner = (innerData, innerLevel) => {
    const indent = getIndent(innerLevel);

    if (_.isObject(innerData)) {
      const keys = Object.keys(innerData);
      const result = keys.map((key) => `${getIndent(innerLevel + 1)}${key}: ${inner(innerData[key], innerLevel + 1)}`);
      return `{\n${result.join('\n')}\n${indent}}`;
    }
    return `${innerData}`;
  };

  return inner(data, level);
};

const stylish = (ast) => {
  if (!ast) {
    return null;
  }
  const inner = (innerAst, level = 1) => {
    const indent = getIndent(level);

    const log = {
      nested: (item) => `${indent} ${item.key}: ${inner(item.children, level + 1)}`,
      deleted: (item) => `${indent} - ${item.key}: ${stringify(item.value, level + 1)}`,
      added: (item) => `${indent} + ${item.key}: ${stringify(item.value, level + 1)}`,
      changed: (item) => `${indent} - ${item.key}: ${stringify(item.oldValue, level + 1)}\n${indent} + ${item.key}: ${stringify(item.newValue, level + 1)}`,
      'not-modified': (item) => `${indent}   ${item.key}: ${stringify(item.value, level + 1)}`,
    };

    return `{\n${innerAst.map((item) => log[item.type](item)).join('\n')}\n${indent}}`;
  };

  return inner(ast, 0);
};

export default stylish;
