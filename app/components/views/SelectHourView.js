var React = require('react');
var _ = require('lodash');
var MeasurementActions = require('../actions/MeasurementActions');

var hours = _.range(0,24);

var SelectHourView = React.createClass({
  render: function() {
    return (
      <div>
        <select onChange={this.selectHour} value={this.props.selectedHour}>
          {this.createHourOptions()}
        </select>
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
      <option value={hour} key={hour}>{hour}</option>
    );
  },

  selectHour: function(event) {
    var hour = event.target.value;
    MeasurementActions.selectHour(hour);
  },
});

module.exports = SelectHourView;
