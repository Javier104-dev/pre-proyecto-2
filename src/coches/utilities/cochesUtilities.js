const crearId = () => Date.now();

const crearCoche = (coche) => {
  const { modelo, marca, precio, anio, descuento, es_0km, velocidad_crucero } = coche;
  return {
    modelo,
    marca,
    precio,
    anio
  };
};

module.exports = {
  crearId,
  crearCoche
};