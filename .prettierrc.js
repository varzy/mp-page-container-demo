module.exports = {
  singleQuote: true,
  printWidth: 100,
  overrides: [
    {
      files: '*.wxml',
      options: { parser: 'html' }
    },
    {
      files: '*.wxss',
      options: { parser: 'css' }
    },
    {
      files: '*.wxs',
      options: { parser: 'babel', quoteProps: 'preserve' }
    }
  ]
};
