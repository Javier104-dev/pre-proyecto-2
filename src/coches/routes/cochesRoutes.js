const express = require("express");
const {
  verCoches,
  verCoche,
  registrarCoche,
  editarCoche,
  borrarCoche,
  urlInexistente
} = require("../controllers/cochesControllers.js");

const routes = express.Router();

const ROUTE_BASE = "/coches";

routes.get(`${ROUTE_BASE}`, verCoches);
routes.get(`${ROUTE_BASE}/:id`, verCoche);
routes.post(`${ROUTE_BASE}`, registrarCoche);
routes.put(`${ROUTE_BASE}/:id`, editarCoche);
routes.delete(`${ROUTE_BASE}/:id`, borrarCoche);
routes.use("*", urlInexistente);

module.exports = {
  routes
};