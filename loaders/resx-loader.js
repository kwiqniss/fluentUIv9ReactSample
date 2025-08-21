const xml2js = require('xml2js');

module.exports = function resxLoader(source) {
  const callback = this.async();
  
  // Parse the RESX XML
  const parser = new xml2js.Parser();
  parser.parseString(source, (err, result) => {
    if (err) {
      return callback(err);
    }
    
    try {
      // Extract string values from the RESX structure
      const strings = {};
      
      if (result.root && result.root.data) {
        result.root.data.forEach(dataItem => {
          const name = dataItem.$.name;
          const value = dataItem.value && dataItem.value[0];
          if (name && value) {
            strings[name] = value;
          }
        });
      }
      
      // Export as ES module
      const output = `const strings = ${JSON.stringify(strings, null, 2)};
export default strings;`;
      
      callback(null, output);
    } catch (parseError) {
      callback(parseError);
    }
  });
};
