const mysqlx = require('@mysql/xdevapi');
const config = require('./connectionConfig');

module.exports = () => mysqlx
  .getSession(config)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
