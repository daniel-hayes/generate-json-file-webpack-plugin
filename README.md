# generate-json-file-webpack-plugin

Webpack plugin that creates a custom JSON file.


## Install

```bash
npm install --save-dev generate-json-file-webpack-plugin
```

## Options

|Name|Type|Description|
|:--:|:--:|:----------|
|[`filename`](#filename)|`{String}`|Output file name|
|[`jsonFile`](#jsonFile)|`{String}`|Path to an existing JSON file to extend (optional)|
|[`value`](#value)|`{Object\|Function}`|Object to add to output file. (You don't actually need to return anything if you are extending an existing file. You can just manipulate the properties.)|

## Usage

In your `webpack.config.js` instantiate the plugin.

```javascript
const GenerateJsonFile = require('generate-json-file-webpack-plugin');

module.exports = {
  // webpack configuration
  // ...
  plugins: [
    new GenerateJsonFile({
      // json configuration
    })
  ]
};
```

Here is a basic example that creates a `mainfest.json` file in your output directory:

**webpack.config.js**
```javascript
module.exports = {
  output: {
    path: 'dist/'
  },
  // ...
  plugins: [
    new GenerateJsonFile({
      filename: 'manifest.json',
      value: {
        foo: 'bar'
      }
    })
  ]
};

```
That will generate a file that looks like this:

**manifest.json**
```json
{
  "foo": "bar"
}
```


Here's an example of how you can dynamically configure values to be emitted to your JSON file:

**webpack.config.js**
```javascript
plugins: [
  new GenerateJsonFile({
    filename: 'manifest.json',
    value: () => {
      if (mode === 'development') {
        return {
          foo: 'bar'
        }
      }

      return {
        foo: 'baz'
      }
    }
  })
]
```

You can add to existing JSON files by using the `jsonFile` option and including a path to your source file:

**webpack.config.js**
```javascript
plugins: [
  new GenerateJsonFile({
    jsonFile: './src/manifest.json',
    filename: 'manifest.json',
    value: (manifest) => {

      // manipulate existing values
      manifest.array.push('add me!');

      // add new values
      return {
        foo: 'baz'
      }
    }
  })
]
```
Here is the source file that you are extending:

**manifest.json** 
```json
{
  "array": ["bar"]
}
```

And the output file:

**manifest.json**
```json
{
  "array": ["bar", "add me!"],
  "foo": "baz"
}
```

### Todo:
- add tests

## License

MIT © [Daniel Hayes](https://github.com/daniel-hayes)