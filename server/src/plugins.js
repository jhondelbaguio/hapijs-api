"use strict";

const Inert = require("inert");
const Vision = require("vision");
const Jwt = require("hapi-auth-jwt2");
const HapiSwagger = require("hapi-swagger");
const Good = require("good");
const config = require("config");

const Package = require("../package.json");

const DEVELOPMENT = "development";

let plugins = [Inert, Jwt, Vision];

if (config.util.getEnv("NODE_ENV") === DEVELOPMENT) {
	plugins.push(
		{
			register: Good,
			options: {
				reporters: {
					console: [
						{
							module: "good-console"
						},
						"stdout"
					]
				}
			}
		},
		{
			register: HapiSwagger,
			options: {
				info: {
					title: "API Documentation",
					version: Package.version
				},
				pathPrefixSize: 4
			}
		}
	);
}

module.exports = plugins;