const credentials = require("./config/db_credentials.js");

module.exports = {
  development: {
    client: "mysql",
    connection: {
      database: credentials.database,
      user: credentials.user,
      password: credentials.password
    }
  }
};
