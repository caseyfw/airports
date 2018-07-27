var service = require("./service.js");

var airports = require(process.env.AIRPORTS_JSON_PATH || "./airports.json"),
  config = require(process.env.CONFIG_JSON_PATH || "./config.json");

exports.handler = (event, context, callback) => {
  let pathParts = event.path.split("/");
  if (pathParts.length < 3) {
    callback(null, { statusCode: 404 });
    return;
  }

  let brand = pathParts[0],
    country = pathParts[1],
    request = pathParts[2];

  config = { ...config, brand: brand, country: country };

  switch (request) {
    case "airports":
      result = service.getAirports(airports, config);
      break;
    case "airport":
      result = service.getAirport(airports, config, pathParts[3] || "");
      break;
    case "cities":
      result = service.getCities(airports, config);
      break;
    case "city":
      result = service.getCity(airports, config, pathParts[3] || "");
      break;
    default:
      result = [];
      return;
  }

  callback(
    null,
    result !== undefined
      ? {
          statusCode: 200,
          body: JSON.stringify(response),
          headers: { "Access-Control-Allow-Origin": "*" }
        }
      : { statusCode: 404 }
  );
};
