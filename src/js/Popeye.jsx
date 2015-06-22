import PopeyeStyles from "../scss/Popeye.scss";

import React from "react/addons";
import _ from "lodash";
import classnames from "classnames";
import LayeredComponent from "./LayeredComponent";

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class Dropdown extends LayeredComponent {
  constructor(props) {
    super(props);
    this.renderLayer = this.renderLayer.bind(this);
    this.getAnchorPos = this.getAnchorPos.bind(this);
    this.getCorrectedAnchorPos = this.getCorrectedAnchorPos.bind(this);
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.getTransformOrigin = this.getTransformOrigin.bind(this);

    this.state = {
      isPropagationStopped: false,
      currentAnchorPos: this.getAnchorPos()
    };
    super.init();
  }
  componentDidUpdate(prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState);
    if (this.props.anchor && (this.props.anchor != prevProps.anchor)) {
      this.setState({currentAnchorPos: this.getAnchorPos()})
    }
    // not sure about this
    if ((typeof document != "undefined") && this.props.opened && !prevProps.opened) {
      document.addEventListener('click', this.handleBodyClick);
    } else if (!this.props.opened && prevProps.opened) {
      document.removeEventListener('click', this.handleBodyClick);
    }
  }
  getAnchorPos() {
    if ((typeof document != "undefined") && this.props.anchor /*&& this.props.anchor.isMounted()*/) {    

      var pos = this.props.anchor.getBoundingClientRect();
      // console.log(pos);
      var clonePos = {};
      clonePos.top = pos.top;
      // clonePos.bottom = document.body.offsetHeight - pos.bottom;
      clonePos.bottom = pos.bottom;
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
  }
  getCorrectedAnchorPos() { 
    return _.zip(this.props.anchorOrigin, this.props.offset).map(function(anchor){
      return this.state.currentAnchorPos[anchor[0]] + anchor[1];
    }, this);
  }
  handleBodyClick() {
    this.props.onToggle(false); // intent is to close
  }
  clickHandler() {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }
  getTransformOrigin() { 
    var center = {
      "x": this.state.currentAnchorPos.width / 2,
      "y": this.state.currentAnchorPos.height / 2
    }

    let originObj = _.chain(this.props.dropdownOrigin)
      .map(function(loc){
        var a = {
          "top": (center.y - this.props.offset[0]) + "px",
          "left": (center.x - this.props.offset[1]) +  "px",
          "right": "calc(100% - " + (center.x - this.props.offset[1]) + "px)",
          "bottom": "calc(100% - " + (center.y - this.props.offset[0]) + "px)"
        }
        var b = {"left": "x","right": "x","top": "y","bottom": "y"};
        return [b[loc], a[loc]];
      }, this)
      .zipObject()
      .value();
    return ["x", "y"].map((axis) => originObj[axis]).join(" ");
  }
  renderLayer() {
    var getCorrectedAnchorPos = this.getCorrectedAnchorPos();
    var transformOrigin = this.getTransformOrigin();
    var styleObject = _.zipObject(this.props.dropdownOrigin, getCorrectedAnchorPos);
    var childElement = React.Children.only(this.props.children);
    var mergedStyles = _.assign(_.clone(childElement.props.style), {
      "transformOrigin": transformOrigin,
      "WebkitTransformOrigin": transformOrigin
    });
    var child = React.cloneElement(childElement, _.assign(_.clone(childElement.props), {style: mergedStyles}));

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
  }
  render() {
    return <div />
  }
}

Dropdown.defaultProps = {
  component: "div",
  opened: false,
  anchorOrigin: ["left", "top"],
  dropdownOrigin: ["left", "bottom"],
  offset: [0, 0],
  transitionEnabled: true
}
Dropdown.propTypes = {
  component: React.PropTypes.string,
  className: React.PropTypes.string,
  opened: React.PropTypes.bool,
  onToggle: React.PropTypes.func,
  anchor: React.PropTypes.object,
  anchorOrigin: React.PropTypes.array,
  dropdownOrigin: React.PropTypes.array,
  offset: React.PropTypes.array,
  transitionEnabled: React.PropTypes.bool
}
