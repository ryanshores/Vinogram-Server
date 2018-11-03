var express = require('express');

const db = require('../../models');

var router = express.Router({mergeParams: true});

router.get('/wines', async (req, res, next) => {
	try {
		const wines = await db.Wine.find()
			.sort({ createdAt: -1})
			.populate('user', { username: 1 })
			.populate('comments.user', {username: 1});
		return res.status(200).json({wines});
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
