var sass = require("node-sass");
var bourbon = require("node-bourbon")
var fs = require("fs");

var result = sass.renderSync({
  file: "./src/scss/Popeye.scss",
  includePaths: bourbon.includePaths
  // outputStyle: 'compressed'
});

if (result.css) {
	fs.writeFileSync("./lib/css/Popeye.css", result.css);
	console.log("Scss rendering complete");
} else {
	console.log("Error! Scss rendering failed. Result was: ", result);
}
