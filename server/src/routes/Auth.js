"use strict";

const Joi = require("joi");
const { AuthController } = require("../controllers");
const Routes = [];

Routes.push({
	method: "POST",
	path: "/api/v1/auth/login",
	config: {
		handler: AuthController.login,
		auth: false,
		tags: ["api"],
		validate: {
			failAction: (req, res, source, error) => {
				res({ errors: { global: "Unwanted Parameters Found" } }).code(
					500
				);
			},
			payload: Joi.object({
				data: {
					email: Joi.string().required(),
					password: Joi.string().required()
				}
			})
		},
		response: {
			schema: Joi.object({
				user: {
					token: Joi.string().required(),
					email: Joi.string().required(),
					name: Joi.string().required()
				}
			})
		}
	}
});

module.exports = Routes;