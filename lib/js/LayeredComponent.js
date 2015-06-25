"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var LayeredComponent = (function (_React$Component) {
  function LayeredComponent(props) {
    _classCallCheck(this, LayeredComponent);

    _get(Object.getPrototypeOf(LayeredComponent.prototype), "constructor", this).call(this, props);
  }

  _inherits(LayeredComponent, _React$Component);

  _createClass(LayeredComponent, [{
    key: "init",
    value: function init() {
      // not automatically called by constructor, so that descendant of LayeredComponent can call this AFTER doing initial state stuff.
      if (typeof document !== "undefined") {
        this._layer = document.createElement("div");
        document.body.appendChild(this._layer);
        this._renderLayer();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      this._renderLayer();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._unrenderLayer();
      if (typeof document !== "undefined") {
        document.body.removeChild(this._layer);
      }
    }
  }, {
    key: "_renderLayer",
    value: function _renderLayer() {
      var layerElement = this.renderLayer();
      if (layerElement === null) {
        _react2["default"].render(_react2["default"].createElement("noscript", null), this._layer);
      } else {
        _react2["default"].render(layerElement, this._layer);
      }

      if (this.layerDidMount) {
        this.layerDidMount(this._layer);
      }
    }
  }, {
    key: "_unrenderLayer",
    value: function _unrenderLayer() {
      if (this.layerWillUnmount) {
        this.layerWillUnmount(this._layer);
      }
      _react2["default"].unmountComponentAtNode(this._layer);
    }
  }]);

  return LayeredComponent;
})(_react2["default"].Component);

exports["default"] = LayeredComponent;
module.exports = exports["default"];