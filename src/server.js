const express = require("express");
const { HOST, PORT } = require("./config/config");
const { routes: rutas } = require("./coches/routes/cochesRoutes");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(rutas);

server.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor: http://${HOST}:${PORT}/coches`);
});
