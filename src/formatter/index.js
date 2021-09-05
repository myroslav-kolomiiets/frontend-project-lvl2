import stylish from './stylish.js';

const formatters = {
  stylish,
};

export default (ast, type) => formatters[type](ast);
