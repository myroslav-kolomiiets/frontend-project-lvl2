import _ from 'lodash';

const buildAst = (obj1, obj2) => {
  const firstKeys = Object.keys(obj1);
  const secondKeys = Object.keys(obj2);
  const keys = _.sortBy(_.union(firstKeys, secondKeys));

  return keys.map((key) => {
    if (!_.has(obj2, key)) {
      return {
        type: 'deleted',
        key,
        value: obj1[key],
      };
    }
    if (!_.has(obj1, key)) {
      return {
        type: 'added',
        key,
        value: obj2[key],
      };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        type: 'nested',
        key,
        children: buildAst(obj1[key], obj2[key]),
      };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        type: 'changed',
        key,
        oldValue: obj1[key],
        newValue: obj2[key],
      };
    }
    return {
      type: 'not-modified',
      key,
      value: obj2[key],
    };
  });
};

export default buildAst;
