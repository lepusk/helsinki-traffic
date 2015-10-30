var MeasurementConstants = {
  Actions: {
    SELECT_HOUR: 'measurementconstant_select_hour'
  },
  Map: {
    circleOffSet: 0.0005,
    direction1Color: 'red',
    direction2Color: 'blue',
    cityCenterColor: 'rgb(145,207,96)',
    measurementPointColor: 'black',
    measurementPointFillOpacity: 0.2,
    defaultCircleSize: 150,
    defaultFillOpacity: 0.8,
    cityCenter: {
      lat: 60.17038939,
      lon: 24.94100461
    },
    defaultView: {
      lat: 60.182501529929304,
      lon: 24.90523338317871,
      zoom: 12,
      minZoom: 10,
      maxZoom: 20
    }
  }
};

module.exports = MeasurementConstants;
