const { connectToDb } = require("../model/cochesModel");

const verCoches = async ({ marca, modelo, mayor_o_igual }) => {
  const filtros = {};

  if (marca) filtros.marca = marca;
  if (modelo) filtros.modelo = modelo;
  if (mayor_o_igual) filtros.precio = { $gte: Number(mayor_o_igual) };

  const collection = await connectToDb("coches");
  const coches = await collection.find(filtros).toArray();

  return coches;
};

const verCoche = async (id) => {
  if (!id) throw new Error("El id no corresponde a un vehículo registrado");

  const collection = await connectToDb("coches");
  const coche = await collection.findOne({ id: Number(id) });

  if (!coche) throw new Error("Vehículo no encontrado");

  return coche;
};

module.exports = {
  verCoches,
  verCoche
};