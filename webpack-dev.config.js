var config = require("./webpack-base.config.js");

module.exports = config({
	dev: true,
	prerender: false,
	lib: false
});