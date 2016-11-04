module.exports = {
  'parser': 'babel-eslint',
  'extends': [
    'eslint-config-airbnb',
    'eslint-config-shakacode/rules/javascript',
    'eslint-config-shakacode/rules/react',
  ].map(require.resolve),
};
