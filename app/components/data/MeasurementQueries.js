var _ = require('lodash');

function selectMeasurementsByHour(hour, data) {
  var selectedMeasurements = {};
  _.each(data, function(measurements, measurementPoint) {
    selectedMeasurements[measurementPoint] = _.filter(measurements, function(measurement) {
      return measurement.time === hour;
    });
  });
  return selectedMeasurements;
}

function getMeasurements(measurementPoint, data) {
  var measurements = data[measurementPoint];
  return measurements ? measurements : [];
}

function getCoordinates(measurementPoint, coordinatesData) {
  var foundCoordinates = _.find(coordinatesData, function(coordinates) {
    return coordinates.measurementPoint === measurementPoint;
  });
  if (foundCoordinates) {
    return {
      lat: foundCoordinates.lat,
      lon: foundCoordinates.lon
    };
  }
  return {};
}

module.exports = {
  selectMeasurementsByHour: selectMeasurementsByHour,
  getMeasurements: getMeasurements,
  getCoordinates: getCoordinates
};
