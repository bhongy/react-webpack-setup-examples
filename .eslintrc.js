module.exports = {
  extends: [
    'fbjs',
    'prettier', // eslint-config-prettier
  ],
  plugins: ['prettier'], // eslint-plugin-prettier
  rules: {
    'prettier/prettier': 'error',
  },
};
