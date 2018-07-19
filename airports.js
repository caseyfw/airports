var airports = require("./airports.json");

exports.airports = callback => {
  callback(airports);
};

exports.airport = (code, callback) => {
  callback(airports.find(airport => airport.code === code));
};

exports.cities = callback => {
  // Unwrap cities from their airports and de-dupe.
  let cities = airports.map(airport => airport.city).filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj.code).indexOf(obj.code) === pos;
  });
  callback(cities);
};

exports.city = (code, callback) => {
  let airport = airports.find(airport => airport.city.code === code);
  let city = airport ? Object.assign({}, airport.city) : undefined;

  if (city) {
    // Decorate city with list of associated airports, sans their city property.
    city.airports = [];
    airports
      .filter(airport => airport.city.code === code)
      .forEach(airport => city.airports.push(Object.assign({}, airport)));
    city.airports.forEach(airport => delete airport.city);
  }
  callback(city);
};
