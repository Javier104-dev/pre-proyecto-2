const { connectToDb } = require("../model/cochesModel.js");
const { crearId, mapperCoche, mapperFiltros } = require("../utilities/cochesUtilities.js");

const verCoches = async (querys) => {
  const filtros = mapperFiltros(querys);

  const collection = await connectToDb();
  const coches = await collection.find(filtros).toArray();

  return coches;
};

const verCoche = async (id) => {
  if (!id) throw new Error("El id no corresponde a un vehículo registrado");

  const collection = await connectToDb();
  const coche = await collection.findOne({ id });

  if (!coche) throw new Error("Vehículo no encontrado");

  return coche;
};

const registrarCoche = async (body) => {
  const { modelo, marca, precio, anio } = body;

  if (!modelo || !marca || !precio || !anio) throw new Error("Faltan datos relevantes");

  const collection = await connectToDb();
  const coche = { ...mapperCoche(body), id: crearId() };

  await collection.insertOne(coche);

  return coche;
};

const editarCoche = async (body) => {
  const { id, modelo, marca, precio, anio } = body;

  if (!id || !modelo || !marca || !precio || !anio) throw new Error("Faltan datos relevantes");

  const coche = mapperCoche(body);

  const collection = await connectToDb();
  await collection.updateOne({ id }, { $set: coche });

  return coche;
};

const borrarCoche = async (id) => {
  if (!id) throw new Error("El id ingresado es invalido");

  const collection = await connectToDb();
  await collection.deleteOne({ id: { $eq: id } });
};

module.exports = {
  verCoches,
  verCoche,
  registrarCoche,
  editarCoche,
  borrarCoche
};