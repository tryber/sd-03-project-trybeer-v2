require('dotenv/config');
const queries = require('./queries');
const getSession = require('../models/getSession');

const restartDb = async () => {
  const session = await getSession();
  await session.sql('DROP DATABASE IF EXISTS Trybeer;').execute();
  await session.sql('CREATE DATABASE IF NOT EXISTS Trybeer;').execute();
  await session.sql('USE Trybeer;').execute();
  await session.sql(queries.usersConstrict).execute();
  await session.sql(queries.salesConstrict).execute();
  await session.sql(queries.productsConstrict).execute();
  await session.sql(queries.salesProductsConstrict).execute();
  await session.sql(queries.populateUsers).execute();
  await session.sql(queries.populateProducts).execute();
};

module.exports = {
  restartDb,
};
