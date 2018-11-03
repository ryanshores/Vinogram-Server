const handleError = (error, req, res, next) => {
	res.status(error.status >= 100 && error.status < 600 ? error.status : 500).json({error});
	next();
};

module.exports = handleError;