'use strict'

const jwtValidation = (decoded, request, cb) => {
	// add yours checks here i.e. is the user valid
	if (decoded.email) {
		return cb(null, true, decoded)
	}
	return cb(null, false)
}

module.exports = {
	jwtValidation
}
