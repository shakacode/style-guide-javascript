module.exports = {
  'extends': [
    'eslint-config-airbnb/base',
    'eslint-config-shakacode/rules/javascript',
  ].map(require.resolve),
};
