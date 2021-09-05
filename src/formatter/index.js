import stylish from './stylish.js';

const formatters = {
  stylish,
};

export default (ast, type) => {
  return formatters[type](ast);
};
