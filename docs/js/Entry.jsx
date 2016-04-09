import React from "react";
import ReactDOM from "react-dom";
import Router, {DefaultRoute, Link, Route, RouteHandler} from "react-router";
import Index from "./Index";
import Wrapper from "./Wrapper";
import Guide from "./Pages/Guide";

import BasicUsageGuide from "./Pages/BasicUsageGuide";
import OffsetGuide from "./Pages/OffsetGuide";

let Routes = (
	<Route path="/" handler={ Wrapper }>
		<Route name="guide" path="guide/" handler={ Guide }>
			<Route name="basicUsage" path="basic-usage/" handler={ BasicUsageGuide } />
			<Route name="offset" path="offset/" handler={ OffsetGuide } />
			<DefaultRoute handler={ BasicUsageGuide } />
		</Route>
		<DefaultRoute name="index" handler={ Index } />
	</Route>
)

let PopeyeRouter = Router.create({
	routes: Routes
});

if (typeof document !== "undefined") {
	Router.run(Routes, Router.HistoryLocation, Handler => {
		ReactDOM.render(<Handler />, document);
	})
}

export default function render (locals, callback) {
	Router.run(Routes, locals.path, Handler => {
		let html = React.renderToString(<Handler />);
    callback(null, "<!DOCTYPE html>" + html);
  });
}