const path = require('path');

/**
 * Generate JSON File
 *
 * @param {Object} [options] - webpack config options
 * @param {string} [options.filename] - name of output file
 * @param {string} [options.jsonFile] - existing JSON file to extend
 * @param {Object|Function} [options.value] - JSON object to add to output file
 * @returns {undefined} undefined
 */
class GenerateJsonFile {
  constructor(options) {
    const {
      filename,
      jsonFile,
      value
    } = options;

    if (!filename) {
      throw new Error('[generate-json-file] provide a "filename"');
    }

    if (!value && !jsonFile) {
      throw new Error('[generate-json-file] provide a JSON file "jsonFile" or a JSON object "value"');
    }

    this.pluginName = 'GenerateJsonFile';
    this.filename = filename;
    this.value = value || {};
    this.jsonFile = jsonFile ? require(path.resolve(__dirname, '../../', jsonFile)) : {};
  }

  /**
   * Get JSON object from `value` option
   * `this.value` can either be an object
   * or a function that returns an object
   *
   * @returns {Object} value object
   */
  getValue() {
    return typeof this.value === 'function' ? this.value(this.jsonFile) : this.value;
  }

  /**
   * Apply method called by the webpack compiler
   * https://webpack.js.org/concepts/plugins/
   *
   * @param {Object} compiler - webpack compiler instance
   * @returns {undefined} undefined
   */
  apply(compiler) {
    compiler.hooks.emit.tap(this.pluginName, ({ assets }) => {
      const value = this.getValue(this.value);
      const merge = Object.assign({}, this.jsonFile, value);
      const outputFile = JSON.stringify(merge, null, 2);

      assets[this.filename] = {
        source: () => outputFile,
        size: () => outputFile.length
      };
    });
  }
}

module.exports = GenerateJsonFile;
