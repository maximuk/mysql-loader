const fs = require('fs');
const mysql = require('mysql');
const path = require('path');

const configPath = path.join(__dirname, '../../.mysql.config.json');

module.exports = function(source) {
  let config;
  const callback = this.async();

  if (this.query) {
    config = this.query;
  } else if (fs.existsSync(configPath)) {
    this.addDependency(configPath);
    config = require(configPath);
  } else {
    callback(new Error('Can not find a config. You should use `.mysql.config.json` file or fill query param in webpack config'));
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
