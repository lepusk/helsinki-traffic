var _ = require('lodash');

var MeasurementQueries = {};

MeasurementQueries.selectMeasurementsByHour = function(hour, data) {
  var selectedMeasurements = {};
  _.each(data, function(measurements, measurementPoint) {
    selectedMeasurements[measurementPoint] = _.filter(measurements, function(measurement) {
      return measurement.time === hour;
    });
  });
  return selectedMeasurements;
};

MeasurementQueries.selectMeasurementsByMeasurementPoint = function(measurementPoint, data) {
  var measurements = data[measurementPoint];
  return measurements ? measurements : [];
}

module.exports = MeasurementQueries;