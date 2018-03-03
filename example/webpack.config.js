/**
 * Here is an example use case:
 * You are building a Chrome extension that
 * uses a different manifest.json file
 * depending on the environment you are testing out
 */
module.exports = (env, { mode }) => {
  const GenerateJsonFile = require('../');
  const path = require('path');

  return {
    entry: {
      a: './index.js'
    },
    output: {
      path: path.resolve(`${__dirname}/build`),
      filename: 'index.bundle.js'
    },
    plugins: [
      new GenerateJsonFile({
        jsonFile: path.resolve(`${__dirname}/manifest.json`),
        filename: 'manifest.json',
        value: (manifest) => {
          if (mode === 'development') {
            manifest['content_security_policy'] = 'script-src \'unsafe-eval\'; object-src \'self\'';
            manifest.permissions.push('http://localhost/');
          }
        }
      })
    ]
  };
};
