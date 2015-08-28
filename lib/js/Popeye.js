"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _reactAddons = require("react/addons");

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _LayeredComponent2 = require("./LayeredComponent");

var _LayeredComponent3 = _interopRequireDefault(_LayeredComponent2);

var ReactCSSTransitionGroup = _reactAddons2["default"].addons.CSSTransitionGroup;

var Popeye = (function (_LayeredComponent) {
  function Popeye(props) {
    _classCallCheck(this, Popeye);

    _get(Object.getPrototypeOf(Popeye.prototype), "constructor", this).call(this, props);
    this.renderLayer = this.renderLayer.bind(this);
    this.getAnchorPoint = this.getAnchorPoint.bind(this);
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.getTransformOrigin = this.getTransformOrigin.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);

    this.state = {
      isPropagationStopped: false,
      currentAnchorPos: {}
    };
  }

  _inherits(Popeye, _LayeredComponent);

  _createClass(Popeye, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({ currentAnchorPos: this.getAnchorPoint() });
      _get(Object.getPrototypeOf(Popeye.prototype), "init", this).call(this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _get(Object.getPrototypeOf(Popeye.prototype), "componentWillUnmount", this).call(this);
      this.props.onToggle(false);
      document.removeEventListener("click", this.handleBodyClick);
      window.removeEventListener("mousewheel", this.scrollHandler);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      _get(Object.getPrototypeOf(Popeye.prototype), "componentDidUpdate", this).call(this, prevProps, prevState);

      if (this.props.opened !== prevProps.opened) {
        this.setState({ currentAnchorPos: this.getAnchorPoint() });
      }
      // not sure about this
      if (typeof document !== "undefined" && this.props.opened && !prevProps.opened) {
        document.addEventListener("click", this.handleBodyClick);
        window.addEventListener("mousewheel", this.scrollHandler);
      } else if (!this.props.opened && prevProps.opened) {
        document.removeEventListener("click", this.handleBodyClick);
        window.removeEventListener("mousewheel", this.scrollHandler);
      }
    }
  }, {
    key: "scrollHandler",
    value: function scrollHandler(event) {
      console.log("scrolling");
    }
  }, {
    key: "dirToAxis",
    value: function dirToAxis(key) {
      return ({ "left": "x", "right": "x", "top": "y", "bottom": "y" })[key];
    }
  }, {
    key: "oppositeDir",
    value: function oppositeDir(key) {
      return ({ "left": "right", "right": "left", "top": "bottom", "bottom": "top" })[key];
    }
  }, {
    key: "getAnchorPoint",
    value: function getAnchorPoint() {
      var _this = this;

      if (typeof document != "undefined") {
        var _ret = (function () {
          var anchor = _this.props.anchor || _reactAddons2["default"].findDOMNode(_this).parentNode;
          var pos = anchor.getBoundingClientRect();
          var anchorOffset = _lodash2["default"].isFunction(_this.props.anchorOffset) ? _this.props.anchorOffset(anchor, _reactAddons2["default"].findDOMNode(_this)) : _this.props.anchorOffset;

          var point = _lodash2["default"].chain(_lodash2["default"].pick(pos, _lodash2["default"].keys(anchorOffset))).mapValues(function (value, key) {
            var scrollProp = _this.dirToAxis(key) === "x" ? "scrollLeft" : "scrollTop";
            return value + document.body[scrollProp] + anchorOffset[key] * (key === "right" || key === "bottom" ? -1 : 1);
          }).mapKeys(function (value, key) {
            return _this.dirToAxis(key);
          }).value();

          return {
            v: _lodash2["default"].chain(_this.props.popOffset).mapValues(function (value, key) {
              var pos = point[_this.dirToAxis(key)];
              if (key === "right") {
                return document.body.offsetWidth - pos;
              } else if (key === "bottom") {
                return document.body.offsetHeight - pos;
              } else {
                return pos;
              }
            }).mapKeys(function (value, key) {
              return _this.dirToAxis(key);
            }).value()
          };
        })();

        if (typeof _ret === "object") return _ret.v;
      } else {
        return {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        };
      }
    }
  }, {
    key: "handleBodyClick",
    value: function handleBodyClick() {
      this.props.onToggle(false); // intent is to close
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }
  }, {
    key: "getTransformOrigin",
    value: function getTransformOrigin() {
      var _this2 = this;

      var originObj = _lodash2["default"].chain(this.props.popOffset).mapValues(function (value, key) {
        if (key === "top" || key === "left") {
          return value + "px";
        } else if (key === "right" || key === "bottom") {
          return "calc(100% - " + value + "px)";
        }
      }).mapKeys(function (value, key) {
        return _this2.dirToAxis(key);
      }).value();
      return ["x", "y"].map(function (axis) {
        return originObj[axis];
      }).join(" ");
    }
  }, {
    key: "renderLayer",
    value: function renderLayer() {
      var _this3 = this;

      var transformOrigin = this.getTransformOrigin();
      var styleObject = _lodash2["default"].mapValues(this.props.popOffset, function (value, key) {
        return _this3.state.currentAnchorPos[_this3.dirToAxis(key)] - value;
      });

      var childElement = _reactAddons2["default"].Children.only(this.props.children);
      var mergedStyles = _lodash2["default"].assign(_lodash2["default"].clone(childElement.props.style || {}), {
        "transformOrigin": transformOrigin,
        "WebkitTransformOrigin": transformOrigin
      });
      var child = _reactAddons2["default"].cloneElement(childElement, _lodash2["default"].assign(_lodash2["default"].clone(childElement.props), { style: mergedStyles }));

      return _reactAddons2["default"].createElement(
        ReactCSSTransitionGroup,
        {
          component: this.props.component,
          style: styleObject,
          onClick: this.clickHandler,
          className: (0, _classnames2["default"])("PopeyeElement", this.props.className),
          transitionName: "PopeyeTransition",
          transitionEnter: this.props.transitionEnabled,
          transitionLeave: this.props.transitionEnabled },
        this.props.opened && child
      );
    }
  }, {
    key: "render",
    value: function render() {
      return _reactAddons2["default"].createElement("div", { className: "Popeye" });
    }
  }], [{
    key: "toggleHandler",
    value: function toggleHandler(context, popeyeName) {
      return function (value) {
        return context.setState(_defineProperty({}, popeyeName, isFinite(value) ? value : !context.state[popeyeName]));
      };
    }
  }]);

  return Popeye;
})(_LayeredComponent3["default"]);

exports["default"] = Popeye;

Popeye.defaultProps = {
  component: "div",
  opened: false,
  anchorOffset: { "left": 0, "bottom": 0 },
  popOffset: { "left": 0, "top": 0 },
  transitionEnabled: true
};
Popeye.propTypes = {
  component: _reactAddons2["default"].PropTypes.string,
  className: _reactAddons2["default"].PropTypes.string,
  opened: _reactAddons2["default"].PropTypes.bool,
  onToggle: _reactAddons2["default"].PropTypes.func,
  anchor: _reactAddons2["default"].PropTypes.object, // domNode
  anchorOffset: _reactAddons2["default"].PropTypes.oneOfType([_reactAddons2["default"].PropTypes.object, _reactAddons2["default"].PropTypes.func]),
  popOffset: _reactAddons2["default"].PropTypes.oneOfType([_reactAddons2["default"].PropTypes.object, _reactAddons2["default"].PropTypes.func]),
  transitionEnabled: _reactAddons2["default"].PropTypes.bool
};
module.exports = exports["default"];