import _ from 'lodash';

const getIndent = (level) => '    '.repeat(level);

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
  const inner = (innerAst, level) => {
    const indent = getIndent(level);

    const mapping = {
      nested: (item) => `${indent}${item.key}: ${inner(item.children, level + 1)}`,
      deleted: (item) => `${indent.substring(0, indent.length - 2)}- ${item.key}: ${stringify(item.value, level)}`,
      added: (item) => `${indent.substring(0, indent.length - 2)}+ ${item.key}: ${stringify(item.value, level)}`,
      changed: (item) => `${indent.substring(0, indent.length - 2)}- ${item.key}: ${stringify(item.oldValue, level)}\n${indent.substring(0, indent.length - 2)}+ ${item.key}: ${stringify(item.newValue, level)}`,
      'not-modified': (item) => `${indent}${item.key}: ${stringify(item.value, level)}`,
    };

    return `{\n${innerAst.map((item) => mapping[item.type](item)).join('\n')}\n${getIndent(level - 1)}}`;
  };

  return inner(ast, 1);
};

export default stylish;
