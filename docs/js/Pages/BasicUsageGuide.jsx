import React from "react";
import Popeye from "../../../src/js/Popeye";

export default class BasicUsageGuide extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			popover1: false
		}
		this.toggleDropdown = this.toggleDropdown.bind(this);
	}
	toggleDropdown(value) {
		this.setState({"popover1": isFinite(value) ? value : !this.state.popover1})
	}
	render() {
		return (
			<article>
				<h1>Basic Usage</h1>
				<a onClick={ this.toggleDropdown }>
					click me
					<Popeye
						anchorOrigin={{"bottom": 0, "left": 8}} 
						popOrigin={{"top": 0, "right": 8}} 
						opened={ this.state.popover1 } 
						onToggle={ this.toggleDropdown }>
						<div className="yo" style={{backgroundColor: "white", "boxShadow": "0px 0px 8px rgba(0,0,0,0.2)"}}>
							wat asdfjas;dkfja;sdlkfjas;dlkf
						</div>
					</Popeye>
				</a>
				should open a popup
			</article>
		)
	}
}