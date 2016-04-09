import React from "react";
import ReactDOM from "react-dom"

export default class LayeredComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  init() {
    // not automatically called by constructor, so that descendant of LayeredComponent can call this AFTER doing initial state stuff.
    if (typeof document !== "undefined") {        
      this._layer = document.createElement("div");
      document.body.appendChild(this._layer);
      this._renderLayer();
    } 
  }
  componentDidUpdate(prevProps, prevState) {
    this._renderLayer();
  }
  componentWillUnmount() {
    this._unrenderLayer();
    if (typeof document !== "undefined") {  
      document.body.removeChild(this._layer);
    }
  }
  _renderLayer() {
    let layerElement = this.renderLayer();
    if (layerElement === null) {
      ReactDOM.render(<noscript />, this._layer);
    } else {
      ReactDOM.render(layerElement, this._layer);
    }

    if (this.layerDidMount) {
      this.layerDidMount(this._layer);
    }
  }
  _unrenderLayer() {
    if (this.layerWillUnmount) {
      this.layerWillUnmount(this._layer);
    }
    ReactDOM.unmountComponentAtNode(this._layer);
  }
}