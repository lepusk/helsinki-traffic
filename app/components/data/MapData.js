var _ = require('lodash');
var MeasurementQueries = require('./MeasurementQueries');

function createGraphData(measurements) {
  return _.map(measurements, function(measurement) {
    return {
      x: measurement.time,
      y: measurement.total
    };
  });
}

function createCircleData(measurements, coordinates) {
  var circleData = {
    lat: coordinates.lat,
    lon: coordinates.lon,
    direction1Total: _.get(getMeasurementByDirection(measurements, '1'), 'total'),
    direction2Total: _.get(getMeasurementByDirection(measurements, '2'), 'total')
  };

  return circleData;
}

function getCircleRadius(measurementPointTotal, measurements) {
  var totalMax = MeasurementQueries.getTotalMax(measurements);
  return (measurementPointTotal / totalMax) * 150;
}

function getMeasurementByDirection(measurements, direction) {
  return _.find(measurements, function(measurement) {
    return measurement.direction === direction;
  });
}

module.exports = {
  createCircleData: createCircleData,
  getCircleRadius: getCircleRadius,
  createGraphData: createGraphData
};
