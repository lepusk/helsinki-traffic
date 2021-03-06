var AppDispatcher = require('../dispatcher/AppDispatcher');
var MeasurementConstants = require('../constants/MeasurementConstants');
var MeasurementQueries = require('../data/MeasurementQueries');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var trafficData = window.trafficData || {};
var coordinatesData = window.coordinatesData || {};
var selectedHour = 8;
var selectedMeasurementPoint;

// var measurementPoints = _.map(coordinatesData, function(coordinate) {
//   return coordinate.measurementPoint;
// });
var measurementPoints =  ['A01', 'A02', 'A04', 'A05', 'A07', 'A08', 'A09', 'B01', 'B02', 'B03', 'B04',
                          'B05', 'B06', 'B07', 'B08', 'B09', 'B10', 'B12', 'C02', 'C03'];

var CHANGE_EVENT = 'change';

var MeasurementStore = assign({}, EventEmitter.prototype, {
  getAllMeasurements: function() {
    return trafficData;
  },

  getMeasurementsOfHour: function() {
    var measurementsOfHour = MeasurementQueries.selectMeasurementsByHour(selectedHour, trafficData);
    console.log('fetched measurements', selectedHour, measurementsOfHour);
    return measurementsOfHour;
  },

  getSelectedHour: function() {
    console.log('getting selected hour', selectedHour);
    return selectedHour;
  },

  getCoordinates: function() {
    console.log('getting coordinates', coordinatesData);
    return coordinatesData;
  },

  getMeasurementPoints: function() {
    console.log('getting measurement points', measurementPoints);
    return measurementPoints;
  },

  getSelectedMeasurementPoint: function() {
    console.log('getting selected measurement point', selectedMeasurementPoint);
    return selectedMeasurementPoint;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  console.log('handling action', action);
  switch(action.actionType) {
    case MeasurementConstants.Actions.SELECT_HOUR:
      selectedHour = action.hour;
      MeasurementStore.emitChange();
      break;
    case MeasurementConstants.Actions.SELECT_MEASUREMENT_POINT:
      selectedMeasurementPoint = action.measurementPoint;
      MeasurementStore.emitChange();
      break;
    case MeasurementConstants.Actions.UNSELECT_MEASUREMENT_POINT:
      selectedMeasurementPoint = null;
      MeasurementStore.emitChange();
      break;
    default:
      console.log('unknown action', action);
  }
});

module.exports = MeasurementStore;
