var React = require('react');
var _ = require('lodash');
var MeasurementActions = require('../actions/MeasurementActions');

var hours = _.range(0,24);

var SelectHourView = React.createClass({
  render: function() {
    return (
      <div className="topbar">
        <h4>Helsingin liikennemäärät tunnettain</h4>
        <div className="pure-form">
          <a className="pure-button previous-hour" onClick={this.choosePrevious} href="#">Edellinen</a>
          <select onChange={this.selectHour} value={this.props.selectedHour}>
            {this.createHourOptions()}
          </select>
          <a onClick={this.chooseNext} className="pure-button next-hour" href="#">Seuraava</a>
        </div>
      </div>
    );
  },

  createHourOptions: function() {
    var self = this;
    return _.map(hours, function(hour) {
      return self.createHourOption(hour);
    });
  },

  createHourOption: function(hour) {
    return (
      <option value={hour} key={hour}>{this.createHourTitle(hour)}</option>
    );
  },

  selectHour: function(event) {
    var hour = event.target.value;
    MeasurementActions.selectHour(hour);
  },

  choosePrevious: function(event) {
    event.preventDefault();
    var maxHour = _.last(hours);
    var currentHour = this.props.selectedHour;
    var previousHour = currentHour !== 0 ? currentHour - 1 : maxHour;
    MeasurementActions.selectHour(previousHour);
  },

  chooseNext: function(event) {
    event.preventDefault();
    var maxHour = _.last(hours);
    var currentHour = this.props.selectedHour;
    var nextHour = currentHour !== maxHour ? currentHour + 1 : 0;
    MeasurementActions.selectHour(nextHour);
  },

  createHourTitle: function(hour) {
    return hour + ':00';
  }
});

module.exports = SelectHourView;
