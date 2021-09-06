import _ from 'lodash';

const types = {
  nested: 'nested',
  deleted: 'deleted',
  added: 'added',
  changed: 'changed',
};

const renderChild = (value) => {
  if (_.isObject(value)) {
    return (`${JSON.stringify(value)}`);
  }

  return (`${value}`);
};

const json = (ast) => {
  if (!ast) {
    return null;
  }

  const log = ast.map((item) => {
    if (item.type === types.nested) {
      return (
        `{"${item.key}":${json(item.children)}`
      );
    }
    if (item.type === types.deleted) {
      return (
        `{"${item.key}":${renderChild(item)},}`
      );
    }
    if (item.type === types.added) {
      return (
        `{"${item.key}":${renderChild(item)}}`
      );
    }
    if (item.type === types.changed) {
      return (
        `{"${item.key}":${renderChild(item)},}`
      );
    }
    return (
      `"${item.key}":${renderChild(item)}`
    );
  });

  return log.join(',');
};

export default json;
