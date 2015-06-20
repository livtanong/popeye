import ToolbarStyle from "../scss/Toolbar.scss";

import React from "react";
import {Link} from "react-router";

export default class Toolbar extends React.Component {
	render() {
		return (
			<header className="Toolbar">
				<Link id="brand" to="/">
				  <h1>Popeye <small>v0.0.1</small></h1>
				</Link>
				<div className="spacer" />
				<div className="toolbar-group">
					<Link className="toolbar-item" to="index">Home</Link>
					<Link className="toolbar-item" to="guide">Guide</Link>
					<a className="toolbar-item" href="https://github.com/levitanong/popeye">
            Github
        	</a>
				</div>
			</header>
		)
	}
}