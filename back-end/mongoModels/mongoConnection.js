require('dotenv').config();
const mongoClient = require('mongodb').MongoClient;

const { DB_URL, DB_NAME } = process.env;

let schema = null;

module.exports = async () => {
  if (schema) return Promise.resolve(schema);

  return mongoClient
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
