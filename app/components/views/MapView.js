var React = require('react');
var _ = require('lodash');
var MeasurementQueries = require('../data/MeasurementQueries');
var MeasurementConstants = require('../constants/MeasurementConstants');
var MapData = require('../data/MapData');
var MeasurementActions = require('../actions/MeasurementActions');

var trafficMap;
var trafficMapPoints;

var circleOffSet = MeasurementConstants.Map.circleOffSet;
var direction1Color = MeasurementConstants.Map.direction1Color;
var direction2Color = MeasurementConstants.Map.direction2Color;
var cityCenterColor = MeasurementConstants.Map.cityCenterColor;
var defaultCircleSize = MeasurementConstants.Map.defaultCircleSize;
var cityCenterCircleSize = MeasurementConstants.Map.cityCenterCircleSize;
var cityCenter = MeasurementConstants.Map.cityCenter;
var defaultView = MeasurementConstants.Map.defaultView;
var measurementPointColor = MeasurementConstants.Map.measurementPointColor;
var defaultFillOpacity = MeasurementConstants.Map.defaultFillOpacity;
var measurementPointFillOpacity = MeasurementConstants.Map.measurementPointFillOpacity;

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

      var centerCircle = self.drawCircle(circleData.lat, circleData.lon, measurementPointColor, null, defaultCircleSize, measurementPointFillOpacity);
      var direction1Circle = self.drawTotalTrafficCircle(circleData.direction1Total, circleData, direction1Color, -circleOffSet);
      var direction2Circle = self.drawTotalTrafficCircle(circleData.direction2Total, circleData, direction2Color, circleOffSet);
      var selectMeasurementPoint = function() {
        MeasurementActions.selectMeasurementPoint(measurementPoint);
      };
      centerCircle.on('click', selectMeasurementPoint);
      direction1Circle.on('click', selectMeasurementPoint);
      direction2Circle.on('click', selectMeasurementPoint);
    });
  },

  createMap: function() {
    trafficMap = L.map('traffic-map', { zoomControl: false }).setView([defaultView.lat, defaultView.lon], defaultView.zoom);
    L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: defaultView.minZoom,
      maxZoom: defaultView.maxZoom,
      ext: 'png'
    }).addTo(trafficMap);
    new L.Control.Zoom({ position: 'bottomleft' }).addTo(trafficMap);
    trafficMapPoints = new L.LayerGroup().addTo(trafficMap);

    console.log('Map initialized', trafficMap, trafficMapPoints);
  },

  drawCityCenter: function() {
    this.drawCircle(cityCenter.lat, cityCenter.lon, cityCenterColor, null, cityCenterCircleSize);
  },

  drawTotalTrafficCircle: function(totalTraffic, circleData, color, offset) {
    var radius = MapData.getCircleRadius(totalTraffic, this.props.allMeasurements);
    return this.drawCircle(circleData.lat + offset, circleData.lon + offset, color, null, radius);
  },

  drawCircle: function(lat, lon, fillColor, borderColor, radius, fillOpacity) {
    if (!fillOpacity) {
      fillOpacity = defaultFillOpacity;
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
