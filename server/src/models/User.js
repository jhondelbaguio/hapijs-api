"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");
const config = require("config");

const schema = new Schema(
	{
		email: {
			type: String,
			required: true,
			lowercase: true,
			unique: true
		},
		name: { type: String },
		scope: { type: String, required: true, default: "USER" },
		passwordHash: { type: String },
		confirmed: { type: Boolean, default: false },
		confirmationToken: { type: String, default: "" }
	},
	{
		timestamps: true
	}
);

// Check if the password match
schema.methods.isValidPassword = function isValidPassword (password) {
	return bcrypt.compareSync(password, this.passwordHash)
}

// Set Encrypted Password
schema.methods.setPassword = function setPassword (password) {
	this.passwordHash = bcrypt.hashSync(password, 10)
}

// Generate JWT
schema.methods.generateJWT = function generateJWT () {
	return jwt.sign(
		{
			email: this.email
		},
		config.get('JWT_SECRET'),
		{
			expiresIn: `1d`
		}
	);
};

schema.methods.toAuthJSON = function toAuthJSON () {
	return {
		email: this.email,
		token: this.generateJWT(),
		name: this.name
	};
};

schema.plugin(uniqueValidator, { message: 'That email is already exist' });

module.exports = mongoose.model('User', schema);