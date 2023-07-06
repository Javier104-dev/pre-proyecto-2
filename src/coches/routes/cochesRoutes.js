const express = require("express");

const routes = express.Router();

const ROUTE_BASE = "/coches";

routes.get(ROUTE_BASE, (req, res) => {
  res.send("hola");
});

module.exports = {
  routes
};