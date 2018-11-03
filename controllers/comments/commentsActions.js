const db = require('../../models');

exports.postComment = async (req, res, next) => {
	try {
		const foundWine = await db.Wine.findById(req.params.wineid);
		foundWine.comments.push({
			user: req.params.id,
			text: req.body.comment
		});
		foundWine.save();
		
		return res.status(200).json(foundWine);
	} catch (error) {
		return next(error);
	}
};