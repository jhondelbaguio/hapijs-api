"use strict";

const glob = require("glob");
const path = require("path");
const _ = require("lodash");

const routes = [
	{
		method: "GET",
		path: '/{param*}',
		handler: {
			file: 'src/index.html'
		},
		config: {
			auth: false
		}
	},
	{
		method: "GET",
		path: "/api/v1/ping",
		handler: function(req, res) {
			return res({ success: "pong" });
		},
		config: {
			tags: ["api"],
			auth: false
		}
	},
	{
		method: "GET",
		path: "/api/v1/restricted/ping",
		handler: function(req, res) {
			return res({ success: "pong" });
		},
		config: {
			tags: ["api"]
		}
	}
];

glob.sync("**/routes/*.js").forEach(file => {
	routes.push(require(path.resolve(file)));
});

module.exports = _.flattenDeep(routes);