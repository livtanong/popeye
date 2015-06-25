import React from "react";
import {PrismCode} from "react-prism";
import Popeye from "../../../src/js/Popeye";

export default class BasicUsageGuide extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			popover1: false,
			popover2: false
		}
	}
	render() {
		const demoString1 = 
`<a className="button button-main" onClick={ Popeye.toggleHandler(this, "popover1") }>
	click me
	<Popeye
		opened={ this.state.popover1 } 
		onToggle={ Popeye.toggleHandler(this, "popover1") }>
		<div className="dropdown">
			Aye aye, Captain!
		</div>
	</Popeye>
</a>`

		const demoString2 = 
`<a className="button button-main" onClick={ this.toggleDropdown }>
	click me
	<Popeye
		anchorOffset={ {left: 0, bottom: -16} }
		opened={ this.state.popover2 } 
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
					<p>There are three things you have to note: Where we place <code>Popeye</code>, what we place inside it, and the function we pass to open and close it.</p>
					<ol>
						<li>
							<p>We Simply place <code>Popeye</code> inside the element you wish to anchor it to. In the example below, we're placing <code>Popeye</code> inside the button that causes it to open.</p>
						</li>
						<li>
							<p><code>Popeye</code> can wrap any element: in this case, a <code>{`<div className="dropdown">`}</code>.</p>
						</li>
						<li>
							<p>You can implement your own toggleHandler, but Popeye comes with one designed to handle multiple instances of <code>Popeye</code>. <code>Popeye.toggleHandler</code> is a method that takes a context and a popover name, and returns a function. See the API docs for this for more information. Generally, you should use <code>this</code> for the context argument.</p>
						</li>
					</ol>
					<div className="example">
						<a className="button button-main" onClick={ Popeye.toggleHandler(this, "popover1") }>
							click me
							<Popeye
								opened={ this.state.popover1 } 
								onToggle={ Popeye.toggleHandler(this, "popover1") }>
								<div className="dropdown">
									Aye aye, Captain!
								</div>
							</Popeye>
						</a>
					</div>
					<PrismCode className="code-block language-jsx">
						{ demoString1 }
					</PrismCode>
				</section>
			</article>
		)
	}
}