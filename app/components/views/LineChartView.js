var React = require('react');
var _ = require('lodash');

var LineChartView = React.createClass({
  render: function() {
    return (
      <div className={this.props.chartId}></div>
    );
  },

  componentDidMount: function() {
    createScatterPlot({
      data: this.props.graphData,
      selector: '.' + this.props.chartId,
      fillColor: this.props.color,
      selectedValue: this.props.selectedValue,
      maxValue: this.props.maxValue
    });
  }
});

module.exports = LineChartView;

var width = 600;
var height = 400;
var padding = 80;
var axisPadding = padding - 10;
var ticks = 5;
var plotRadius = 3;
var selectedValuePlotRadius = 6;

var lineStrokeWidth = 2;

function createScatterPlot(args) {
  var data = args.data;
  var selector = args.selector;
  var fillColor = args.fillColor;
  var selectedValue = args.selectedValue;
  var maxValue = args.maxValue;

  var svg = createSvg(selector);
  var xScaler = getDimensionsAndCreateXScaler(data);
  var yScaler = getDimensionsAndCreateYScaler(data, maxValue);
  var getXValue = function(datum, index) {
    return xScaler(datum.x);
  };

  var getYValue = function(datum, index) {
    return yScaler(datum.y);
  };

  var getFill = function(datum, index) {
    return datum.x === selectedValue ? 'white' : fillColor;
  };

  var getPlotRadius = function(datum, index) {
    return datum.x === selectedValue ? selectedValuePlotRadius : plotRadius;
  };

  var getStroke = function(datum, index) {
    return datum.x === selectedValue ? fillColor : null;
  };

  svg.append('g').call(createAxis(xScaler, 'bottom', ticks))
                  .attr(createXAxisAttr(height, axisPadding));
  svg.append('g').call(createAxis(yScaler, 'left', ticks))
                  .attr(createYAxisAttr(axisPadding));

  var line = d3.svg.line()
               .x(getXValue)
               .y(getYValue);
  svg.append('svg:path')
     .attr('d', line(data))
     .attr('stroke', fillColor)
     .attr('stroke-width', lineStrokeWidth)
     .attr('fill', 'none');

  svg.selectAll('circle')
     .data(data)
     .enter()
     .append('circle')
     .attr({
       cx: getXValue,
       cy: getYValue,
       r: getPlotRadius,
       fill: getFill,
       stroke: getStroke,
       'stroke-width': lineStrokeWidth
     });
}

function getDimensionsAndCreateYScaler(data, maxValue) {
  var yScaler = createYScaler(0, maxValue, height, padding);
  return yScaler;
}

function getDimensionsAndCreateXScaler(data) {
  var minX = getMinX(data);
  var maxX = getMaxX(data);
  var xScaler = createXScaler(minX, maxX, width, padding);
  return xScaler;
}

function createSvg(selector) {
  var viewBox = createViewBox();
  var svg = d3.select(selector)
              .append('svg')
              .attr({
                viewBox: viewBox
              });
  return svg;
}

function createViewBox() {
  return "0 0 " + width + " " + height;
}

function createAxis(scaler, orient, ticks) {
  return d3.svg.axis().scale(scaler).orient(orient).ticks(ticks);
}

function createXAxisAttr(graphHeight, padding) {
  return {
    'class': 'graph-axis',
    transform: 'translate(0, ' + (graphHeight - padding) + ')'
  }
}

function createYAxisAttr(padding) {
  return {
    'class': 'graph-axis',
    transform: 'translate(' + padding + ', 0)'
  }
}

function createXScaler(min, max, graphWidth, padding) {
  return d3.scale
          .linear()
          .domain([min, max])
          .range([0 + padding, graphWidth - padding]);
}

function createYScaler(min, max, graphHeight, padding) {
  return d3.scale
          .linear()
          .domain([min, max])
          .range([graphHeight - padding, padding]);
}

function getMinY(data) {
  if (_.isEmpty(data)) {
    return null;
  }
  return _.min(data, 'y').y;
}

function getMaxY(data) {
  if (_.isEmpty(data)) {
    return null;
  };
  return _.max(data, 'y').y;
}

function getMinX(data) {
  if (_.isEmpty(data)) {
    return null;
  }
  return _.min(data, 'x').x;
}

function getMaxX(data) {
  if (_.isEmpty(data)) {
    return null;
  };
  return _.max(data, 'x').x;
}
