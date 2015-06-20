import React from "react";
import Router, {DefaultRoute, Link, Route, RouteHandler} from "react-router";
import Index from "./Index";
import Wrapper from "./Wrapper";
import Guide from "./Pages/Guide";

let Routes = (
	<Route path="/" handler={ Wrapper }>
		<Route name="guide" path="guide/" handler={ Guide } />
		<DefaultRoute name="index" handler={ Index } />
	</Route>
)

let PopeyeRouter = Router.create({
	routes: Routes
});

if (typeof document !== "undefined") {
	Router.run(Routes, Router.HistoryLocation, Handler => {
		React.render(<Handler />, document);
	})
}

export default function render (locals, callback) {
	Router.run(Routes, locals.path, Handler => {
		let html = React.renderToString(<Handler />);
    callback(null, "<!DOCTYPE html>" + html);
  });
}