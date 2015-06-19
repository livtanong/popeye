var config = require("./webpack-base.config.js");

module.exports = config({
	prerender: true,
	lib: false
});