var MeasurementConstants = {
  Actions: {
    SELECT_HOUR: 'measurementconstant_select_hour',
    SELECT_MEASUREMENT_POINT: 'measurementconstant_select_measurement_point',
    UNSELECT_MEASUREMENT_POINT: 'measurementconstant_unselect_measurement_point'
  },
  Map: {
    circleOffSet: 0.0005,
    direction1Color: '#5d6c8c',
    direction2Color: '#e77c4c',
    cityCenterColor: '#9ab5d9',
    measurementPointColor: '#859C7E',
    measurementPointFillOpacity: 0.3,
    defaultCircleSize: 150,
    cityCenterCircleSize: 75,
    defaultFillOpacity: 1,
    cityCenter: {
      lat: 60.17038939,
      lon: 24.94100461
    },
    defaultView: {
      lat: 60.182501529929304,
      lon: 24.94100461,
      zoom: 13,
      minZoom: 10,
      maxZoom: 20
    }
  }
};

module.exports = MeasurementConstants;
