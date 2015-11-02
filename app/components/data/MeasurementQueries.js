var _ = require('lodash');

function getMeasurementsByMeasurementPointAndDirection(measurementPoint, direction, data) {
  var measurements = getMeasurements(measurementPoint, data);
  return _.filter(measurements, function(measurement) {
    return measurement.direction === direction;
  });
}

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

function getTotalMax(measurements) {
  var totalValues = [];
  _.each(measurements, function(measurementsOfPoint) {
    totalValues = totalValues.concat(_.map(measurementsOfPoint, function(measurement) {
      return measurement.total;
    }));
  });
  return _.max(totalValues);
}

function getMeasurementPointName(measurementPoint, coordinatesData) {
  var coordinates = _.find(coordinatesData, function(coordinates) {
    return coordinates.measurementPoint === measurementPoint;
  });
  return _.get(coordinates, 'name', null);
}

module.exports = {
  getMeasurementsByMeasurementPointAndDirection: getMeasurementsByMeasurementPointAndDirection,
  selectMeasurementsByHour: selectMeasurementsByHour,
  getMeasurements: getMeasurements,
  getCoordinates: getCoordinates,
  getTotalMax: getTotalMax,
  getMeasurementPointName: getMeasurementPointName
};
