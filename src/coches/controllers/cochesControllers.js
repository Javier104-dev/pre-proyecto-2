const { desconnect } = require("../model/cochesModel.js");
const {
  verCoches: verCochesServices,
  verCoche: verCocheServices,
  registrarCoche: registrarCocheServices,
  editarCoche: editarCocheServices,
  borrarCoche: borrarCocheServices
} = require("../services/cochesServices.js");

const verCoches = async (req, res) => {
  const { marca, modelo, mayor_o_igual } = req.query;

  try {
    const coches = await verCochesServices({ marca, modelo, mayor_o_igual });
    res.status(200).json(coches);

  } catch (error) {
    res.status(500).json({ error: error.message });

  } finally {
    await desconnect();

  }
};

const verCoche = async (req, res) => {
  const { id } = req.params;

  try {
    const coche = await verCocheServices(Number(id));
    res.status(200).json(coche);

  } catch (error) {
    res.status(500).json({ error: error.message });

  } finally {
    await desconnect();

  }
};

const registrarCoche = async (req, res) => {
  const { modelo, marca, precio, anio, descuento, es_0km, velocidad_crucero } = req.body;

  try {
    const coche = await registrarCocheServices({ modelo, marca, precio, anio, descuento, es_0km, velocidad_crucero });
    res.status(200).json({ msg: "Coche registrado con exito", coche });

  } catch (error) {
    res.status(500).json({ error: error.message });

  } finally {
    await desconnect();

  }
};

const editarCoche = async (req, res) => {
  const { modelo, marca, precio, anio, descuento, es_0km, velocidad_crucero } = req.body;
  const { id } = req.params;

  try {
    const coche = await editarCocheServices({ id: Number(id), modelo, marca, precio, anio, descuento, es_0km, velocidad_crucero });
    res.status(200).json({ msg: "Coche editado con exito", coche });

  } catch (error) {
    res.status(500).json({ error: error.message });

  } finally {
    await desconnect();

  }
};

const borrarCoche = async (req, res) => {
  const { id } = req.params;

  try {
    await borrarCocheServices(Number(id));
    res.status(200).json({ msg: "Coche eliminado con exito" });

  } catch (error) {
    res.status(500).json({ error: error.message });

  } finally {
    await desconnect();

  }
};

const urlInexistente = (req, res) => {
  res.status(404).json({ 404: 'Url no encontrada' });
};

module.exports = {
  verCoches,
  verCoche,
  registrarCoche,
  editarCoche,
  borrarCoche,
  urlInexistente
};