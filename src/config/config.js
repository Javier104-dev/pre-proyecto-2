require("dotenv").config();

module.exports = {
  HOST: process.env.SERVER_HOST,
  PORT: process.env.SERVER_PORT,
  DB_URL: process.env.DATABASE_URL,
  DB_NAME: process.env.DATABASE_NAME,
  COL_NAME: process.env.COLLECTION_NAME,
};
