"use strict";

const User = require("../models/User");

const login = (req, res) => {
	const { email, password } = req.payload.data;

	User.findOne({ email }).then(user => {
		if (user && user.isValidPassword(password)) {

			return res({user: user.toAuthJSON()})

		} else {
			return res({ errors: { global: "Invalid Credentials" } }).code(400);
		}
	});
};

module.exports = {
	login
};