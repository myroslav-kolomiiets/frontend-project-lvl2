import _ from 'lodash';

const types = {
  nested: 'nested',
  deleted: 'deleted',
  added: 'added',
  changed: 'changed',
};

const renderChild = (value, level) => {
  if (_.isObject(value)) {
    return (`${JSON.stringify(value, null, 1 + level)}`);
  }

  return (`${value}`);
};

const stylish = (ast, level = 1) => {
  if (!ast) {
    return null;
  }

  const indent = new Array(level += 1).join('  ');

  const log = ast.map((item) => {
    if (item.type === types.nested) {
      return (
        `${indent}${item.key}: {\n${stylish(item.children, level)}\n${indent}}`
      );
    }
    if (item.type === types.deleted) {
      return (
        `${indent}- ${item.key}: ${renderChild(item.value, level)}${indent}`
      );
    }
    if (item.type === types.added) {
      return (
        `${indent}+ ${item.key}: ${renderChild(item.value, level)}${indent}`
      );
    }
    if (item.type === types.changed) {
      return (
        `${indent}- ${item.key}: ${renderChild(item.oldValue, level)}\n${indent}+ ${item.key}: ${renderChild(item.newValue, level)}${indent}`
      );
    }
    return (
      `${indent}  ${item.key}: ${renderChild(item.value, level)}${indent}`
    );
  });

  return log.join('\n');
};

export default stylish;
