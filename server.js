var restify = require("restify"),
  service = require("./service.js");

var airports = require(process.env.AIRPORTS_JSON_PATH || "./airports.json"),
  config = require(process.env.CONFIG_JSON_PATH || "./config.json");

function getAirports(req, res, next) {
  config = { ...config, brand: req.params.brand, country: req.params.country };
  res.send(service.getAirports(airports, config) || 404);
  next();
}

function getAirport(req, res, next) {
  config = { ...config, brand: req.params.brand, country: req.params.country };
  res.send(service.getAirport(airports, config, req.params.code) || 404);
  next();
}

function getCities(req, res, next) {
  config = { ...config, brand: req.params.brand, country: req.params.country };
  res.send(service.getCities(airports, config) || 404);
  next();
}

function getCity(req, res, next) {
  config = { ...config, brand: req.params.brand, country: req.params.country };
  res.send(service.getCity(airports, config, req.params.code) || 404);
  next();
}

var server = restify.createServer();
server.get("/:brand/:country/airports", getAirports);
server.get("/:brand/:country/airport/:code", getAirport);
server.get("/:brand/:country/cities", getCities);
server.get("/:brand/:country/city/:code", getCity);
server.get("/", (req, res, next) => {
  res.send({ ok: true, message: "Try /airports" });
  next();
});

server.listen(8080, function() {
  console.log("%s listening at %s", server.name, server.url);
});
