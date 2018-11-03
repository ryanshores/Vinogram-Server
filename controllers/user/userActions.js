const db = require('../../models');

// GET - /api/user/:id/animals
exports.getAnimals = async (req, res, next) => {
	try {
		const foundAnimals = await db.User.findById(req.params.id)
			.populate('animals');
		return res.status(200).json(foundAnimals);
	} catch (error) {
		return next(error);
	}
};