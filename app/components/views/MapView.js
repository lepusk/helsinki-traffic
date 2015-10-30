var React = require('react');
var _ = require('lodash');
var MeasurementQueries = require('../data/MeasurementQueries');
var MapData = require('../data/MapData');

var trafficMap;
var trafficMapPoints;

var MapView = React.createClass({
  render: function() {
    return (
      <div id="traffic-map" className="traffic-map">
      </div>
    );
  },

  componentDidMount: function() {
    this.createMap();
    this.populateCoordinates();
    this.drawCityCenter();
  },

  componentDidUpdate: function() {
    this.populateCoordinates();
    this.drawCityCenter();
  },

  populateCoordinates: function() {
    var self = this;
    trafficMapPoints.clearLayers();
    _.each(this.props.measurementPoints, function(measurementPoint) {
      var measurements = MeasurementQueries.getMeasurements(measurementPoint, self.props.measurementsOfHour);
      var coordinates = MeasurementQueries.getCoordinates(measurementPoint, self.props.coordinates);
      var circleData = MapData.createCircleData(measurements, coordinates);

      self.drawCircle(circleData.lat, circleData.lon, '#aaa', null, 150, 0.5);
      self.drawTotalTrafficCircle(circleData.direction1Total, circleData, 'red', -0.0005);
      self.drawTotalTrafficCircle(circleData.direction2Total, circleData, 'blue', 0.0005);
    });
  },

  createMap: function() {
    trafficMap = L.map('traffic-map').setView([60.182501529929304, 24.90523338317871], 12);
    L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png'
    }).addTo(trafficMap);
    trafficMapPoints = new L.LayerGroup().addTo(trafficMap);

    console.log('Map initialized', trafficMap, trafficMapPoints);
  },

  drawCityCenter: function() {
    this.drawCircle(60.17038939, 24.94100461, 'rgb(145,207,96)', null, 50, 1);
  },

  drawTotalTrafficCircle: function(totalTraffic, circleData, color, offset) {
    var radius = MapData.getCircleRadius(totalTraffic, this.props.allMeasurements);
    this.drawCircle(circleData.lat + offset, circleData.lon + offset, color, null, radius);
  },

  drawCircle: function(lat, lon, fillColor, borderColor, radius, fillOpacity) {
    if (!fillOpacity) {
      fillOpacity = 0.8;
    }
    var circleRadius = radius;
    var mapOptions = {
      fillOpacity: fillOpacity,
      fillColor: fillColor,
      color: borderColor
    };
    return L.circle([lat, lon], radius, mapOptions).addTo(trafficMapPoints);
  }
});

module.exports = MapView;
