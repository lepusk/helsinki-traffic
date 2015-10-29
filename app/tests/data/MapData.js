var expect = require('chai').expect;
var sinon = require("sinon");

var MapData = require('../../components/data/MapData');

describe('create circle data', function() {
  it('creates object with coordinates and total traffic values for each direction', function() {
    var coordinates = {
      lon: 24.89961514,
      lat: 60.16238533
    };
    var measurements = [
      {
        "direction": "1",
        "van": 5,
        "tram": 13,
        "car": 65,
        "time": 17,
        "truck": 1,
        "motorcycle": 0,
        "bus": 0,
        "total": 71
      },
      {
        "direction": "2",
        "van": 42,
        "tram": 0,
        "car": 323,
        "time": 17,
        "truck": 6,
        "motorcycle": 7,
        "bus": 1,
        "total": 372
      }
    ];

    var circleData = MapData.createCircleData(measurements, coordinates);
    var expectedCircleData = {
      lon: 24.89961514,
      lat: 60.16238533,
      direction1Total: 71,
      direction2Total: 372
    };
    expect(circleData).to.deep.equals(expectedCircleData);
  });
});
