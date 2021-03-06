var AppDispatcher = require('../dispatcher/AppDispatcher');
var MeasurementConstants = require('../constants/MeasurementConstants');
var _ = require('lodash');

var MeasurementActions = {
  selectHour: function(hourStr) {
    var hour = _.parseInt(hourStr);
    console.log('dispatching', MeasurementConstants.Actions.SELECT_HOUR, hour);
    AppDispatcher.dispatch({
      actionType: MeasurementConstants.Actions.SELECT_HOUR,
      hour: hour
    });
  },

  selectMeasurementPoint: function(measurementPoint) {
    console.log('dispatching', MeasurementConstants.Actions.SELECT_MEASUREMENT_POINT, measurementPoint);
    AppDispatcher.dispatch({
      actionType: MeasurementConstants.Actions.SELECT_MEASUREMENT_POINT,
      measurementPoint: measurementPoint
    });
  },

  unselectMeasurementPoint: function() {
    console.log('dispatching', MeasurementConstants.Actions.UNSELECT_MEASUREMENT_POINT);
    AppDispatcher.dispatch({
      actionType: MeasurementConstants.Actions.UNSELECT_MEASUREMENT_POINT
    });
  }
};

module.exports = MeasurementActions;
