var React = require('react');
var MeasurementStore = require('../stores/MeasurementStore');
var _ = require('lodash');

var SelectHourView = require('./SelectHourView');
var MapView = require('./MapView');

var AppView = React.createClass({
  render: function() {
    return (
      <div className="content">
        <SelectHourView selectedHour={this.state.selectedHour} />
        <MapView />
      </div>
    );
  },

  getInitialState: function() {
    return getAppState();
  },

  componentDidMount: function() {
    MeasurementStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MeasurementStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getAppState());
  }
});

function getAppState() {
  return {
    measurements: MeasurementStore.getMeasurementsOfHour(),
    selectedHour: MeasurementStore.getSelectedHour()
  };
}


module.exports = AppView;
