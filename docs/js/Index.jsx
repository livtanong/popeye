import React from "react";
import PopeyeLogo from "../svg-icons/PopeyeLogo.svg";

export default class Index extends React.Component {
	render() {
		return (
			<div className="Index">
				<section id="hero">
					<div id="logo" className="icon-PopeyeLogo" />
					<div id="display-text">
						<h1>Popeye</h1>
						<h2>A flexible popover library for tooltips, dropdown menus, and others.</h2>
						<code className="installation">
							npm install --save popeye
						</code>
					</div>
				</section>
			</div>
		)
	}
}