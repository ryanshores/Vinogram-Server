require('dotenv').load();
const jwt = require('jsonwebtoken');

// make sure user is logged int - Authentication
exports.loginRequired = function(req, res, next) {
	try {
		// Bearer
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
			if (decoded) {
				return next();
			} else {
				return next({
					status: 401,
					message: 'Please login first'
				});
			}
		});
	} catch (error) {
		return next({
			status: 401,
			message: 'Please login first'
		});
	}
};

// we have the correct user - Authorization
exports.ensureCorrectUser = function(req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
			if (decoded && decoded.id === req.params.id) {
				return next();
			} else {
				return next({
					status: 401,
					message: 'Unauthorized'
				});
			}
		});

	} catch (error) {
		return next({
			status: 401,
			message: 'Unauthorized'
		});
	}
};