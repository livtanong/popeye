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
  dirToAxis(key) {
    return {"left": "x", "right": "x", "top": "y", "bottom": "y"}[key];
  }
  oppositeDir(key) {
    return {"left": "right", "right": "left", "top": "bottom", "bottom": "top"}[key];
  }
  getAnchorPos() {
    if ((typeof document != "undefined") && this.props.anchor /*&& this.props.anchor.isMounted()*/) {    

      let pos = this.props.anchor.getBoundingClientRect();
      // console.log(pos);
      let clonePos = {};
      clonePos.top = pos.top;
      clonePos.bottom = document.body.offsetHeight - pos.bottom;
      // clonePos.bottom = pos.bottom;
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
    return _.chain(this.props.dropdownOrigin) // because everything should be based on this.
      .mapValues((value, key) => {
        if (_.has(this.props.anchorOrigin, key)) {
          return this.state.currentAnchorPos[key] + this.props.anchorOrigin[key];
        } else {
          let oppositeDir = this.oppositeDir(key);
          let breadth = this.dirToAxis(key) === "x" ? "width" : "height";
          return this.state.currentAnchorPos[key] + this.state.currentAnchorPos[breadth] - this.props.anchorOrigin[oppositeDir];
        }
      })
      .mapKeys((value, key) => this.dirToAxis(key))
      .value();
  }
  handleBodyClick() {
    this.props.onToggle(false); // intent is to close
  }
  clickHandler() {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }
  getTransformOrigin() { 
    let originObj = _.chain(this.props.dropdownOrigin)
      .mapValues((value, key) => {
        if (key === "top" || key === "left") {
          return value + "px"
        } else if (key === "right" || key === "bottom") {
          return `calc(100% - ${value}px)`
        }
      })
      .mapKeys((value, key) => this.dirToAxis(key))
      .value();
    return ["x", "y"].map((axis) => originObj[axis]).join(" ");
  }
  renderLayer() {
    var correctedAnchorPos = this.getCorrectedAnchorPos();
    var transformOrigin = this.getTransformOrigin();
    var styleObject = _.mapValues(this.props.dropdownOrigin, (value, key) => {
      return correctedAnchorPos[this.dirToAxis(key)] - value
    })
    // console.log(styleObject);
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
  anchor: React.PropTypes.object, // domNode
  anchorOrigin: React.PropTypes.object,
  dropdownOrigin: React.PropTypes.object,
  transitionEnabled: React.PropTypes.bool
}
