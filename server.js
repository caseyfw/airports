var restify = require('restify'),
  airports = require('./airports.js');

function getAirports(req, res, next) {
  airports.airports(airports => res.send(airports));
  next();
}

function getAirport(req, res, next) {
  airports.airport(req.params.code, airport => res.send(airport));
  next();
}

function getCities(req, res, next) {
  airports.cities(cities => res.send(cities));
  next();
}

var server = restify.createServer();
server.get("/airports", getAirports);
server.get("/airport/:code", getAirport);
server.get("/cities", getCities);

server.listen(8080, function() {
  console.log("%s listening at %s", server.name, server.url);
});
