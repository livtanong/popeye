import React from "react";
import _ from "lodash";
import Popeye from "../../../src/js/Popeye";
import {RouteHandler, Link} from "react-router";


export default class Guide extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="split-pane">
				<div className="sidebar table-of-contents">
					<ul>
						<li><Link to="basicUsage">Basic Usage</Link></li>
						<li><Link to="other">Other</Link></li>
					</ul>
				</div>
				<div className="main">
					<RouteHandler />
				</div>
			</div>
		)
	}
}