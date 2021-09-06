import _ from 'lodash';

const types = {
  nested: 'nested',
  deleted: 'deleted',
  added: 'added',
  changed: 'changed',
};

const renderChild = (value) => {
  if (_.isObject(value)) {
    return ('[complex value]');
  }
  return (`${value}`);
};

const getPath = (step) => ((step && true) ? step.concat('.') : '');

const plain = (ast, step) => {
  if (!ast) {
    return null;
  }

  const path = getPath(step);

  const log = ast.map((item) => {
    if (item.type === types.nested) {
      return (
        `${plain(item.children, `${step ? `${step}.${item.key}` : item.key}`)}`
      );
    }
    if (item.type === types.deleted) {
      return (
        `Property ${path}${item.key} was removed`
      );
    }
    if (item.type === types.added) {
      return (
        `Property ${path}${item.key} was added with value: ${renderChild(item.value)}`
      );
    }
    if (item.type === types.changed) {
      return (
        `Property ${path}${item.key} was updated. From ${renderChild(item.oldValue)} to ${renderChild(item.newValue)}`
      );
    }
  });

  return log.filter((item) => item !== undefined).join('\n');
};

export default plain;
