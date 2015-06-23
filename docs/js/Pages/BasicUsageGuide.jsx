import React from "react";
import {PrismCode} from "react-prism";
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
		const demoString1 = 
`<a className="button button-main" onClick={ this.toggleDropdown }>
	click me
	<Popeye
		anchorOrigin={ {"bottom": 0, "left": 8} } 
		popOrigin={ {"top": 0, "right": 8} } 
		opened={ this.state.popover1 } 
		onToggle={ this.toggleDropdown }>
		<div className="yo" style={{backgroundColor: "white", "boxShadow": "0px 0px 8px rgba(0,0,0,0.2)"}}>
			wat asdfjas;dkfja;sdlkfjas;dlkf
		</div>
	</Popeye>
</a>`

		return (
			<article>
				<section>
					<h1>Basic Usage</h1>
					<a className="button button-main" onClick={ this.toggleDropdown }>
						click me
						<Popeye
							anchorOrigin={ {"bottom": 0, "left": 8} } 
							popOrigin={ {"top": 0, "right": 8} } 
							opened={ this.state.popover1 } 
							onToggle={ this.toggleDropdown }>
							<div className="yo" style={{backgroundColor: "white", "boxShadow": "0px 0px 8px rgba(0,0,0,0.2)"}}>
								wat asdfjas;dkfja;sdlkfjas;dlkf
							</div>
						</Popeye>
					</a>
					<PrismCode className="code-block language-jsx">
						{ demoString1 }
					</PrismCode>
					should open a popup
				</section>
			</article>
		)
	}
}