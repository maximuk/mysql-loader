# Mysql loader for webpack

## Installation

`npm install mysql-loader`

## Configuration

### In webpack config
``` javascript
module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /\.mysql$/,
        loader: 'mysql-loader',
        query: {
          host: 'localhost',
          user: 'root',
          password: 'password',
          database: 'dbname'
        }
      }
    ]
  }
};
```

### `.mysql.config.json` file in work directory
``` json
{
  "host": "localhost",
  "user": "root",
  "password": "password",
  "database": "dbname"
}
```

### `.mysql.config.js` file in work directory
``` js
module.exports = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'dbname'
};
```

## Usage

### Load data from mysql to js file
``` javascript
import data from './data.mysql';
```

### data.mysql
``` sql
select * from tablename
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
