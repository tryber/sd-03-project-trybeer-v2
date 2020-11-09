require('dotenv').config();

let schema;
const mysql = require('@mysql/xdevapi');

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

module.exports = () => (schema
  ? Promise.resolve(schema)
  : mysql.getSession(config)
    .then(async (session) => {
      schema = await session.getSchema('Trybeer');
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    })
);
