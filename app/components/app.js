var React = require('react');
var ReactDOM = require('react-dom');

var _ = require('lodash');
var AppView = require('./views/AppView');

var appElement = document.getElementById('app');

ReactDOM.render(<AppView />, appElement);
