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
		opened={ this.state.popover1 } 
		onToggle={ this.toggleDropdown }>
		<div className="dropdown">
			Aye aye, Captain!
		</div>
	</Popeye>
</a>`

		return (
			<article>
				<section>
					<h1>Basic Usage</h1>
					<h2>The Simplest Use Case</h2>
					<p>
						Simply place <code>Popeye</code> inside the element you wish to anchor it to. In the example below, we're placing <code>Popeye</code> inside the button that causes it to open.
					</p>
					<p>
						<code>Popeye</code> can wrap any element: in this case, a <code>{`<div className="dropdown">`}</code>.
					</p>

					<a className="button button-main" onClick={ this.toggleDropdown }>
						click me
						<Popeye
							opened={ this.state.popover1 } 
							onToggle={ this.toggleDropdown }>
							<div className="dropdown">
								Aye aye, Captain!
							</div>
						</Popeye>
					</a>
					<PrismCode className="code-block language-jsx">
						{ demoString1 }
					</PrismCode>
				</section>
				<section>
					<h2>Offsets</h2>
					<p>
						Sometimes, we want to move <code>Popeye</code> around relative to the anchor.
					</p>
				</section>
			</article>
		)
	}
}