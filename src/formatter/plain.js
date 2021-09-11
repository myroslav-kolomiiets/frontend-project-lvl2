import _ from 'lodash';

const renderChild = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (`${value}`);
};

const getPath = (step) => (step ? step.concat('.') : '');

const plain = (ast, step) => {
  if (!ast) {
    return null;
  }

  const path = getPath(step);

  const log = {
    nested: (item) => `${plain(item.children, `${step ? `${step}.${item.key}` : item.key}`)}`,
    deleted: (item) => `Property ${path}${item.key} was removed`,
    added: (item) => `Property ${path}${item.key} was added with value: ${renderChild(item.value)}`,
    changed: (item) => `Property ${path}${item.key} was updated. From ${renderChild(item.oldValue)} to ${renderChild(item.newValue)}`,
    'not-modified': () => undefined,
  };

  const result = ast.map((item) => log[item.type](item));

  return result.filter((item) => item !== undefined).join('\n');
};

export default plain;
