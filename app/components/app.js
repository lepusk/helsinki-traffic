var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var appElement = document.getElementById('app');

var App = React.createClass({
  render: function() {
    return (
      <div className="content">
        Content goes here
      </div>
    );
  }
});

ReactDOM.render(<App />, appElement);
