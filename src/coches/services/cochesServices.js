/* eslint-disable object-curly-newline */

const { connectToDb } = require("../model/cochesModel");
const { crearId, mapperCoche, mapperFiltros } = require("../utilities/cochesUtilities");

const verCoches = async (querys) => {
  const filtros = mapperFiltros(querys);

  const collection = await connectToDb();
  const coches = await collection.find(filtros).toArray();

  return coches;
};

const verCoche = async (id) => {

  if (!id) throw new Error("El id no esta definido");

  const collection = await connectToDb();
  const coche = await collection.findOne({ id });

  if (!coche) throw new Error("El id no corresponde a un vehículo registrado");

  return coche;
};

const registrarCoche = async (body) => {
  const { modelo, marca, precio, anio } = body;

  if (!modelo || !marca || !precio || !anio) throw new Error("Faltan datos relevantes");

  const collection = await connectToDb();
  const coche = { id: crearId(), ...mapperCoche(body) };

  await collection.insertOne(coche);

  return coche;
};

const editarCoche = async (body) => {
  const { id, modelo, marca, precio, anio } = body;

  if (!modelo || !marca || !precio || !anio) throw new Error("Faltan datos relevantes");

  const collection = await connectToDb();
  const cocheDb = await collection.findOne({ id });

  if (!cocheDb) throw new Error("El id no corresponde a un vehiculo registrado");

  const coche = { ...cocheDb, ...mapperCoche(body) };

  await collection.updateOne({ id }, { $set: coche });

  return coche;
};

const borrarCoche = async (id) => {
  if (!id) throw new Error("El id no esta definido");

  const collection = await connectToDb();
  const coche = await collection.findOne({ id });

  if (!coche) throw new Error("El id no corresponde a un vehiculo registrado");

  await collection.deleteOne({ id });
};

module.exports = {
  verCoches,
  verCoche,
  registrarCoche,
  editarCoche,
  borrarCoche,
};
