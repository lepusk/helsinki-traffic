var React = require('react');
var MeasurementStore = require('../stores/MeasurementStore');
var _ = require('lodash');

var SelectHourView = require('./SelectHourView');
var MapView = require('./MapView');
var ColorInfoView = require('./ColorInfoView');
var MeasurementPointDetailsView = require('./MeasurementPointDetailsView');

var AppView = React.createClass({
  render: function() {
    return (
      <div className="content">
        <MapView
          allMeasurements={this.state.allMeasurements}
          measurementsOfHour={this.state.measurementsOfHour} 
          coordinates={this.state.coordinates}
          measurementPoints={this.state.measurementPoints} />
        <SelectHourView selectedHour={this.state.selectedHour} />
        <ColorInfoView />
        <MeasurementPointDetailsView
          coordinates={this.state.coordinates}
          selectedHour={this.state.selectedHour}
          selectedMeasurementPoint={this.state.selectedMeasurementPoint}
          allMeasurements={this.state.allMeasurements}
        />
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
    allMeasurements: MeasurementStore.getAllMeasurements(),
    measurementsOfHour: MeasurementStore.getMeasurementsOfHour(),
    selectedHour: MeasurementStore.getSelectedHour(),
    coordinates: MeasurementStore.getCoordinates(),
    measurementPoints: MeasurementStore.getMeasurementPoints(),
    selectedMeasurementPoint: MeasurementStore.getSelectedMeasurementPoint()
  };
}

module.exports = AppView;
