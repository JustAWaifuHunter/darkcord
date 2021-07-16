module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    'module-resolver',
    'syntax-typescript',
    'transform-typescript'
  ],
  ignore: [
    './node_modules',
    './.ideia',
    '**/*.spec.ts'
  ]
}
