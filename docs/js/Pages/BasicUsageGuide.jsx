import React from "react";
import Popeye from "../../../src/js/Popeye";

export default class BasicUsageGuide extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			popover1: false,
			anchor1: undefined
		}
	}
	componentDidMount() {
		this.setState({
			anchor1: React.findDOMNode(this.refs.anchor1)
		});
	}
	toggleDropdown(dropdownKey, value) {
		let stateUpdate = {};
		stateUpdate[dropdownKey] = isFinite(value) ? value : !this.state[dropdownKey];
		this.setState(stateUpdate);
	}
	render() {
		return (
			<article>
				<h1>Basic Usage</h1>
				<a ref="anchor1" onClick={ this.toggleDropdown.bind(this, "popover1") }>click me</a>
				<Popeye
					anchorOrigin={{"top": 8, "left": 8}} 
					dropdownOrigin={{"top": 8, "left": 8}} 
					anchor={ this.state.anchor1 } 
					opened={ this.state.popover1 } 
					onToggle={ this.toggleDropdown.bind(this, "popover1") }>
					<div className="yo" style={{backgroundColor: "white", "boxShadow": "0px 0px 8px rgba(0,0,0,0.2)"}}>
						wat asdfjas;dkfja;sdlkfjas;dlkf
					</div>
				</Popeye>
				should open a popup
			</article>
		)
	}
}