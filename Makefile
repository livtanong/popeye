all: development

deps: 
	@npm install

development: deps
	webpack-dev-server --config webpack-prerender.config.js --progress --colors --host 0.0.0.0 --content-base . --port 8090