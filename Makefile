all: development

deps: 
	@npm install

development: deps
	./node_modules/.bin/webpack-dev-server --config webpack-prerender.config.js --progress --colors --host 0.0.0.0 --content-base ./build --port 8090

prerender: deps
	./node_modules/.bin/webpack --config webpack-prerender.config.js --progress --colors

lib: deps
	npm run build:lib
