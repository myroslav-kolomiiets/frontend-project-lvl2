import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (`${value}`);
};

const getPath = (step) => (step ? step.concat('.') : '');

const plain = (ast) => {
  if (!ast) {
    return null;
  }
  const inner = (innerAst, step) => {
    const path = getPath(step);

    const log = {
      nested: (item) => `${plain(item.children, `${step ? `${step}.${item.key}` : item.key}`)}`,
      deleted: (item) => `Property ${path}${item.key} was removed`,
      added: (item) => `Property ${path}${item.key} was added with value: ${stringify(item.value)}`,
      changed: (item) => `Property ${path}${item.key} was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`,
      'not-modified': () => undefined,
    };

    const result = innerAst.map((item) => log[item.type](item));

    return result.filter((item) => item !== undefined).join('\n');
  };

  return inner(ast);
};

export default plain;
