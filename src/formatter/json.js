const json = (ast) => {
  if (!ast) {
    return null;
  }

  return JSON.stringify(ast);
};

export default json;
