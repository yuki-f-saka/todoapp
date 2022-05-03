// Update with your config settings.
require('dotenv').config();

const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;

module.exports = {

  development: {
    client: "mysql",
    connection: {
      database: db_name,
      user: db_user,
      password: db_password,
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  staging: {
    client: "mysql",
    connection: {
      database: db_name,
      user: db_user,
      password: db_password,
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: "mysql",
    connection: {
      database: db_name,
      user: db_user,
      password: db_password,
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};