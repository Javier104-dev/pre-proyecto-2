const express = require("express");
const {
  verCoches,
  verCoche
} = require("../controllers/cochesControllers.js");

const routes = express.Router();

const ROUTE_BASE = "/coches";

routes.get(`${ROUTE_BASE}`, verCoches);
routes.get(`${ROUTE_BASE}/:id`, verCoche);

module.exports = {
  routes
};