var _ = require('lodash');

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
  var totalMax = getTotalMax(measurements);
  return (measurementPointTotal / totalMax) * 150;
}

function getMeasurementByDirection(measurements, direction) {
  return _.find(measurements, function(measurement) {
    return measurement.direction === direction;
  });
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

module.exports = {
  createCircleData: createCircleData,
  getCircleRadius: getCircleRadius
};
