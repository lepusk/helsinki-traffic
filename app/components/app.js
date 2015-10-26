var React = require('react');
var ReactDOM = require('react-dom');

var _ = require('lodash');
var App = require('./views/app');

var appElement = document.getElementById('app');

ReactDOM.render(<App />, appElement);
