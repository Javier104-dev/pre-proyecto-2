const { connectToDb } = require("../model/cochesModel");
const { crearId } = require("../utilities/cochesUtilities");

const COLLECTION_NAME = "coches";

const verCoches = async ({ marca, modelo, mayor_o_igual }) => {
  const filtros = {};

  if (marca) filtros.marca = marca;
  if (modelo) filtros.modelo = modelo;
  if (mayor_o_igual) filtros.precio = { $gte: Number(mayor_o_igual) };

  const collection = await connectToDb(COLLECTION_NAME);
  const coches = await collection.find(filtros).toArray();

  return coches;
};

const verCoche = async (id) => {
  if (!id) throw new Error("El id no corresponde a un vehículo registrado");

  const collection = await connectToDb(COLLECTION_NAME);
  const coche = await collection.findOne({ id: Number(id) });

  if (!coche) throw new Error("Vehículo no encontrado");

  return coche;
};

const registrarCoche = async (body) => {
  const { modelo, marca, precio, anio, descuento, es_0km, velocidad_crucero } = body;

  if (!modelo || !marca || !precio || !anio) throw new Error("Faltan datos relevantes");

  const collection = await connectToDb(COLLECTION_NAME);
  const coche = { id: crearId(), modelo, marca, precio, anio };

  if (descuento) coche.descuento = descuento;
  if (es_0km) coche.es_0km = es_0km;
  if (velocidad_crucero) coche.velocidad_crucero = velocidad_crucero;

  await collection.insertOne(coche);

  return coche;
};

const editarCoche = async (id, body) => {
  const { modelo, marca, precio, anio, descuento, es_0km, velocidad_crucero } = body;

  if (!id || !modelo || !marca || !precio || !anio) throw new Error("Faltan datos relevantes");

  const coche = { modelo, marca, precio, anio };

  if (descuento) coche.descuento = descuento;
  if (es_0km) coche.es_0km = es_0km;
  if (velocidad_crucero) coche.velocidad_crucero = velocidad_crucero;

  const collection = await connectToDb(COLLECTION_NAME);
  await collection.updateOne({ id: Number(id) }, { $set: coche });

  return coche;
};

const borrarCoche = async (id) => {
  if (!id) throw new Error("El id ingresado es invalido");

  const collection = await connectToDb(COLLECTION_NAME);
  await collection.deleteOne({ id: { $eq: Number(id) } });
};

module.exports = {
  verCoches,
  verCoche,
  registrarCoche,
  editarCoche,
  borrarCoche
};