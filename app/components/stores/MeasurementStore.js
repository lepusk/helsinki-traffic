var AppDispatcher = require('../dispatcher/AppDispatcher');
var MeasurementConstants = require('../constants/MeasurementConstants');
var MeasurementQueries = require('../data/MeasurementQueries');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var trafficData = window.trafficData || {};
var coordinatesData = window.coordinatesData || {};
var selectedHour = 12;

var CHANGE_EVENT = 'change';

var MeasurementStore = assign({}, EventEmitter.prototype, {
  getMeasurementsOfHour: function() {
    var measurementsOfHour = MeasurementQueries.selectMeasurementsByHour(selectedHour, trafficData);
    console.log('fetched measurements', selectedHour, measurementsOfHour);
    return measurementsOfHour;
  },

  getSelectedHour: function() {
    return selectedHour;
  },

  getCoordinates: function() {
    console.log('getting coordinates', coordinatesData);
    return coordinatesData;
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
    case MeasurementConstants.SELECT_HOUR:
      selectedHour = action.hour;
      MeasurementStore.emitChange();
      break;
    default:
      console.log('unknown action', action);
  }
});

module.exports = MeasurementStore;
