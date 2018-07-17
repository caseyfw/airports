var airports = require("./airports.json");

exports.airports = callback => {
  callback(airports);
};

exports.airport = (code, callback) => {
  callback(airports.find(airport => airport.code == code));
}

exports.cities = callback => {
  let cities = airports.map(airport => ({[airport.city.code]: airport.city}));
  callback(cities);
}
