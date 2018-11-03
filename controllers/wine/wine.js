const express = require('express');

const {
	createWine,
	editWine,
	getWine,
	deleteWine
} = require('./wineActions');
 
const router = express.Router({ mergeParams: true });

router.route('/')
	.post(createWine);

router.route('/:wineid')
	.get(getWine)
	.put(editWine)
	.delete(deleteWine);

module.exports = router;