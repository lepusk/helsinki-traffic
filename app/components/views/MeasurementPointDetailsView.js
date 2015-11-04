var React = require('react');

var LineChartView = require('./LineChartView');
var MapData = require('../data/MapData');
var MeasurementQueries = require('../data/MeasurementQueries');
var MeasurementConstants = require('../constants/MeasurementConstants');
var MeasurementActions = require('../actions/MeasurementActions');

var direction1Color = MeasurementConstants.Map.direction1Color;
var direction2Color = MeasurementConstants.Map.direction2Color;

var MeasurementPointDetailsView = React.createClass({
  render: function() {
    if (!this.props.selectedMeasurementPoint) {
      return null;
    }
    var direction1GraphData = this.createGraphData('1');
    var direction2GraphData = this.createGraphData('2');
    var maxValue = MeasurementQueries.getTotalMax(this.props.allMeasurements);
    return (
      <div className="modal" onClick={this.unselectMeasurementPoint}>
        <div className="modal-dialog" onClick={this.preventClose}>
          <div className="modal-content">
            <a href="#" onClick={this.unselectMeasurementPoint} className="modal-close">x</a>
            <h2>{this.createTitle()}</h2>
            <p>Vaaka-akseli: Ajankohta (tunti)</p>
            <p>Pysty-akseli: Ajoneuvojen keskimääräinen kokonaismäärä tuntia kohden.</p>
            <h3>Liikenne keskustaan</h3>
            <LineChartView 
              selectedValue={this.props.selectedHour}
              color={direction1Color}
              chartId="direction1-linechart"
              graphData={direction1GraphData}
              maxValue={maxValue} />
            <h3>Liikenne keskustasta pois</h3>
            <LineChartView
              selectedValue={this.props.selectedHour}
              color={direction2Color}
              chartId="direction2-linechart"
              graphData={direction2GraphData}
              maxValue={maxValue} />
          </div> 
        </div>
      </div>
    );
  },

  createTitle: function() {
    var title = MeasurementQueries.getMeasurementPointName(this.props.selectedMeasurementPoint, this.props.coordinates);
    return this.props.selectedMeasurementPoint + ', ' + title;
  },

  preventClose: function(event) {
    event.stopPropagation();
  },

  unselectMeasurementPoint: function(event) {
    event.preventDefault();
    MeasurementActions.unselectMeasurementPoint();
  },

  createGraphData: function(direction) {
    var color = direction === '1' ? direction1Color : direction2Color;
    var data = MapData.createGraphData(
                    MeasurementQueries.getMeasurementsByMeasurementPointAndDirection(
                      this.props.selectedMeasurementPoint,
                      direction,
                      this.props.allMeasurements), color);
    return data;
  }
});

module.exports = MeasurementPointDetailsView;
