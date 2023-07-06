const { desconnect } = require("../model/cochesModel");
const {
  verCoches: verCochesServices,
  verCoche: verCocheServices
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
    const coche = await verCocheServices(id);
    res.status(200).json(coche);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  verCoches,
  verCoche
};