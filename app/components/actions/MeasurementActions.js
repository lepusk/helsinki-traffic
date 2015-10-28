var AppDispatcher = require('../dispatcher/AppDispatcher');
var MeasurementConstants = require('../constants/MeasurementConstants');

var MeasurementActions = {
  selectHour: function(hour) {
    console.log('dispatching', MeasurementConstants.SELECT_HOUR, hour);
    AppDispatcher.dispatch({
      actionType: MeasurementConstants.SELECT_HOUR,
      hour: hour
    });
  },
};

module.exports = MeasurementActions;
