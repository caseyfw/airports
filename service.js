exports.getAirports = (airports, config) => {
  return exports.sortAirportsByPopular(airports, config);
};

exports.getAirport = (airports, config, code) => {
  return airports.find(airport => airport.code === code);
};

exports.getCities = (airports, config) => {
  // Unwrap cities from their airports and de-dupe.
  let cities = airports.map(airport => airport.city).filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj.code).indexOf(obj.code) === pos;
  });

  return cities;
};

exports.getCity = (airports, config, code) => {
  let airport = airports.find(airport => airport.city.code === code);
  let city = airport ? { ...airport.city } : undefined;

  if (city) {
    // Decorate city with list of associated airports, sans their city property.
    city.airports = [];
    airports
      .filter(airport => airport.city.code === code)
      .forEach(airport => city.airports.push({ ...airport }));
    city.airports.forEach(airport => delete airport.city);
  }

  return city;
};

exports.sortAirportsByPopular = (airports, config) => {
  config.popularAirportCodes.forEach((popularCode, popularIndex) => {
    let airportIndex = airports.findIndex(
      airport => airport.code === popularCode
    );
    let airport = airports[airportIndex];

    // Ignore non-existant popular airports.
    if (airportIndex === -1) {
      return;
    }

    // Move popular airport from its alphabetical position to its popular position.
    airports.splice(airportIndex, 1);
    airports.splice(popularIndex, 0, airport);
  });

  return airports;
};
