import _ from 'lodash';

const renderChild = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
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
  const inner = (innerAst, innerStep) => {
    const path = getPath(innerStep);

    const log = {
      nested: (item) => `${inner(item.children, `${innerStep ? `${innerStep}.${item.key}` : item.key}`)}`,
      deleted: (item) => `Property '${path}${item.key}' was removed`,
      added: (item) => `Property '${path}${item.key}' was added with value: ${renderChild(item.value)}`,
      changed: (item) => `Property '${path}${item.key}' was updated. From ${renderChild(item.oldValue)} to ${renderChild(item.newValue)}`,
      'not-modified': () => undefined,
    };

    const result = innerAst.map((item) => log[item.type](item));

    return result.filter((item) => item !== undefined).join('\n');
  };

  return inner(ast);
};

export default plain;
