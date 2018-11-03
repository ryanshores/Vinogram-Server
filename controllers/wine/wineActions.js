const db = require('../../models');

exports.createWine = async (req, res, next) => {
	const newWine = {
		name: req.body.name,
		vineyard: req.body.vineyard,
		comment: req.body.comment,
		year: req.body.year,
		type: req.body.type,
		user: req.params.id
	};
	try {
		const addedWine = await db.Wine.create(newWine);
		const foundUser = await db.User.findById(req.params.id);
		foundUser.wines.push(addedWine.id);
		await foundUser.save();
		const foundWine = await db.Wine.findById(addedWine.id)
			.populate('user', {username: true});
		return res.status(200).json({foundWine});
	} catch (error) {
		next(error);
	}
};

exports.getWine = async (req, res, next) => {
	try {
		const foundWine = await db.Wine.findById(req.params.wineid);
		return res.status(200).json({foundWine});
	} catch (error) {
		return next(error);
	}
};

exports.editWine = async (req, res, next) => {
	const updatedWine = {
		name: req.params.name,
		vineyard: req.params.vineyard,
		comment: req.params.comment,
		rating: req.params.rating,
		type: req.params.type,
		user: req.params.userid
	};
	try {
		let foundWine = await db.Wine.findById(req.params.wineid);
		foundWine = updatedWine;
		await foundWine.save();
		return res.status(201).json({foundWine});
	} catch (error) {
		return next(error);
	}
};


exports.deleteWine = async (req, res, next) => {
	console.log(req.params)
	try {
		const foundWine = await db.Wine.findById(req.params.wineid);
		await foundWine.remove();
		return res.status(200).json({foundWine});
	} catch (error) {
		return next(error);
	}
};