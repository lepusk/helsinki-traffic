var React = require('react');

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
  }
});

module.exports = MapView;
