"use strict";

const Hapi = require("hapi");

/*Intialize Environment Files and Config Module*/
const dotenv = require("dotenv");
dotenv.config();
const config = require("config");

const logger = require("./utils/logger");
const { jwtValidation } = require("./utils/auth");
const routes = require("./routes");
const plugins = require("./plugins");

const fs = require("fs");
if (!fs.existsSync(config.get("UPLOAD_PATH")))
	fs.mkdirSync(config.get("UPLOAD_PATH"));

const server = new Hapi.Server();

server.connection({
	port: config.get("app.port"),
	routes: {
		cors: true
	}
});

// register plugins
const registerPlugins = async () => {
	try {
		await server.register(plugins);
	} catch (error) {
		logger.error(error, "Failed to register hapi plugins");
		throw error;
	}
};

registerPlugins();

// Serve Routes for API
server.route(routes);

server.auth.strategy("jwt", "jwt", true, {
	key: config.get("JWT_SECRET"),
	validateFunc: jwtValidation,
	verifyOptions: { algorithms: ["HS256"] }
});

// export modules
module.exports = server;