var React = require('react');

var MeasurementConstants = require('../constants/MeasurementConstants');

var direction1Color = MeasurementConstants.Map.direction1Color;
var direction2Color = MeasurementConstants.Map.direction2Color;
var cityCenterColor = MeasurementConstants.Map.cityCenterColor;

var ColorInfoView = React.createClass({
  render: function() {
    return (
      <div className="color-info-panel">
          <div className="color-info-row">
              <div className="color-info-circle" style={this.createBgStyle(direction1Color)}></div>
              <div className="color-info-text">Liikenne keskustaan</div>
          </div>
          <div className="color-info-row">
              <div className="color-info-circle" style={this.createBgStyle(direction2Color)}></div>
              <div className="color-info-text">Liikenne keskustasta pois</div>
          </div>
          <div className="color-info-row">
              <div className="color-info-circle" style={this.createBgStyle(cityCenterColor)}></div>
              <div className="color-info-text">Helsingin keskusta</div>
          </div>
      </div>
    );
  },

  createBgStyle: function(colorValue) {
    return {
      backgroundColor: colorValue
    };
  } 
});

module.exports = ColorInfoView;
