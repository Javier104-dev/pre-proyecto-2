const express = require("express");
const { HOST, PORT } = require("./config/config.js");
const { routes: rutas } = require("../src/coches/routes/cochesRoutes.js");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(rutas);

server.listen(PORT, HOST, () => {
  console.log(`Servidor: http://${HOST}:${PORT}/coches`);
});