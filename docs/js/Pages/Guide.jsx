import React from "react";
import Popeye from "../../../src/js/Popeye";

export default class Guide extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dropdowns: {
				popup1: false
			},
			anchors: {
				anchor1: undefined
			}
		}
	}
	toggleDropdown(dropdown, dropdownAnchor, value) {
	  var dropdowns = this.state.dropdowns;
	  var anchors = this.state.anchors;
	  dropdowns[dropdown] = isFinite(value) ? value : !this.state.dropdowns[dropdown];
	  anchors[dropdownAnchor] = React.findDOMNode(this.refs[dropdownAnchor]);
	  this.setState({dropdowns: dropdowns, anchors: anchors});
	}
	render() {
		return (
			<div>
				<a ref="anchor1" onClick={ this.toggleDropdown.bind(this, "popup1", "anchor1") }>click me</a>
				<Popeye
					anchorOrigin={["left", "bottom"]} 
					dropdownOrigin={["left", "top"]} 
					offset={[8, 0]} 
					anchor={ this.state.anchors.anchor1 } 
					opened={ this.state.dropdowns.popup1 } 
					onToggle={ this.toggleDropdown.bind(this, "popup1", "anchor1") }>
					<div className="yo" style={{backgroundColor: "white"}}>
						wat asdfjas;dkfja;sdlkfjas;dlkf
					</div>
				</Popeye>
				should open a popup
			</div>
		)
	}
}