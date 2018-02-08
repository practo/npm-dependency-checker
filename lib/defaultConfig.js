var depcheck = require('depcheck');

module.exports = {
  withoutDev: false, // [DEPRECATED] check against devDependencies
  ignoreBinPackage: false, // ignore the packages with bin entry
  ignoreDirs: [ // folder with these names will be ignored
    '_bin',
    '_output',
    '_src',
    'coverage',
    'node_modules',
    'public'
  ],
  ignoreMatches: [ // ignore dependencies that matches these globs
    'babel-*'
    ,"npm-dependency-checker"
    ,'@newrelic/native-metrics' // Used by newrelic, need not be required
    ,'coveralls' // Used in package.json
    ,'node-sass' // Used by tools to compile css
    ,'istanbul' // Used in package.json
    ,'css-loader' // Used by webpack
    ,'file-loader' // Used by webpack
    ,'sass-loader' // Used by webpack
    ,'postcss-loader' // Used by webpack
    ,'image-webpack-loader' // Used by webpack
    ,'mocha' // Used in package.json
  ],
  parsers: { // the target parsers
    '*.js': [
      depcheck.parser.jsx,
      depcheck.parser.es6
    ],
    '*.jsx': depcheck.parser.jsx
  },
  detectors: [ // the target detectors
    depcheck.detector.requireCallExpression,
    depcheck.detector.importDeclaration
  ],
  specials: [ // the target special parsers
    depcheck.special.eslint,
    depcheck.special.webpack
  ]
}
