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
};

module.exports = MeasurementActions;
