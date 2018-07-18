var airports = require("./airports.json");

exports.airports = callback => {
  callback(airports);
};

exports.airport = (code, callback) => {
  callback(airports.find(airport => airport.code == code));
}

exports.cities = callback => {
  // Unwrap cities from their airports and de-dupe.
  let cities = airports.map(airport => airport.city).filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj.code).indexOf(obj.code) === pos;
  });
  callback(cities);
}

exports.city = (code, callback) => {
  let city = airports.find(airport => airport.city.code == code).city;
  city.airports = airports.filter(airport => airport.city.code == code).map(airport => {
    delete airport.city;
    return airport;
  });
  callback(city);
}
