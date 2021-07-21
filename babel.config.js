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
    ['module-resolver', {
      alias: {
        '@providers': './src/providers',
        '@useCases': './src/useCases'
      }
    }]
  ],
  ignore: [ 
    '**/*.test.ts'
  ]
}
