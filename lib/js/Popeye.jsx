require("../scss/Dropdown.scss");

var React = require("react/addons");
var classnames = require("classnames");
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var _ = require("lodash");
var LayeredComponentMixin = require("./LayeredComponentMixin");
var Collapse = require("./Collapse");

var Dropdown = React.createClass({
  propTypes: {
    component: React.PropTypes.string,
    className: React.PropTypes.string,
    opened: React.PropTypes.bool,
    onToggle: React.PropTypes.func,
    anchor: React.PropTypes.object,
    anchorOrigin: React.PropTypes.array,
    dropdownOrigin: React.PropTypes.array,
    offset: React.PropTypes.array,
    transitionEnabled: React.PropTypes.bool
  },
  mixins: [LayeredComponentMixin],
  getDefaultProps: function() {
    return {
      component: "div",
      opened: false,
      anchorOrigin: ["left", "top"],
      dropdownOrigin: ["left", "bottom"],
      offset: [0, 0],
      transitionEnabled: true
    };
  },
  getInitialState: function() {
    return {
      isPropagationStopped: false,
      currentAnchorPos: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: 0,
        width: 0
      }
    };
  },
  _componentDidUpdate: function(prevProps, prevState) {    
    if (this.props.anchor && (this.props.anchor != prevProps.anchor)) {
      this.setState({currentAnchorPos: this.getAnchorPos()})
    }
  },
  getAnchorPos: function(){
    if (this.props.anchor /*&& this.props.anchor.isMounted()*/) {    
      // var domNode = React.findDOMNode(this.props.anchor);
      var domNode = this.props.anchor;
      var pos = domNode.getBoundingClientRect();
      var clonePos = {};
      clonePos.top = pos.top;
      clonePos.bottom = document.body.offsetHeight - pos.bottom;
      clonePos.left = Math.max(pos.left, 0);
      clonePos.right = document.body.offsetWidth - pos.right;
      clonePos.height = pos.height;
      clonePos.width = pos.width;

      return clonePos;
    } else {
      return {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: 0,
        width: 0
      }
    }
  },
  getCorrectedAnchorPos: function(){
    return _.zip(this.props.anchorOrigin, this.props.offset).map(function(anchor){
      return this.state.currentAnchorPos[anchor[0]] + anchor[1];
    }, this);
  },
  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.opened && !prevProps.opened) {
      document.addEventListener('click', this.handleBodyClick);
    } else if (!this.props.opened && prevProps.opened) {
      document.removeEventListener('click', this.handleBodyClick);
    }
  },
  handleBodyClick: function(){
    this.props.onToggle(false); // intent is to close
  },
  clickHandler: function(e){
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  },
  getTransformOrigin: function(){
    var center = {
      "x": this.state.currentAnchorPos.width / 2,
      "y": this.state.currentAnchorPos.height / 2
    }

    return this.props.dropdownOrigin.map(function(loc){
      var a = {
        "top": (center.y - this.props.offset[1]) + "px",
        "left": (center.x - this.props.offset[0]) +  "px",
        "right": "calc(100% - " + (center.x - this.props.offset[0]) + "px)",
        "bottom": "calc(100% - " + (center.y - this.props.offset[1]) + "px)"
      }
      return a[loc];
    }, this).join(" ");
  },
  renderLayer: function(){ 
    // var child;
    // var styleObject = {};
 
    var getCorrectedAnchorPos = this.getCorrectedAnchorPos();

    var styleObject = _.zipObject(this.props.dropdownOrigin, getCorrectedAnchorPos);
    var child = React.cloneElement(React.Children.only(this.props.children), {
      style: {
        "transformOrigin": this.getTransformOrigin(),
        "WebkitTransformOrigin": this.getTransformOrigin()
      }
    });

    return (
      <ReactCSSTransitionGroup 
        component={ this.props.component }
        style={ styleObject } 
        onClick={ this.clickHandler } 
        className={ classnames("Dropdown", this.props.className) }
        transitionName="DropdownTransition"
        transitionEnter={ this.props.transitionEnabled }
        transitionLeave={ this.props.transitionEnabled }>
        { this.props.opened && child }
      </ReactCSSTransitionGroup>
    )
  },
  render: function() {
    return <div />
  }
});

module.exports = Dropdown;