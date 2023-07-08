const crearId = () => Number(`${Date.now()}${Math.floor(Math.random() * 10000)}`);

const comprabarValor = (valor) => (valor === 0 || valor === false || valor);

const mapperFiltros = (filtros) => {
  const { marca, modelo, mayor_o_igual } = filtros;

  return {
    ...(marca && { marca }),
    ...(modelo && { modelo }),
    ...(mayor_o_igual && { precio: { $gte: Number(mayor_o_igual) } })
  };
};

const mapperCoche = (coche) => {
  const { id, modelo, marca, precio, anio, descuento, es_0km, velocidad_crucero } = coche;

  return {
    id: Number(id),
    modelo,
    marca,
    precio,
    anio,
    ...(comprabarValor(descuento) && { descuento }),
    ...(comprabarValor(es_0km) && { es_0km }),
    ...(comprabarValor(velocidad_crucero) && { velocidad_crucero })
  };
};

module.exports = {
  crearId,
  mapperCoche,
  mapperFiltros
};