module.exports = {
  'extends': (
    require
      .resolve('eslint-config-shakacode')
      .replace('index.js', 'rules/react.yml')
  ),
};
