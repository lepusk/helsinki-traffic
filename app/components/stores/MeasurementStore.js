var AppDispatcher = require('../dispatcher/AppDispatcher');
var MeasurementConstants = require('../constants/MeasurementConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var measurements = window.trafficData || {};
var selectedHour = 2;

var CHANGE_EVENT = 'change';

var MeasurementStore = assign({}, EventEmitter.prototype, {
  getMeasurements: function() {
    return measurements;
  },

  getSelectedHour: function() {
    return selectedHour;
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
