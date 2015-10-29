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

function getMeasurementByDirection(measurements, direction) {
  return _.find(measurements, function(measurement) {
    return measurement.direction === direction;
  });
}

module.exports = {
  createCircleData: createCircleData
};
