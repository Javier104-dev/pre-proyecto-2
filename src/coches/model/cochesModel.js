const { MongoClient } = require("mongodb");
const { DB_URL, DB_NAME } = require("../../config/config");

const client = new MongoClient(DB_URL);

const connect = async () => {
  console.log('Conectando...');

  try {
    const connection = await client.connect();
    console.log('Conectado');
    return connection;

  } catch (error) {
    console.log(error.message);
  }
};

const desconnect = async () => {
  try {
    await client.close();
    console.log('Desconectado');

  } catch (error) {
    console.log(error.message);
  }
};

const connectToDb = async (nameCollention) => {
  const connection = await connect();
  const db = connection.db(DB_NAME);
  const collection = db.collection(nameCollention);

  return collection;
};

module.exports = {
  desconnect,
  connectToDb
};