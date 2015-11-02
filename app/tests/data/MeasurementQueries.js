var expect = require('chai').expect;
var sinon = require("sinon");

var MeasurementQueries = require('../../components/data/MeasurementQueries');

describe('select measurements by measurement point and direction', function() {
  it('returns only measurements which equals to given measurement point and direction', function() {
    var measurementPoint = "D10";
    var direction = '1';
    var results = MeasurementQueries.getMeasurementsByMeasurementPointAndDirection(measurementPoint, direction, data);
    var expectedResults = [
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
        "direction": "1",
        "van": 5,
        "tram": 6,
        "car": 49,
        "time": 18,
        "truck": 0,
        "motorcycle": 0,
        "bus": 0,
        "total": 54
      }
    ];
    expect(results).to.deep.equals(expectedResults);
  });  
});

describe('select measurements by hour', function() {
  it('returns only measurements which equals to given hour', function() {
    var hour = 18;
    var selectedMeasurements = MeasurementQueries.selectMeasurementsByHour(hour, data);
    expect(selectedMeasurements['D10'].length).to.equals(2);
    expect(selectedMeasurements['D10'][0]['total']).to.equals(54);
    expect(selectedMeasurements['D10'][1]['total']).to.equals(247);

    expect(selectedMeasurements['D12'].length).to.equals(2);
    expect(selectedMeasurements['D12'][0]['total']).to.equals(62);
    expect(selectedMeasurements['D12'][1]['total']).to.equals(67);
  });
});

describe('get measurements of measurement point', function() {
  var measurementPoint;

  describe('and measurement point exists', function() {
    it('returns only measurements of given measurement point', function() {
      measurementPoint = 'D10';
      measurements = MeasurementQueries.getMeasurements(measurementPoint, data);
      expect(measurements.length).to.equals(4);
      expect(measurements[0]['total']).to.equals(71);
      expect(measurements[1]['total']).to.equals(54);
      expect(measurements[2]['total']).to.equals(372);
      expect(measurements[3]['total']).to.equals(247);
    });
  });

  describe('and measurement point not exists', function() {
    it('returns empty array', function() {
      measurementPoint = 'D1111';
      measurements = MeasurementQueries.getMeasurements(measurementPoint, data);
      expect(measurements.length).to.equals(0);
    });
  });
});

describe('get coordinates of measurement point', function() {
  var measurementPoint;

  describe('and coordinates exists', function() {
    it('coordinates are returned', function() {
      measurementPoint = 'A02';
      var coordinates = MeasurementQueries.getCoordinates(measurementPoint, coordinatesData);
      expect(coordinates.lat).to.equals(60.16709052);
      expect(coordinates.lon).to.equals(24.90235664);
    });
  });

  describe('and coordinates not exists', function() {
    it('lat and lon coordinates are undefined', function() {
      measurementPoint = 'A023434';
      var coordinates = MeasurementQueries.getCoordinates(measurementPoint, coordinatesData);
      expect(coordinates.lat).to.be.undefined;
      expect(coordinates.lon).to.be.undefined;
    });
  });
});

describe('get total max', function() {
  it('returns highest total value', function() {
    var max = MeasurementQueries.getTotalMax(data);
    expect(max).to.equals(372);
  });
});

describe('get measurement point name', function() {
  describe('and measurement point exists', function() {
    it('returns correct name', function() {
      var measurementPoint = 'A01';
      var title = MeasurementQueries.getMeasurementPointName(measurementPoint, coordinatesData);
      expect(title).to.equals('LAUTTASAAREN SILTA');
    });
  });

  describe('and measurement point exists', function() {
    it('returns null', function() {
      var measurementPoint = 'A034';
      var title = MeasurementQueries.getMeasurementPointName(measurementPoint, coordinatesData);
      expect(title).to.equals(null);
    });
  });
});

var data = {
  "D10": [
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
      "direction": "1",
      "van": 5,
      "tram": 6,
      "car": 49,
      "time": 18,
      "truck": 0,
      "motorcycle": 0,
      "bus": 0,
      "total": 54
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
    },
    {
      "direction": "2",
      "van": 24,
      "tram": 0,
      "car": 216,
      "time": 18,
      "truck": 0,
      "motorcycle": 5,
      "bus": 7,
      "total": 247
    }
  ],
  "D12": [
    {
      "direction": "1",
      "van": 6,
      "tram": 0,
      "car": 95,
      "time": 17,
      "truck": 0,
      "motorcycle": 1,
      "bus": 2,
      "total": 103
    },
    {
      "direction": "1",
      "van": 1,
      "tram": 0,
      "car": 61,
      "time": 18,
      "truck": 0,
      "motorcycle": 2,
      "bus": 0,
      "total": 62
    },
    {
      "direction": "2",
      "van": 11,
      "tram": 0,
      "car": 95,
      "time": 17,
      "truck": 0,
      "motorcycle": 2,
      "bus": 2,
      "total": 108
    },
    {
      "direction": "2",
      "van": 4,
      "tram": 0,
      "car": 63,
      "time": 18,
      "truck": 0,
      "motorcycle": 0,
      "bus": 0,
      "total": 67
    } 
  ]
};

var coordinatesData = [
  {
    measurementPoint: 'A01',
    name: 'LAUTTASAAREN SILTA',
    lon: 24.89961514,
    lat: 60.16238533
  },
  {
    measurementPoint: 'A02',
    name: 'LAPINLAHDEN SILTA',
    lon: 24.90235664,
    lat: 60.16709052
  }
];
