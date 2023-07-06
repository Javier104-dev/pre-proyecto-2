const { MongoClient } = require("mongodb");

const url = "mongodb+srv://javiervillca:root123@cluster0.uuuqv8k.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(url);

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
  const db = connection.db("productos");
  const collection = db.collection(nameCollention);

  return collection;
};

module.exports = {
  desconnect,
  connectToDb
};