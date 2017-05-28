const fs = require('fs');
const mysql = require('mysql');
const path = require('path');

const configPathJSON = path.join(__dirname, '../../.mysql.config.json');
const configPathJS = path.join(__dirname, '../../.mysql.config.js');

module.exports = function(source) {
  let config;
  const callback = this.async();

  if (this.query) {
    config = this.query;
  } else if (fs.existsSync(configPathJSON)) {
    this.addDependency(configPathJSON);
    config = require(configPathJSON);
  } else if (fs.existsSync(configPathJS)) {
    this.addDependency(configPathJS);
    config = require(configPathJS);
  } else {
    callback(new Error('Can not find a config. You should use `.mysql.config.json` file or `.mysql.config.js` file or fill query param in webpack config'));
    return;
  }

  const mysqlConnection = mysql.createConnection(config);
  mysqlConnection.connect();

  mysqlConnection.query(source, (err, result) => {
    mysqlConnection.end();
    if (err) {
      callback(err);
      return;
    }
    callback(null, `module.exports = ${JSON.stringify(result, null, '  ')};`);
  });
};
