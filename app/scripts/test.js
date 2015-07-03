var App = React.createClass({displayName: "App",
  getInitialState: function() {
    return {
      r: 0,
      g: 0,
      b: 0
    }
  },
  update: function(e) {
    this.setState({
      r: this.refs.red.refs._input___.getDOMNode().value,
      g: this.refs.green.refs._input___.getDOMNode().value,
      b: this.refs.blue.refs._input___.getDOMNode().value
    })
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(Slider, {ref: "red", update: this.update}), 
        React.createElement("label", null, this.state.r), 
        React.createElement(Slider, {ref: "green", update: this.update}), 
        React.createElement("label", null, this.state.g), 
        React.createElement(Slider, {ref: "blue", update: this.update}), 
        React.createElement("label", null, this.state.b)
      )
    );
  }
});

var Slider = React.createClass({displayName: "Slider",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("input", {ref: "_input___", type: "range", min: "0", max: "256", onChange: this.props.update})
      )
    );
  }
})



React.render(React.createElement(App, {data: "borce", number2: 1}), document.body);